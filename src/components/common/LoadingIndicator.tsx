import React from 'react';
import { View } from 'react-native';
import { colors } from '../../theme/colors';
import { spacing } from '../../theme/spacing';

const cardStyle = {
  flexGrow: 1, flexBasis: '30%' as any, minWidth: 264, maxWidth: 400,
  backgroundColor: colors.surface, borderRadius: spacing.radiusLg, overflow: 'hidden' as const,
  borderWidth: 1, borderColor: colors.border,
};

// Grid of shimmer placeholder cards shown while a search is running (web-only animation).
export function SkeletonGrid({ count = 6 }: { count?: number }) {
  return (
    <View accessibilityLabel="Searching for matching scenes">
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 20 }}>
        {Array.from({ length: count }).map((_, i) => (
          <View key={i} style={cardStyle}>
            <View className="as-skeleton" style={{ width: '100%', height: 196 }} />
            <View style={{ padding: 18 }}>
              <View className="as-skeleton" style={{ height: 14, width: '72%', borderRadius: 7, marginBottom: 10 }} />
              <View className="as-skeleton" style={{ height: 11, width: '48%', borderRadius: 7, marginBottom: 14 }} />
              <View className="as-skeleton" style={{ height: 5, width: '100%', borderRadius: 999 }} />
            </View>
          </View>
        ))}
      </View>
    </View>
  );
}
