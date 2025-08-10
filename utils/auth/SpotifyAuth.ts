import { envConfig } from '@/configs/envConfig';

let cachedAccessToken: string | null = null;
let tokenExpiry: number | null = null;

export async function getSpotifyAccessToken() {
  if (cachedAccessToken && tokenExpiry && Date.now() < tokenExpiry) {
    return cachedAccessToken;
  }

  const refreshToken = envConfig.SPOTIFY_REFRESH_TOKEN;
  const clientId = envConfig.SPOTIFY_CLIENT_ID;
  const clientSecret = envConfig.SPOTIFY_CLIENT_SECRET;

  if (!refreshToken || !clientId || !clientSecret) {
    throw new Error('Missing Spotify credentials');
  }

  const authHeader = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');

  const res = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      'Authorization': `Basic ${authHeader}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      grant_type: 'refresh_token',
      refresh_token: refreshToken,
    }),
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(`Failed to refresh token: ${JSON.stringify(errorData)}`);
  }

  const data = await res.json();
  
  cachedAccessToken = data.access_token;
  tokenExpiry = Date.now() + (data.expires_in - 60) * 1000;

  return cachedAccessToken;
}
