import { useEffect, useState } from 'react';
import { Platform, Pressable, Text } from 'react-native';
import { ACCEPTED_TYPES, MAX_FILE_SIZE } from '../config';
import { searchScenes } from '../services/searchApi';
import { ImageAsset, SearchResult, SearchStatus } from '../types';
import { styles } from '../styles';

export function useImageSearch() {
  const [image, setImage] = useState<ImageAsset | null>(null);
  const [results, setResults] = useState<SearchResult[]>([]);
  const [status, setStatus] = useState<SearchStatus>('idle');
  const [message, setMessage] = useState('');

  const selectImage = (file?: File) => {
    if (!file) return;
    if (!ACCEPTED_TYPES.includes(file.type)) return setMessage('Choose a JPG, PNG, or WEBP image.');
    if (file.size > MAX_FILE_SIZE) return setMessage('This image is too large. Please choose one under 10 MB.');
    if (image?.uri) URL.revokeObjectURL(image.uri);
    setImage({ file, name: file.name, mimeType: file.type, uri: URL.createObjectURL(file) });
    setResults([]); setStatus('idle'); setMessage('');
  };

  useEffect(() => {
    if (Platform.OS !== 'web') return;
    const onPaste = (event: ClipboardEvent) => selectImage(Array.from(event.clipboardData?.files || []).find((file) => file.type.startsWith('image/')));
    const onDrop = (event: DragEvent) => { event.preventDefault(); selectImage(event.dataTransfer?.files[0]); };
    const onDragOver = (event: DragEvent) => event.preventDefault();
    window.addEventListener('paste', onPaste); window.addEventListener('drop', onDrop); window.addEventListener('dragover', onDragOver);
    return () => { window.removeEventListener('paste', onPaste); window.removeEventListener('drop', onDrop); window.removeEventListener('dragover', onDragOver); };
  }, []);

  const clearImage = () => { if (image?.uri) URL.revokeObjectURL(image.uri); setImage(null); setResults([]); setStatus('idle'); setMessage(''); };
  const submit = async () => {
    if (!image || status === 'loading') return;
    setStatus('loading'); setMessage('');
    try {
      const nextResults = await searchScenes(image);
      setResults(nextResults); setStatus(nextResults.length ? 'success' : 'empty');
      setTimeout(() => document.getElementById('results')?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 0);
    } catch { setStatus('error'); setMessage('Something went wrong while searching. Please try again.'); }
  };

  const SubmitButton = () => <Pressable style={[styles.primaryButton, (!image || status === 'loading') && styles.disabledButton]} disabled={!image || status === 'loading'} onPress={submit}><Text style={styles.primaryButtonText}>{status === 'loading' ? 'Searching...  •' : 'Find scene  →'}</Text></Pressable>;
  return { image, results, status, message, selectImage, clearImage, SubmitButton };
}
