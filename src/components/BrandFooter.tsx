import { Image, Linking, Pressable, Text, View } from 'react-native';
import { styles } from '../styles';

const logo = require('../../assets/branding/aniscene-logo.svg');

export function BrandFooter() {
  return <View style={styles.footer}>
    <View style={styles.footerBrandBlock}>
      <Image source={logo} style={styles.footerLogo} accessibilityLabel="AniScene" />
      <Text style={styles.footerTagline}>Find anime scenes from screenshots</Text>
      <Text style={styles.footerText}>© 2026 AniScene</Text>
    </View>
    <Text style={styles.footerText}>Built by FhanaLabs with <Text style={styles.footerHeart}>♥</Text>{' '}<Pressable accessibilityRole="link" onPress={() => Linking.openURL('https://fhanalabs.site')}><Text style={styles.footerLink}>fhanalabs.site</Text></Pressable></Text>
  </View>;
}
