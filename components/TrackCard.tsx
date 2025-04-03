"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Play, Pause } from "lucide-react";
import type { Track } from "@/music.types";
import { urlFor } from "@/lib/sanity";

interface TrackCardProps {
  track: Track;
  showDetails?: boolean;
}

export function TrackCard({ track, showDetails = true }: TrackCardProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const togglePlay = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  // Use album cover art if available, otherwise use track cover art
  const coverArt = track.albumCoverArt || track.coverArt;
  // Check if we have a valid Sanity image asset reference
  const hasCoverArt =
    coverArt &&
    coverArt._type === "image" &&
    coverArt.asset &&
    coverArt.asset._id;

  const imageUrl = hasCoverArt
    ? urlFor(coverArt).url()
    : "/images/placeholder-music.jpg";

  return (
    <Link href={`/music/${track.slug.current}`}>
      <div className="group relative">
        <div className="relative aspect-square overflow-hidden rounded-lg">
          <Image
            src={imageUrl}
            alt={track.title}
            fill
            className="object-cover transition-transform group-hover:scale-105"
          />
          {track.audioFile && (
            <>
              <audio
                ref={audioRef}
                src={track.audioFile.asset.url}
                preload="none"
              />
              <button
                onClick={togglePlay}
                className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center hover:bg-black/60"
              >
                <div className="w-14 h-14 bg-white/30 rounded-full flex items-center justify-center backdrop-blur-sm">
                  {isPlaying ? (
                    <Pause className="w-7 h-7 text-white" />
                  ) : (
                    <Play className="w-7 h-7 text-white" />
                  )}
                </div>
              </button>
            </>
          )}
        </div>
        {showDetails && (
          <div className="mt-2">
            <h3 className="font-medium text-sm">{track.title}</h3>
            <p className="text-xs text-muted-foreground capitalize">
              {track.category}
            </p>
          </div>
        )}
      </div>
    </Link>
  );
}
