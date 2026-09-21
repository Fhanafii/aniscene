import { Image, Text, View } from 'react-native';
import { API_URL } from '../config';
import { SearchResult } from '../types';
import { styles } from '../styles';

const formatTime = (seconds: number) => `${String(Math.floor(seconds / 60)).padStart(2, '0')}:${String(Math.floor(seconds % 60)).padStart(2, '0')}`;
export function ResultCard({ result }: { result: SearchResult }) {
  const thumbnail = result.thumbnail_url.startsWith('http') ? result.thumbnail_url : `${API_URL}${result.thumbnail_url}`;
  return <View style={styles.card}><Image source={{ uri: thumbnail }} style={styles.thumbnail} /><View style={styles.cardBody}><View style={styles.cardTop}><Text style={styles.cardTitle}>{result.anime.title}</Text><Text style={styles.score}>{Math.round(result.match.final_score * 100)}%</Text></View><Text style={styles.cardMeta}>S{result.episode.season} · Episode {result.episode.episode}</Text><Text style={styles.cardTime}>{formatTime(result.scene.representative_time)} <Text style={styles.cardTimeLabel}>timestamp</Text></Text></View></View>;
}
