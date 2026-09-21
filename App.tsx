import { Platform, ScrollView, Text, View } from 'react-native';
import { useCallback, useEffect, useState } from 'react';
import { useImageSearch } from './src/hooks/useImageSearch';
import { DecorativeCharacter } from './src/components/DecorativeCharacter';
import { ImageUploader } from './src/components/ImageUploader';
import { SearchResults } from './src/components/SearchResults';
import { LandingPage } from './src/components/LandingPage';
import { styles } from './src/styles';

export default function App() {
  const search = useImageSearch();
  const [screen, setScreen] = useState<'landing' | 'search'>(() => Platform.OS === 'web' && window.location.pathname === '/search' ? 'search' : 'landing');
  const startSearch = useCallback((file: File) => { search.selectImage(file); if (Platform.OS === 'web') window.history.pushState({}, '', '/search'); setScreen('search'); }, [search.selectImage]);
  useEffect(() => { if (Platform.OS !== 'web') return; const onPopState = () => setScreen(window.location.pathname === '/search' ? 'search' : 'landing'); window.addEventListener('popstate', onPopState); return () => window.removeEventListener('popstate', onPopState); }, []);
  if (screen === 'landing') return <ScrollView contentContainerStyle={styles.page}><LandingPage onImageSelected={startSearch} /><View style={styles.footer}><Text style={styles.footerText}>© 2026 AniScene</Text><Text style={styles.footerText}>Built by FhanaLabs</Text><Text style={styles.footerText}>Find the frame.</Text></View></ScrollView>;
  return <ScrollView contentContainerStyle={styles.page}>
    <View style={styles.hero}>
      <DecorativeCharacter side="left" />
      <View style={styles.heroContent}>
        <View style={styles.eyebrow}><View style={styles.dot} /><Text style={styles.eyebrowText}>Screenshot search for anime</Text></View>
        <Text style={styles.title}>Find the anime{ '\n' }scene.</Text>
        <Text style={styles.subtitle}>Upload a screenshot and let AniScene find the matching scene.</Text>
        <ImageUploader image={search.image} message={search.message} onSelect={search.selectImage} onClear={search.clearImage} />
        <search.SubmitButton />
        <Text style={styles.apiNote}>Powered by AniScene visual search</Text>
      </View>
      <DecorativeCharacter side="right" />
    </View>
    <SearchResults status={search.status} results={search.results} message={search.message} onTryAgain={search.clearImage} />
    <View style={styles.footer}><Text style={styles.footerText}>© 2026 AniScene</Text><Text style={styles.footerText}>Built by FhanaLabs</Text><Text style={styles.footerText}>Find the frame.</Text></View>
  </ScrollView>;
}
