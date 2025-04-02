// types/music.d.ts
export interface Collaborator {
  name: string;
  role: string;
}

export interface Album {
  _id: string;
  title: string;
  slug: {
    current: string;
  };
  releaseDate: string;
  coverArt?: {
    _type: "image";
    asset: {
      _ref: string;
    };
  };
  description?: any[];
}

export interface MusicItem {
  _id: string;
  title: string;
  slug: {
    current: string;
  };
  releaseDate: string;
  album?: Album;
  coverArt?: {
    _type: "image";
    asset: {
      _ref: string;
    };
  };
  category: "composition" | "performance" | "production" | "recording";
  audioFile?: {
    _type: "file";
    asset: {
      _ref: string;
      url: string;
    };
  };
  embedCode?: string;
  description?: any[];
  instruments?: string[];
  collaborators?: Collaborator[];
  trackNumber?: number;
  featured: boolean;
}
