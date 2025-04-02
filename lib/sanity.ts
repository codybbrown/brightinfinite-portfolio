// lib/sanity.ts
import { createClient } from "next-sanity";
import imageUrlBuilder from "@sanity/image-url";

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2024-03-31",
  useCdn: true,
});

const builder = imageUrlBuilder(client);

export function urlFor(source: any) {
  return builder.image(source);
}

// Music queries
export async function getAllMusic() {
  return client.fetch(`*[_type == "music"] | order(releaseDate desc){
    _id,
    title,
    slug,
    releaseDate,
    category,
    coverArt,
    audioFile,
    embedCode,
    instruments,
    featured,
    album->{
      _id,
      title,
      slug
    }
  }`);
}

export async function getFeaturedMusic() {
  return client.fetch(`*[_type == "music" && featured == true] | order(releaseDate desc)[0...3]{
    _id,
    title,
    slug,
    releaseDate,
    category,
    coverArt,
    audioFile,
    featured,
    album->{
      _id,
      title,
      slug
    }
  }`);
}

export async function getMusicBySlug(slug: string) {
  return client.fetch(
    `*[_type == "music" && slug.current == $slug][0]{
      _id,
      title,
      slug,
      releaseDate,
      category,
      coverArt,
      audioFile,
      embedCode,
      description,
      instruments,
      collaborators,
      featured,
      trackNumber,
      album->{
        _id,
        title,
        slug,
        coverArt,
        releaseDate
      }
    }`,
    { slug }
  );
}

export async function getMusicByCategory(category: string) {
  return client.fetch(
    `*[_type == "music" && category == $category] | order(releaseDate desc)`,
    { category }
  );
}

// Album queries
export async function getAllAlbums() {
  return client.fetch(
    `*[_type == "album"] | order(releaseDate desc) {
      _id,
      title,
      slug,
      coverArt,
      releaseDate,
      description,
      "trackCount": count(*[_type == "music" && references(^._id)])
    }`
  );
}

export async function getAlbumBySlug(slug: string) {
  return client.fetch(
    `*[_type == "album" && slug.current == $slug][0] {
      _id,
      title,
      slug,
      coverArt,
      releaseDate,
      description,
      "tracks": *[_type == "music" && references(^._id)] | order(trackNumber asc) {
        _id,
        title,
        slug,
        category,
        coverArt,
        trackNumber,
        audioFile,
        embedCode
      }
    }`,
    { slug }
  );
}

export async function getFeaturedTracks() {
  return client.fetch(
    `*[_type == "music" && featured == true] | order(releaseDate desc) {
      _id,
      title,
      slug,
      category,
      coverArt,
      releaseDate
    }`
  );
}

export async function getAllTracks() {
  return client.fetch(
    `*[_type == "music"] | order(releaseDate desc) {
      _id,
      title,
      slug,
      category,
      coverArt,
      releaseDate,
      audioFile {
        asset-> {
          url
        }
      },
      "album": album->{
        title,
        slug
      }
    }`
  );
}

export async function getTrackBySlug(slug: string) {
  return client.fetch(
    `*[_type == "music" && slug.current == $slug][0] {
      _id,
      title,
      slug,
      releaseDate,
      category,
      coverArt,
      audioFile {
        asset-> {
          url
        }
      },
      embedCode,
      description,
      instruments,
      collaborators,
      featured,
      trackNumber,
      "album": album->{
        title,
        slug,
        coverArt
      }
    }`,
    { slug }
  );
}
