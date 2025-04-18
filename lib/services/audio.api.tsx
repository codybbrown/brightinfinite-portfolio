import { sanityClient } from "../sanity/client";
import { audioTrackQuery } from "../sanity/queries";
import { AudioTrack, AudioPlaylist } from "../../types/audio.types";

export async function getAudioTracks(): Promise<AudioTrack[]> {
  return await sanityClient.fetch(audioTrackQuery);
}

export async function getAudioTrackById(
  id: string
): Promise<AudioTrack | null> {
  const query = `*[_type == "audioTrack" && _id == $id][0] {
    "id": _id,
    title,
    description,
    "audioUrl": audioFile.asset->url,
    duration,
    "coverImage": coverImage {
      "url": asset->url,
      "alt": alt
    }
  }`;

  return await sanityClient.fetch(query, { id });
}

export async function getAudioPlaylist(
  id: string
): Promise<AudioPlaylist | null> {
  const query = `*[_type == "audioPlaylist" && _id == $id][0] {
    "id": _id,
    title,
    description,
    "tracks": tracks[]-> {
      "id": _id,
      title,
      description,
      "audioUrl": audioFile.asset->url,
      duration,
      "coverImage": coverImage {
        "url": asset->url,
        "alt": alt
      }
    },
    "coverImage": coverImage {
      "url": asset->url,
      "alt": alt
    }
  }`;

  return await sanityClient.fetch(query, { id });
}
