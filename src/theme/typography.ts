// Modern sans-serif with graceful platform fallback (requirement §27).
export const fontFamily = {
  base: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
  display: '"Plus Jakarta Sans", Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
} as const;

export const typography = {
  heroTitle: { fontSize: 62, lineHeight: 66, fontWeight: '800' as const, letterSpacing: -2.2 },
  heroSubtitle: { fontSize: 17, lineHeight: 26 },
  sectionTitle: { fontSize: 30, lineHeight: 38, fontWeight: '800' as const, letterSpacing: -0.6 },
  kicker: { fontSize: 12.5, fontWeight: '800' as const, letterSpacing: 1.6 },
  body: { fontSize: 15, lineHeight: 22 },
  caption: { fontSize: 12.5, lineHeight: 17 },
} as const;
