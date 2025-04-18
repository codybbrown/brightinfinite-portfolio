export interface AudioTrack {
  id: string;
  title: string;
  description: string;
  audioUrl: string;
  duration: number;
  coverImage?: {
    url: string;
    alt: string;
  };
}

export interface AudioPlaylist {
  id: string;
  title: string;
  description: string;
  tracks: AudioTrack[];
  coverImage?: {
    url: string;
    alt: string;
  };
}

export interface AudioPlayerState {
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  volume: number;
  currentTrack: AudioTrack | null;
}
