import React from 'react';
import { Text, View } from 'react-native';
import { colors } from '../../theme/colors';
import { spacing } from '../../theme/spacing';

// Friendly, readable error panel — never raw API/stack output (requirement §22/§35).
export function ErrorMessage({ title, message }: { title?: string; message: string }) {
  return (
    <View
      accessibilityRole="alert"
      accessibilityLiveRegion="polite"
      style={{
        backgroundColor: '#FEF3F2',
        borderLeftWidth: 3,
        borderLeftColor: colors.error,
        borderRadius: spacing.radiusMd,
        padding: 14,
        marginTop: 12,
        width: '100%',
      }}
    >
      {title ? <Text style={{ color: colors.errorText, fontSize: 13.5, fontWeight: '800', marginBottom: 3 }}>{title}</Text> : null}
      <Text style={{ color: colors.errorText, fontSize: 13, lineHeight: 19 }}>{message}</Text>
    </View>
  );
}
