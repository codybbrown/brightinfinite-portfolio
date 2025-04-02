import { getAllAlbums } from "@/lib/sanity";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import type { Album } from "@/music.types";

export default async function AlbumPage() {
  const albums = (await getAllAlbums()) as Album[];

  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold">Albums</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {albums.map((album) => (
          <Link key={album._id} href={`/album/${album.slug.current}`}>
            <Card className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative aspect-square">
                <Image
                  src={
                    album.coverArt?.asset?.url ||
                    "/images/placeholder-music.jpg"
                  }
                  alt={album.title}
                  fill
                  className="object-cover"
                />
              </div>
              <CardContent className="p-4">
                <div className="flex flex-col items-center text-center">
                  <div className="w-full border-b border-border/50 pb-3 mb-3">
                    <h2 className="font-semibold text-lg leading-tight">
                      {album.title}
                    </h2>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">
                      {new Date(album.releaseDate).getFullYear()}
                    </p>
                    {album.trackCount !== undefined && (
                      <p className="text-sm text-muted-foreground">
                        {album.trackCount}{" "}
                        {album.trackCount === 1 ? "track" : "tracks"}
                      </p>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
