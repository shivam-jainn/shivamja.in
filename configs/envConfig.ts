export const envConfig = {
    HOSTNAME: process.env.HOSTNAME || 'localhost:3000',
    SPOTIFY_BASE_URL: process.env.SPOTIFY_BASE_URL || 'https://api.spotify.com/v1/',
    SPOTIFY_ACCESS_TOKEN: process.env.SPOTIFY_ACCESS_TOKEN || '',
    SPOTIFY_CLIENT_ID: process.env.SPOTIFY_CLIENT_ID || '',
    SPOTIFY_CLIENT_SECRET: process.env.SPOTIFY_CLIENT_SECRET || '',
    SPOTIFY_REDIRECT_URI: process.env.SPOTIFY_REDIRECT_URI || '',
    SPOTIFY_REFRESH_TOKEN: process.env.SPOTIFY_REFRESH_TOKEN || '',
}