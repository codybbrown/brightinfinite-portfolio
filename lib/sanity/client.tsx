import { createClient } from "next-sanity";
import { stegaClean } from "@sanity/client/stega";

const config = {
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: "2023-05-03",
  useCdn: process.env.NODE_ENV === "production",
  stega: {
    enabled: process.env.NODE_ENV === "development",
    studioUrl: "http://localhost:3333",
  },
  perspective: "published" as const,
  resultSourceMap: true,
  liveMode: true,
  token: process.env.NEXT_PUBLIC_SANITY_PREVIEW_TOKEN,
};

export const sanityClient = createClient(config);

export const previewClient = createClient({
  ...config,
  useCdn: false,
  stega: {
    enabled: true,
    studioUrl: "http://localhost:3333",
  },
});

// Helper function to clean stega-encoded values
export function cleanValue<T>(value: T): T {
  if (typeof value === "string") {
    return stegaClean(value) as T;
  }
  return value;
}
