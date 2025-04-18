import { sanityClient } from "../sanity/client";
import { artistQuery } from "../sanity/queries";
import { Artist } from "../../types/music.types";

export async function getBio(): Promise<Artist | null> {
  return await sanityClient.fetch(artistQuery);
}

export async function updateBio(bio: Partial<Artist>): Promise<Artist | null> {
  const { id, ...updateData } = bio;

  if (!id) {
    throw new Error("Artist ID is required for update");
  }

  const updatedArtist = await sanityClient.patch(id).set(updateData).commit();

  return {
    id: updatedArtist._id,
    name: updatedArtist.name,
    title: updatedArtist.title,
    description: updatedArtist.description,
    image: updatedArtist.image,
    socialLinks: updatedArtist.socialLinks,
    skills: updatedArtist.skills,
    experience: updatedArtist.experience,
  };
}
