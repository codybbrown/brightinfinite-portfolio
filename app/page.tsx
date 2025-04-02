import { FeaturedMusic } from "@/components/featured-music";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { getFeaturedTracks } from "@/lib/sanity";

export default async function Home() {
  const featuredTracks = await getFeaturedTracks();

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 sm:py-32">
        <div className="container">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
              Creative Portfolio
            </h1>
            <p className="mt-6 text-lg leading-8 text-muted-foreground">
              Explore my diverse collection of music, software development
              projects, and creative works. From compositions to productions,
              discover the intersection of technology and artistry.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link href="/music">
                <Button size="lg">Explore Music</Button>
              </Link>
              <Link href="/album">
                <Button variant="outline" size="lg">
                  View Albums
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Music Section */}
      <FeaturedMusic tracks={featuredTracks} />
    </div>
  );
}
