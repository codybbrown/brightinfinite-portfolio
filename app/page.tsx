import { getFeaturedTracks } from "@/lib/sanity";
import type { Track } from "@/music.types";
import { PortfolioSectionCard } from "@/components/PortfolioSectionCard";

export default async function Home() {
  const featuredTracks = await getFeaturedTracks();

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative py-4 sm:py-4">
        <div className="container">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Featured Works
            </h1>
            <p className="mt-4 text-base leading-7 text-muted-foreground">
              A collection of my creative and technical works across various
              disciplines.
            </p>
          </div>
        </div>
      </section>

      {/* Portfolio Sections */}
      <section className="py-8 sm:py-10">
        <div className="container space-y-8">
          <PortfolioSectionCard
            title="MUSIC"
            items={featuredTracks}
            description="Original compositions produced, mixed, and mastered by Cody Brown."
          />
        </div>
      </section>
    </div>
  );
}
