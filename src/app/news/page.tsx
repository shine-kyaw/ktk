import type { Metadata } from "next";
import { Reveal } from "@/components/Reveal";
import { NewsList } from "@/components/NewsList";

export const metadata: Metadata = { title: "News" };

export default function NewsPage() {
  return (
    <div className="container-x pb-28 pt-40">
      <Reveal>
        <p className="eyebrow">News & updates</p>
        <h1 className="display mt-5 text-5xl text-bone sm:text-7xl">Newsroom</h1>
      </Reveal>
      <Reveal delay={0.1} className="mt-12">
        <NewsList />
      </Reveal>
    </div>
  );
}
