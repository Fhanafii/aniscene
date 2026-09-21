import { Animated, Image, Linking, Pressable, Text, View } from 'react-native';
import { useEffect, useRef } from 'react';
import { styles } from '../styles';

const logo = require('../../assets/branding/aniscene-logo.svg');

export function BrandFooter({ onHome }: { onHome: () => void }) {
  const heartColor = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(heartColor, { toValue: 1, duration: 700, useNativeDriver: false }),
        Animated.timing(heartColor, { toValue: 0, duration: 700, useNativeDriver: false }),
      ]),
    ).start();
  }, [heartColor]);

  const heartInterpolated = heartColor.interpolate({
    inputRange: [0, 1],
    outputRange: ['#d93b59', '#7c88ff'],
  });

  return <View style={styles.footer}>
    <View style={styles.footerBrandBlock}>
      <Pressable accessibilityRole="link" accessibilityLabel="Go to AniScene home" onPress={onHome} hitSlop={8}><Image source={logo} style={styles.footerLogo} accessibilityLabel="AniScene" /></Pressable>
      <Text style={styles.footerTagline}>Upload an anime screenshot and find the matching scene with AniScene.</Text>
      <Text style={styles.footerText}>© 2026 AniScene</Text>
    </View>

    <Pressable
      accessibilityRole="link"
      accessibilityLabel="Open FhanaLabs website"
      onPress={() => Linking.openURL('https://fhanalabs.site')}
      hitSlop={8}
    >
      <Text style={styles.footerText}>
        Built by FhanaLabs with{' '}
        <Animated.Text style={[styles.footerHeart, { color: heartInterpolated }]}>
          ♥
        </Animated.Text>
      </Text>
    </Pressable>
  </View>;
}
