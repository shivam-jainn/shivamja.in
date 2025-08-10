import { describe,it,expect } from 'vitest';
import UrlParams from './UrlParams';

const url = 'https://shivamja.in/api/spotify/artists/search';
describe('UrlParams', () => {
    it('should return a string', () => {
        const urlParams = UrlParams(url, {
            q: 'jain',
            type: 'artist'
        });
        expect(typeof urlParams).toBe('string');
    });
    it('should return the correct string', () => {
        const urlParams = UrlParams(url, {
            q: 'jain',
            type: 'artist'
        });
        expect(urlParams).toBe(`${url}?q=jain&type=artist`);
    });
    it('should return the correct string with multiple params', () => {
        const urlParams = UrlParams(url, {
            q: 'jain',
            type: 'artist',
            limit: '10'
        });
        expect(urlParams).toBe(`${url}?q=jain&type=artist&limit=10`);
    });
});
