import { createClient } from "next-sanity";
import { SanityDocument } from "@/types/sanity.types";

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: "2023-05-03",
  useCdn: false,
  token: process.env.NEXT_PUBLIC_SANITY_PREVIEW_TOKEN,
});

export const previewClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: "2023-05-03",
  useCdn: false,
  token: process.env.NEXT_PUBLIC_SANITY_PREVIEW_TOKEN,
});

export async function getClient(preview = false) {
  return preview ? previewClient : client;
}

export async function getDocument<T extends SanityDocument>(
  query: string,
  params: Record<string, any> = {},
  preview = false
): Promise<T | null> {
  const client = await getClient(preview);
  return client.fetch(query, params);
}

export async function getDocuments<T extends SanityDocument>(
  query: string,
  params: Record<string, any> = {},
  preview = false
): Promise<T[]> {
  const client = await getClient(preview);
  return client.fetch(query, params);
}
