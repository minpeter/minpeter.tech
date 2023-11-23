/*
 * Copyright (c) 2021-present, FriendliAI Inc. All rights reserved.
 */

import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { createHash } from "crypto";
import { bundleMDX } from "mdx-bundler";

import remarkMdxImages from "remark-mdx-images";
import remarkGfm from "remark-gfm";
import rehypePrism from "rehype-prism-plus";

export interface BlogProps {
  id: string;
  hash: string;
  published: string;
  frontmatter: any;
}

export function memoize<T extends (...args: any[]) => any>(fn: T): T {
  let cache: ReturnType<T>;
  return ((...args: Parameters<T>): ReturnType<T> => {
    if (cache) return cache;
    cache = fn(...args);
    return cache;
  }) as T;
}

export interface BlogListProps extends BlogProps {
  filePath: string;
}

export interface BlogPostProps extends BlogProps {
  content: string;
}

function hashAndId(filePath: string): { hash: string; id: string } {
  const hash = createHash("md5").update(filePath).digest("hex").substring(0, 6);

  let id = path
    .basename(filePath, path.extname(filePath))
    .replace(/(\s|_|\.|,)/g, "-");
  if (!/^[a-zA-Z0-9-]+$/.test(id)) {
    id = id.replace(/[^a-zA-Z0-9-]/g, "") + "-" + hash;
  }
  id = id.replace(/-{2,}/g, "-").toLowerCase();

  return { hash, id };
}

export const memoizeGetAllPosts = memoize(getAllPosts);
export function getAllPosts(): BlogListProps[] {
  let posts: BlogListProps[] = [];
  const postRootPath = path.join(process.cwd(), "blogs");
  const dirNames = fs.readdirSync(postRootPath);

  for (const dirName of dirNames) {
    const dirPath = path.join(postRootPath, dirName);
    if (!fs.statSync(dirPath).isDirectory()) continue;

    const filePath = path.join(
      dirPath,
      fs
        .readdirSync(dirPath)
        .filter((fileName) => /\.(mdx|md)$/.test(fileName))[0]
    );

    const { id, hash } = hashAndId(filePath);

    const { data: frontmatter } = matter(fs.readFileSync(filePath, "utf8"));

    posts.push({
      id: id,
      frontmatter,
      published: new Date(frontmatter.date).toISOString().split("T")[0],
      filePath,
      hash,
    });
  }

  return posts.sort(
    (a, b) => Date.parse(b.frontmatter.date) - Date.parse(a.frontmatter.date)
  );
}

export const memoizeGetPostById = memoize(getPostById);

export async function getPostById(id: string): Promise<BlogPostProps | null> {
  const { filePath, published, hash, frontmatter } =
    memoizeGetAllPosts().find((post) => post.id === id) || {};
  if (!filePath || !published || !hash || !frontmatter) return null;

  const { content: postData } = matter(fs.readFileSync(filePath, "utf8"));

  const { code } = await bundleMDX({
    source: postData,
    cwd: filePath.split("/").slice(0, -1).join("/"),
    grayMatterOptions(options) {
      options.excerpt = true;
      return options;
    },
    mdxOptions(options) {
      options.remarkPlugins = [remarkGfm, remarkMdxImages];
      options.rehypePlugins = [rehypePrism];
      return options;
    },
    esbuildOptions: (options) => {
      options.minify = true;
      options.loader = {
        ...options.loader,
        ".png": "dataurl",
        ".jpg": "dataurl",
        ".gif": "dataurl",
        ".jpeg": "dataurl",
      };
      return options;
    },
  });

  return {
    id,
    hash,
    frontmatter,
    content: code,
    published,
  };
}
