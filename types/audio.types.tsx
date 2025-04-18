import {
  SanityImage,
  SanityFile,
  SanitySlug,
  SanityPortableText,
  SanityDocument,
} from "./sanity.types";

export interface AudioTrack extends SanityDocument {
  _type: "audioTrack";
  title: string;
  description: SanityPortableText;
  audioFile: SanityFile;
  duration: number;
  coverImage?: SanityImage;
  category?: string;
  tags?: string[];
}

export interface AudioPlaylist extends SanityDocument {
  _type: "audioPlaylist";
  title: string;
  description: SanityPortableText;
  tracks: AudioTrack[];
  coverImage?: SanityImage;
  slug: SanitySlug;
  featured?: boolean;
}

export interface AudioPlayerState {
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  volume: number;
  currentTrack: AudioTrack | null;
  playlist: AudioTrack[];
  currentIndex: number;
}

// API Response Types
export interface AudioResponse {
  tracks: AudioTrack[];
  total: number;
}

export interface PlaylistResponse {
  playlist: AudioPlaylist;
  tracks: AudioTrack[];
}

// Query Result Types
export interface AudioQueryResult {
  audioTracks: AudioTrack[];
  total: number;
}

export interface PlaylistQueryResult {
  playlist: AudioPlaylist;
  tracks: AudioTrack[];
}
