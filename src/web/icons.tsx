// Small web-only SVG ornaments (sparkles, icons). Native falls back to text glyphs.
import React from 'react';
import { Platform, Text, View } from 'react-native';
import { colors } from '../theme/colors';

type IconProps = { size?: number; color?: string };

export function SparkleIcon({ size = 22, color = colors.periwinkle }: IconProps) {
  if (Platform.OS !== 'web') return <Text style={{ color, fontSize: size * 0.7 }}>✦</Text>;
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M12 1.6c.8 5.6 3.2 8 8.8 8.8-5.6.8-8 3.2-8.8 8.8-.8-5.6-3.2-8-8.8-8.8 5.6-.8 8-3.2 8.8-8.8Z" fill={color} />
    </svg>
  );
}

export function UploadCloudIcon({ size = 30, color = colors.brand }: IconProps) {
  if (Platform.OS !== 'web') return <Text style={{ color, fontSize: size * 0.75 }}>↑</Text>;
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M7 18a4.6 4.6 0 0 1-.86-9.13 6 6 0 0 1 11.6-1.2A4.8 4.8 0 0 1 17.6 18" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M12 12.5v7m0-7-2.9 2.9M12 12.5l2.9 2.9" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function ImageIcon({ size = 26, color = colors.brand }: IconProps) {
  if (Platform.OS !== 'web') return <Text style={{ color, fontSize: size * 0.7 }}>▣</Text>;
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="3.2" y="4.7" width="17.6" height="14.6" rx="2.6" stroke={color} strokeWidth="1.8" />
      <path d="m5.5 16.5 4-4.4 3 3.2 3.2-3.8 2.8 3.4" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="9" cy="9.2" r="1.4" fill={color} />
    </svg>
  );
}

export function CloseIcon({ size = 18, color = colors.textSecondary }: IconProps) {
  if (Platform.OS !== 'web') return <Text style={{ color, fontSize: size * 0.8 }}>×</Text>;
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M6 6l12 12M18 6 6 18" stroke={color} strokeWidth="2.2" strokeLinecap="round" />
    </svg>
  );
}

export function ArrowRightIcon({ size = 16, color = '#FFFFFF' }: IconProps) {
  if (Platform.OS !== 'web') return <Text style={{ color, fontSize: size * 0.8 }}>→</Text>;
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M4.5 12h14m0 0-5.5-5.5M18.5 12 13 17.5" stroke={color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// Decorative "film frame" corner marks used inside the dropzone.
export function FrameCorners({ color = colors.periwinkle }: { color?: string }) {
  if (Platform.OS !== 'web') return <View />;
  const corner = (transform: string) => (
    <path d="M2 14V6a4 4 0 0 1 4-4h8" stroke={color} strokeWidth="2.4" strokeLinecap="round" fill="none" transform={transform} />
  );
  return (
    <svg width="34" height="34" viewBox="0 0 28 28" aria-hidden="true">
      {corner('')}
      {corner('rotate(90 14 14)')}
      {corner('rotate(180 14 14)')}
      {corner('rotate(270 14 14)')}
    </svg>
  );
}
