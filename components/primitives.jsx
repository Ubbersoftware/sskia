// Shared primitives: Button, Pill, Avatar, PartnerMark, Divider, etc.

function GoldDivider({ style={} }) {
  return (
    <div style={{
      display:'flex', alignItems:'center', gap:10,
      ...style,
    }}>
      <div style={{flex:1, height:1, background:'linear-gradient(to right, transparent, rgba(201,165,92,0.45), transparent)'}} />
    </div>
  );
}
window.GoldDivider = GoldDivider;

function Button({ children, variant='primary', onClick, full, size='md', style={}, disabled }) {
  const base = {
    fontFamily: TOKENS.sans,
    fontWeight: 500,
    borderRadius: 999,
    border: 'none',
    cursor: disabled ? 'not-allowed' : 'pointer',
    opacity: disabled ? 0.5 : 1,
    display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap:8,
    letterSpacing: 0.2,
    transition: 'all 0.2s ease',
    width: full ? '100%' : undefined,
    fontSize: size==='sm' ? 13 : 14,
    padding: size==='sm' ? '8px 16px' : '14px 22px',
  };
  const variants = {
    primary: { background: TOKENS.navy, color: TOKENS.ivory },
    gold:    { background: TOKENS.gold, color: TOKENS.navy },
    outline: { background:'transparent', color: TOKENS.navy, boxShadow:`inset 0 0 0 1px ${TOKENS.navy}` },
    ghost:   { background:'transparent', color: TOKENS.navy },
    goldOutline: { background:'transparent', color: TOKENS.gold, boxShadow:`inset 0 0 0 1px ${TOKENS.gold}`},
  };
  return <button onClick={onClick} disabled={disabled} style={{...base, ...variants[variant], ...style}}>{children}</button>;
}
window.Button = Button;

function Pill({ children, tone='navy', style={} }) {
  const tones = {
    navy: { background: 'rgba(11,27,43,0.06)', color: TOKENS.navy, border:`1px solid ${TOKENS.line}` },
    gold: { background: 'rgba(201,165,92,0.1)', color: TOKENS.goldDim, border:`1px solid ${TOKENS.lineGold}` },
    dark: { background: TOKENS.navy, color: TOKENS.goldSoft, border:'none' },
    live: { background:'#0D2A1C', color:'#7FD8AE', border:'1px solid rgba(127,216,174,0.25)' },
  };
  return (
    <span style={{
      display:'inline-flex', alignItems:'center', gap:6,
      fontFamily: TOKENS.sans, fontSize: 11, fontWeight: 500,
      letterSpacing: 0.8, textTransform: 'uppercase',
      padding:'4px 10px', borderRadius: 999,
      ...tones[tone], ...style,
    }}>{children}</span>
  );
}
window.Pill = Pill;

function Avatar({ name, size=44, tone='navy' }) {
  const initials = name.split(' ').slice(0,2).map(n=>n[0]).join('');
  const palette = {
    navy: { bg: TOKENS.navy, fg: TOKENS.goldSoft },
    gold: { bg: TOKENS.parchment, fg: TOKENS.navy },
    ivory: { bg: TOKENS.ivory, fg: TOKENS.navy },
  };
  const p = palette[tone];
  return (
    <div style={{
      width:size, height:size, borderRadius:size,
      background: p.bg, color: p.fg,
      display:'flex', alignItems:'center', justifyContent:'center',
      fontFamily: TOKENS.serif, fontWeight: 500, fontSize: size*0.38,
      letterSpacing: 0.5, flexShrink:0,
      boxShadow: `inset 0 0 0 1px ${TOKENS.lineGold}`,
    }}>{initials}</div>
  );
}
window.Avatar = Avatar;

// SSKIA mark — a simple, original monogram inside a ring. No branded copies.
function SskiaMark({ size=28, color=TOKENS.gold }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40">
      <circle cx="20" cy="20" r="18.5" fill="none" stroke={color} strokeWidth="1"/>
      <circle cx="20" cy="20" r="14.5" fill="none" stroke={color} strokeWidth="0.5" opacity="0.5"/>
      <text x="20" y="25" textAnchor="middle" fontFamily='"Cormorant Garamond", serif' fontSize="15" fontWeight="500" fill={color} letterSpacing="1">S</text>
    </svg>
  );
}
window.SskiaMark = SskiaMark;

function PartnerMark({ variant='light' }) {
  // Shows "In partnership with" + uploaded logo as a small chip — clearly positioned as partner, not primary brand
  const c = variant==='light' ? 'rgba(247,243,236,0.55)' : 'rgba(11,27,43,0.55)';
  return (
    <div style={{display:'flex', alignItems:'center', gap:8}}>
      <span style={{
        fontFamily: TOKENS.sans, fontSize: 9, letterSpacing: 1.2,
        textTransform: 'uppercase', color: c,
      }}>Banking partner</span>
      <img src="assets/partner-logo.png" alt="Partner bank" style={{height:18, width:18, borderRadius:9}}/>
    </div>
  );
}
window.PartnerMark = PartnerMark;

// Hairline card
function Card({ children, style={}, padding=18, onClick }) {
  return (
    <div onClick={onClick} style={{
      background: TOKENS.surface,
      border: `1px solid ${TOKENS.line}`,
      borderRadius: 14,
      padding,
      cursor: onClick ? 'pointer' : 'default',
      ...style,
    }}>{children}</div>
  );
}
window.Card = Card;

// Subtly striped placeholder for imagery
function ImagePlaceholder({ label, height=120, tone='navy', style={} }) {
  const bg = tone==='navy'
    ? `repeating-linear-gradient(135deg, ${TOKENS.navy} 0px, ${TOKENS.navy} 10px, ${TOKENS.navyDeep} 10px, ${TOKENS.navyDeep} 20px)`
    : `repeating-linear-gradient(135deg, ${TOKENS.parchment} 0px, ${TOKENS.parchment} 10px, ${TOKENS.ivory} 10px, ${TOKENS.ivory} 20px)`;
  const color = tone==='navy' ? TOKENS.goldSoft : TOKENS.navy;
  return (
    <div style={{
      height, width:'100%', borderRadius:10, background: bg,
      display:'flex', alignItems:'center', justifyContent:'center',
      fontFamily: TOKENS.mono, fontSize: 10, letterSpacing: 1,
      textTransform:'uppercase', color, opacity:0.9,
      border:`1px solid ${TOKENS.lineGold}`,
      ...style,
    }}>{label}</div>
  );
}
window.ImagePlaceholder = ImagePlaceholder;
