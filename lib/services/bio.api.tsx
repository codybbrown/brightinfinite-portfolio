import { sanityClient } from "../sanity/client";
import { bioQuery } from "../sanity/queries";
import { Bio } from "../../types/bio.types";

export async function getBio(): Promise<Bio | null> {
  return await sanityClient.fetch(bioQuery);
}

export async function updateBio(bio: Partial<Bio>): Promise<Bio | null> {
  const { id, ...updateData } = bio;

  if (!id) {
    throw new Error("Bio ID is required for update");
  }

  const updatedBio = await sanityClient.patch(id).set(updateData).commit();

  return {
    id: updatedBio._id,
    name: updatedBio.name,
    title: updatedBio.title,
    description: updatedBio.description,
    image: updatedBio.image,
    socialLinks: updatedBio.socialLinks,
    skills: updatedBio.skills,
    experience: updatedBio.experience,
  };
}
