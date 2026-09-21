import React from 'react';
import { ActivityIndicator, Pressable, Text, View, type StyleProp, type ViewStyle, type TextStyle } from 'react-native';
import { colors } from '../../theme/colors';
import { styles } from '../../styles';

type ButtonProps = {
  label: string;
  onPress?: () => void;
  disabled?: boolean;
  loading?: boolean;
  variant?: 'primary' | 'secondary' | 'ghost';
  style?: StyleProp<ViewStyle>;
  labelStyle?: StyleProp<TextStyle>;
  icon?: React.ReactNode;
  accessibilityLabel?: string;
};

export function Button({ label, onPress, disabled, loading, variant = 'primary', style, labelStyle, icon, accessibilityLabel }: ButtonProps) {
  if (variant === 'primary') {
    return (
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={accessibilityLabel ?? label}
        accessibilityState={{ disabled: !!disabled, busy: !!loading }}
        disabled={disabled || loading}
        onPress={onPress}
        className="as-button"
        style={[styles.primaryButton, (disabled || loading) && styles.disabledButton, style]}
      >
        {loading ? <View className="as-spinner" /> : null}
        <Text style={[styles.primaryButtonText, labelStyle]}>{loading ? 'Searching…' : label}</Text>
        {!loading && icon ? <View style={styles.buttonIconGap}>{icon}</View> : null}
      </Pressable>
    );
  }
  const secondary = variant === 'secondary';
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel ?? label}
      disabled={disabled || loading}
      onPress={onPress}
      style={[secondary ? styles.secondaryButton : styles.ghostButton, (disabled || loading) && styles.disabledButton, style]}
    >
      <Text style={[secondary ? styles.secondaryButtonText : styles.ghostButtonText, labelStyle]}>{label}</Text>
    </Pressable>
  );
}
