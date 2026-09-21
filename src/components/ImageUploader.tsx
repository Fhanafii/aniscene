import { useRef } from 'react';
import { Image, Platform, Pressable, Text, View } from 'react-native';
import { ACCEPTED_TYPES } from '../config';
import { ImageAsset } from '../types';
import { styles } from '../styles';

export function ImageUploader({ image, message, onSelect, onClear }: { image: ImageAsset | null; message: string; onSelect: (file?: File) => void; onClear: () => void }) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const openPicker = () => { if (Platform.OS === 'web') inputRef.current?.click(); };
  return <>
    <View style={[styles.uploader, image && styles.uploaderSelected]}>
      {image ? <Image source={{ uri: image.uri }} style={styles.preview} resizeMode="contain" /> : <View style={styles.uploadIcon}><Text style={styles.uploadIconText}>↑</Text></View>}
      <Text style={styles.uploadTitle}>{image ? image.name : 'Drop your screenshot here'}</Text>
      {!image && <Text style={styles.uploadHint}>or paste an image with Ctrl / Cmd + V</Text>}
      <Pressable style={styles.secondaryButton} onPress={image ? onClear : openPicker}><Text style={styles.secondaryButtonText}>{image ? 'Replace image' : 'Choose image'}</Text></Pressable>
      {Platform.OS === 'web' && <input ref={inputRef} type="file" accept={ACCEPTED_TYPES.join(',')} onChange={(event) => onSelect(event.currentTarget.files?.[0])} style={{ display: 'none' }} />}
    </View>
    {!!message && <Text style={styles.message}>{message}</Text>}
  </>;
}
