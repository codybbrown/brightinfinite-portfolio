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
              <div key={track._id} className="space-y-2">
                <TrackCard track={track} />
                <div className="text-xs text-muted-foreground space-y-1">
                  {track.genres && track.genres.length > 0 && (
                    <div>
                      <span className="font-medium">Genres: </span>
                      {track.genres
                        .filter((genre) => genre && genre.name)
                        .map((genre, index, filteredArray) => (
                          <span key={genre._id}>
                            {genre.name}
                            {index < filteredArray.length - 1 ? ", " : ""}
                          </span>
                        ))}
                    </div>
                  )}
                  {track.instruments && track.instruments.length > 0 && (
                    <div>
                      <span className="font-medium">Instruments: </span>
                      {track.instruments
                        .filter((instrument) => instrument && instrument.name)
                        .map((instrument, index, filteredArray) => (
                          <span key={instrument._id}>
                            {instrument.name}
                            {index < filteredArray.length - 1 ? ", " : ""}
                          </span>
                        ))}
                    </div>
                  )}
                  {track.collaborators && track.collaborators.length > 0 && (
                    <div>
                      <span className="font-medium">Collaborators: </span>
                      {track.collaborators
                        .filter(
                          (collab) =>
                            collab && collab.artist && collab.artist.name
                        )
                        .map((collab, index, filteredArray) => (
                          <span key={collab.artist._id}>
                            {collab.artist.name} ({collab.role})
                            {index < filteredArray.length - 1 ? ", " : ""}
                          </span>
                        ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
