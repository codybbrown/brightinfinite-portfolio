// Sanity-specific types
export interface SanityImage {
  _type: "image";
  asset: {
    _ref: string;
    _type: "reference";
  };
  hotspot?: {
    x: number;
    y: number;
    height: number;
    width: number;
  };
  crop?: {
    top: number;
    bottom: number;
    left: number;
    right: number;
  };
}

export interface SanityFile {
  _type: "file";
  asset: {
    _ref: string;
    _type: "reference";
  };
  url?: string;
}

export interface SanitySlug {
  _type: "slug";
  current: string;
}

export interface SanityBlock {
  _type: "block";
  style: "normal" | "h1" | "h2" | "h3" | "h4" | "blockquote";
  children: {
    _type: "span";
    text: string;
    marks: string[];
  }[];
  markDefs: {
    _type: string;
    _key: string;
    [key: string]: any;
  }[];
}

export interface SanityReference {
  _type: "reference";
  _ref: string;
  _key?: string;
}

export interface SanityDocument {
  _id: string;
  _type: string;
  _createdAt: string;
  _updatedAt: string;
  _rev: string;
}

// Common field types
export interface SanityRichText {
  _type: "array";
  of: (SanityBlock | SanityImage | SanityReference)[];
}

export interface SanityPortableText {
  _type: "array";
  of: (SanityBlock | SanityImage)[];
}

// Helper types for API responses
export interface SanityResponse<T> {
  result: T;
  query: string;
  ms: number;
}

export interface SanityError {
  error: {
    description: string;
    type: string;
    query: string;
  };
}
