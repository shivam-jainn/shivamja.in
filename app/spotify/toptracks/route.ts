import { envConfig } from "@/configs/envConfig";
import { getSpotifyAccessToken } from '@/utils/auth/SpotifyAuth';
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
    try {
        const token = await getSpotifyAccessToken();
        const { searchParams } = new URL(req.url);
        const limit = searchParams.get('limit') || '10';
        const timeRange = searchParams.get('time_range') || 'medium_term';
        
        if (isNaN(Number(limit))) {
            return NextResponse.json(
                { error: 'limit must be a number' },
                { status: 400 }
            );
        }

        const url = `${envConfig.SPOTIFY_BASE_URL}me/top/tracks?limit=${limit}&time_range=${timeRange}`;
        console.log('Request URL:', url);

        const response = await fetch(url, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error('Spotify API Error:', response.status, errorData);
            return NextResponse.json(
                { error: errorData.error?.message || 'Spotify API error' },
                { status: response.status }
            );
        }

        const data = await response.json();
        console.log(data);
        
        const tracks = data.items.map((track: any) => ({
            id: track.id,
            name: track.name,
            uri: track.uri,
            artists: track.artists.map((artist: any) => ({
                name: artist.name,
                id: artist.id
            })),
            album: {
                name: track.album.name,
                imageUrl: track.album.images[0]?.url
            },
            popularity: track.popularity,
            preview_url: track.preview_url,
            duration_ms: track.duration_ms
        }));

        return NextResponse.json({
            total: data.total,
            timeRange,
            tracks
        });

    } catch (error: any) {
        console.error('Top Tracks API Error:', error);
        
        if (error.message) {
            return NextResponse.json(
                { error: error.message },
                { status: 500 }
            );
        }
        
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}