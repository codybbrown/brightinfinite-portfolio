import { NextResponse } from "next/server";
import {
  getAudioTracks,
  getAudioTrackById,
  getAudioPlaylist,
} from "../../../lib/services/audio.api";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    const type = searchParams.get("type");

    if (id) {
      if (type === "playlist") {
        const playlist = await getAudioPlaylist(id);
        if (!playlist) {
          return NextResponse.json(
            { error: "Playlist not found" },
            { status: 404 }
          );
        }
        return NextResponse.json(playlist);
      } else {
        const track = await getAudioTrackById(id);
        if (!track) {
          return NextResponse.json(
            { error: "Track not found" },
            { status: 404 }
          );
        }
        return NextResponse.json(track);
      }
    }

    const tracks = await getAudioTracks();
    return NextResponse.json(tracks);
  } catch (error) {
    console.error("Error in audio API:", error);
    return NextResponse.json(
      { error: "Failed to fetch audio data" },
      { status: 500 }
    );
  }
}
