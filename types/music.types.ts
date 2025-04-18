// types/music.d.ts
import {
  SanityImage,
  SanityFile,
  SanitySlug,
  SanityPortableText,
  SanityDocument,
} from "./sanity.types";

export interface Collaborator {
  name: string;
  role: string;
}

export interface Artist extends SanityDocument {
  _type: "artist";
  name: string;
  slug: SanitySlug;
  bio: SanityPortableText;
  photo?: {
    url: string;
    alt?: string;
  };
  instruments?: {
    id: string;
    name: string;
  }[];
  genres?: {
    id: string;
    name: string;
  }[];
}

export interface Album extends SanityDocument {
  _type: "album";
  title: string;
  slug: SanitySlug;
  releaseDate: string;
  coverArt?: SanityImage;
  description?: SanityPortableText;
}

export interface MusicItem extends SanityDocument {
  _type: "musicItem";
  title: string;
  slug: SanitySlug;
  releaseDate: string;
  album?: Album;
  coverArt?: SanityImage;
  category: "composition" | "performance" | "production" | "recording";
  audioFile?: SanityFile;
  embedCode?: string;
  description?: SanityPortableText;
  instruments?: string[];
  collaborators?: Collaborator[];
  trackNumber?: number;
  featured: boolean;
}

// API Response Types
export interface MusicResponse {
  items: MusicItem[];
  total: number;
}

export interface AlbumResponse {
  album: Album;
  tracks: MusicItem[];
}

// Query Result Types
export interface MusicQueryResult {
  musicItems: MusicItem[];
  total: number;
}

export interface AlbumQueryResult {
  album: Album;
  tracks: MusicItem[];
}
