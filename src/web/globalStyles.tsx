// Web-only ambient/interaction CSS (requirement §26 + §41).
// Injected once from App on web; no-op on native.
import { Platform } from 'react-native';
import { colors } from '../theme/colors';

const CSS = `
@keyframes as-float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-14px); }
}
@keyframes as-float-alt {
  0%, 100% { transform: translateY(-8px); }
  50% { transform: translateY(8px); }
}
@keyframes as-fade-up {
  from { opacity: 0; transform: translateY(14px); }
  to { opacity: 1; transform: translateY(0); }
}
@keyframes as-pulse {
  0%, 100% { opacity: 0.55; }
  50% { opacity: 1; }
}
.as-hero-glow {
  position: absolute; left: 50%; top: 46%;
  width: 860px; height: 620px; margin-left: -430px; margin-top: -310px;
  border-radius: 50%;
  background: radial-gradient(closest-side, rgba(132,137,195,0.22), rgba(132,137,195,0.07) 55%, rgba(132,137,195,0) 78%);
  pointer-events: none;
}
.as-hero-ring {
  position: absolute; left: 50%; top: 50%;
  width: 640px; height: 640px; margin-left: -320px; margin-top: -320px;
  border-radius: 50%;
  border: 1px solid rgba(132,137,195,0.18);
  pointer-events: none;
}
.as-hero-ring::after {
  content: ""; position: absolute; inset: 64px;
  border-radius: 50%; border: 1px dashed rgba(132,137,195,0.14);
}
.as-float { animation: as-float 7s ease-in-out infinite; }
.as-float-alt { animation: as-float-alt 8.5s ease-in-out infinite; }
.as-fade-up { animation: as-fade-up 0.55s ease-out both; }
.as-dropzone { transition: border-color .18s ease, background .18s ease, box-shadow .18s ease, transform .18s ease; }
.as-dropzone-active {
  border-color: ${colors.brand} !important;
  background: ${colors.periwinkleSoft} !important;
  box-shadow: 0 0 0 5px rgba(14,21,106,0.10) !important;
  transform: scale(1.012);
}
.as-hoverable { transition: transform .18s ease, box-shadow .18s ease, border-color .18s ease; }
.as-hoverable:hover { transform: translateY(-4px); box-shadow: 0 18px 40px rgba(2,14,86,0.10); border-color: ${colors.periwinkle} !important; }
.as-card { transition: transform .18s ease, box-shadow .18s ease, border-color .18s ease; }
.as-card:hover { transform: translateY(-5px); box-shadow: 0 22px 48px rgba(2,14,86,0.12); border-color: ${colors.periwinkle} !important; }
.as-card:hover .as-thumb { transform: scale(1.05); }
.as-thumb { transition: transform .35s ease; }
.as-button { transition: background .18s ease, transform .12s ease, box-shadow .18s ease; }
.as-button:hover:not(:disabled) { background: ${colors.brandDark} !important; box-shadow: 0 12px 28px rgba(14,21,106,0.28); transform: translateY(-1px); }
.as-button:active:not(:disabled) { transform: translateY(1px) scale(0.99); }
.as-link { transition: color .15s ease; cursor: pointer; }
.as-link:hover { color: ${colors.brand} !important; }
@keyframes as-grow { from { transform: scaleX(0); } to { transform: scaleX(1); } }
.as-scorebar-fill { transform-origin: left center; animation: as-grow 0.7s cubic-bezier(.22,.9,.35,1) both; }
.as-spinner {
  width: 16px; height: 16px; border-radius: 50%;
  border: 2.5px solid rgba(255,255,255,0.35); border-top-color: #fff;
  animation: as-spin 0.8s linear infinite; margin-right: 9px; flex-shrink: 0;
}
@keyframes as-spin { to { transform: rotate(360deg); } }
.as-skeleton {
  background: linear-gradient(100deg, ${colors.periwinkleMist} 40%, #F4F5FB 50%, ${colors.periwinkleMist} 60%);
  background-size: 200% 100%; animation: as-shimmer 1.3s linear infinite;
}
@keyframes as-shimmer { to { background-position: -200% 0; } }
.as-pulse-dot { animation: as-pulse 1.6s ease-in-out infinite; }
@media (prefers-reduced-motion: reduce) {
  .as-float, .as-float-alt, .as-fade-up, .as-pulse-dot, .as-spinner, .as-skeleton, .as-scorebar-fill { animation: none !important; }
}
`;

let injected = false;
export function ensureGlobalStyles() {
  if (Platform.OS !== 'web' || injected || typeof document === 'undefined') return;
  injected = true;
  const tag = document.createElement('style');
  tag.setAttribute('data-aniscene-global', '');
  tag.textContent = CSS;
  document.head.appendChild(tag);
}
