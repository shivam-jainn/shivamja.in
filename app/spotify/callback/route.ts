import { NextResponse } from 'next/server';
import { envConfig } from '@/configs/envConfig';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const code = searchParams.get('code');

  if (!code) {
    return NextResponse.json({ error: 'No code provided' }, { status: 400 });
  }

  const clientId = envConfig.SPOTIFY_CLIENT_ID;
  const clientSecret = envConfig.SPOTIFY_CLIENT_SECRET;
  const redirectUri = envConfig.SPOTIFY_REDIRECT_URI;

  const tokenRes = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      'Authorization': 'Basic ' + Buffer.from(`${clientId}:${clientSecret}`).toString('base64'),
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      grant_type: 'authorization_code',
      code,
      redirect_uri: redirectUri!,
    }).toString(),
  });

  const tokenData = await tokenRes.json();
  
  if (!tokenRes.ok) {
    return NextResponse.json({ error: tokenData }, { status: tokenRes.status });
  }

  return NextResponse.json({
    access_token: tokenData.access_token,
    refresh_token: tokenData.refresh_token,
    expires_in: tokenData.expires_in,
    message: 'Save the refresh_token in your .env file as SPOTIFY_REFRESH_TOKEN'
  });
}
