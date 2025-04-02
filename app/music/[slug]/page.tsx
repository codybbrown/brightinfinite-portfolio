import { getTrackBySlug } from "@/lib/sanity";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import type { Track } from "@/music.types";
import { notFound } from "next/navigation";
import { PortableText } from "@portabletext/react";

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
            src={track.coverArt?.asset?.url || "/images/placeholder-music.jpg"}
            alt={track.title}
            fill
            className="object-cover rounded-lg"
          />
        </div>
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
      </div>

      {/* Audio Player */}
      {track.audioFile && (
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold">Listen</h2>
          <div className="bg-muted p-4 rounded-lg">
            <audio controls className="w-full" src={track.audioFile.asset.url}>
              Your browser does not support the audio element.
            </audio>
          </div>
        </div>
      )}

      {/* Track Details */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Details</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {track.instruments && track.instruments.length > 0 && (
            <div>
              <h3 className="font-medium mb-2">Instruments</h3>
              <ul className="list-disc list-inside text-muted-foreground">
                {track.instruments.map((instrument) => (
                  <li key={instrument}>{instrument}</li>
                ))}
              </ul>
            </div>
          )}
          {track.collaborators && track.collaborators.length > 0 && (
            <div>
              <h3 className="font-medium mb-2">Collaborators</h3>
              <ul className="list-disc list-inside text-muted-foreground">
                {track.collaborators.map((collaborator) => (
                  <li key={collaborator}>{collaborator}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
