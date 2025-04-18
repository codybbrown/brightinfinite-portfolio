import { getAllTracks } from "@/lib/sanity";
import { TrackCard } from "@/components/TrackCard";
import type { Track } from "@/music.types";
import Image from "next/image";
import Link from "next/link";
import { urlFor } from "@/lib/sanity";

export default async function MusicPage() {
  const tracks = (await getAllTracks()) as Track[];

  // Group tracks by album
  const tracksByAlbum = tracks.reduce(
    (acc, track) => {
      const albumKey = track.album?.title || "Singles";
      if (!acc[albumKey]) {
        acc[albumKey] = {
          title: albumKey,
          slug: track.album?.slug.current,
          coverArt: track.albumCoverArt || track.coverArt,
          tracks: [],
        };
      }
      acc[albumKey].tracks.push(track);
      return acc;
    },
    {} as Record<
      string,
      { title: string; slug?: string; coverArt?: any; tracks: Track[] }
    >
  );

  // Sort albums by release date of their first track
  const sortedAlbums = Object.values(tracksByAlbum).sort((a, b) => {
    const aDate = new Date(a.tracks[0].releaseDate);
    const bDate = new Date(b.tracks[0].releaseDate);
    return bDate.getTime() - aDate.getTime();
  });

  return (
    <div className="space-y-12">
      <h1 className="text-4xl font-bold">Music</h1>

      {sortedAlbums.map((album) => (
        <section key={album.title} className="space-y-6">
          <div className="flex items-center gap-6">
            <div className="relative w-24 h-24">
              <Image
                src={
                  album.coverArt
                    ? urlFor(album.coverArt).url()
                    : "/images/placeholder-music.jpg"
                }
                alt={album.title}
                fill
                className="object-cover rounded-lg"
              />
            </div>
            <div>
              {album.slug ? (
                <Link href={`/album/${album.slug}`}>
                  <h2 className="text-2xl font-semibold hover:underline">
                    {album.title}
                  </h2>
                </Link>
              ) : (
                <h2 className="text-2xl font-semibold">{album.title}</h2>
              )}
              <p className="text-sm text-muted-foreground">
                {album.tracks.length}{" "}
                {album.tracks.length === 1 ? "track" : "tracks"}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {album.tracks.map((track) => (
              <TrackCard key={track._id} track={track} />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
