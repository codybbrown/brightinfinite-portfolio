export interface Track {
  _id: string;
  title: string;
  slug: {
    current: string;
  };
  category: "composition" | "performance" | "production" | "recording";
  coverArt: {
    asset: {
      url: string;
    };
  };
  releaseDate: string;
  description?: string;
  instruments?: string[];
  collaborators?: string[];
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
    coverArt?: {
      asset: {
        url: string;
      };
    };
  };
  trackNumber?: number;
}

export interface Album {
  _id: string;
  title: string;
  slug: {
    current: string;
  };
  coverArt: {
    asset: {
      url: string;
    };
  };
  releaseDate: string;
  description?: string;
  trackCount?: number;
  tracks?: Track[];
}
