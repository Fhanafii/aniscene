import { useEffect, useRef, useState } from 'react';
import { Animated, Image, Platform, Pressable, Text, View } from 'react-native';
import { ACCEPTED_TYPES, MAX_FILE_SIZE } from '../config';
import { landingStyles } from '../landingStyles';

const logo = require('../../assets/branding/aniscene-logo.png');

export function LandingPage({ onImageSelected }: { onImageSelected: (file: File) => void }) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [dragging, setDragging] = useState(false);
  const [message, setMessage] = useState('');
  const overlay = useRef(new Animated.Value(0)).current;

  const handleFile = (file?: File) => {
    if (!file) return;
    if (!ACCEPTED_TYPES.includes(file.type)) return setMessage('Choose a JPG, PNG, or WEBP image.');
    if (file.size > MAX_FILE_SIZE) return setMessage('This image is too large. Please choose one under 10 MB.');
    setMessage('');
    onImageSelected(file);
  };

  useEffect(() => {
    if (Platform.OS !== 'web') return;
    const enter = () => setDragging(true);
    const leave = (event: DragEvent) => { if (!event.relatedTarget) setDragging(false); };
    const over = (event: DragEvent) => event.preventDefault();
    const drop = (event: DragEvent) => { event.preventDefault(); setDragging(false); const file = event.dataTransfer?.files[0]; if (file) handleFile(file); };
    window.addEventListener('dragenter', enter); window.addEventListener('dragleave', leave); window.addEventListener('dragover', over); window.addEventListener('drop', drop);
    return () => { window.removeEventListener('dragenter', enter); window.removeEventListener('dragleave', leave); window.removeEventListener('dragover', over); window.removeEventListener('drop', drop); };
  }, [onImageSelected]);

  useEffect(() => { Animated.timing(overlay, { toValue: dragging ? 1 : 0, duration: 180, useNativeDriver: true }).start(); }, [dragging, overlay]);
  const chooseImage = () => inputRef.current?.click();

  return <View style={landingStyles.landing}>
    {Platform.OS === 'web' && <input ref={inputRef} type="file" accept={ACCEPTED_TYPES.join(',')} onChange={(event) => { const file = event.currentTarget.files?.[0]; if (file) handleFile(file); }} style={{ display: 'none' }} />}
    <View style={landingStyles.landingHero}>
      <Image source={logo} style={landingStyles.landingMark} accessibilityLabel="AniScene" />
      <Text style={landingStyles.landingKicker}>A visual search tool for anime</Text>
      <Text style={landingStyles.landingTitle}>Remember the scene.{ '\n' }Find the frame.</Text>
      <Text style={landingStyles.landingCopy}>Drop a screenshot. AniScene matches it to the anime scene, episode, and timestamp you are looking for.</Text>
      <View style={landingStyles.landingActions}>
        <Pressable style={landingStyles.landingPrimary} onPress={chooseImage}><Text style={landingStyles.landingPrimaryText}>Find a scene <Text style={landingStyles.landingArrow}>→</Text></Text></Pressable>
        <Text style={landingStyles.landingHint}>JPG, PNG, or WEBP · up to 10 MB</Text>{!!message && <Text style={landingStyles.message}>{message}</Text>}
      </View>
    </View>
    <ExampleFrames />
    {Platform.OS === 'web' && <Animated.View pointerEvents={dragging ? 'auto' : 'none'} style={[landingStyles.dropOverlay, { opacity: overlay, transform: [{ scale: overlay.interpolate({ inputRange: [0, 1], outputRange: [1.02, 1] }) }] }]}><View style={landingStyles.dropOverlayCard}><View style={landingStyles.dropOverlayIcon}><Text style={landingStyles.dropOverlayIconText}>↓</Text></View><Text style={landingStyles.dropOverlayTitle}>Drop your screenshot</Text><Text style={landingStyles.dropOverlayCopy}>Release to start finding the scene.</Text></View></Animated.View>}
  </View>;
}

function ExampleFrames() {
  return <View style={landingStyles.exampleSection}>
    <View style={landingStyles.exampleHeading}><View><Text style={landingStyles.sectionKicker}>From screenshot to scene</Text><Text style={landingStyles.exampleTitle}>A clearer way to place the moment.</Text></View><Text style={landingStyles.exampleNote}>Example result layout</Text></View>
    <View style={landingStyles.exampleGrid}>{['A frame worth remembering', 'The quiet in-between', 'One more clue'].map((label, index) => <View key={label} style={landingStyles.exampleCard}><View style={[landingStyles.exampleArt, index === 0 ? landingStyles.exampleArt0 : index === 1 ? landingStyles.exampleArt1 : landingStyles.exampleArt2]}><View style={landingStyles.exampleSun} /><View style={landingStyles.exampleHorizon} /><View style={landingStyles.exampleFigure} /><Text style={landingStyles.exampleLabel}>EXAMPLE FRAME</Text></View><View style={landingStyles.exampleCardBody}><Text style={landingStyles.exampleCardTitle}>{label}</Text><Text style={landingStyles.exampleMeta}>Anime title · Episode — · Timestamp —</Text><Text style={landingStyles.exampleMatch}>Match details appear here →</Text></View></View>)}</View>
  </View>;
}
