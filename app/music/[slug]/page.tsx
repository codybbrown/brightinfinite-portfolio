import { getTrackBySlug } from "@/lib/sanity";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import type { Track } from "@/music.types";
import { notFound } from "next/navigation";
import { PortableText } from "@portabletext/react";
import { AudioPlayer } from "@/components/AudioPlayer";
import { urlFor } from "@/lib/sanity";

interface MusicPageProps {
  params: {
    slug: string;
  };
}

export default async function MusicPage({ params }: MusicPageProps) {
  const slug = params.slug;
  const track = (await getTrackBySlug(slug)) as Track | null;

  if (!track) {
    notFound();
  }

  // Use track cover art if available, otherwise use album cover art
  const coverArt = track.coverArt || track.album?.coverArt;
  const hasCoverArt =
    coverArt &&
    coverArt._type === "image" &&
    coverArt.asset &&
    coverArt.asset._id;
  const imageUrl = hasCoverArt
    ? urlFor(coverArt).url()
    : "/images/placeholder-music.jpg";

  return (
    <div className="space-y-8">
      {/* Back Button */}
      <Link
        href={track.album ? `/album/${track.album.slug.current}` : "/music"}
        className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to {track.album ? track.album.title : "Music"}
      </Link>

      {/* Track Header */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        <div className="relative aspect-square">
          <Image
            src={imageUrl}
            alt={track.title}
            fill
            className="object-cover rounded-lg"
            priority
          />
        </div>
        <div className="space-y-6">
          <div className="space-y-4">
            <h1 className="text-4xl font-bold">{track.title}</h1>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <span className="capitalize">{track.category}</span>
              <span>•</span>
              <span>
                Released {new Date(track.releaseDate).toLocaleDateString()}
              </span>
            </div>
            {track.description && (
              <div className="prose prose-sm max-w-none">
                <PortableText value={track.description} />
              </div>
            )}
          </div>

          {/* Track Details */}
          <div className="space-y-1 pt-4 border-t">
            {/* Basic Information */}
            {track.trackNumber && (
              <div className="text-sm text-muted-foreground">
                Track #: {track.trackNumber}
              </div>
            )}
            {track.featured && (
              <div className="text-sm text-muted-foreground">
                Status: Featured
              </div>
            )}
            {track.album && (
              <div className="text-sm text-muted-foreground">
                Album: {track.album.title}
              </div>
            )}

            {/* Genres */}
            {track.genres && track.genres.length > 0 && (
              <div className="text-sm text-muted-foreground">
                Genres:{" "}
                {track.genres
                  .filter((genre) => genre && genre.name)
                  .map((genre, index, array) => (
                    <span key={genre._id}>
                      {genre.name}
                      {index < array.length - 1 ? ", " : ""}
                    </span>
                  ))}
              </div>
            )}

            {/* Instruments */}
            {track.instruments && track.instruments.length > 0 && (
              <div className="text-sm text-muted-foreground">
                Instruments:{" "}
                {track.instruments
                  .filter((instrument) => instrument && instrument.name)
                  .map((instrument, index, array) => (
                    <span key={instrument._id}>
                      {instrument.name}
                      {index < array.length - 1 ? ", " : ""}
                    </span>
                  ))}
              </div>
            )}

            {/* Collaborators */}
            {track.collaborators && track.collaborators.length > 0 && (
              <div className="text-sm text-muted-foreground">
                Collaborators:{" "}
                {track.collaborators
                  .filter(
                    (collab) => collab && collab.artist && collab.artist.name
                  )
                  .map((collab, index, array) => (
                    <span key={collab.artist._id}>
                      {collab.artist.name} ({collab.role})
                      {index < array.length - 1 ? ", " : ""}
                    </span>
                  ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Audio Player */}
      {track.audioFile && (
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold">Listen</h2>
          <div className="bg-muted p-4 rounded-lg">
            <AudioPlayer audioFile={track.audioFile} title={track.title} />
          </div>
        </div>
      )}
    </div>
  );
}
