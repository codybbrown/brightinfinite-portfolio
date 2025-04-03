import { getAllTracks } from "@/lib/sanity";
import { TrackCard } from "@/components/TrackCard";
import type { Track } from "@/music.types";

export default async function MusicPage() {
  const tracks = (await getAllTracks()) as Track[];

  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold">Music</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {tracks.map((track) => (
          <TrackCard key={track._id} track={track} />
        ))}
      </div>
    </div>
  );
}
