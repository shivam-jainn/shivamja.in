import { NextResponse } from 'next/server';
import { envConfig } from '@/configs/envConfig';

export async function GET() {
  const refreshToken = envConfig.SPOTIFY_REFRESH_TOKEN;
  const clientId = envConfig.SPOTIFY_CLIENT_ID;
  const clientSecret = envConfig.SPOTIFY_CLIENT_SECRET;

  if (!refreshToken || !clientId || !clientSecret) {
    return NextResponse.json({ error: 'Missing Spotify credentials' }, { status: 400 });
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

  const data = await res.json();
  
  if (!res.ok) {
    return NextResponse.json({ error: data }, { status: res.status });
  }

  return NextResponse.json({
    access_token: data.access_token,
    expires_in: data.expires_in,
  });
}