// Home / service menu — "SmartLounge" main screen
function HomeScreen({ persona, onNav, onOpenRM }) {
  const services = [
    { id:'rm',       label:'Book your RM',      sub:'Relationship Manager · Priority', icon: Icon.rm,        featured:true },
    { id:'lounge',   label:'Lounge Services',   sub:'Dining · Showers · Rest',         icon: Icon.lounge },
    { id:'concierge',label:'Concierge',         sub:'Hotel · Transfers · Translator',  icon: Icon.concierge },
    { id:'insights', label:'Market Briefings',  sub:'Botswana investor insights',      icon: Icon.insight },
    { id:'account',  label:'Open an Account',   sub:'Digital onboarding · 8 minutes',  icon: Icon.account },
  ];

  return (
    <div style={{height:'100%', background: TOKENS.ivory, fontFamily:TOKENS.sans, overflow:'auto'}}>
      {/* Header banner */}
      <div style={{
        background: TOKENS.navyDeep, color:TOKENS.ivory,
        padding:'64px 24px 28px',
        backgroundImage: `radial-gradient(ellipse at top right, rgba(201,165,92,0.16) 0%, transparent 55%)`,
        position:'relative',
      }}>
        <div style={{display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:24}}>
          <div style={{display:'flex', alignItems:'center', gap:8}}>
            <SskiaMark size={20}/>
            <div>
              <div style={{fontFamily:TOKENS.serif, fontSize:13, letterSpacing:1.5, lineHeight:1}}>SSKIA</div>
              <div style={{fontSize:8, letterSpacing:2, color:TOKENS.gold, marginTop:2}}>SMARTLOUNGE</div>
            </div>
          </div>
          <div style={{display:'flex', alignItems:'center', gap:14}}>
            {Icon.bell('rgba(247,243,236,0.8)')}
            <Avatar name={persona.name} size={34}/>
          </div>
        </div>

        <div style={{fontSize:10, letterSpacing:2, color:TOKENS.gold, textTransform:'uppercase'}}>Good afternoon</div>
        <div style={{fontFamily:TOKENS.serif, fontSize:30, lineHeight:1.15, marginTop:6, letterSpacing:0.3}}>
          {persona.name.split(' ')[0]}
        </div>
        <div style={{fontSize:12, color:'rgba(247,243,236,0.6)', marginTop:6, fontStyle:'italic', fontFamily:TOKENS.serif}}>
          {persona.title}
        </div>

        {/* Arrival chip */}
        <div style={{
          marginTop:20, padding:'10px 14px',
          borderRadius:10, border:`1px solid ${TOKENS.lineGold}`,
          background:'rgba(201,165,92,0.07)',
          display:'flex', alignItems:'center', gap:12,
        }}>
          <div style={{
            width:32, height:32, borderRadius:6,
            background:'rgba(201,165,92,0.15)',
            display:'flex', alignItems:'center', justifyContent:'center',
          }}>{Icon.plane(TOKENS.goldSoft)}</div>
          <div style={{flex:1}}>
            <div style={{fontFamily:TOKENS.mono, fontSize:11, color:TOKENS.goldSoft}}>
              {persona.flight.no} · {persona.flight.from} → {persona.flight.to}
            </div>
            <div style={{fontSize:11, color:'rgba(247,243,236,0.6)', marginTop:2}}>
              Arrived {persona.flight.eta} · Lounge A, Level 2
            </div>
          </div>
          <Pill tone="live">
            <Icon.dot c="#7FD8AE"/> Premier
          </Pill>
        </div>
      </div>

      {/* Featured RM booking CTA */}
      <div style={{padding:'22px 20px 0'}}>
        <div style={{
          background:`linear-gradient(135deg, ${TOKENS.navy} 0%, ${TOKENS.navySoft} 100%)`,
          color: TOKENS.ivory, borderRadius:18, padding:22,
          position:'relative', overflow:'hidden',
          border:`1px solid ${TOKENS.lineGold}`,
          cursor:'pointer',
        }} onClick={()=>onNav('rm')}>
          <div style={{position:'absolute', top:-30, right:-30, width:140, height:140, borderRadius:140, background:'radial-gradient(circle, rgba(201,165,92,0.2) 0%, transparent 70%)'}}/>
          <Pill tone="gold" style={{background:'rgba(201,165,92,0.18)', color:TOKENS.goldSoft, border:'none'}}>
            {Icon.spark(TOKENS.gold)} Recommended for you
          </Pill>
          <div style={{fontFamily:TOKENS.serif, fontSize:26, lineHeight:1.15, marginTop:12, letterSpacing:0.2}}>
            Meet your <span style={{fontStyle:'italic', color:TOKENS.goldSoft}}>Relationship Manager</span>
          </div>
          <div style={{fontSize:12, color:'rgba(247,243,236,0.7)', marginTop:8, lineHeight:1.5}}>
            We've matched you with specialists in ESG, mining and wealth. Next available slot today at 14:45.
          </div>
          <div style={{display:'flex', alignItems:'center', gap:-8, marginTop:16, position:'relative'}}>
            <div style={{display:'flex'}}>
              {RMS.slice(0,3).map((r,i)=>(
                <div key={r.id} style={{marginLeft: i===0?0:-10, boxShadow:`0 0 0 2px ${TOKENS.navy}`, borderRadius:999}}>
                  <Avatar name={r.name} size={30} tone={i%2===0?'gold':'ivory'}/>
                </div>
              ))}
            </div>
            <div style={{flex:1, marginLeft:12, fontSize:11, color:'rgba(247,243,236,0.6)'}}>
              {RMS.length} RMs available
            </div>
            <Button variant="gold" size="sm">Book now →</Button>
          </div>
        </div>
      </div>

      {/* Service grid */}
      <div style={{padding:'26px 20px 20px'}}>
        <div style={{display:'flex', alignItems:'baseline', justifyContent:'space-between', marginBottom:14}}>
          <div style={{fontFamily:TOKENS.serif, fontSize:18, letterSpacing:0.2}}>Lounge services</div>
          <div style={{fontSize:10, letterSpacing:1.5, color:TOKENS.inkMuted, textTransform:'uppercase'}}>All available</div>
        </div>

        <div style={{display:'flex', flexDirection:'column', gap:10}}>
          {services.filter(s=>s.id!=='rm').map(s => (
            <Card key={s.id} onClick={()=>onNav(s.id)} padding={16} style={{display:'flex', alignItems:'center', gap:14}}>
              <div style={{
                width:42, height:42, borderRadius:10,
                background: TOKENS.parchment,
                display:'flex', alignItems:'center', justifyContent:'center',
                flexShrink:0,
              }}>{s.icon(TOKENS.navy)}</div>
              <div style={{flex:1}}>
                <div style={{fontSize:14, color:TOKENS.navy, fontWeight:500}}>{s.label}</div>
                <div style={{fontSize:11, color:TOKENS.inkMuted, marginTop:2}}>{s.sub}</div>
              </div>
              {Icon.chevronR(TOKENS.inkMuted)}
            </Card>
          ))}
        </div>
      </div>

      {/* Partner mark footer */}
      <div style={{padding:'16px 20px 32px', display:'flex', alignItems:'center', justifyContent:'center', gap:10, borderTop:`1px solid ${TOKENS.line}`, margin:'20px 20px 0'}}>
        <PartnerMark variant="dark"/>
      </div>
    </div>
  );
}
window.HomeScreen = HomeScreen;
