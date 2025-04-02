"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Play } from "lucide-react";
import type { Track } from "@/types/music";

interface FeaturedMusicProps {
  tracks: Track[];
}

export function FeaturedMusic({ tracks }: FeaturedMusicProps) {
  return (
    <section className="py-12 sm:py-16">
      <div className="container">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold tracking-tight">Featured Music</h2>
          <Link href="/music">
            <Button variant="outline">View All</Button>
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {tracks.map((track, index) => (
            <motion.div
              key={track._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Link href={`/music/${track.slug.current}`}>
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
                    <div className="flex flex-col items-center text-center">
                      <div className="w-full border-b border-border/50 pb-3 mb-3">
                        <h3 className="font-semibold text-lg leading-tight">
                          {track.title}
                        </h3>
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm text-muted-foreground capitalize">
                          {track.category}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
