import { envConfig } from "@/configs/envConfig";
import { getSpotifyAccessToken } from '@/utils/auth/SpotifyAuth';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    try {
        const token = await getSpotifyAccessToken();
        
        const url = `${envConfig.SPOTIFY_BASE_URL}me/player/pause`;
        console.log('Request URL:', url);

        const response = await fetch(url, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });

        if (response.status === 204) {
            return NextResponse.json({ 
                message: 'Playback stopped successfully',
                success: true 
            });
        }

        if (!response.ok) {
            const errorData = await response.json();
            console.error('Spotify API Error:', response.status, errorData);
            return NextResponse.json(
                { error: errorData.error?.message || 'Spotify API error' },
                { status: response.status }
            );
        }

        return NextResponse.json({ 
            message: 'Playback stopped',
            success: true 
        });

    } catch (error: any) {
        console.error('Stop Playback API Error:', error);
        
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