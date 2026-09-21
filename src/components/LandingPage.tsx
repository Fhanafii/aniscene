import { useEffect, useRef, useState } from 'react';
import { Animated, Image, Platform, Pressable, Text, View } from 'react-native';
const { ChevronDown, ListChecks, SearchCheck, Upload } = require('lucide-react-native') as any;
import { ACCEPTED_TYPES, MAX_FILE_SIZE } from '../config';
import { landingStyles } from '../landingStyles';

const logo = require('../../assets/branding/aniscene-logo.png');
const exampleFrames = [
  { image: require('../../assets/example/scene01.jpg'), title: 'Episode 01', timestamp: '02:17' },
  { image: require('../../assets/example/scene02.jpg'), title: 'Episode 02', timestamp: '08:42' },
  { image: require('../../assets/example/scene03.jpg'), title: 'Episode 03', timestamp: '17:31' },
];

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
    <HowToUse />
    <FAQ />
    {Platform.OS === 'web' && <Animated.View pointerEvents={dragging ? 'auto' : 'none'} style={[landingStyles.dropOverlay, { opacity: overlay, transform: [{ scale: overlay.interpolate({ inputRange: [0, 1], outputRange: [1.02, 1] }) }] }]}><View style={landingStyles.dropOverlayCard}><View style={landingStyles.dropOverlayIcon}><Text style={landingStyles.dropOverlayIconText}>↓</Text></View><Text style={landingStyles.dropOverlayTitle}>Drop your screenshot</Text><Text style={landingStyles.dropOverlayCopy}>Release to start finding the scene.</Text></View></Animated.View>}
  </View>;
}

function ExampleFrames() {
  return <View style={landingStyles.exampleSection}>
    <View style={landingStyles.exampleHeading}><View><Text style={landingStyles.sectionKicker}>From screenshot to scene</Text><Text style={landingStyles.exampleTitle}>A clearer way to place the moment.</Text></View><Text style={landingStyles.exampleNote}>Example results</Text></View>
    <View style={landingStyles.exampleGrid}>{exampleFrames.map((frame, index) => <View key={frame.title} style={landingStyles.exampleCard}><View style={landingStyles.exampleArt}><Image source={frame.image} style={landingStyles.exampleImage} resizeMode="cover" /><Text style={landingStyles.exampleLabel}>SCENE {index + 1}</Text><Text style={landingStyles.exampleTimestamp}>{frame.timestamp}</Text></View><View style={landingStyles.exampleCardBody}><Text style={landingStyles.exampleCardTitle}>{frame.title}</Text><Text style={landingStyles.exampleMeta}>Anime title · matched scene</Text><Text style={landingStyles.exampleMatch}>Visual match preview →</Text></View></View>)}</View>
  </View>;
}

function HowToUse() {
  const steps = [
    { icon: Upload, title: 'Drop a screenshot', copy: 'Drag a frame onto AniScene or choose an image from your device.' },
    { icon: SearchCheck, title: 'Find the scene', copy: 'AniScene compares the screenshot with indexed anime scenes.' },
    { icon: ListChecks, title: 'Pick the match', copy: 'Review the episode, timestamp, and similarity of each result.' },
  ];
  return <View style={landingStyles.infoSection} nativeID="how-to-use"><View style={landingStyles.infoHeading}><Text style={landingStyles.sectionKicker}>How to use</Text><Text style={landingStyles.infoTitle}>From screenshot to answer in three moves.</Text></View><View style={landingStyles.stepsGrid}>{steps.map(({ icon: Icon, title, copy }, index) => <View key={title} style={landingStyles.stepCard}><View style={landingStyles.stepIcon}><Icon size={25} color="#0E156A" strokeWidth={2} /></View><Text style={landingStyles.stepNumber}>0{index + 1}</Text><Text style={landingStyles.stepTitle}>{title}</Text><Text style={landingStyles.stepCopy}>{copy}</Text></View>)}</View></View>;
}

function FAQ() {
  const [open, setOpen] = useState<number | null>(null);
  const questions = [
    ['What kind of screenshot works best?', 'A clear frame from an anime episode works best. Avoid heavily cropped, blurry, or obstructed screenshots when possible.'],
    ['What image formats are supported?', 'AniScene accepts JPG, PNG, and WEBP screenshots up to 10 MB in the web MVP.'],
    ['Does AniScene search videos directly?', 'No. It finds the closest indexed scene and returns the episode and timestamp for that match.'],
  ];
  return <View style={landingStyles.faqSection} nativeID="faq"><View style={landingStyles.infoHeading}><Text style={landingStyles.sectionKicker}>FAQ</Text><Text style={landingStyles.infoTitle}>A few useful answers.</Text></View><View style={landingStyles.faqList}>{questions.map(([question, answer], index) => { const isOpen = open === index; return <View key={question} style={landingStyles.faqItem}><Pressable accessibilityRole="button" accessibilityState={{ expanded: isOpen }} onPress={() => setOpen(isOpen ? null : index)} style={landingStyles.faqQuestionRow}><Text style={landingStyles.faqQuestion}>{question}</Text><ChevronDown size={20} color="#0E156A" style={isOpen ? landingStyles.faqChevronOpen : undefined} /></Pressable>{isOpen && <View style={landingStyles.faqAnswerWrap}><Text style={landingStyles.faqAnswer}>{answer}</Text></View>}</View>; })}</View></View>;
}
