export default function UrlParamsConstructor(url: string, params: Record<string, string>) {
    const query = new URLSearchParams(params).toString();
    return query ? `${url}?${query}` : url;
}
