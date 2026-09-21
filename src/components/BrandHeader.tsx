import { Image, Text, View } from 'react-native';
import { styles } from '../styles';
const logo = require('../../assets/branding/aniscene-logo.png');

export function BrandHeader() {
  return <View style={styles.header}><Image source={logo} style={styles.logo} accessibilityLabel="AniScene" /><View style={styles.links}><Text style={styles.link}>About</Text><Text style={styles.link}>FhanaLabs</Text></View></View>;
}
