import { useEffect, useRef, useState } from 'react';
import { Image, Platform, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

const API_URL = process.env.EXPO_PUBLIC_API_URL || 'https://anisceneapi.fhanalabs.site';
const MAX_FILE_SIZE = 10 * 1024 * 1024;
const ACCEPTED_TYPES = ['image/jpeg', 'image/png', 'image/webp'];
const logo = require('./assets/branding/aniscene-logo.png');

type SelectedImage = { file: File; uri: string; name: string };
type SearchResult = {
  anime: { title: string };
  episode: { season: number; episode: number; title?: string | null };
  scene: { representative_time: number };
  match: { final_score: number };
  thumbnail_url: string;
};

const formatTime = (seconds: number) => `${String(Math.floor(seconds / 60)).padStart(2, '0')}:${String(Math.floor(seconds % 60)).padStart(2, '0')}`;

export default function App() {
  const [image, setImage] = useState<SelectedImage | null>(null);
  const [results, setResults] = useState<SearchResult[]>([]);
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'empty' | 'error'>('idle');
  const [message, setMessage] = useState('');
  const inputRef = useRef<HTMLInputElement | null>(null);

  const selectFile = (file?: File) => {
    if (!file) return;
    if (!ACCEPTED_TYPES.includes(file.type)) return setMessage('Choose a JPG, PNG, or WEBP image.');
    if (file.size > MAX_FILE_SIZE) return setMessage('This image is too large. Please choose one under 10 MB.');
    setMessage('');
    setResults([]);
    setStatus('idle');
    setImage({ file, name: file.name, uri: URL.createObjectURL(file) });
  };

  useEffect(() => {
    if (Platform.OS !== 'web') return;
    const onPaste = (event: ClipboardEvent) => selectFile(Array.from(event.clipboardData?.files || []).find((file) => file.type.startsWith('image/')));
    const onDrop = (event: DragEvent) => { event.preventDefault(); selectFile(event.dataTransfer?.files[0]); };
    const onDragOver = (event: DragEvent) => event.preventDefault();
    window.addEventListener('paste', onPaste);
    window.addEventListener('drop', onDrop);
    window.addEventListener('dragover', onDragOver);
    return () => { window.removeEventListener('paste', onPaste); window.removeEventListener('drop', onDrop); window.removeEventListener('dragover', onDragOver); };
  }, []);

  const chooseImage = () => inputRef.current?.click();
  const clearImage = () => { if (image) URL.revokeObjectURL(image.uri); setImage(null); setResults([]); setStatus('idle'); setMessage(''); };

  const search = async () => {
    if (!image || status === 'loading') return;
    setStatus('loading'); setMessage('');
    const body = new FormData();
    body.append('image', image.file, image.name);
    try {
      const response = await fetch(`${API_URL}/api/v1/search?limit=10`, { method: 'POST', body });
      if (!response.ok) throw new Error('search failed');
      const data = await response.json();
      setResults(data.results || []);
      setStatus(data.results?.length ? 'success' : 'empty');
      setTimeout(() => document.getElementById('results')?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 0);
    } catch { setStatus('error'); setMessage('Something went wrong while searching. Please try again.'); }
  };

  const openPicker = () => {
    if (Platform.OS !== 'web') return;
    const input = document.createElement('input');
    input.type = 'file'; input.accept = ACCEPTED_TYPES.join(',');
    input.onchange = () => selectFile(input.files?.[0]);
    input.click();
  };

  return (
    <ScrollView contentContainerStyle={styles.page}>
      <View style={styles.header}>
        <Image source={logo} style={styles.logo} accessibilityLabel="AniScene" />
        <View style={styles.links}><Text style={styles.link}>About</Text><Text style={styles.link}>FhanaLabs</Text></View>
      </View>

      <View style={styles.hero}>
        <DecorativeCharacter side="left" />
        <View style={styles.heroContent}>
          <View style={styles.eyebrow}><View style={styles.dot} /><Text style={styles.eyebrowText}>Screenshot search for anime</Text></View>
          <Text style={styles.title}>Find the anime{ '\n' }scene.</Text>
          <Text style={styles.subtitle}>Upload a screenshot and let AniScene find the matching scene.</Text>

          <View style={[styles.uploader, image && styles.uploaderSelected]}>
            {image ? <Image source={{ uri: image.uri }} style={styles.preview} resizeMode="contain" /> : <View style={styles.uploadIcon}><Text style={styles.uploadIconText}>↑</Text></View>}
            <Text style={styles.uploadTitle}>{image ? image.name : 'Drop your screenshot here'}</Text>
            {!image && <Text style={styles.uploadHint}>or paste an image with Ctrl / Cmd + V</Text>}
            <Pressable style={styles.secondaryButton} onPress={image ? clearImage : openPicker}><Text style={styles.secondaryButtonText}>{image ? 'Replace image' : 'Choose image'}</Text></Pressable>
            {Platform.OS === 'web' && <input ref={inputRef} type="file" accept={ACCEPTED_TYPES.join(',')} onChange={(event) => selectFile(event.currentTarget.files?.[0])} style={{ display: 'none' }} />}
          </View>
          {!!message && <Text style={styles.message}>{message}</Text>}
          <Pressable style={[styles.primaryButton, (!image || status === 'loading') && styles.disabledButton]} disabled={!image || status === 'loading'} onPress={search}>
            <Text style={styles.primaryButtonText}>{status === 'loading' ? 'Searching...' : 'Find scene'}{status === 'loading' ? '  •' : '  →'}</Text>
          </Pressable>
          <Text style={styles.apiNote}>Powered by AniScene visual search</Text>
        </View>
        <DecorativeCharacter side="right" />
      </View>

      {(status === 'success' || status === 'empty' || status === 'error') && <View nativeID="results" style={styles.resultsSection}>
        <View style={styles.resultsHeader}><View><Text style={styles.sectionKicker}>Search results</Text><Text style={styles.sectionTitle}>{status === 'success' ? 'Scenes that look like your screenshot.' : status === 'empty' ? 'No matching scenes found.' : 'We could not finish that search.'}</Text></View>{status === 'success' && <Text style={styles.resultCount}>{results.length} matches</Text>}</View>
        {status === 'success' ? <View style={styles.grid}>{results.map((result, index) => <ResultCard key={`${result.scene.representative_time}-${index}`} result={result} />)}</View> : <View style={styles.emptyState}><Text style={styles.emptyCopy}>{status === 'empty' ? 'Try another screenshot with a clearer frame.' : message}</Text><Pressable onPress={clearImage}><Text style={styles.tryAgain}>Try another image →</Text></Pressable></View>}
      </View>}

      <View style={styles.footer}><Text style={styles.footerText}>© 2026 AniScene</Text><Text style={styles.footerText}>Built by FhanaLabs</Text><Text style={styles.footerText}>Find the frame.</Text></View>
    </ScrollView>
  );
}

function DecorativeCharacter({ side }: { side: 'left' | 'right' }) {
  return <View pointerEvents="none" style={[styles.character, side === 'left' ? styles.characterLeft : styles.characterRight]}><Image source={logo} style={[styles.characterImage, side === 'right' && styles.characterImageRight]} resizeMode="contain" /></View>;
}

function ResultCard({ result }: { result: SearchResult }) {
  const thumbnail = result.thumbnail_url.startsWith('http') ? result.thumbnail_url : `${API_URL}${result.thumbnail_url}`;
  return <View style={styles.card}><Image source={{ uri: thumbnail }} style={styles.thumbnail} /><View style={styles.cardBody}><View style={styles.cardTop}><Text style={styles.cardTitle}>{result.anime.title}</Text><Text style={styles.score}>{Math.round(result.match.final_score * 100)}%</Text></View><Text style={styles.cardMeta}>S{result.episode.season} · Episode {result.episode.episode}</Text><Text style={styles.cardTime}>{formatTime(result.scene.representative_time)} <Text style={styles.cardTimeLabel}>timestamp</Text></Text></View></View>;
}

const styles = StyleSheet.create({
  page: { backgroundColor: '#F8F9FC', minHeight: '100vh' as any, paddingHorizontal: 32 },
  header: { width: '100%', maxWidth: 1180, height: 100, alignSelf: 'center', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  logo: { width: 156, height: 71 }, links: { flexDirection: 'row', gap: 28 }, link: { color: '#667085', fontSize: 14, fontWeight: '600' },
  hero: { width: '100%', maxWidth: 1180, minHeight: 650, alignSelf: 'center', alignItems: 'center', justifyContent: 'center', position: 'relative' },
  heroContent: { width: '100%', maxWidth: 540, alignItems: 'center', zIndex: 2 }, eyebrow: { flexDirection: 'row', gap: 8, alignItems: 'center', marginBottom: 22 }, dot: { backgroundColor: '#8489C3', width: 8, height: 8, borderRadius: 99 }, eyebrowText: { color: '#667085', fontSize: 13, fontWeight: '700', letterSpacing: 0.5 },
  title: { color: '#020E56', fontSize: 62, lineHeight: 66, fontWeight: '800', letterSpacing: -2, textAlign: 'center' }, subtitle: { color: '#667085', fontSize: 17, lineHeight: 26, textAlign: 'center', maxWidth: 410, marginTop: 18, marginBottom: 30 },
  uploader: { width: '100%', minHeight: 220, borderWidth: 1.5, borderStyle: 'dashed', borderColor: '#C9CDE4', backgroundColor: '#FFF', borderRadius: 20, alignItems: 'center', justifyContent: 'center', padding: 24, shadowColor: '#020E56', shadowOpacity: 0.06, shadowRadius: 24, shadowOffset: { width: 0, height: 12 } }, uploaderSelected: { borderStyle: 'solid', borderColor: '#8489C3', minHeight: 250 }, uploadIcon: { width: 48, height: 48, borderRadius: 16, backgroundColor: '#EFF0FA', alignItems: 'center', justifyContent: 'center', marginBottom: 12 }, uploadIconText: { color: '#0E156A', fontSize: 26, fontWeight: '700' }, uploadTitle: { color: '#111827', fontSize: 15, fontWeight: '700', maxWidth: '90%' as any, textAlign: 'center' }, uploadHint: { color: '#98A2B3', fontSize: 13, marginTop: 7 }, preview: { width: '100%', height: 126, marginBottom: 12, borderRadius: 12 }, secondaryButton: { marginTop: 15, paddingVertical: 10, paddingHorizontal: 17, borderRadius: 10, backgroundColor: '#F0F1FA' }, secondaryButtonText: { color: '#0E156A', fontSize: 13, fontWeight: '700' }, message: { color: '#B42318', fontSize: 13, marginTop: 10 }, primaryButton: { backgroundColor: '#0E156A', borderRadius: 12, minHeight: 54, width: '100%', alignItems: 'center', justifyContent: 'center', marginTop: 14 }, primaryButtonText: { color: '#FFF', fontSize: 15, fontWeight: '800' }, disabledButton: { opacity: 0.45 }, apiNote: { color: '#98A2B3', fontSize: 12, marginTop: 14 },
  character: { position: 'absolute', bottom: 8, width: 160, height: 180, overflow: 'hidden', opacity: 0.72 }, characterLeft: { left: 0 }, characterRight: { right: 0 }, characterImage: { width: 420, height: 190, position: 'absolute', left: 0, top: 0 }, characterImageRight: { left: -260 },
  resultsSection: { width: '100%', maxWidth: 1180, alignSelf: 'center', paddingVertical: 70 }, resultsHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 24 }, sectionKicker: { color: '#8489C3', fontSize: 13, fontWeight: '800', letterSpacing: 1.2, textTransform: 'uppercase' }, sectionTitle: { color: '#020E56', fontSize: 30, lineHeight: 38, fontWeight: '800', marginTop: 7 }, resultCount: { color: '#667085', fontSize: 14 }, grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 18 }, card: { backgroundColor: '#FFF', borderRadius: 16, overflow: 'hidden', borderWidth: 1, borderColor: '#E5E7EB', flexGrow: 1, flexBasis: '31%' as any, minWidth: 260, maxWidth: 380 }, thumbnail: { width: '100%', height: 190, backgroundColor: '#E9EBF5' }, cardBody: { padding: 18 }, cardTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', gap: 10 }, cardTitle: { color: '#111827', fontSize: 17, fontWeight: '800', flex: 1 }, score: { color: '#0E156A', fontSize: 14, fontWeight: '800', backgroundColor: '#EFF0FA', paddingHorizontal: 8, paddingVertical: 5, borderRadius: 7 }, cardMeta: { color: '#667085', fontSize: 13, marginTop: 8 }, cardTime: { color: '#020E56', fontSize: 16, fontWeight: '800', marginTop: 18 }, cardTimeLabel: { color: '#98A2B3', fontSize: 12, fontWeight: '500' }, emptyState: { backgroundColor: '#FFF', borderRadius: 16, padding: 28, borderWidth: 1, borderColor: '#E5E7EB' }, emptyCopy: { color: '#667085', fontSize: 15 }, tryAgain: { color: '#0E156A', fontSize: 14, fontWeight: '800', marginTop: 14 }, footer: { width: '100%', maxWidth: 1180, alignSelf: 'center', borderTopWidth: 1, borderTopColor: '#E5E7EB', paddingVertical: 24, flexDirection: 'row', justifyContent: 'space-between', gap: 18 }, footerText: { color: '#98A2B3', fontSize: 12 },
  '@media (max-width: 800px)': { page: { paddingHorizontal: 20 }, header: { height: 82 }, links: { display: 'none' }, hero: { minHeight: 610 }, title: { fontSize: 44, lineHeight: 48 }, subtitle: { fontSize: 16 }, character: { opacity: 0.22, width: 120 }, characterImage: { transform: [{ scale: 0.8 }] }, resultsSection: { paddingVertical: 48 }, resultsHeader: { alignItems: 'flex-start', flexDirection: 'column', gap: 12 }, sectionTitle: { fontSize: 25, lineHeight: 31 }, footer: { flexWrap: 'wrap' } },
  '@media (max-width: 430px)': { logo: { width: 132, height: 60 }, hero: { minHeight: 570 }, uploader: { minHeight: 205 }, title: { fontSize: 40, lineHeight: 43 }, footer: { flexDirection: 'column', gap: 8 } }
} as any);
