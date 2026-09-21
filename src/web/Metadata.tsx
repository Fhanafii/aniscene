import { useEffect } from 'react';
import { Platform } from 'react-native';

const title = 'AniScene — Find Anime Scenes From Screenshots';
const description = 'Upload an anime screenshot and find the matching scene with AniScene.';

export function useWebMetadata() {
  useEffect(() => {
    if (Platform.OS !== 'web' || typeof document === 'undefined') return;
    document.title = title;
    const setMeta = (name: string, content: string) => {
      let tag = document.head.querySelector(`meta[name="${name}"]`);
      if (!tag) { tag = document.createElement('meta'); tag.setAttribute('name', name); document.head.appendChild(tag); }
      tag.setAttribute('content', content);
    };
    setMeta('description', description);
    setMeta('og:title', title);
    setMeta('og:description', description);
    let icon = document.head.querySelector('link[data-aniscene-favicon]');
    if (!icon) { icon = document.createElement('link'); icon.setAttribute('rel', 'icon'); icon.setAttribute('data-aniscene-favicon', ''); document.head.appendChild(icon); }
    icon.setAttribute('href', '/assets/branding/aniscene-logo-rounded.png');
  }, []);
  return null;
}
