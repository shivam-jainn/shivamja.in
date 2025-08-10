import { envConfig } from "@/configs/envConfig";
import { getSpotifyAccessToken } from '@/utils/auth/SpotifyAuth';
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
    try {
        const token = await getSpotifyAccessToken();
        const { searchParams } = new URL(req.url);
        const limit = searchParams.get('limit');
        
        if (limit && isNaN(Number(limit))) {
            return NextResponse.json(
                { error: 'limit must be a number' },
                { status: 400 }
            );
        }

        const url = `${envConfig.SPOTIFY_BASE_URL}me/following?type=artist` + (limit ? `&limit=${limit}` : '');
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
        console.log(data)
        const numberOfFollowedArtists = data.artists.total;
        const artists = data.artists.items.map((artist: any) => ({
            name: artist.name,
            uri: artist.uri,
            href: artist.href,
            followers : artist.followers.total,
            imageUrl: artist.images[0].url,
        }));
        return NextResponse.json({
           numberOfFollowedArtists,
           artists
        });

    } catch (error: any) {
        console.error('Following API Error:', error);
        
        // Better error handling for different error types
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