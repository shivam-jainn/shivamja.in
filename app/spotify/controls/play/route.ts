import { envConfig } from "@/configs/envConfig";
import { getSpotifyAccessToken } from "@/utils/auth/SpotifyAuth";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const { uri } = await req.json();

        if (!uri) {
            return NextResponse.json(
                { error: "Track URI is required" },
                { status: 400 }
            );
        }

        const token = await getSpotifyAccessToken();

        const url = `${envConfig.SPOTIFY_BASE_URL}me/player/play`;
        console.log("Request URL:", url);

        const response = await fetch(url, {
            method: "PUT",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ uris: [uri] }),
        });

        if (response.status === 204) {
            return NextResponse.json({
                message: "Playback started successfully",
                success: true,
                playingUri: uri,
            });
        }

        if (!response.ok) {
            let errorMessage = "Spotify API error";
            try {
                const errorData = await response.json();
                errorMessage = errorData.error?.message || errorMessage;
            } catch {
                // No JSON body
            }
            console.error("Spotify API Error:", response.status, errorMessage);
            return NextResponse.json({ error: errorMessage }, { status: response.status });
        }

        return NextResponse.json({
            message: "Playback started",
            success: true,
            playingUri: uri,
        });
    } catch (error: any) {
        console.error("Play Track API Error:", error);
        return NextResponse.json(
            { error: error.message || "Internal server error" },
            { status: 500 }
        );
    }
}
