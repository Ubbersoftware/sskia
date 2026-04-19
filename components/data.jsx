// Data: investor personas, RMs, specializations, time slots
const PERSONAS = {
  investor: {
    id: 'investor',
    name: 'Aarav Mehta',
    title: 'Managing Partner, Horizon Capital',
    segment: 'High-Net-Worth Investor',
    flight: { no: 'QR1377', from: 'DOH', to: 'GBE', gate: 'A4', eta: '14:22 local' },
    interests: ['ESG', 'Mining', 'Private Equity'],
    portfolio: '$48M AUM',
  },
  corporate: {
    id: 'corporate',
    name: 'Lerato Dube',
    title: 'CFO, Kalahari Minerals Group',
    segment: 'Corporate Client',
    flight: { no: 'SA078', from: 'JNB', to: 'GBE', gate: 'A2', eta: '15:10 local' },
    interests: ['Treasury', 'FX Hedging', 'Trade Finance'],
    portfolio: 'Corporate banking',
  },
};

const SPECIALIZATIONS = [
  { id:'wealth', label:'Wealth & Private', desc:'Portfolios above $1M USD', icon:'◆' },
  { id:'esg',    label:'ESG & Sustainable', desc:'Green bonds, impact investing', icon:'❖' },
  { id:'mining', label:'Mining & Resources', desc:'Sector-specialist coverage', icon:'◈' },
  { id:'tourism',label:'Tourism & Hospitality', desc:'Sector financing & FX', icon:'◇' },
  { id:'corp',   label:'Corporate & Treasury', desc:'Cash management, trade finance', icon:'▣' },
  { id:'sme',    label:'SME & Growth', desc:'Expansion capital, advisory', icon:'▢' },
];

const RMS = [
  {
    id:'rm1',
    name:'Thato Molefe',
    title:'Senior Relationship Manager — Wealth & ESG',
    specs:['wealth','esg','mining'],
    portfolio:'$680M AUM',
    years: 14,
    languages:['English','Setswana','French'],
    location:'Private Banking Floor, Airport Junction',
    nextSlot:'Today · 15:20',
    bio:'Leads ESG and sustainable-finance advisory for HNW clients across Southern Africa. Former lead on the Okavango Green Bond issuance.',
    rating: 4.9,
    reviews: 87,
  },
  {
    id:'rm2',
    name:'Kgosi Ramotswe',
    title:'Director, Mining & Resources Coverage',
    specs:['mining','corp','esg'],
    portfolio:'$1.2B book',
    years: 18,
    languages:['English','Setswana','Mandarin'],
    location:'Corporate Centre, Fairgrounds',
    nextSlot:'Today · 16:00',
    bio:'18 years structuring mining finance across Botswana, Zambia and DRC. Advisory to three of the top five diamond operators.',
    rating: 4.8,
    reviews: 112,
  },
  {
    id:'rm3',
    name:'Naledi Setlhare',
    title:'Relationship Manager — Tourism & SME',
    specs:['tourism','sme','corp'],
    portfolio:'$310M book',
    years: 9,
    languages:['English','Setswana','Portuguese'],
    location:'SSKIA Airport Branch',
    nextSlot:'Today · 14:45',
    bio:'Focused on tourism operators, safari concessions and hospitality expansion financing across the Okavango delta region.',
    rating: 4.9,
    reviews: 64,
  },
  {
    id:'rm4',
    name:'Dikeledi Phiri',
    title:'Head of Private Banking — Gaborone',
    specs:['wealth','esg','corp'],
    portfolio:'$2.4B AUM',
    years: 22,
    languages:['English','Setswana','Shona'],
    location:'Private Banking Floor, Airport Junction',
    nextSlot:'Tomorrow · 09:00',
    bio:'Heads the private banking division in Botswana. Sits on the ESG investment committee.',
    rating: 5.0,
    reviews: 48,
  },
];

const MEETING_TYPES = [
  { id:'lounge', label:'In the Lounge', desc:'RM comes to you at the SmartLounge', duration:'30 min', note:'Most convenient on arrival' },
  { id:'video',  label:'Video Call',    desc:'Secure call from your lounge seat',  duration:'30 min', note:'Private booth provided' },
  { id:'branch', label:'Branch Visit',  desc:'Chauffeured to Airport Junction branch', duration:'60 min', note:'Car arranged · 12 min away' },
];

const TIME_SLOTS = [
  { time:'14:45', available:true, type:'Now' },
  { time:'15:20', available:true, type:'+30 min' },
  { time:'16:00', available:true, type:'+1 hr' },
  { time:'16:45', available:false, type:'Booked' },
  { time:'17:30', available:true, type:'Today' },
  { time:'18:15', available:true, type:'Today' },
];

const DATES = [
  { d:'18', day:'Today', dow:'Sat', active:true, avail:4 },
  { d:'19', day:'Sun',   dow:'Sun', active:false, avail:6 },
  { d:'20', day:'Mon',   dow:'Mon', active:false, avail:8 },
  { d:'21', day:'Tue',   dow:'Tue', active:false, avail:5 },
  { d:'22', day:'Wed',   dow:'Wed', active:false, avail:7 },
];

window.PERSONAS = PERSONAS;
window.SPECIALIZATIONS = SPECIALIZATIONS;
window.RMS = RMS;
window.MEETING_TYPES = MEETING_TYPES;
window.TIME_SLOTS = TIME_SLOTS;
window.DATES = DATES;
