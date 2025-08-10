import { envConfig } from '@/configs/envConfig';
import { NextRequest } from 'next/server';

const clientId = envConfig.SPOTIFY_CLIENT_ID!;
const redirectUri = envConfig.SPOTIFY_REDIRECT_URI || 'http://localhost:3000/api/spotify/callback';
const scopes = [
  'user-read-currently-playing',
  'user-read-playback-state',
  'user-follow-read',
  'user-top-read',
  'user-modify-playback-state'
].join(' ');

export async function GET(req: NextRequest) {
  const authUrl = 'https://accounts.spotify.com/authorize?' + new URLSearchParams({
    client_id: clientId,
    response_type: 'code',
    redirect_uri: redirectUri,
    scope: scopes
  }).toString();

  return Response.redirect(authUrl);
}
