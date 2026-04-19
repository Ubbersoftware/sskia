// Design tokens for SSKIA SmartLounge
const TOKENS = {
  navy: '#0B1B2B',
  navyDeep: '#071320',
  navySoft: '#1A2A3D',
  gold: '#C9A55C',
  goldSoft: '#E6C98A',
  goldDim: '#8A6F3A',
  ivory: '#F7F3EC',
  parchment: '#EEE6D6',
  line: 'rgba(11,27,43,0.12)',
  lineGold: 'rgba(201,165,92,0.35)',
  ink: '#0A0A0A',
  inkSoft: '#3D4550',
  inkMuted: '#6B7280',
  surface: '#FFFFFF',
  success: '#2F6B4F',
  serif: '"Cormorant Garamond", "Playfair Display", Georgia, serif',
  sans: '"Inter", -apple-system, system-ui, sans-serif',
  mono: '"JetBrains Mono", ui-monospace, monospace',
};
window.TOKENS = TOKENS;

// Shared tiny icons (stroke-based, minimal)
const Icon = {
  chevronR: (c = '#6B7280', s = 14) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none"><path d="M9 6l6 6-6 6" stroke={c} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
  ),
  chevronL: (c = '#6B7280', s = 14) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none"><path d="M15 6l-6 6 6 6" stroke={c} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
  ),
  calendar: (c) => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><rect x="3.5" y="5" width="17" height="15.5" rx="2" stroke={c} strokeWidth="1.4"/><path d="M3.5 9.5h17M8 3v4M16 3v4" stroke={c} strokeWidth="1.4" strokeLinecap="round"/></svg>
  ),
  clock: (c) => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" stroke={c} strokeWidth="1.4"/><path d="M12 7v5l3 2" stroke={c} strokeWidth="1.4" strokeLinecap="round"/></svg>
  ),
  video: (c) => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><rect x="2.5" y="6.5" width="13" height="11" rx="2" stroke={c} strokeWidth="1.4"/><path d="M15.5 10.5l6-3v9l-6-3v-3z" stroke={c} strokeWidth="1.4" strokeLinejoin="round"/></svg>
  ),
  lounge: (c) => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M4 14v5M20 14v5M4 14h16M4 14v-3a3 3 0 013-3h10a3 3 0 013 3v3M8 8V6a2 2 0 012-2h4a2 2 0 012 2v2" stroke={c} strokeWidth="1.4" strokeLinecap="round"/></svg>
  ),
  concierge: (c) => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M5 19h14M6 19v-3a6 6 0 0112 0v3M12 7V4M10 4h4" stroke={c} strokeWidth="1.4" strokeLinecap="round"/></svg>
  ),
  insight: (c) => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M4 19V5M4 19h16M7 15l4-5 3 3 5-7" stroke={c} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>
  ),
  account: (c) => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M3 10h18M5 6h14a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2z" stroke={c} strokeWidth="1.4"/><path d="M7 15h4" stroke={c} strokeWidth="1.4" strokeLinecap="round"/></svg>
  ),
  rm: (c) => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="8" r="3.5" stroke={c} strokeWidth="1.4"/><path d="M5 20c0-3.5 3.1-6 7-6s7 2.5 7 6" stroke={c} strokeWidth="1.4" strokeLinecap="round"/></svg>
  ),
  home: (c) => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M4 11l8-7 8 7v8a1 1 0 01-1 1h-4v-6h-6v6H5a1 1 0 01-1-1v-8z" stroke={c} strokeWidth="1.4" strokeLinejoin="round"/></svg>
  ),
  bell: (c) => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M6 9a6 6 0 1112 0v4l2 3H4l2-3V9zM10 19a2 2 0 004 0" stroke={c} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>
  ),
  check: (c, s=16) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none"><path d="M5 12l5 5 9-10" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
  ),
  plane: (c) => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M21 12l-7-1L10 4 8 5l2 7-5 1-2-1-1 1 3 3 3 3 1-1-1-2 1-5 7 2 1-2-4-4 1-1 6 1z" fill={c}/></svg>
  ),
  qr: (c, s=18) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none"><rect x="3" y="3" width="7" height="7" stroke={c} strokeWidth="1.4"/><rect x="14" y="3" width="7" height="7" stroke={c} strokeWidth="1.4"/><rect x="3" y="14" width="7" height="7" stroke={c} strokeWidth="1.4"/><rect x="6" y="6" width="1" height="1" fill={c}/><rect x="17" y="6" width="1" height="1" fill={c}/><rect x="6" y="17" width="1" height="1" fill={c}/><path d="M14 14h3v3h-3zM18 14h3M14 18v3M18 18h3v3" stroke={c} strokeWidth="1.4"/></svg>
  ),
  search: (c) => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><circle cx="11" cy="11" r="6.5" stroke={c} strokeWidth="1.4"/><path d="M16 16l4 4" stroke={c} strokeWidth="1.4" strokeLinecap="round"/></svg>
  ),
  spark: (c) => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M12 3l2.2 6.8L21 12l-6.8 2.2L12 21l-2.2-6.8L3 12l6.8-2.2L12 3z" fill={c}/></svg>
  ),
  dot: (c) => <span style={{display:'inline-block', width:5, height:5, borderRadius:5, background:c, verticalAlign:'middle'}} />,
  pin: (c) => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M12 22s7-7 7-13a7 7 0 10-14 0c0 6 7 13 7 13z" stroke={c} strokeWidth="1.4"/><circle cx="12" cy="9" r="2.5" stroke={c} strokeWidth="1.4"/></svg>
  ),
};
window.Icon = Icon;
