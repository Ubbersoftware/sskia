// RM Booking deep flow — specialization → RM list → RM detail → meeting type → date/time → confirm → live status
function RMBookingFlow({ persona, onBack, onHome, initialStep=0 }) {
  const [step, setStep] = React.useState(initialStep);
  const [spec, setSpec] = React.useState('esg');
  const [rm, setRm] = React.useState(null);
  const [meetingType, setMeetingType] = React.useState('lounge');
  const [date, setDate] = React.useState('18');
  const [time, setTime] = React.useState('15:20');
  const [purpose, setPurpose] = React.useState('ESG-linked financing discussion');

  const next = () => setStep(s => s+1);
  const prev = () => step===0 ? onBack() : setStep(s => s-1);

  return (
    <div style={{height:'100%', background:TOKENS.ivory, display:'flex', flexDirection:'column', fontFamily:TOKENS.sans}}>
      <RMHeader step={step} onBack={prev} onHome={onHome}/>
      <div style={{flex:1, overflow:'auto'}}>
        {step===0 && <Step0_Spec spec={spec} setSpec={setSpec} persona={persona} onNext={next}/>}
        {step===1 && <Step1_RMs spec={spec} onPick={(r)=>{setRm(r); next();}} />}
        {step===2 && rm && <Step2_RMDetail rm={rm} onNext={next}/>}
        {step===3 && <Step3_Type meetingType={meetingType} setMeetingType={setMeetingType} onNext={next}/>}
        {step===4 && <Step4_When date={date} setDate={setDate} time={time} setTime={setTime} purpose={purpose} setPurpose={setPurpose} onNext={next}/>}
        {step===5 && rm && <Step5_Confirm persona={persona} rm={rm} meetingType={meetingType} date={date} time={time} purpose={purpose} onConfirm={next}/>}
        {step===6 && rm && <Step6_LiveStatus rm={rm} meetingType={meetingType} time={time} onHome={onHome}/>}
      </div>
    </div>
  );
}

function RMHeader({ step, onBack, onHome }) {
  const total = 6;
  const steps = ['Focus', 'Specialist', 'Profile', 'Format', 'When', 'Confirm', 'Booked'];
  return (
    <div style={{
      background: TOKENS.navyDeep, color: TOKENS.ivory, padding:'56px 18px 14px',
    }}>
      <div style={{display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:14}}>
        <button onClick={onBack} style={{background:'none', border:'none', color:TOKENS.ivory, display:'flex', alignItems:'center', gap:6, cursor:'pointer', padding:'4px 8px', marginLeft:-8, fontFamily:TOKENS.sans, fontSize:13}}>
          {Icon.chevronL(TOKENS.ivory, 16)} Back
        </button>
        <div style={{fontFamily:TOKENS.serif, fontSize:14, letterSpacing:1.5}}>
          RM Booking
        </div>
        <button onClick={onHome} style={{background:'none', border:'none', color:'rgba(247,243,236,0.5)', cursor:'pointer', fontSize:11, letterSpacing:1.2, textTransform:'uppercase', fontFamily:TOKENS.sans}}>
          Close
        </button>
      </div>
      {/* progress segments */}
      <div style={{display:'flex', gap:4, marginTop:4}}>
        {[...Array(total)].map((_,i) => (
          <div key={i} style={{
            flex:1, height:2, borderRadius:2,
            background: i <= step ? TOKENS.gold : 'rgba(247,243,236,0.15)',
            transition:'background 0.3s',
          }}/>
        ))}
      </div>
      <div style={{marginTop:8, fontSize:10, letterSpacing:2, color:TOKENS.gold, textTransform:'uppercase'}}>
        Step {Math.min(step+1,total)} of {total} · {steps[step]}
      </div>
    </div>
  );
}

// -- Step 0: Specialization --
function Step0_Spec({ spec, setSpec, persona, onNext }) {
  return (
    <div style={{padding:'22px 20px 24px'}}>
      <div style={{fontSize:10, letterSpacing:2, color:TOKENS.goldDim, textTransform:'uppercase'}}>For {persona.name.split(' ')[0]}</div>
      <div style={{fontFamily:TOKENS.serif, fontSize:28, lineHeight:1.15, marginTop:6, color:TOKENS.navy, letterSpacing:0.2}}>
        What would you like<br/>
        <span style={{fontStyle:'italic', color:TOKENS.goldDim}}>to discuss?</span>
      </div>
      <div style={{fontSize:12, color:TOKENS.inkMuted, marginTop:10, lineHeight:1.6}}>
        Choose a focus area. We'll match you with the right specialist.
      </div>

      <div style={{marginTop:22, display:'grid', gridTemplateColumns:'1fr 1fr', gap:10}}>
        {SPECIALIZATIONS.map(s => (
          <button key={s.id}
            onClick={()=>setSpec(s.id)}
            style={{
              textAlign:'left', padding:'16px 14px',
              border: `1px solid ${spec===s.id ? TOKENS.gold : TOKENS.line}`,
              background: spec===s.id ? 'rgba(201,165,92,0.08)' : TOKENS.surface,
              borderRadius: 12, cursor:'pointer',
              fontFamily: TOKENS.sans,
              transition:'all 0.15s',
            }}>
            <div style={{fontSize:22, color:spec===s.id ? TOKENS.gold : TOKENS.goldDim, marginBottom:8}}>{s.icon}</div>
            <div style={{fontSize:13, fontWeight:500, color:TOKENS.navy}}>{s.label}</div>
            <div style={{fontSize:10.5, color:TOKENS.inkMuted, marginTop:4, lineHeight:1.4}}>{s.desc}</div>
          </button>
        ))}
      </div>

      <div style={{marginTop:26, padding:16, background:'rgba(11,27,43,0.03)', border:`1px solid ${TOKENS.line}`, borderRadius:12}}>
        <div style={{fontSize:10, letterSpacing:1.5, color:TOKENS.goldDim, textTransform:'uppercase'}}>Suggested for your profile</div>
        <div style={{display:'flex', gap:6, marginTop:8, flexWrap:'wrap'}}>
          {persona.interests.map(i => <Pill key={i} tone="gold">{i}</Pill>)}
        </div>
      </div>

      <div style={{marginTop:24}}>
        <Button variant="primary" full onClick={onNext}>Continue</Button>
      </div>
    </div>
  );
}

// -- Step 1: RM list --
function Step1_RMs({ spec, onPick }) {
  const filtered = RMS.filter(r => r.specs.includes(spec)).concat(RMS.filter(r => !r.specs.includes(spec)));
  const specLabel = SPECIALIZATIONS.find(s=>s.id===spec)?.label;
  return (
    <div style={{padding:'22px 20px 24px'}}>
      <div style={{fontSize:10, letterSpacing:2, color:TOKENS.goldDim, textTransform:'uppercase'}}>{specLabel}</div>
      <div style={{fontFamily:TOKENS.serif, fontSize:26, lineHeight:1.15, marginTop:6, color:TOKENS.navy}}>
        Specialists <span style={{fontStyle:'italic', color:TOKENS.goldDim}}>available</span>
      </div>
      <div style={{fontSize:12, color:TOKENS.inkMuted, marginTop:8}}>{filtered.length} relationship managers · sorted by match quality</div>

      <div style={{marginTop:18, display:'flex', flexDirection:'column', gap:10}}>
        {filtered.map((r, idx) => {
          const matches = r.specs.includes(spec);
          return (
            <Card key={r.id} padding={16} onClick={()=>onPick(r)} style={{border:`1px solid ${matches?TOKENS.lineGold:TOKENS.line}`}}>
              <div style={{display:'flex', gap:14, alignItems:'flex-start'}}>
                <Avatar name={r.name} size={52} tone={idx%2===0?'navy':'gold'}/>
                <div style={{flex:1, minWidth:0}}>
                  <div style={{display:'flex', alignItems:'center', justifyContent:'space-between', gap:8}}>
                    <div style={{fontSize:15, fontWeight:500, color:TOKENS.navy, fontFamily:TOKENS.serif, letterSpacing:0.2}}>{r.name}</div>
                    {matches && <Pill tone="gold">★ Best match</Pill>}
                  </div>
                  <div style={{fontSize:11.5, color:TOKENS.inkMuted, marginTop:3, lineHeight:1.4}}>{r.title}</div>
                  <div style={{display:'flex', gap:14, marginTop:10, fontSize:10.5, color:TOKENS.navy, fontFamily:TOKENS.mono}}>
                    <span>{r.portfolio}</span>
                    <span style={{color:TOKENS.line}}>|</span>
                    <span>{r.years} yrs</span>
                    <span style={{color:TOKENS.line}}>|</span>
                    <span style={{color:TOKENS.gold}}>★ {r.rating}</span>
                  </div>
                  <div style={{marginTop:10, paddingTop:10, borderTop:`1px dashed ${TOKENS.line}`, display:'flex', alignItems:'center', justifyContent:'space-between'}}>
                    <div style={{fontSize:10.5, color:TOKENS.goldDim, letterSpacing:0.8}}>
                      Next: <span style={{color:TOKENS.navy, fontFamily:TOKENS.mono}}>{r.nextSlot}</span>
                    </div>
                    {Icon.chevronR(TOKENS.goldDim)}
                  </div>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}

// -- Step 2: RM detail --
function Step2_RMDetail({ rm, onNext }) {
  return (
    <div>
      <div style={{
        background: TOKENS.navy, color: TOKENS.ivory, padding:'28px 20px 28px',
        backgroundImage:`radial-gradient(ellipse at top right, rgba(201,165,92,0.15) 0%, transparent 60%)`,
      }}>
        <div style={{display:'flex', gap:16, alignItems:'center'}}>
          <Avatar name={rm.name} size={64} tone="gold"/>
          <div style={{flex:1}}>
            <div style={{fontFamily:TOKENS.serif, fontSize:22, letterSpacing:0.2}}>{rm.name}</div>
            <div style={{fontSize:11.5, color:'rgba(247,243,236,0.65)', marginTop:4, lineHeight:1.4}}>{rm.title}</div>
          </div>
        </div>

        <div style={{marginTop:20, padding:'14px 0', borderTop:`1px solid rgba(201,165,92,0.25)`, borderBottom:`1px solid rgba(201,165,92,0.25)`, display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:8}}>
          <div>
            <div style={{fontSize:9, letterSpacing:1.5, color:'rgba(247,243,236,0.45)', textTransform:'uppercase'}}>Portfolio</div>
            <div style={{fontFamily:TOKENS.mono, fontSize:13, color:TOKENS.goldSoft, marginTop:4}}>{rm.portfolio}</div>
          </div>
          <div>
            <div style={{fontSize:9, letterSpacing:1.5, color:'rgba(247,243,236,0.45)', textTransform:'uppercase'}}>Experience</div>
            <div style={{fontFamily:TOKENS.mono, fontSize:13, color:TOKENS.goldSoft, marginTop:4}}>{rm.years} yrs</div>
          </div>
          <div>
            <div style={{fontSize:9, letterSpacing:1.5, color:'rgba(247,243,236,0.45)', textTransform:'uppercase'}}>Rating</div>
            <div style={{fontFamily:TOKENS.mono, fontSize:13, color:TOKENS.goldSoft, marginTop:4}}>★ {rm.rating} · {rm.reviews}</div>
          </div>
        </div>
      </div>

      <div style={{padding:'22px 20px 24px'}}>
        <div style={{fontSize:10, letterSpacing:2, color:TOKENS.goldDim, textTransform:'uppercase'}}>About</div>
        <div style={{fontFamily:TOKENS.serif, fontSize:16, lineHeight:1.55, marginTop:8, color:TOKENS.navy, fontStyle:'italic'}}>
          "{rm.bio}"
        </div>

        <div style={{marginTop:22, display:'flex', flexDirection:'column', gap:12}}>
          <div>
            <div style={{fontSize:10, letterSpacing:1.5, color:TOKENS.inkMuted, textTransform:'uppercase'}}>Specializations</div>
            <div style={{display:'flex', flexWrap:'wrap', gap:6, marginTop:8}}>
              {rm.specs.map(s => (
                <Pill key={s} tone="gold">{SPECIALIZATIONS.find(x=>x.id===s)?.label}</Pill>
              ))}
            </div>
          </div>
          <div>
            <div style={{fontSize:10, letterSpacing:1.5, color:TOKENS.inkMuted, textTransform:'uppercase'}}>Languages</div>
            <div style={{display:'flex', flexWrap:'wrap', gap:6, marginTop:8}}>
              {rm.languages.map(l => <Pill key={l} tone="navy">{l}</Pill>)}
            </div>
          </div>
          <div>
            <div style={{fontSize:10, letterSpacing:1.5, color:TOKENS.inkMuted, textTransform:'uppercase'}}>Based at</div>
            <div style={{fontSize:13, color:TOKENS.navy, marginTop:6, display:'flex', alignItems:'center', gap:6}}>
              {Icon.pin(TOKENS.goldDim)} {rm.location}
            </div>
          </div>
        </div>

        <div style={{marginTop:26, padding:16, background:TOKENS.parchment, borderRadius:12, display:'flex', alignItems:'center', gap:12}}>
          {Icon.spark(TOKENS.gold)}
          <div style={{flex:1, fontSize:11.5, color:TOKENS.navy, lineHeight:1.5}}>
            <b style={{fontWeight:600}}>{rm.name.split(' ')[0]}</b> is available today. Average response: under 3 minutes.
          </div>
        </div>

        <div style={{marginTop:22}}>
          <Button variant="primary" full onClick={onNext}>Book a meeting with {rm.name.split(' ')[0]} →</Button>
        </div>
      </div>
    </div>
  );
}

// -- Step 3: Meeting type --
function Step3_Type({ meetingType, setMeetingType, onNext }) {
  return (
    <div style={{padding:'22px 20px 24px'}}>
      <div style={{fontSize:10, letterSpacing:2, color:TOKENS.goldDim, textTransform:'uppercase'}}>Meeting format</div>
      <div style={{fontFamily:TOKENS.serif, fontSize:26, lineHeight:1.15, marginTop:6, color:TOKENS.navy}}>
        How would you like<br/>
        <span style={{fontStyle:'italic', color:TOKENS.goldDim}}>to meet?</span>
      </div>

      <div style={{marginTop:22, display:'flex', flexDirection:'column', gap:10}}>
        {MEETING_TYPES.map(m => {
          const active = meetingType===m.id;
          const iconFor = { lounge: Icon.lounge, video: Icon.video, branch: Icon.pin }[m.id];
          return (
            <button key={m.id} onClick={()=>setMeetingType(m.id)}
              style={{
                textAlign:'left', padding:18,
                border:`1px solid ${active?TOKENS.gold:TOKENS.line}`,
                background: active ? 'rgba(201,165,92,0.06)' : TOKENS.surface,
                borderRadius:14, cursor:'pointer',
                display:'flex', gap:14, alignItems:'flex-start',
                fontFamily:TOKENS.sans,
              }}>
              <div style={{
                width:44, height:44, borderRadius:10,
                background: active ? TOKENS.navy : TOKENS.parchment,
                display:'flex', alignItems:'center', justifyContent:'center',
                flexShrink:0,
              }}>{iconFor(active?TOKENS.gold:TOKENS.navy)}</div>
              <div style={{flex:1}}>
                <div style={{display:'flex', alignItems:'center', justifyContent:'space-between'}}>
                  <div style={{fontSize:15, fontWeight:500, color:TOKENS.navy, fontFamily:TOKENS.serif}}>{m.label}</div>
                  <div style={{fontSize:10, fontFamily:TOKENS.mono, color:TOKENS.goldDim}}>{m.duration}</div>
                </div>
                <div style={{fontSize:12, color:TOKENS.inkMuted, marginTop:5, lineHeight:1.5}}>{m.desc}</div>
                <div style={{fontSize:10.5, color:TOKENS.goldDim, marginTop:8, fontStyle:'italic', fontFamily:TOKENS.serif}}>{m.note}</div>
              </div>
              <div style={{
                width:18, height:18, borderRadius:18, border:`1.5px solid ${active?TOKENS.gold:TOKENS.line}`,
                display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0, marginTop:4,
              }}>{active && <div style={{width:8, height:8, borderRadius:8, background:TOKENS.gold}}/>}</div>
            </button>
          );
        })}
      </div>

      <div style={{marginTop:26}}>
        <Button variant="primary" full onClick={onNext}>Continue</Button>
      </div>
    </div>
  );
}

// -- Step 4: Date/time --
function Step4_When({ date, setDate, time, setTime, purpose, setPurpose, onNext }) {
  return (
    <div style={{padding:'22px 20px 24px'}}>
      <div style={{fontSize:10, letterSpacing:2, color:TOKENS.goldDim, textTransform:'uppercase'}}>Schedule</div>
      <div style={{fontFamily:TOKENS.serif, fontSize:26, lineHeight:1.15, marginTop:6, color:TOKENS.navy}}>
        Pick a <span style={{fontStyle:'italic', color:TOKENS.goldDim}}>time</span>
      </div>

      {/* date strip */}
      <div style={{marginTop:22, display:'flex', gap:8, overflowX:'auto', paddingBottom:4, marginLeft:-20, paddingLeft:20, marginRight:-20, paddingRight:20}}>
        {DATES.map(d => {
          const active = date===d.d;
          return (
            <button key={d.d} onClick={()=>setDate(d.d)}
              style={{
                flexShrink:0, width:64, padding:'12px 0',
                border:`1px solid ${active?TOKENS.gold:TOKENS.line}`,
                background: active ? TOKENS.navy : TOKENS.surface,
                color: active ? TOKENS.ivory : TOKENS.navy,
                borderRadius:12, cursor:'pointer', fontFamily:TOKENS.sans,
                textAlign:'center',
              }}>
              <div style={{fontSize:9, letterSpacing:1.5, textTransform:'uppercase', color: active?TOKENS.goldSoft:TOKENS.inkMuted}}>{d.dow}</div>
              <div style={{fontFamily:TOKENS.serif, fontSize:22, marginTop:4, letterSpacing:0.2}}>{d.d}</div>
              <div style={{fontSize:9, color: active?TOKENS.goldSoft:TOKENS.inkMuted, marginTop:3}}>{d.avail} slots</div>
            </button>
          );
        })}
      </div>

      {/* time slots */}
      <div style={{marginTop:24}}>
        <div style={{fontSize:10, letterSpacing:1.5, color:TOKENS.inkMuted, textTransform:'uppercase', marginBottom:10}}>Available today</div>
        <div style={{display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:8}}>
          {TIME_SLOTS.map(s => {
            const active = time===s.time && s.available;
            return (
              <button key={s.time}
                disabled={!s.available}
                onClick={()=>s.available && setTime(s.time)}
                style={{
                  padding:'12px 4px',
                  border:`1px solid ${active?TOKENS.gold:TOKENS.line}`,
                  background: !s.available ? 'rgba(11,27,43,0.03)' : (active?'rgba(201,165,92,0.1)':TOKENS.surface),
                  color: !s.available ? TOKENS.inkMuted : TOKENS.navy,
                  borderRadius:10, cursor: s.available?'pointer':'not-allowed',
                  fontFamily: TOKENS.sans,
                  opacity: s.available ? 1 : 0.5,
                }}>
                <div style={{fontFamily:TOKENS.mono, fontSize:14, fontWeight:500}}>{s.time}</div>
                <div style={{fontSize:9, marginTop:3, letterSpacing:0.5, color: active?TOKENS.goldDim:TOKENS.inkMuted}}>{s.type}</div>
              </button>
            );
          })}
        </div>
      </div>

      {/* purpose note */}
      <div style={{marginTop:24}}>
        <div style={{fontSize:10, letterSpacing:1.5, color:TOKENS.inkMuted, textTransform:'uppercase', marginBottom:8}}>What to discuss</div>
        <textarea
          value={purpose}
          onChange={e=>setPurpose(e.target.value)}
          rows={3}
          style={{
            width:'100%', padding:'12px 14px', borderRadius:12,
            border:`1px solid ${TOKENS.line}`, background:TOKENS.surface,
            fontFamily: TOKENS.sans, fontSize:13, color:TOKENS.navy,
            resize:'none', boxSizing:'border-box', outline:'none',
          }}/>
        <div style={{fontSize:10, color:TOKENS.inkMuted, marginTop:6, fontStyle:'italic'}}>Your RM will prepare briefing materials in advance.</div>
      </div>

      <div style={{marginTop:26}}>
        <Button variant="primary" full onClick={onNext}>Review booking</Button>
      </div>
    </div>
  );
}

// -- Step 5: Confirm --
function Step5_Confirm({ persona, rm, meetingType, date, time, purpose, onConfirm }) {
  const mt = MEETING_TYPES.find(m=>m.id===meetingType);
  const dt = DATES.find(d=>d.d===date);
  return (
    <div style={{padding:'22px 20px 24px'}}>
      <div style={{fontSize:10, letterSpacing:2, color:TOKENS.goldDim, textTransform:'uppercase'}}>Review</div>
      <div style={{fontFamily:TOKENS.serif, fontSize:26, lineHeight:1.15, marginTop:6, color:TOKENS.navy}}>
        Confirm your <span style={{fontStyle:'italic', color:TOKENS.goldDim}}>meeting</span>
      </div>

      <div style={{marginTop:22, background:TOKENS.surface, border:`1px solid ${TOKENS.lineGold}`, borderRadius:16, overflow:'hidden'}}>
        <div style={{padding:'18px 18px 14px', background:`linear-gradient(to bottom, rgba(201,165,92,0.06), transparent)`}}>
          <div style={{display:'flex', gap:12, alignItems:'center'}}>
            <Avatar name={rm.name} size={46} tone="gold"/>
            <div style={{flex:1}}>
              <div style={{fontFamily:TOKENS.serif, fontSize:16, color:TOKENS.navy}}>{rm.name}</div>
              <div style={{fontSize:11, color:TOKENS.inkMuted, marginTop:2}}>{rm.title}</div>
            </div>
          </div>
        </div>
        <div style={{padding:'6px 18px 18px'}}>
          {[
            ['When', `${dt.day} · ${time}`, Icon.calendar],
            ['Format', mt.label, { lounge:Icon.lounge, video:Icon.video, branch:Icon.pin }[meetingType]],
            ['Duration', mt.duration, Icon.clock],
            ['Location', mt.id==='lounge' ? 'SSKIA SmartLounge · Lounge A' : mt.id==='video' ? 'Private booth 3' : rm.location, Icon.pin],
          ].map(([k,v,ic], i) => (
            <div key={k} style={{
              display:'flex', alignItems:'center', gap:12, padding:'12px 0',
              borderTop: i===0 ? 'none' : `1px solid ${TOKENS.line}`,
            }}>
              <div style={{width:28, display:'flex', justifyContent:'center'}}>{ic(TOKENS.goldDim)}</div>
              <div style={{flex:1}}>
                <div style={{fontSize:10, letterSpacing:1.2, color:TOKENS.inkMuted, textTransform:'uppercase'}}>{k}</div>
                <div style={{fontSize:13, color:TOKENS.navy, marginTop:3, fontFamily: k==='When' ? TOKENS.mono : TOKENS.sans}}>{v}</div>
              </div>
            </div>
          ))}
        </div>

        <div style={{padding:'14px 18px', background:TOKENS.parchment, borderTop:`1px solid ${TOKENS.lineGold}`}}>
          <div style={{fontSize:10, letterSpacing:1.2, color:TOKENS.inkMuted, textTransform:'uppercase', marginBottom:6}}>Agenda</div>
          <div style={{fontSize:12.5, color:TOKENS.navy, lineHeight:1.5, fontStyle:'italic', fontFamily:TOKENS.serif}}>"{purpose}"</div>
        </div>
      </div>

      <div style={{marginTop:18, display:'flex', alignItems:'flex-start', gap:10, fontSize:11, color:TOKENS.inkMuted, lineHeight:1.5}}>
        <div style={{width:4, height:4, borderRadius:4, background:TOKENS.gold, marginTop:6, flexShrink:0}}/>
        <div>By confirming, you consent to a private briefing note being prepared and shared with {rm.name.split(' ')[0]} under SSKIA's banking-partner protocol.</div>
      </div>

      <div style={{marginTop:22, display:'flex', flexDirection:'column', gap:10}}>
        <Button variant="gold" full onClick={onConfirm}>Confirm booking</Button>
        <Button variant="ghost" full>Add co-attendee</Button>
      </div>
    </div>
  );
}

// -- Step 6: Live status --
function Step6_LiveStatus({ rm, meetingType, time, onHome }) {
  const [eta, setEta] = React.useState(7);
  React.useEffect(()=>{
    const id = setInterval(()=>setEta(e => e<=1 ? 7 : e-1), 2500);
    return () => clearInterval(id);
  },[]);

  return (
    <div style={{height:'100%', background:TOKENS.navyDeep, color:TOKENS.ivory, display:'flex', flexDirection:'column', padding:'22px 22px 24px',
      backgroundImage:`radial-gradient(ellipse at top, rgba(201,165,92,0.18) 0%, transparent 55%)`,
    }}>
      <div style={{textAlign:'center', marginTop:20}}>
        <div style={{
          width:82, height:82, borderRadius:82, margin:'0 auto',
          background:'rgba(201,165,92,0.12)', border:`1px solid ${TOKENS.gold}`,
          display:'flex', alignItems:'center', justifyContent:'center',
        }}>
          {Icon.check(TOKENS.gold, 38)}
        </div>
        <div style={{fontSize:10, letterSpacing:2, color:TOKENS.gold, textTransform:'uppercase', marginTop:18}}>Confirmed</div>
        <div style={{fontFamily:TOKENS.serif, fontSize:28, lineHeight:1.15, marginTop:8, letterSpacing:0.2}}>
          Your meeting is<br/>
          <span style={{fontStyle:'italic', color:TOKENS.goldSoft}}>confirmed</span>
        </div>
      </div>

      <div style={{marginTop:26, padding:'18px 18px', borderRadius:14, background:'rgba(201,165,92,0.08)', border:`1px solid ${TOKENS.lineGold}`}}>
        <div style={{display:'flex', gap:12, alignItems:'center'}}>
          <div style={{position:'relative'}}>
            <Avatar name={rm.name} size={48} tone="gold"/>
            <div style={{position:'absolute', bottom:-2, right:-2, width:14, height:14, borderRadius:14, background:'#4ade80', border:`2px solid ${TOKENS.navyDeep}`}}/>
          </div>
          <div style={{flex:1}}>
            <div style={{fontFamily:TOKENS.serif, fontSize:15}}>{rm.name}</div>
            <div style={{fontSize:11, color:'rgba(247,243,236,0.6)', marginTop:2, display:'flex', alignItems:'center', gap:6}}>
              <Icon.dot c="#4ade80"/> En route to lounge
            </div>
          </div>
          <Pill tone="live"><Icon.dot c="#7FD8AE"/> Live</Pill>
        </div>

        <div style={{marginTop:16, display:'grid', gridTemplateColumns:'1fr 1fr', gap:10}}>
          <div style={{padding:'10px 12px', background:'rgba(11,27,43,0.5)', borderRadius:8}}>
            <div style={{fontSize:9, letterSpacing:1.5, color:'rgba(247,243,236,0.5)', textTransform:'uppercase'}}>ETA</div>
            <div style={{fontFamily:TOKENS.mono, fontSize:15, color:TOKENS.goldSoft, marginTop:3}}>{eta} min</div>
          </div>
          <div style={{padding:'10px 12px', background:'rgba(11,27,43,0.5)', borderRadius:8}}>
            <div style={{fontSize:9, letterSpacing:1.5, color:'rgba(247,243,236,0.5)', textTransform:'uppercase'}}>At</div>
            <div style={{fontFamily:TOKENS.mono, fontSize:15, color:TOKENS.goldSoft, marginTop:3}}>{time}</div>
          </div>
        </div>
      </div>

      {/* Map-like placeholder */}
      <div style={{marginTop:14, height:120, borderRadius:12, border:`1px solid ${TOKENS.lineGold}`, background: `
        repeating-linear-gradient(90deg, rgba(201,165,92,0.06) 0, rgba(201,165,92,0.06) 1px, transparent 1px, transparent 24px),
        repeating-linear-gradient(0deg, rgba(201,165,92,0.06) 0, rgba(201,165,92,0.06) 1px, transparent 1px, transparent 24px),
        ${TOKENS.navy}
      `, position:'relative', overflow:'hidden'}}>
        <svg viewBox="0 0 280 120" width="100%" height="100%" style={{position:'absolute', inset:0}}>
          <path d="M20 100 Q 90 60 140 70 T 260 30" fill="none" stroke={TOKENS.gold} strokeWidth="1.5" strokeDasharray="3 3"/>
          <circle cx="20" cy="100" r="5" fill={TOKENS.gold}/>
          <circle cx="260" cy="30" r="6" fill={TOKENS.goldSoft}>
            <animate attributeName="r" values="6;9;6" dur="1.8s" repeatCount="indefinite"/>
          </circle>
        </svg>
        <div style={{position:'absolute', bottom:8, left:12, fontFamily:TOKENS.mono, fontSize:9, letterSpacing:1, color:TOKENS.goldSoft}}>RM TRAJECTORY · LOUNGE A</div>
      </div>

      <div style={{flex:1}}/>

      <div style={{display:'flex', flexDirection:'column', gap:10, marginTop:20}}>
        <Button variant="gold" full>Send message to {rm.name.split(' ')[0]}</Button>
        <Button variant="outline" full onClick={onHome} style={{color:TOKENS.goldSoft, boxShadow:`inset 0 0 0 1px ${TOKENS.gold}`}}>Back to SmartLounge</Button>
      </div>
    </div>
  );
}

window.RMBookingFlow = RMBookingFlow;
