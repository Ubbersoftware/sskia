// Secondary screens: Lounge, Concierge, Insights, Account, Bookings
function GenericHeader({ eyebrow, title, italicTail, onBack, onHome }) {
  return (
    <div style={{
      background: TOKENS.navyDeep, color: TOKENS.ivory,
      padding:'56px 20px 26px',
      backgroundImage:`radial-gradient(ellipse at top right, rgba(201,165,92,0.12) 0%, transparent 55%)`,
    }}>
      <div style={{display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:16}}>
        <button onClick={onBack} style={{background:'none', border:'none', color:TOKENS.ivory, display:'flex', alignItems:'center', gap:6, cursor:'pointer', padding:'4px 8px', marginLeft:-8, fontFamily:TOKENS.sans, fontSize:13}}>
          {Icon.chevronL(TOKENS.ivory, 16)} Back
        </button>
        <PartnerMark variant="light"/>
      </div>
      <div style={{fontSize:10, letterSpacing:2, color:TOKENS.gold, textTransform:'uppercase'}}>{eyebrow}</div>
      <div style={{fontFamily:TOKENS.serif, fontSize:30, lineHeight:1.15, marginTop:6, letterSpacing:0.2}}>
        {title} {italicTail && <span style={{fontStyle:'italic', color:TOKENS.goldSoft}}>{italicTail}</span>}
      </div>
    </div>
  );
}

function LoungeScreen({ onBack, onHome }) {
  const groups = [
    { title:'Dining', items:[
      {name:'Executive Chef\'s Menu', desc:'Beef fillet, Kalahari truffle', time:'In your seat · 18 min'},
      {name:'Light Plates', desc:'Curated small plates & crudités', time:'5 min'},
      {name:'Sommelier Selection', desc:'Bordeaux, Stellenbosch reserves', time:'3 min'},
    ]},
    { title:'Rest & Refresh', items:[
      {name:'Private Shower Suite', desc:'Rain shower · dressing room', time:'Available now'},
      {name:'Quiet Cabin', desc:'90-min rest pod', time:'2 available'},
      {name:'Spa Treatment', desc:'30-min shoulder & neck', time:'Next 15:30'},
    ]},
    { title:'Workspace', items:[
      {name:'Private Meeting Booth', desc:'4 seats · video-ready', time:'Booth 3 free'},
      {name:'Focus Desk', desc:'Single desk · secure WiFi', time:'Available'},
    ]},
  ];
  return (
    <div style={{height:'100%', background:TOKENS.ivory, overflow:'auto'}}>
      <GenericHeader eyebrow="Lounge A · Level 2" title="Amenities" italicTail="& service" onBack={onBack}/>
      <div style={{padding:'22px 20px 32px'}}>
        {groups.map((g,gi) => (
          <div key={g.title} style={{marginBottom:22}}>
            <div style={{fontSize:10, letterSpacing:2, color:TOKENS.goldDim, textTransform:'uppercase', marginBottom:10, display:'flex', alignItems:'center', gap:10}}>
              {g.title}
              <div style={{flex:1, height:1, background:TOKENS.line}}/>
            </div>
            <div style={{display:'flex', flexDirection:'column', gap:8}}>
              {g.items.map(it => (
                <Card key={it.name} padding={14} style={{display:'flex', alignItems:'center', gap:12}}>
                  <ImagePlaceholder label={it.name.split(' ')[0]} height={48} tone="parchment" style={{width:48, flexShrink:0}}/>
                  <div style={{flex:1}}>
                    <div style={{fontSize:13, color:TOKENS.navy, fontFamily:TOKENS.serif, fontWeight:500}}>{it.name}</div>
                    <div style={{fontSize:11, color:TOKENS.inkMuted, marginTop:3}}>{it.desc}</div>
                  </div>
                  <div style={{fontSize:10, color:TOKENS.goldDim, fontFamily:TOKENS.mono, textAlign:'right'}}>{it.time}</div>
                </Card>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ConciergeScreen({ onBack }) {
  const services = [
    { name:'Hotel', desc:'Capital, The President, Phakalane Estate', detail:'12 partners' },
    { name:'Chauffeured Transfer', desc:'Private car to CBD or Phakalane', detail:'From 8 min' },
    { name:'Translator', desc:'Setswana, French, Mandarin, Portuguese', detail:'On call' },
    { name:'Helicopter Charter', desc:'Okavango · Chobe · mine sites', detail:'Scheduled' },
    { name:'Gift & Flora', desc:'Arrivals bouquet, curated welcome', detail:'Same hour' },
  ];
  return (
    <div style={{height:'100%', background:TOKENS.ivory, overflow:'auto'}}>
      <GenericHeader eyebrow="Concierge" title="At your" italicTail="service" onBack={onBack}/>
      <div style={{padding:'22px 20px 32px'}}>
        <Card padding={16} style={{background:TOKENS.navy, color:TOKENS.ivory, border:'none', marginBottom:18}}>
          <div style={{display:'flex', gap:12, alignItems:'center'}}>
            <Avatar name="Mpho Tau" size={40} tone="gold"/>
            <div style={{flex:1}}>
              <div style={{fontSize:10, letterSpacing:1.5, color:TOKENS.goldSoft, textTransform:'uppercase'}}>Your concierge</div>
              <div style={{fontFamily:TOKENS.serif, fontSize:15, marginTop:2}}>Mpho Tau</div>
            </div>
            <Button variant="goldOutline" size="sm" style={{boxShadow:`inset 0 0 0 1px ${TOKENS.gold}`}}>Chat</Button>
          </div>
        </Card>
        <div style={{display:'flex', flexDirection:'column', gap:8}}>
          {services.map(s => (
            <Card key={s.name} padding={14} style={{display:'flex', alignItems:'center', gap:12}}>
              <div style={{flex:1}}>
                <div style={{fontSize:13, color:TOKENS.navy, fontFamily:TOKENS.serif, fontWeight:500}}>{s.name}</div>
                <div style={{fontSize:11, color:TOKENS.inkMuted, marginTop:3}}>{s.desc}</div>
              </div>
              <div style={{fontSize:10, color:TOKENS.goldDim, fontFamily:TOKENS.mono, marginRight:4}}>{s.detail}</div>
              {Icon.chevronR(TOKENS.inkMuted)}
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

function InsightsScreen({ onBack }) {
  const briefings = [
    { tag:'ESG', title:'Okavango Green Bond: performance 18 months in', meta:'12 min read · Updated today' },
    { tag:'MINING', title:'Diamond supply outlook — Jwaneng expansion impact', meta:'9 min read · Analyst call Thu' },
    { tag:'MACRO', title:'Pula positioning: BoB rate path, Q2 2026', meta:'6 min brief · PDF' },
    { tag:'TOURISM', title:'Luxury safari operators: consolidation trends', meta:'14 min read' },
  ];
  return (
    <div style={{height:'100%', background:TOKENS.ivory, overflow:'auto'}}>
      <GenericHeader eyebrow="Market briefings" title="Investor" italicTail="insights · Botswana" onBack={onBack}/>
      <div style={{padding:'22px 20px 32px'}}>
        <ImagePlaceholder label="Featured chart · Botswana GDP 2023–26" height={140} tone="navy" style={{marginBottom:18}}/>
        <div style={{display:'flex', flexDirection:'column', gap:10}}>
          {briefings.map(b => (
            <Card key={b.title} padding={16}>
              <Pill tone="gold">{b.tag}</Pill>
              <div style={{fontFamily:TOKENS.serif, fontSize:15, lineHeight:1.35, color:TOKENS.navy, marginTop:10}}>{b.title}</div>
              <div style={{fontSize:10.5, color:TOKENS.inkMuted, fontFamily:TOKENS.mono, marginTop:8, letterSpacing:0.5}}>{b.meta}</div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

function AccountScreen({ onBack }) {
  const [step, setStep] = React.useState(0);
  const steps = ['Identity', 'Profile', 'Compliance', 'Fund'];
  return (
    <div style={{height:'100%', background:TOKENS.ivory, overflow:'auto'}}>
      <GenericHeader eyebrow="Digital onboarding" title="Open an" italicTail="account" onBack={onBack}/>
      <div style={{padding:'22px 20px 32px'}}>
        <div style={{fontSize:12, color:TOKENS.inkMuted, lineHeight:1.6}}>
          Complete a full premier account in under 8 minutes. Your SSKIA arrival record pre-fills identity verification.
        </div>
        <div style={{marginTop:18, display:'flex', gap:6}}>
          {steps.map((s,i) => (
            <div key={s} style={{flex:1}}>
              <div style={{height:3, borderRadius:3, background: i<=step ? TOKENS.gold : TOKENS.line}}/>
              <div style={{fontSize:10, color: i<=step ? TOKENS.navy : TOKENS.inkMuted, marginTop:6, letterSpacing:0.5}}>{s}</div>
            </div>
          ))}
        </div>

        <Card padding={18} style={{marginTop:22}}>
          <div style={{fontSize:10, letterSpacing:2, color:TOKENS.goldDim, textTransform:'uppercase'}}>Step {step+1}</div>
          <div style={{fontFamily:TOKENS.serif, fontSize:20, color:TOKENS.navy, marginTop:6}}>{
            ['Verify your identity','Tell us about you','Compliance & source of funds','Initial funding'][step]
          }</div>
          <div style={{fontSize:12, color:TOKENS.inkMuted, marginTop:8, lineHeight:1.5}}>{
            ['Your passport scan from arrivals is on file. One tap to verify.',
             'Residency, tax number, employment. 90 seconds.',
             'Declare source of funds and answer 4 KYC questions.',
             'Transfer starting deposit or link an external account.'][step]
          }</div>
          <div style={{marginTop:16, height:70, borderRadius:10, background:TOKENS.parchment, border:`1px dashed ${TOKENS.lineGold}`, display:'flex', alignItems:'center', justifyContent:'center', fontFamily:TOKENS.mono, fontSize:10, letterSpacing:1, color:TOKENS.goldDim}}>
            {['PASSPORT · VERIFIED','PROFILE FORM','KYC QUESTIONS','FUNDING'][step]}
          </div>
          <div style={{marginTop:16, display:'flex', gap:8}}>
            {step>0 && <Button variant="outline" onClick={()=>setStep(s=>s-1)}>Back</Button>}
            <Button variant="primary" style={{flex:1}} onClick={()=>setStep(s=>Math.min(3,s+1))}>
              {step===3 ? 'Complete' : 'Continue'}
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}

function BookingsScreen({ onBack, onOpenLive }) {
  return (
    <div style={{height:'100%', background:TOKENS.ivory, overflow:'auto'}}>
      <GenericHeader eyebrow="My bookings" title="Upcoming &" italicTail="history" onBack={onBack}/>
      <div style={{padding:'22px 20px 32px'}}>
        <div style={{fontSize:10, letterSpacing:2, color:TOKENS.goldDim, textTransform:'uppercase', marginBottom:10}}>Today</div>
        <Card padding={16} onClick={onOpenLive} style={{border:`1px solid ${TOKENS.gold}`, background:'rgba(201,165,92,0.05)'}}>
          <div style={{display:'flex', gap:12, alignItems:'center'}}>
            <Avatar name="Thato Molefe" size={44} tone="gold"/>
            <div style={{flex:1}}>
              <div style={{fontSize:14, color:TOKENS.navy, fontFamily:TOKENS.serif}}>Thato Molefe</div>
              <div style={{fontSize:11, color:TOKENS.inkMuted, marginTop:2}}>ESG-linked financing discussion</div>
              <div style={{fontSize:11, color:TOKENS.goldDim, fontFamily:TOKENS.mono, marginTop:6}}>Today · 15:20 · Lounge A</div>
            </div>
            <Pill tone="live"><Icon.dot c="#7FD8AE"/> Live</Pill>
          </div>
        </Card>

        <div style={{fontSize:10, letterSpacing:2, color:TOKENS.goldDim, textTransform:'uppercase', marginTop:26, marginBottom:10}}>Previous</div>
        <div style={{display:'flex', flexDirection:'column', gap:10}}>
          {[
            { rm:'Kgosi Ramotswe', topic:'Copper portfolio review', when:'Mar 12 · Airport Junction' },
            { rm:'Dikeledi Phiri', topic:'Private banking onboarding', when:'Feb 4 · Video call' },
          ].map(b => (
            <Card key={b.when} padding={14} style={{display:'flex', gap:12, alignItems:'center'}}>
              <Avatar name={b.rm} size={36} tone="navy"/>
              <div style={{flex:1}}>
                <div style={{fontSize:13, color:TOKENS.navy}}>{b.rm}</div>
                <div style={{fontSize:11, color:TOKENS.inkMuted, marginTop:2}}>{b.topic}</div>
              </div>
              <div style={{fontSize:10, color:TOKENS.inkMuted, fontFamily:TOKENS.mono}}>{b.when}</div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

window.LoungeScreen = LoungeScreen;
window.ConciergeScreen = ConciergeScreen;
window.InsightsScreen = InsightsScreen;
window.AccountScreen = AccountScreen;
window.BookingsScreen = BookingsScreen;
