import { Pressable, Text, View } from 'react-native';
import { SearchResult, SearchStatus } from '../types';
import { styles } from '../styles';
import { ResultCard } from './ResultCard';

export function SearchResults({ status, results, message, onTryAgain }: { status: SearchStatus; results: SearchResult[]; message: string; onTryAgain: () => void }) {
  if (!['success', 'empty', 'error'].includes(status)) return null;
  const title = status === 'success' ? 'Scenes that look like your screenshot.' : status === 'empty' ? 'No matching scenes found.' : 'We could not finish that search.';
  return <View nativeID="results" style={styles.resultsSection}><View style={styles.resultsHeader}><View><Text style={styles.sectionKicker}>Search results</Text><Text style={styles.sectionTitle}>{title}</Text></View>{status === 'success' && <Text style={styles.resultCount}>{results.length} matches</Text>}</View>{status === 'success' ? <View style={styles.grid}>{results.map((result, index) => <ResultCard key={`${result.scene.representative_time}-${index}`} result={result} />)}</View> : <View style={styles.emptyState}><Text style={styles.emptyCopy}>{status === 'empty' ? 'Try another screenshot with a clearer frame.' : message}</Text><Pressable onPress={onTryAgain}><Text style={styles.tryAgain}>Try another image →</Text></Pressable></View>}</View>;
}
