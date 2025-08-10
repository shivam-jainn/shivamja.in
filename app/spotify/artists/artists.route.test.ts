import { describe, it, expect } from 'vitest';
import { GET } from './route'; // or default import if you change API file
import { envConfig } from '@/configs/envConfig';

const baseUrl = `https://${envConfig.HOSTNAME}/api/spotify/artists`;

describe('GET /api/spotify/artists', () => {
    it('should return 200 with valid query', async () => {
        const res = await GET(new Request(`${baseUrl}?type=artist`));
        expect(res.status).toBe(200);
        expect(res.headers.get('Content-Type')).toBe('application/json');
    });

    it('should return 400 with no query', async () => {
        const res = await GET(new Request(baseUrl));
        expect(res.status).toBe(400);
    });
});
