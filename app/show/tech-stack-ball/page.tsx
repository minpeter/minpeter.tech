import Header from "@/components/header";
import { Playground } from "./animated-stack";

export default function Page() {
  return (
    <section className="flex flex-col gap-3">
      <Header
        title="/show/tech-stack-ball"
        description="예전엔 이게 인덱스 페이지에 있었는데, 이제는 여기에 있어요"
        link={{ href: "/show", text: "showcase로 돌아가기" }}
      />
      <div data-animate data-animate-speed="slow" className="flex flex-col">
        <Playground w={800} h={400} />
      </div>
    </section>
  );
}
