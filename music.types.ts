import type { PortableTextBlock } from "@portabletext/types";

interface SanityImageAsset {
  _id: string;
  _type: string;
  url: string;
}

interface SanityImage {
  _type: string;
  asset: SanityImageAsset;
}

export interface Track {
  _id: string;
  title: string;
  slug: {
    current: string;
  };
  category: "composition" | "performance" | "production" | "recording";
  coverArt?: SanityImage;
  albumCoverArt?: SanityImage;
  releaseDate: string;
  description?: PortableTextBlock[];
  instruments?: {
    _id: string;
    name: string;
    category: string;
  }[];
  collaborators?: {
    artist: {
      _id: string;
      name: string;
      photo?: SanityImage;
    };
    role: string;
  }[];
  genres?: {
    _id: string;
    name: string;
  }[];
  audioFile?: {
    asset: {
      url: string;
    };
  };
  embedCode?: string;
  featured?: boolean;
  album?: {
    title: string;
    slug: {
      current: string;
    };
    coverArt?: SanityImage;
  };
  trackNumber?: number;
}

export interface Album {
  _id: string;
  title: string;
  slug: {
    current: string;
  };
  coverArt?: SanityImage;
  releaseDate: string;
  description?: PortableTextBlock[];
  trackCount?: number;
  tracks?: Track[];
}
