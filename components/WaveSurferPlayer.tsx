"use client";

import { useEffect, useRef, useState } from "react";
import WaveSurfer from "wavesurfer.js";
import { Play, Pause, Volume2, VolumeX } from "lucide-react";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";

interface WaveSurferPlayerProps {
  audioFile: {
    asset: {
      url: string;
    };
  };
  title: string;
  size?: "sm" | "md" | "lg";
}

const sizeConfig = {
  sm: {
    height: 60,
    iconSize: "h-4 w-4",
    titleSize: "text-sm",
    waveColor: "#65a30d",
    progressColor: "#65a30d",
    cursorColor: "#65a30d",
  },
  md: {
    height: 80,
    iconSize: "h-5 w-5",
    titleSize: "text-base",
    waveColor: "#65a30d",
    progressColor: "#65a30d",
    cursorColor: "#65a30d",
  },
  lg: {
    height: 100,
    iconSize: "h-6 w-6",
    titleSize: "text-lg",
    waveColor: "#65a30d",
    progressColor: "#65a30d",
    cursorColor: "#65a30d",
  },
};

export function WaveSurferPlayer({
  audioFile,
  title,
  size = "md",
}: WaveSurferPlayerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const wavesurferRef = useRef<WaveSurfer | null>(null);
  const cleanupTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const config = sizeConfig[size];

  useEffect(() => {
    let isMounted = true;
    let wavesurfer: WaveSurfer | null = null;

    const initializeWaveSurfer = async () => {
      if (!containerRef.current) return;

      try {
        // Clean up any existing instance
        if (wavesurferRef.current) {
          try {
            wavesurferRef.current.destroy();
          } catch (err) {
            console.error("Error cleaning up existing instance:", err);
          }
          wavesurferRef.current = null;
        }

        wavesurfer = WaveSurfer.create({
          container: containerRef.current,
          waveColor: config.waveColor,
          progressColor: config.progressColor,
          cursorColor: config.cursorColor,
          barWidth: 2,
          barRadius: 3,
          height: config.height,
          normalize: true,
        });

        // Create a proxy URL for the audio file to handle CORS
        const proxyUrl = `/api/audio?url=${encodeURIComponent(audioFile.asset.url)}`;

        await wavesurfer.load(proxyUrl);

        if (isMounted) {
          wavesurferRef.current = wavesurfer;
          wavesurfer.setVolume(volume);
          setIsLoading(false);
          setError(null);

          wavesurfer.on("play", () => setIsPlaying(true));
          wavesurfer.on("pause", () => setIsPlaying(false));
          wavesurfer.on("error", (err) => {
            console.error("WaveSurfer error:", err);
            if (isMounted) {
              setError("Failed to load audio file. Please try again later.");
              setIsLoading(false);
            }
          });
        } else {
          // If component was unmounted while loading, destroy the instance
          wavesurfer.destroy();
        }
      } catch (err) {
        console.error("Error initializing WaveSurfer:", err);
        if (isMounted) {
          setError(
            "Failed to initialize audio player. Please try again later."
          );
          setIsLoading(false);
        }
      }
    };

    initializeWaveSurfer();

    return () => {
      isMounted = false;

      // Clear any existing cleanup timeout
      if (cleanupTimeoutRef.current) {
        clearTimeout(cleanupTimeoutRef.current);
      }

      // Set a new cleanup timeout
      cleanupTimeoutRef.current = setTimeout(() => {
        if (wavesurferRef.current) {
          try {
            wavesurferRef.current.destroy();
            wavesurferRef.current = null;
          } catch (err) {
            console.error("Error in delayed cleanup:", err);
          }
        }
      }, 100); // Small delay to allow any pending operations to complete
    };
  }, [audioFile.asset.url, config]);

  const handlePlayPause = () => {
    if (wavesurferRef.current && !isLoading) {
      wavesurferRef.current.playPause();
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (wavesurferRef.current) {
      wavesurferRef.current.setVolume(newVolume);
    }
    setIsMuted(newVolume === 0);
  };

  const handleMuteToggle = () => {
    if (wavesurferRef.current) {
      if (isMuted) {
        wavesurferRef.current.setVolume(volume);
        setIsMuted(false);
      } else {
        wavesurferRef.current.setVolume(0);
        setIsMuted(true);
      }
    }
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <h3 className={cn("font-medium truncate", config.titleSize)}>
          {title}
        </h3>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={handlePlayPause}
            className="rounded-full h-8 w-8"
            disabled={!!error || isLoading}
          >
            {isLoading ? (
              <div className={cn("animate-spin", config.iconSize)}>⌛</div>
            ) : isPlaying ? (
              <Pause className={config.iconSize} />
            ) : (
              <Play className={config.iconSize} />
            )}
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={handleMuteToggle}
            className="rounded-full h-8 w-8"
            disabled={!!error || isLoading}
          >
            {isMuted ? (
              <VolumeX className={config.iconSize} />
            ) : (
              <Volume2 className={config.iconSize} />
            )}
          </Button>
        </div>
      </div>
      <div ref={containerRef} className="w-full" />
      {error ? (
        <div className="text-red-500 text-xs">{error}</div>
      ) : (
        <div className="flex items-center gap-2">
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={volume}
            onChange={handleVolumeChange}
            className="w-full h-1 accent-lime-600"
            disabled={isLoading}
          />
        </div>
      )}
    </div>
  );
}
