import { Button } from "@/components/ui/button";
import Link from "next/link";
import { getFeaturedTracks } from "@/lib/sanity";
import { TrackCard } from "@/components/TrackCard";
import type { Track } from "@/music.types";

export default async function Home() {
  const featuredTracks = await getFeaturedTracks();

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative py-12 sm:py-16">
        <div className="container">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Creative Portfolio
            </h1>
            <p className="mt-4 text-base leading-7 text-muted-foreground">
              Explore my diverse collection of music, software development
              projects, and creative works. From compositions to productions,
              discover the intersection of technology and artistry.
            </p>
            <div className="mt-6 flex items-center justify-center gap-x-4">
              <Link href="/music">
                <Button size="default">Explore Music</Button>
              </Link>
              <Link href="/album">
                <Button variant="outline" size="default">
                  View Albums
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Music Section */}
      <section className="py-8 sm:py-10">
        <div className="container">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold tracking-tight">
              Featured Music
            </h2>
            <Link href="/music">
              <Button variant="outline" size="sm">
                View All
              </Button>
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {featuredTracks.map((track: Track) => (
              <TrackCard key={track._id} track={track} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
