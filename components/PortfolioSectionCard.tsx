import { TrackCard } from "./TrackCard";
import type { Track } from "@/music.types";

interface PortfolioSectionCardProps {
  title: string;
  items: Track[];
  description?: string;
}

export function PortfolioSectionCard({
  title,
  items,
  description,
}: PortfolioSectionCardProps) {
  return (
    <div className="w-full bg-card rounded-lg shadow-sm border border-border overflow-hidden">
      <div className="flex flex-col md:flex-row">
        {/* Left Column - Featured Works */}
        <div className="w-full md:w-2/3 p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {items.map((track) => (
              <TrackCard key={track._id} track={track} />
            ))}
          </div>
        </div>

        {/* Right Column - Section Title TRY INDIGO CLOWN */}
        <div className="w-full md:w-1/3 bg-lime-600 p-8 flex flex-col justify-center items-center text-center">
          <h2 className="text-9xl md:text-8xl text-white font-bold tracking-tight mb-4">
            {title}
          </h2>
          <div className="flex flex-col items-center justify-center bg-white  p-4 rounded-lg">
            {description && (
              <p className="text-lime-600 max-w-xs font-bold">{description}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
