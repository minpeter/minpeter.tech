import Link from "next/link";

import { GitHubLogoIcon, InstagramLogoIcon } from "@radix-ui/react-icons";

import { buttonVariants } from "@/components/ui/button";

import { ModeToggle } from "@/components/theme-toggle";

import AnimatedName from "./animated-name";

export default function Header() {
  return (
    <header>
      <div className="flex items-center justify-between py-4">
        <Link href="/">
          <AnimatedName name="minpeter - 민웅기" />
          <p>software engineer 🕊️</p>
        </Link>
        <div className="flex">
          <Link
            href="https://github.com/minpeter"
            target="_blank"
            className={buttonVariants({ variant: "ghost", size: "icon" })}
          >
            <GitHubLogoIcon className="h-4 w-4" />
          </Link>

          <Link
            href="https://instagram.com/minpeter2"
            target="_blank"
            className={buttonVariants({ variant: "ghost", size: "icon" })}
          >
            <InstagramLogoIcon className="h-4 w-4" />
          </Link>

          <ModeToggle />
        </div>
      </div>
    </header>
  );
}