// Arrival screen: QR scan + personalized welcome
function ArrivalScreen({ persona, onContinue }) {
  const [stage, setStage] = React.useState(0); // 0: scan, 1: detecting, 2: welcome
  React.useEffect(() => {
    if (stage === 1) {
      const t = setTimeout(() => setStage(2), 1400);
      return () => clearTimeout(t);
    }
  }, [stage]);

  if (stage < 2) {
    return (
      <div style={{
        height:'100%', background: TOKENS.navyDeep, color: TOKENS.ivory,
        display:'flex', flexDirection:'column', padding:'80px 28px 40px',
        fontFamily: TOKENS.sans,
        backgroundImage: `radial-gradient(ellipse at top, ${TOKENS.navySoft} 0%, ${TOKENS.navyDeep} 60%)`,
      }}>
        <div style={{display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:40}}>
          <div style={{display:'flex', alignItems:'center', gap:8}}>
            <SskiaMark size={22}/>
            <span style={{fontFamily:TOKENS.serif, fontSize:17, letterSpacing:1.5, color:TOKENS.ivory}}>SSKIA</span>
            <span style={{fontFamily:TOKENS.sans, fontSize:10, letterSpacing:2, color:TOKENS.gold}}>SMARTLOUNGE</span>
          </div>
        </div>

        <div style={{flex:1, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', textAlign:'center'}}>
          <div style={{
            width:200, height:200, borderRadius:18,
            background: TOKENS.ivory, padding:18, position:'relative',
            boxShadow:`0 0 60px rgba(201,165,92,0.25)`,
          }}>
            <svg viewBox="0 0 100 100" width="100%" height="100%">
              {/* Stylized QR */}
              {[...Array(13)].map((_,r)=>[...Array(13)].map((_,c)=>{
                const v = ((r*c + r + c*3) % 5) > 2 || (r<3&&c<3) || (r<3&&c>9) || (r>9&&c<3);
                if (!v) return null;
                return <rect key={`${r}-${c}`} x={4+c*7} y={4+r*7} width="6" height="6" fill={TOKENS.navy}/>;
              }))}
              <rect x="4" y="4" width="20" height="20" fill="none" stroke={TOKENS.navy} strokeWidth="2"/>
              <rect x="10" y="10" width="8" height="8" fill={TOKENS.gold}/>
              <rect x="76" y="4" width="20" height="20" fill="none" stroke={TOKENS.navy} strokeWidth="2"/>
              <rect x="82" y="10" width="8" height="8" fill={TOKENS.gold}/>
              <rect x="4" y="76" width="20" height="20" fill="none" stroke={TOKENS.navy} strokeWidth="2"/>
              <rect x="10" y="82" width="8" height="8" fill={TOKENS.gold}/>
            </svg>
            {stage===1 && <div style={{
              position:'absolute', inset:18, border:`2px solid ${TOKENS.gold}`,
              animation:'scanPulse 1.4s ease-in-out infinite',
            }}/>}
          </div>

          <div style={{marginTop:36, fontFamily:TOKENS.serif, fontSize:34, lineHeight:1.15, letterSpacing:0.3}}>
            {stage===0 ? 'Welcome to Botswana' : 'Verifying your arrival…'}
          </div>
          <div style={{marginTop:14, fontSize:13, color:'rgba(247,243,236,0.65)', letterSpacing:0.3, lineHeight:1.6, maxWidth:280}}>
            {stage===0
              ? 'Scan the code at the SmartLounge entrance to unlock personalised concierge and banking services.'
              : 'Matching your itinerary and premier status…'}
          </div>
        </div>

        {stage===0 && (
          <div style={{display:'flex', flexDirection:'column', gap:12}}>
            <Button variant="gold" full onClick={()=>setStage(1)}>
              {Icon.qr(TOKENS.navy, 16)} Simulate QR scan
            </Button>
            <div style={{textAlign:'center', fontSize:11, color:'rgba(247,243,236,0.45)', letterSpacing:1.2, textTransform:'uppercase', marginTop:6}}>
              Sir Seretse Khama International · Gaborone
            </div>
          </div>
        )}
      </div>
    );
  }

  // Stage 2: personalized welcome
  return (
    <div style={{
      height:'100%', background: TOKENS.navyDeep, color: TOKENS.ivory,
      display:'flex', flexDirection:'column', padding:'70px 26px 32px',
      fontFamily: TOKENS.sans,
      backgroundImage: `radial-gradient(ellipse at top right, rgba(201,165,92,0.18) 0%, transparent 50%), radial-gradient(ellipse at bottom, ${TOKENS.navySoft} 0%, ${TOKENS.navyDeep} 60%)`,
    }}>
      <div style={{display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:28}}>
        <div style={{display:'flex', alignItems:'center', gap:8}}>
          <SskiaMark size={20}/>
          <span style={{fontFamily:TOKENS.serif, fontSize:14, letterSpacing:1.5}}>SSKIA</span>
          <span style={{fontSize:9, letterSpacing:2, color:TOKENS.gold}}>SMARTLOUNGE</span>
        </div>
        <PartnerMark variant="light"/>
      </div>

      <div style={{fontSize:11, letterSpacing:2, color:TOKENS.gold, textTransform:'uppercase'}}>Karibu · Welcome</div>
      <div style={{fontFamily:TOKENS.serif, fontSize:40, lineHeight:1.1, marginTop:8, letterSpacing:0.2}}>
        {persona.name.split(' ')[0]},<br/>
        <span style={{fontStyle:'italic', color:TOKENS.goldSoft}}>your lounge is ready.</span>
      </div>

      <div style={{marginTop:30, padding:'18px 0', borderTop:`1px solid ${TOKENS.lineGold}`, borderBottom:`1px solid ${TOKENS.lineGold}`}}>
        <div style={{display:'flex', justifyContent:'space-between', alignItems:'flex-start', gap:16}}>
          <div>
            <div style={{fontSize:10, letterSpacing:1.5, color:'rgba(247,243,236,0.5)', textTransform:'uppercase'}}>Flight</div>
            <div style={{fontFamily:TOKENS.mono, fontSize:16, marginTop:4, color:TOKENS.ivory}}>{persona.flight.no}</div>
            <div style={{fontFamily:TOKENS.mono, fontSize:11, color:TOKENS.goldSoft, marginTop:2}}>{persona.flight.from} → {persona.flight.to}</div>
          </div>
          <div>
            <div style={{fontSize:10, letterSpacing:1.5, color:'rgba(247,243,236,0.5)', textTransform:'uppercase'}}>Arrival</div>
            <div style={{fontFamily:TOKENS.mono, fontSize:16, marginTop:4}}>{persona.flight.eta}</div>
            <div style={{fontFamily:TOKENS.mono, fontSize:11, color:TOKENS.goldSoft, marginTop:2}}>Gate {persona.flight.gate}</div>
          </div>
          <div>
            <div style={{fontSize:10, letterSpacing:1.5, color:'rgba(247,243,236,0.5)', textTransform:'uppercase'}}>Status</div>
            <div style={{fontSize:13, marginTop:4, color:TOKENS.goldSoft, fontFamily:TOKENS.serif, fontStyle:'italic'}}>Premier</div>
            <div style={{fontSize:10, color:'rgba(247,243,236,0.5)', marginTop:2}}>Tier 1</div>
          </div>
        </div>
      </div>

      <div style={{marginTop:22, fontSize:13, lineHeight:1.6, color:'rgba(247,243,236,0.75)'}}>
        Based on your itinerary and portfolio profile, we've prepared a discreet <span style={{color:TOKENS.goldSoft}}>Relationship Manager introduction</span> and a selection of lounge amenities.
      </div>

      <div style={{flex:1}}/>

      <div style={{display:'flex', flexDirection:'column', gap:10, marginTop:20}}>
        <Button variant="gold" full onClick={onContinue}>Enter SmartLounge →</Button>
      </div>
    </div>
  );
}
window.ArrivalScreen = ArrivalScreen;
