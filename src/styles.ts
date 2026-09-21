import { StyleSheet } from 'react-native';
import { colors } from './theme/colors';
import { spacing } from './theme/spacing';
import { typography, fontFamily } from './theme/typography';

// Central stylesheet. All values reference the theme (requirement §45).
export const styles = StyleSheet.create({
  // ---- Layout shell ----
  page: {
    backgroundColor: colors.background,
    minHeight: '100vh' as any,
    paddingHorizontal: spacing.pagePadding,
  },
  contentRow: { width: '100%', maxWidth: spacing.contentMaxWidth, alignSelf: 'center' },

  // ---- Header ----
  header: {
    width: '100%', maxWidth: spacing.contentMaxWidth, height: 96, alignSelf: 'center',
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
  },
  logo: { width: 150, height: 68 },
  links: { flexDirection: 'row', gap: 26, alignItems: 'center' },
  link: { color: colors.textSecondary, fontSize: 14, fontWeight: '600' },
  ghostButton: {
    borderWidth: 1, borderColor: colors.periwinkleBorder, borderRadius: spacing.radiusPill,
    paddingHorizontal: 18, paddingVertical: 9, backgroundColor: colors.surface,
  },
  ghostButtonText: { color: colors.brand, fontSize: 13.5, fontWeight: '700' },

  // ---- Hero ----
  hero: {
    width: '100%', maxWidth: spacing.contentMaxWidth, minHeight: 660, alignSelf: 'center',
    alignItems: 'center', justifyContent: 'center', position: 'relative', paddingVertical: 40,
  },
  heroContent: {
    width: '100%', maxWidth: spacing.heroContentMaxWidth, alignItems: 'center', zIndex: 2,
    position: 'relative',
  },
  eyebrow: {
    flexDirection: 'row', gap: 9, alignItems: 'center', marginBottom: 24,
    backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.border,
    borderRadius: spacing.radiusPill, paddingHorizontal: 14, paddingVertical: 8,
    shadowColor: colors.brandDark, shadowOpacity: 0.05, shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
  },
  dot: { backgroundColor: colors.periwinkle, width: 8, height: 8, borderRadius: spacing.radiusPill },
  eyebrowText: { color: colors.textSecondary, fontSize: 13, fontWeight: '700', letterSpacing: 0.4 },
  title: {
    color: colors.brandDark, ...typography.heroTitle,
    fontFamily: fontFamily.display,
    textAlign: 'center',
  },
  titleAccent: { color: colors.brand },
  subtitle: {
    color: colors.textSecondary, ...typography.heroSubtitle,
    textAlign: 'center', maxWidth: 420, marginTop: 18, marginBottom: 30,
  },

  // ---- Steps strip ----
  steps: { flexDirection: 'row', alignItems: 'center', gap: 10, marginTop: 26, flexWrap: 'wrap', justifyContent: 'center' },
  stepPill: {
    flexDirection: 'row', alignItems: 'center', gap: 8, backgroundColor: colors.surface,
    borderWidth: 1, borderColor: colors.border, borderRadius: spacing.radiusPill,
    paddingHorizontal: 13, paddingVertical: 8,
  },
  stepIndex: {
    width: 20, height: 20, borderRadius: spacing.radiusPill, backgroundColor: colors.periwinkleSoft,
    color: colors.brand, fontSize: 11, fontWeight: '800', textAlign: 'center', lineHeight: 20,
    overflow: 'hidden',
  },
  stepText: { color: colors.textSecondary, fontSize: 12.5, fontWeight: '600' },
  stepArrow: { color: colors.periwinkleBorder, fontSize: 14, fontWeight: '700' },

  // ---- Search card / dropzone ----
  uploader: {
    width: '100%', minHeight: 230, borderWidth: 1.5, borderStyle: 'dashed',
    borderColor: colors.periwinkleBorder, backgroundColor: colors.surface,
    borderRadius: spacing.radiusLg, alignItems: 'center', justifyContent: 'center', padding: 26,
    shadowColor: colors.brandDark, shadowOpacity: 0.07, shadowRadius: 26,
    shadowOffset: { width: 0, height: 14 },
    elevation: 3,
  },
  uploaderSelected: { borderStyle: 'solid', borderColor: colors.periwinkle, minHeight: 252 },
  uploadIcon: {
    width: 58, height: 58, borderRadius: 18, backgroundColor: colors.periwinkleSoft,
    alignItems: 'center', justifyContent: 'center', marginBottom: 14,
  },
  uploadTitle: { color: colors.text, fontSize: 15.5, fontWeight: '700', maxWidth: '92%' as any, textAlign: 'center' },
  uploadHint: { color: colors.textMuted, fontSize: 13, marginTop: 8 },
  uploadOr: { color: colors.textMuted, fontSize: 12, fontWeight: '600', marginTop: 4, marginBottom: 2 },
  chooseButton: {
    marginTop: 16, paddingVertical: 11, paddingHorizontal: 22, borderRadius: spacing.radiusMd,
    backgroundColor: colors.brand,
    shadowColor: colors.brand, shadowOpacity: 0.3, shadowRadius: 14, shadowOffset: { width: 0, height: 6 },
    elevation: 4,
  },
  chooseButtonText: { color: colors.surface, fontSize: 13.5, fontWeight: '800' },
  secondaryButton: {
    marginTop: 15, paddingVertical: 10, paddingHorizontal: 17, borderRadius: spacing.radiusSm,
    borderWidth: 1, borderColor: colors.periwinkleBorder, backgroundColor: colors.surface,
  },
  secondaryButtonText: { color: colors.brand, fontSize: 13, fontWeight: '700' },
  preview: { width: '100%', height: 138, marginBottom: 6, borderRadius: spacing.radiusMd, backgroundColor: colors.periwinkleMist },
  previewName: { color: colors.textSecondary, fontSize: 12.5, fontWeight: '600', marginTop: 8, maxWidth: '94%' as any },
  previewActionsRow: { flexDirection: 'row', gap: 10, alignItems: 'center', marginTop: 4 },
  removeText: { color: colors.errorText, fontSize: 12.5, fontWeight: '700' },
  message: { color: colors.errorText, fontSize: 13, marginTop: 10, fontWeight: '600' },

  // ---- Primary CTA ----
  primaryButton: {
    backgroundColor: colors.brand, borderRadius: spacing.radiusMd, minHeight: 54, width: '100%',
    alignItems: 'center', justifyContent: 'center', flexDirection: 'row', marginTop: 14,
    shadowColor: colors.brand, shadowOpacity: 0.32, shadowRadius: 18, shadowOffset: { width: 0, height: 9 },
    elevation: 6,
  },
  primaryButtonText: { color: colors.surface, fontSize: 15, fontWeight: '800', letterSpacing: 0.2 },
  buttonIconGap: { width: 8 },
  disabledButton: { opacity: 0.45, shadowOpacity: 0 },
  apiNote: { color: colors.textMuted, fontSize: 12, marginTop: 14 },

  // ---- Characters ----
  character: { position: 'absolute', bottom: 26, width: 210, height: 234, zIndex: 1 },
  characterLeft: { left: -6 },
  characterRight: { right: -6 },
  characterFrame: {
    width: '100%', height: '100%', borderRadius: spacing.radiusXl,
    backgroundColor: colors.periwinkleSoft, borderWidth: 1, borderColor: 'rgba(132,137,195,0.35)',
    alignItems: 'center', justifyContent: 'center', overflow: 'hidden',
    shadowColor: colors.brandDark, shadowOpacity: 0.08, shadowRadius: 24,
    shadowOffset: { width: 0, height: 14 },
  },
  characterImage: { width: 168, height: 187 },
  characterBadge: {
    position: 'absolute', bottom: 14, flexDirection: 'row', alignItems: 'center', gap: 6,
    backgroundColor: 'rgba(255,255,255,0.9)', borderRadius: spacing.radiusPill,
    paddingHorizontal: 10, paddingVertical: 5, borderWidth: 1, borderColor: colors.border,
  },
  characterBadgeText: { color: colors.brand, fontSize: 10.5, fontWeight: '800', letterSpacing: 0.4 },

  // ---- Results ----
  resultsSection: {
    width: '100%', maxWidth: spacing.contentMaxWidth, alignSelf: 'center',
    paddingVertical: 72, borderTopWidth: 1, borderTopColor: colors.border,
  },
  resultsHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 26, gap: 16 },
  sectionKicker: { color: colors.periwinkle, ...typography.kicker, textTransform: 'uppercase' },
  sectionTitle: { color: colors.brandDark, ...typography.sectionTitle, marginTop: 7 },
  resultCount: { color: colors.textSecondary, fontSize: 14, fontWeight: '600' },
  queryRow: {
    flexDirection: 'row', alignItems: 'center', gap: 14, backgroundColor: colors.surface,
    borderWidth: 1, borderColor: colors.border, borderRadius: spacing.radiusMd,
    padding: 12, marginBottom: 26,
  },
  queryThumb: { width: 64, height: 44, borderRadius: 8, backgroundColor: colors.periwinkleMist },
  queryLabel: { color: colors.textMuted, fontSize: 11, fontWeight: '800', letterSpacing: 0.8, textTransform: 'uppercase' },
  queryName: { color: colors.text, fontSize: 13.5, fontWeight: '700', marginTop: 2, maxWidth: 420 } as any,
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 20 },
  card: {
    backgroundColor: colors.surface, borderRadius: spacing.radiusLg, overflow: 'hidden',
    borderWidth: 1, borderColor: colors.border, flexGrow: 1, flexBasis: '30%' as any,
    minWidth: 264, maxWidth: 400,
    shadowColor: colors.brandDark, shadowOpacity: 0.05, shadowRadius: 16, shadowOffset: { width: 0, height: 8 },
    elevation: 2,
  },
  thumbnailWrap: { width: '100%', height: 196, backgroundColor: colors.periwinkleMist, overflow: 'hidden', position: 'relative' },
  thumbnail: { width: '100%', height: 196, backgroundColor: colors.periwinkleMist },
  rankBadge: {
    position: 'absolute', top: 10, left: 10, backgroundColor: 'rgba(2,14,86,0.82)',
    color: colors.surface, fontSize: 11, fontWeight: '800', borderRadius: 8,
    paddingHorizontal: 9, paddingVertical: 4, overflow: 'hidden',
  },
  timeBadge: {
    position: 'absolute', bottom: 10, right: 10, backgroundColor: 'rgba(2,14,86,0.85)',
    color: colors.surface, fontSize: 12, fontWeight: '700', borderRadius: 8,
    paddingHorizontal: 9, paddingVertical: 4, overflow: 'hidden', letterSpacing: 0.4,
  },
  cardBody: { padding: 18 },
  cardTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', gap: 10 },
  cardTitle: { color: colors.text, fontSize: 16.5, fontWeight: '800', flex: 1, letterSpacing: -0.2 },
  score: {
    color: colors.brand, fontSize: 13, fontWeight: '800', backgroundColor: colors.periwinkleSoft,
    paddingHorizontal: 9, paddingVertical: 5, borderRadius: 8, overflow: 'hidden',
  },
  cardMeta: { color: colors.textSecondary, fontSize: 13, marginTop: 7 },
  scorebarTrack: {
    height: 5, borderRadius: spacing.radiusPill, backgroundColor: colors.periwinkleMist,
    marginTop: 16, overflow: 'hidden',
  },
  scorebarFill: { height: 5, borderRadius: spacing.radiusPill, backgroundColor: colors.brand },
  scoreLabel: { color: colors.textMuted, fontSize: 11.5, fontWeight: '600', marginTop: 7 },
  viewHint: { color: colors.periwinkle, fontSize: 12, fontWeight: '800', marginTop: 12 },

  // ---- Empty / error states ----
  emptyState: {
    backgroundColor: colors.surface, borderRadius: spacing.radiusLg, padding: 34,
    borderWidth: 1, borderColor: colors.border, alignItems: 'flex-start',
  },
  emptyIcon: {
    width: 52, height: 52, borderRadius: 16, backgroundColor: colors.periwinkleSoft,
    alignItems: 'center', justifyContent: 'center', marginBottom: 14,
  },
  emptyTitle: { color: colors.brandDark, fontSize: 19, fontWeight: '800' },
  emptyCopy: { color: colors.textSecondary, fontSize: 15, marginTop: 8, maxWidth: 520 },
  tryAgain: { color: colors.brand, fontSize: 14, fontWeight: '800', marginTop: 18 },

  // ---- Skeletons (loading) ----
  skeletonSection: {
    width: '100%', maxWidth: spacing.contentMaxWidth, alignSelf: 'center',
    paddingVertical: 72, borderTopWidth: 1, borderTopColor: colors.border,
  },
  skeletonCard: {
    backgroundColor: colors.surface, borderRadius: spacing.radiusLg, overflow: 'hidden',
    borderWidth: 1, borderColor: colors.border, flexGrow: 1, flexBasis: '30%' as any,
    minWidth: 264, maxWidth: 400,
  },
  skeletonThumb: { width: '100%', height: 196 },
  skeletonBody: { padding: 18 },
  skeletonLine: { height: 13, borderRadius: 7, backgroundColor: colors.periwinkleMist, marginBottom: 10 },

  // ---- Modal ----
  modalBackdrop: {
    position: 'fixed' as any, inset: 0 as any, zIndex: 999, backgroundColor: colors.overlay,
    alignItems: 'center', justifyContent: 'center', padding: 24,
  } as any,
  modalCard: {
    width: '100%', maxWidth: 640, backgroundColor: colors.surface, borderRadius: spacing.radiusXl,
    overflow: 'hidden', shadowColor: '#000', shadowOpacity: 0.35, shadowRadius: 40,
    shadowOffset: { width: 0, height: 20 },
  },
  modalImage: { width: '100%', height: 360, backgroundColor: colors.periwinkleMist },
  modalBody: { padding: 24 },
  modalClose: {
    position: 'absolute', top: 14, right: 14, width: 36, height: 36, borderRadius: spacing.radiusPill,
    backgroundColor: 'rgba(255,255,255,0.92)', alignItems: 'center', justifyContent: 'center', zIndex: 2,
  },
  modalTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', gap: 14 },
  modalTitle: { color: colors.text, fontSize: 20, fontWeight: '800', flex: 1 },
  modalMetaRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginTop: 16 },
  metaChip: {
    backgroundColor: colors.periwinkleSoft, borderRadius: spacing.radiusSm,
    paddingHorizontal: 12, paddingVertical: 8,
  },
  metaChipText: { color: colors.brand, fontSize: 13, fontWeight: '700' },

  // ---- Footer ----
  footer: {
    width: '100%', maxWidth: spacing.contentMaxWidth, alignSelf: 'center',
    borderTopWidth: 1, borderTopColor: colors.border, paddingVertical: 26,
    flexDirection: 'row', justifyContent: 'space-between', gap: 18, alignItems: 'center',
  },
  footerBrand: { color: colors.brandDark, fontSize: 13, fontWeight: '800' },
  footerText: { color: colors.textMuted, fontSize: 12 },

  '@media (max-width: 1080px)': {
    character: { width: 160, height: 190 },
    characterImage: { width: 128, height: 143 },
  },
  '@media (max-width: 800px)': {
    page: { paddingHorizontal: 20 },
    header: { height: 82 },
    links: { display: 'none' },
    hero: { minHeight: 600 },
    title: { fontSize: 44, lineHeight: 48 },
    subtitle: { fontSize: 16 },
    character: { opacity: 0.16, width: 130, height: 150, bottom: 90 },
    characterFrame: { borderWidth: 0, shadowOpacity: 0 },
    characterBadge: { display: 'none' },
    characterImage: { width: 108, height: 120 },
    steps: { display: 'none' },
    resultsSection: { paddingVertical: 52 },
    skeletonSection: { paddingVertical: 52 },
    resultsHeader: { alignItems: 'flex-start', flexDirection: 'column', gap: 12 },
    sectionTitle: { fontSize: 25, lineHeight: 31 },
    queryName: { maxWidth: 220 },
    footer: { flexWrap: 'wrap' },
  },
  '@media (max-width: 430px)': {
    logo: { width: 128, height: 58 },
    hero: { minHeight: 560, paddingVertical: 24 },
    uploader: { minHeight: 210, padding: 20 },
    title: { fontSize: 38, lineHeight: 42 },
    character: { display: 'none' },
    grid: { gap: 16 },
    modalImage: { height: 230 },
    footer: { flexDirection: 'column', gap: 8, alignItems: 'flex-start' },
  },
} as any);
