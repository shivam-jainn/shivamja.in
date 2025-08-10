import { envConfig } from "@/configs/envConfig";
import { getSpotifyAccessToken } from '@/utils/auth/SpotifyAuth';
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
    try {
        const token = await getSpotifyAccessToken();
        const { searchParams } = new URL(req.url);
        const topTracksLimit = searchParams.get('top_tracks_limit') || '10';
        const followingLimit = searchParams.get('following_limit') || '50';

        const [topTracksRes, nowPlayingRes, followingRes] = await Promise.all([
            fetch(`${envConfig.SPOTIFY_BASE_URL}me/top/tracks?limit=${topTracksLimit}&time_range=medium_term`, {
                headers: { 'Authorization': `Bearer ${token}` }
            }),
            fetch(`${envConfig.SPOTIFY_BASE_URL}me/player/currently-playing`, {
                headers: { 'Authorization': `Bearer ${token}` }
            }),
            fetch(`${envConfig.SPOTIFY_BASE_URL}me/following?type=artist&limit=${followingLimit}`, {
                headers: { 'Authorization': `Bearer ${token}` }
            })
        ]);

        const topTracksData = topTracksRes.ok ? await topTracksRes.json() : null;
        const nowPlayingData = nowPlayingRes.status === 204 ? null : 
            (nowPlayingRes.ok ? await nowPlayingRes.json() : null);
        const followingData = followingRes.ok ? await followingRes.json() : null;

        const response = {
            timestamp: new Date().toISOString(),
            data: {
                topTracks: topTracksData ? {
                    total: topTracksData.total,
                    tracks: topTracksData.items.map((track: any) => ({
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
                    }))
                } : { error: 'Failed to fetch top tracks' },

                nowPlaying: nowPlayingData ? {
                    isPlaying: nowPlayingData.is_playing,
                    progress_ms: nowPlayingData.progress_ms,
                    track: nowPlayingData.item ? {
                        id: nowPlayingData.item.id,
                        name: nowPlayingData.item.name,
                        uri: nowPlayingData.item.uri,
                        artists: nowPlayingData.item.artists.map((artist: any) => ({
                            name: artist.name,
                            id: artist.id
                        })),
                        album: {
                            name: nowPlayingData.item.album.name,
                            imageUrl: nowPlayingData.item.album.images[0]?.url
                        },
                        duration_ms: nowPlayingData.item.duration_ms,
                        popularity: nowPlayingData.item.popularity
                    } : null
                } : { 
                    message: 'No song currently playing',
                    isPlaying: false 
                },

                following: followingData ? {
                    numberOfFollowedArtists: followingData.artists.total,
                    artists: followingData.artists.items.map((artist: any) => ({
                        id: artist.id,
                        name: artist.name,
                        uri: artist.uri,
                        genres: artist.genres,
                        popularity: artist.popularity,
                        followers: artist.followers.total,
                        imageUrl: artist.images[0]?.url
                    }))
                } : { error: 'Failed to fetch following artists' }
            },
            urls : [
                {
                    url : "/spotify/artists",
                    description : "Get all artists"
                },
                {
                    url : "/spotify/toptracks",
                    description : "Get top tracks"
                },
                {
                    url : "/spotify/nowplaying",
                    description : "Get currently playing track"
                },
                {
                    url : "/spotify/controls/play",
                    description : "Start playing a specific track"
                },
                {
                    url : "/spotify/controls/stop",
                    description : "Stop current playback"
                }
            ]
        };

        return NextResponse.json(response, {
            headers: {
                'Content-Type': 'application/json',
            },
        });

    } catch (error: any) {
        console.error('Main Spotify API Error:', error);
        
        return NextResponse.json({ 
            error: error.message || 'Internal server error',
            timestamp: new Date().toISOString()
        }, { status: 500 });
    }
}