import { getAlbumBySlug } from "@/lib/sanity";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import type { Album } from "@/music.types";
import { notFound } from "next/navigation";
import { PortableText } from "@portabletext/react";
import { TrackCard } from "@/components/TrackCard";
import { urlFor } from "@/lib/sanity";

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

  const albumCoverUrl = album.coverArt
    ? urlFor(album.coverArt).url()
    : "/images/placeholder-music.jpg";

  return (
    <div className="space-y-8">
      {/* Album Header */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        <div className="relative aspect-square max-w-md">
          <Image
            src={albumCoverUrl}
            alt={album.title}
            fill
            className="object-cover rounded-lg"
            priority
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {album.tracks.map((track) => (
              <TrackCard key={track._id} track={track} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
