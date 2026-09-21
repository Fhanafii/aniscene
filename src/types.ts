export type ImageAsset = { uri: string; name: string; mimeType: string; file?: Blob };
export type SearchStatus = 'idle' | 'loading' | 'success' | 'empty' | 'error';
export type SearchResult = {
  anime: { title: string };
  episode: { season: number; episode: number; title?: string | null };
  scene: { representative_time: number };
  match: { final_score: number };
  thumbnail_url: string;
};
