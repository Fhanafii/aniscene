import { Image, View } from 'react-native';
import { styles } from '../styles';
const logo = require('../../assets/branding/aniscene-logo.png');

export function DecorativeCharacter({ side }: { side: 'left' | 'right' }) {
  return <View pointerEvents="none" style={[styles.character, side === 'left' ? styles.characterLeft : styles.characterRight]}><Image source={logo} style={[styles.characterImage, side === 'right' && styles.characterImageRight]} resizeMode="contain" /></View>;
}
