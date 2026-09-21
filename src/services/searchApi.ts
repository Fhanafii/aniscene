import { API_URL } from '../config';
import { ImageAsset, SearchResult } from '../types';

export async function searchScenes(image: ImageAsset): Promise<SearchResult[]> {
  const body = new FormData();
  body.append('image', image.file || ({ uri: image.uri, name: image.name, type: image.mimeType } as any));
  const response = await fetch(`${API_URL}/api/v1/search?limit=10`, { method: 'POST', body });
  if (!response.ok) throw new Error('search failed');
  const data = await response.json();
  return data.results || [];
}
