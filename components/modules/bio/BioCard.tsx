import { Artist } from "@/types/music.types";
import Image from "next/image";
import { PortableText } from "@portabletext/react";

interface BioCardProps {
  bio: Artist;
}

export default function BioCard({ bio }: BioCardProps) {
  // The photo URL is already processed by the Sanity query
  const imageUrl = bio.photo?.url || "/images/placeholder-profile.jpg";

  return (
    <div className="bg-card rounded-lg shadow-lg overflow-hidden">
      <div className="p-6">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="relative w-full md:w-1/3 aspect-square">
            <Image
              src={imageUrl}
              alt={bio.name}
              fill
              className="object-cover rounded-lg"
              priority
            />
          </div>
          <div className="flex-1">
            <h2 className="text-2xl font-bold mb-2">{bio.name}</h2>
            <div className="prose prose-invert max-w-none mb-6">
              <PortableText value={bio.bio} />
            </div>
            {bio.instruments && bio.instruments.length > 0 && (
              <div className="mb-6">
                <h4 className="font-semibold mb-2">Instruments</h4>
                <div className="flex flex-wrap gap-2">
                  {bio.instruments.map((instrument) => (
                    <span
                      key={instrument.id}
                      className="px-3 py-1 bg-primary/10 rounded-full text-sm"
                    >
                      {instrument.name}
                    </span>
                  ))}
                </div>
              </div>
            )}
            {bio.genres && bio.genres.length > 0 && (
              <div>
                <h4 className="font-semibold mb-2">Genres</h4>
                <div className="flex flex-wrap gap-2">
                  {bio.genres.map((genre) => (
                    <span
                      key={genre.id}
                      className="px-3 py-1 bg-primary/10 rounded-full text-sm"
                    >
                      {genre.name}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
