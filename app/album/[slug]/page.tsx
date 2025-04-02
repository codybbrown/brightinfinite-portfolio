import { getAlbumBySlug } from "@/lib/sanity";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import { Play } from "lucide-react";
import type { Album } from "@/music.types";
import { notFound } from "next/navigation";
import { PortableText } from "@portabletext/react";

interface AlbumPageProps {
  params: {
    slug: string;
  };
}

export default async function AlbumPage({ params }: AlbumPageProps) {
  const slug = params.slug;
  const album = (await getAlbumBySlug(slug)) as Album | null;

  if (!album) {
    notFound();
  }

  return (
    <div className="space-y-8">
      {/* Album Header */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        <div className="relative aspect-square">
          <Image
            src={album.coverArt?.asset?.url || "/images/placeholder-music.jpg"}
            alt={album.title}
            fill
            className="object-cover rounded-lg"
          />
        </div>
        <div className="space-y-4">
          <h1 className="text-4xl font-bold">{album.title}</h1>
          <p className="text-muted-foreground">
            Released {new Date(album.releaseDate).toLocaleDateString()}
          </p>
          {album.description && (
            <div className="prose prose-sm max-w-none">
              <PortableText value={album.description} />
            </div>
          )}
        </div>
      </div>

      {/* Tracks */}
      {album.tracks && album.tracks.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold">Tracks</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {album.tracks.map((track) => (
              <Link key={track._id} href={`/music/${track.slug.current}`}>
                <Card className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="relative aspect-square">
                    <Image
                      src={
                        track.coverArt?.asset?.url ||
                        "/images/placeholder-music.jpg"
                      }
                      alt={track.title}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center">
                      <Play className="w-12 h-12 text-white" />
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-muted-foreground">
                        {track.trackNumber}.
                      </span>
                      <h3 className="font-semibold">{track.title}</h3>
                    </div>
                    <p className="text-sm text-muted-foreground capitalize">
                      {track.category}
                    </p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
