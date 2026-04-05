import React, { useState } from "react";

const SHEET_URL = [
  "https://script.google.com/macros/s/",
  "AKfycbwxiot1JdvFVuD0dla6ONJ2tOar-zeOaSP-",
  "RO_Di_bB_7vp-RZtGZrWNzFS1673pJTaRg/exec"
].join("");

const ADMIN_EMAIL    = "info@hoppr.club";
const ADMIN_PASSWORD = "Topsports@100";

const CENTRES = ["RK Puram","Sushant Lok","Sector 7 Gurugram","Dwarka Sector 9","Dwarka Sector 18","Greater Noida","New Faridabad"];
const SPORTS  = ["Badminton","Pickleball","Cricket","Football","General"];
const COACHING_ISSUES  = ["Poor coach quality","No progress","Bad punctuality","Boring drills","Dirty courts","Something else"];
const PAYPLAY_ISSUES   = ["Courts not available","Bad equipment","Too crowded","Overpriced","Hard to book","Something else"];
const COACHING_MID     = ["Coach quality","Drill variety","Progress tracking","Punctuality","Court condition"];
const PAYPLAY_MID      = ["Court availability","Equipment","Crowd management","Pricing","Booking experience"];
const COACHING_HIGH    = ["Amazing coach","Great drills","Visible progress","Always on time","Great courts"];
const PAYPLAY_HIGH     = ["Easy booking","Great courts","Good value","Quality equipment","Good crowd"];
const COACHING_METRICS = ["Coach quality","Drill variety","Progress feedback","Punctuality","Court condition"];
const PAYPLAY_METRICS  = ["Court availability","Ease of booking","Value for money","Equipment quality","Crowd/wait time"];

const DUMMY = [
  {timestamp:"2024-03-15T09:12:00Z",centre:"RK Puram",division:"Coaching",role:"Parent",sport:"Badminton",overall_rating:5,path:"high",issue:"",issue_detail:"",specific_ratings:'{"Coach quality":5,"Drill variety":4,"Progress feedback":5,"Punctuality":5,"Court condition":4}',nps:10,wants_followup:"No",contact:"",comment:"Coach Rahul is amazing!",escalated:"no"},
  {timestamp:"2024-03-15T10:30:00Z",centre:"Dwarka Sector 9",division:"Pay & Play",role:"",sport:"Pickleball",overall_rating:2,path:"low",issue:"Too crowded",issue_detail:"Had to wait 40 mins",specific_ratings:'{"Court availability":1,"Ease of booking":2,"Value for money":2,"Equipment quality":3,"Crowd/wait time":1}',nps:3,wants_followup:"Yes",contact:"9876543210",comment:"Please manage crowd better",escalated:"YES"},
  {timestamp:"2024-03-15T11:45:00Z",centre:"Sushant Lok",division:"Coaching",role:"Kid",sport:"Football",overall_rating:4,path:"high",issue:"",issue_detail:"",specific_ratings:'{"Coach quality":4,"Drill variety":5,"Progress feedback":3,"Punctuality":4,"Court condition":4}',nps:8,wants_followup:"No",contact:"",comment:"Really fun drills!",escalated:"no"},
  {timestamp:"2024-03-15T13:00:00Z",centre:"Sector 7 Gurugram",division:"Pay & Play",role:"",sport:"Cricket",overall_rating:3,path:"mid",issue:"Equipment",issue_detail:"",specific_ratings:'{"Court availability":3,"Ease of booking":4,"Value for money":3,"Equipment quality":2,"Crowd/wait time":3}',nps:6,wants_followup:"Yes",contact:"9988776655",comment:"Equipment needs upgrade",escalated:"YES"},
  {timestamp:"2024-03-15T14:20:00Z",centre:"RK Puram",division:"Coaching",role:"Parent",sport:"Badminton",overall_rating:5,path:"high",issue:"",issue_detail:"",specific_ratings:'{"Coach quality":5,"Drill variety":5,"Progress feedback":5,"Punctuality":4,"Court condition":5}',nps:10,wants_followup:"No",contact:"",comment:"Best centre in Delhi!",escalated:"no"},
  {timestamp:"2024-03-15T15:10:00Z",centre:"Greater Noida",division:"Pay & Play",role:"",sport:"Badminton",overall_rating:1,path:"low",issue:"Courts not available",issue_detail:"All courts booked",specific_ratings:'{"Court availability":1,"Ease of booking":1,"Value for money":1,"Equipment quality":3,"Crowd/wait time":1}',nps:2,wants_followup:"Yes",contact:"9123456789",comment:"Very disappointing.",escalated:"YES"},
  {timestamp:"2024-03-15T16:30:00Z",centre:"Dwarka Sector 18",division:"Coaching",role:"Kid",sport:"Pickleball",overall_rating:4,path:"high",issue:"",issue_detail:"",specific_ratings:'{"Coach quality":4,"Drill variety":4,"Progress feedback":4,"Punctuality":5,"Court condition":3}',nps:9,wants_followup:"No",contact:"",comment:"",escalated:"no"},
  {timestamp:"2024-03-15T17:00:00Z",centre:"New Faridabad",division:"Pay & Play",role:"",sport:"Football",overall_rating:4,path:"high",issue:"",issue_detail:"",specific_ratings:'{"Court availability":4,"Ease of booking":5,"Value for money":4,"Equipment quality":4,"Crowd/wait time":4}',nps:8,wants_followup:"No",contact:"",comment:"Great facility!",escalated:"no"},
  {timestamp:"2024-03-16T09:00:00Z",centre:"RK Puram",division:"Coaching",role:"Parent",sport:"Badminton",overall_rating:3,path:"mid",issue:"Progress tracking",issue_detail:"",specific_ratings:'{"Coach quality":3,"Drill variety":3,"Progress feedback":2,"Punctuality":4,"Court condition":4}',nps:5,wants_followup:"Yes",contact:"9001122334",comment:"Need better progress reports",escalated:"YES"},
  {timestamp:"2024-03-16T10:15:00Z",centre:"Sushant Lok",division:"Pay & Play",role:"",sport:"Pickleball",overall_rating:5,path:"high",issue:"",issue_detail:"",specific_ratings:'{"Court availability":5,"Ease of booking":5,"Value for money":4,"Equipment quality":5,"Crowd/wait time":5}',nps:10,wants_followup:"No",contact:"",comment:"Perfect experience!",escalated:"no"},
];

// ── SCREEN WRAPPER ────────────────────────────────────────────────────────────
function Screen({ children, step, total, onBack, showBack }) {
  return (
    <div style={{
      position:"fixed", inset:0, background:"#000",
      display:"flex", flexDirection:"column", overflow:"hidden"
    }}>
      {/* Top bar */}
      <div style={{ padding:"16px 20px 12px", flexShrink:0 }}>
        <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:12 }}>
          {showBack
            ? <button onClick={onBack} style={{ background:"none", border:"none", color:"#39FF14", fontSize:22, cursor:"pointer", padding:0, WebkitTapHighlightColor:"transparent" }}>←</button>
            : <div style={{ width:28 }}/>
          }
          <div style={{ textAlign:"center" }}>
            <div style={{ fontFamily:"'Rajdhani',sans-serif", fontSize:24, fontWeight:700, color:"#39FF14", letterSpacing:2, textShadow:"0 0 10px #39FF1444" }}>HOPPR</div>
          </div>
          <div style={{ fontFamily:"'Space Mono',monospace", fontSize:10, color:"#333" }}>{step}/{total}</div>
        </div>
        {/* Progress */}
        <div style={{ height:2, background:"#111", borderRadius:2, overflow:"hidden" }}>
          <div style={{ height:"100%", width:`${(step/total)*100}%`, background:"#39FF14", boxShadow:"0 0 6px #39FF14", transition:"width .4s ease", borderRadius:2 }}/>
        </div>
      </div>
      {/* Content */}
      <div style={{ flex:1, overflowY:"auto", padding:"8px 20px 20px", WebkitOverflowScrolling:"touch" }}>
        {children}
      </div>
    </div>
  );
}

// ── OPTION BUTTON ─────────────────────────────────────────────────────────────
function Option({ label, sub, emoji, selected, onClick }) {
  return (
    <button onClick={onClick} style={{
      width:"100%", padding:"20px 18px", marginBottom:12, borderRadius:16,
      border: selected ? "2px solid #39FF14" : "1.5px solid #1e1e1e",
      background: selected ? "#001a00" : "#0d0d0d",
      boxShadow: selected ? "0 0 16px #39FF1422" : "none",
      display:"flex", alignItems:"center", justifyContent:"space-between",
      cursor:"pointer", textAlign:"left", WebkitTapHighlightColor:"transparent",
      boxSizing:"border-box", transition:"all .15s"
    }}>
      <div style={{ display:"flex", alignItems:"center", gap:14 }}>
        {emoji && <span style={{ fontSize:28 }}>{emoji}</span>}
        <div>
          <div style={{ fontFamily:"'Rajdhani',sans-serif", fontWeight:700, fontSize:20, color: selected?"#39FF14":"#ddd", lineHeight:1.2 }}>{label}</div>
          {sub && <div style={{ fontFamily:"'Space Mono',monospace", fontSize:11, color:"#555", marginTop:3 }}>{sub}</div>}
        </div>
      </div>
      {selected && <span style={{ color:"#39FF14", fontSize:22, flexShrink:0 }}>✓</span>}
    </button>
  );
}

// ── CHIP ──────────────────────────────────────────────────────────────────────
function Chip({ label, selected, onClick }) {
  return (
    <button onClick={onClick} style={{
      padding:"13px 18px", borderRadius:24, marginBottom:10, marginRight:8,
      border: selected ? "1.5px solid #39FF14" : "1.5px solid #1e1e1e",
      background: selected ? "#001a00" : "#0d0d0d",
      color: selected ? "#39FF14" : "#888",
      fontFamily:"'Space Mono',monospace", fontSize:13,
      cursor:"pointer", WebkitTapHighlightColor:"transparent",
      boxShadow: selected ? "0 0 10px #39FF1422" : "none",
      display:"inline-block"
    }}>{label}</button>
  );
}

// ── STARS ─────────────────────────────────────────────────────────────────────
function Stars({ value, onChange, size=52 }) {
  const labels = ["","Terrible 😣","Poor 😕","Okay 😐","Good 😊","Excellent! 🤩"];
  return (
    <div>
      <div style={{ display:"flex", gap:10, justifyContent:"center", marginBottom:16 }}>
        {[1,2,3,4,5].map(s => {
          const on = s <= value;
          return (
            <button key={s} onClick={() => onChange(s)}
              style={{ background:"none", border:"none", cursor:"pointer", fontSize:size, lineHeight:1, padding:4,
                WebkitTapHighlightColor:"transparent", transition:"transform .15s",
                transform: on ? "scale(1.2)" : "scale(1)",
                filter: on ? "drop-shadow(0 0 8px #39FF14)" : "grayscale(1) opacity(.25)" }}>⭐</button>
          );
        })}
      </div>
      {value > 0 && (
        <div style={{ textAlign:"center", color:"#39FF14", fontFamily:"'Space Mono',monospace", fontSize:14, letterSpacing:1 }}>
          {labels[value]}
        </div>
      )}
    </div>
  );
}

// ── NPS ───────────────────────────────────────────────────────────────────────
function NPS({ value, onChange }) {
  const col = n => n<=6?"#f97316":n<=8?"#facc15":"#39FF14";
  return (
    <div>
      <div style={{ display:"flex", gap:8, flexWrap:"wrap", justifyContent:"center", marginBottom:12 }}>
        {[...Array(11).keys()].map(n => {
          const sel = value === n;
          return (
            <button key={n} onClick={() => onChange(n)} style={{
              width:48, height:48, borderRadius:12,
              border: sel ? `2px solid ${col(n)}` : "1.5px solid #1e1e1e",
              background: sel ? col(n)+"22" : "#0d0d0d",
              color: sel ? col(n) : "#666",
              fontFamily:"'Space Mono',monospace", fontSize:15, fontWeight: sel?700:400,
              cursor:"pointer", WebkitTapHighlightColor:"transparent",
              transform: sel ? "scale(1.1)" : "scale(1)", transition:"all .15s"
            }}>{n}</button>
          );
        })}
      </div>
      <div style={{ display:"flex", justifyContent:"space-between", fontFamily:"'Space Mono',monospace", fontSize:10, color:"#333" }}>
        <span>Not likely</span><span>Extremely likely</span>
      </div>
    </div>
  );
}

// ── QUESTION LABEL ────────────────────────────────────────────────────────────
function Q({ children }) {
  return <div style={{ fontFamily:"'Rajdhani',sans-serif", fontSize:28, fontWeight:700, color:"#fff", marginBottom:24, lineHeight:1.2 }}>{children}</div>;
}

// ── NEXT BUTTON ───────────────────────────────────────────────────────────────
function Next({ label="Continue →", disabled, onClick, saving }) {
  return (
    <button onClick={onClick} disabled={disabled||saving} style={{
      width:"100%", padding:"20px", borderRadius:16, border:"none", marginTop:20,
      background: disabled||saving ? "#111" : "#39FF14",
      color: disabled||saving ? "#333" : "#000",
      fontFamily:"'Rajdhani',sans-serif", fontWeight:700, fontSize:20,
      cursor: disabled||saving ? "not-allowed" : "pointer",
      boxShadow: disabled||saving ? "none" : "0 0 20px #39FF1444",
      WebkitTapHighlightColor:"transparent", letterSpacing:0.5
    }}>{saving ? "Submitting…" : label}</button>
  );
}

// ── FEEDBACK FLOW ─────────────────────────────────────────────────────────────
function FeedbackFlow({ onAdmin }) {
  const TOTAL = 9;
  const [step,setStep]       = useState(1);
  const [centre,setCentre]   = useState(null);
  const [division,setDiv]    = useState(null);
  const [role,setRole]       = useState(null);
  const [sport,setSport]     = useState(null);
  const [rating,setRating]   = useState(0);
  const [chips,setChips]     = useState([]);
  const [otherText,setOther] = useState("");
  const [metrics,setMetrics] = useState({});
  const [metIdx,setMetIdx]   = useState(0);
  const [nps,setNps]         = useState(null);
  const [wantsCB,setWantsCB] = useState(null);
  const [contact,setContact] = useState("");
  const [comment,setComment] = useState("");
  const [saving,setSaving]   = useState(false);
  const [done,setDone]       = useState(false);

  const isCoaching = division === "Coaching";
  const path = rating<=2?"low":rating===3?"mid":"high";
  const chipOptions = path==="low"?(isCoaching?COACHING_ISSUES:PAYPLAY_ISSUES):path==="mid"?(isCoaching?COACHING_MID:PAYPLAY_MID):(isCoaching?COACHING_HIGH:PAYPLAY_HIGH);
  const metricsList = isCoaching ? COACHING_METRICS : PAYPLAY_METRICS;
  const toggle = c => setChips(p => p.includes(c) ? p.filter(x=>x!==c) : [...p,c]);

  const actualStep = step===3&&!isCoaching ? 3 : step;

  const goNext = () => {
    if (step===2 && !isCoaching) { setStep(4); return; }
    if (step===7 && metIdx < metricsList.length-1) { setMetIdx(i=>i+1); return; }
    setStep(s=>s+1);
  };

  const goBack = () => {
    if (step===4 && !isCoaching) { setStep(2); return; }
    if (step===7 && metIdx > 0) { setMetIdx(i=>i-1); return; }
    setStep(s=>s-1);
  };

  const handleSubmit = async () => {
    setSaving(true);
    try {
      await fetch(SHEET_URL, {
        method:"POST", mode:"no-cors",
        headers:{"Content-Type":"application/json"},
        body: JSON.stringify({
          timestamp:new Date().toISOString(),
          centre, division, role, sport,
          overall_rating:rating, path,
          issue:chips.join(", "), issue_detail:otherText,
          specific_ratings:JSON.stringify(metrics),
          nps, wants_followup:wantsCB?"Yes":"No",
          contact, comment,
          escalated:rating<=2||nps<=6?"YES":"no"
        })
      });
    } catch(_) {}
    setSaving(false);
    setDone(true);
  };

  const reset = () => {
    setStep(1);setCentre(null);setDiv(null);setRole(null);setSport(null);
    setRating(0);setChips([]);setOther("");setMetrics({});setMetIdx(0);
    setNps(null);setWantsCB(null);setContact("");setComment("");setDone(false);
  };

  // DONE SCREEN
  if (done) return (
    <div style={{ position:"fixed", inset:0, background:"#000", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", padding:32, textAlign:"center" }}>
      <div style={{ fontSize:80, marginBottom:24 }}>{rating>=4?"🏆":rating<=2?"🙏":"✅"}</div>
      <div style={{ fontFamily:"'Rajdhani',sans-serif", fontSize:30, fontWeight:700, color:"#fff", marginBottom:12 }}>
        {rating>=4?"You made our day!":rating<=2?"We've flagged this.":"Thanks! We'll improve."}
      </div>
      <div style={{ fontFamily:"'Space Mono',monospace", fontSize:12, color:"#555", lineHeight:2, marginBottom:48 }}>
        {rating<=2?"Our team will follow up. 💪":"Your feedback helps Hoppr grow. 🎾"}
      </div>
      <button onClick={reset} style={{ padding:"20px 40px", borderRadius:16, border:"none", background:"#39FF14", color:"#000", fontFamily:"'Rajdhani',sans-serif", fontWeight:700, fontSize:20, cursor:"pointer", boxShadow:"0 0 20px #39FF1444", WebkitTapHighlightColor:"transparent" }}>
        Give More Feedback
      </button>
    </div>
  );

  // STEP 1 — CENTRE
  if (step===1) return (
    <Screen step={1} total={TOTAL} showBack={false}>
      <Q>Which centre did you visit?</Q>
      {CENTRES.map(c => (
        <Option key={c} label={c} emoji="🏟️" selected={centre===c} onClick={()=>{ setCentre(c); setTimeout(()=>setStep(2),300); }}/>
      ))}
      <div style={{ textAlign:"center", marginTop:16 }}>
        <button onClick={onAdmin} style={{ background:"none", border:"none", fontFamily:"'Space Mono',monospace", fontSize:10, color:"#252525", cursor:"pointer", letterSpacing:1, WebkitTapHighlightColor:"transparent" }}>
          Admin Access →
        </button>
      </div>
    </Screen>
  );

  // STEP 2 — DIVISION
  if (step===2) return (
    <Screen step={2} total={TOTAL} showBack onBack={()=>setStep(1)}>
      <Q>What brings you here?</Q>
      <Option emoji="🎓" label="Coaching" sub="For Parents & Kids enrolled in coaching" selected={division==="Coaching"} onClick={()=>{ setDiv("Coaching"); setTimeout(()=>setStep(3),300); }}/>
      <Option emoji="🎾" label="Pay & Play" sub="For walk-in players" selected={division==="Pay & Play"} onClick={()=>{ setDiv("Pay & Play"); setTimeout(()=>setStep(4),300); }}/>
    </Screen>
  );

  // STEP 3 — ROLE (coaching only)
  if (step===3) return (
    <Screen step={3} total={TOTAL} showBack onBack={()=>setStep(2)}>
      <Q>And you are?</Q>
      <Option emoji="👨‍👩‍👧" label="Parent" selected={role==="Parent"} onClick={()=>{ setRole("Parent"); setTimeout(()=>setStep(4),300); }}/>
      <Option emoji="🏃" label="Kid / Student" selected={role==="Kid / Student"} onClick={()=>{ setRole("Kid / Student"); setTimeout(()=>setStep(4),300); }}/>
    </Screen>
  );

  // STEP 4 — SPORT
  if (step===4) return (
    <Screen step={4} total={TOTAL} showBack onBack={goBack}>
      <Q>Which sport did you play?</Q>
      {SPORTS.map(s => (
        <Option key={s} label={s} selected={sport===s} onClick={()=>{ setSport(s); setTimeout(()=>setStep(5),300); }}/>
      ))}
    </Screen>
  );

  // STEP 5 — OVERALL RATING
  if (step===5) return (
    <Screen step={5} total={TOTAL} showBack onBack={()=>setStep(4)}>
      <Q>How was your session?</Q>
      <div style={{ marginTop:20, marginBottom:24 }}>
        <Stars value={rating} onChange={v=>{ setRating(v); setTimeout(()=>setStep(6),400); }} size={56}/>
      </div>
    </Screen>
  );

  // STEP 6 — FOLLOW UP QUESTION
  if (step===6) return (
    <Screen step={6} total={TOTAL} showBack onBack={()=>setStep(5)}>
      <Q>{path==="low"?"What went wrong?":path==="mid"?"What could be better?":"What did you love?"}</Q>
      <div style={{ display:"flex", flexWrap:"wrap" }}>
        {chipOptions.map(c => <Chip key={c} label={c} selected={chips.includes(c)} onClick={()=>toggle(c)}/>)}
      </div>
      {chips.includes("Something else") && (
        <textarea value={otherText} onChange={e=>setOther(e.target.value)} placeholder="Tell us more..." rows={3}
          style={{ width:"100%", background:"#0d0d0d", border:"1.5px solid #1e1e1e", borderRadius:12, color:"#fff", fontFamily:"'Space Mono',monospace", fontSize:14, padding:"14px", outline:"none", boxSizing:"border-box", WebkitAppearance:"none", marginTop:8 }}/>
      )}
      <Next disabled={chips.length===0} onClick={()=>setStep(7)}/>
    </Screen>
  );

  // STEP 7 — DETAILED RATINGS (one metric at a time)
  if (step===7) {
    const metric = metricsList[metIdx];
    const isLast = metIdx === metricsList.length-1;
    return (
      <Screen step={7} total={TOTAL} showBack onBack={goBack}>
        <div style={{ fontFamily:"'Space Mono',monospace", fontSize:11, color:"#39FF14", letterSpacing:2, marginBottom:12 }}>{metIdx+1} OF {metricsList.length}</div>
        <Q>Rate: {metric}</Q>
        <div style={{ marginTop:20, marginBottom:24 }}>
          <Stars value={metrics[metric]||0} onChange={v=>{ setMetrics(p=>({...p,[metric]:v})); setTimeout(()=>{ if(isLast){setStep(8);}else{setMetIdx(i=>i+1);} },400); }} size={52}/>
        </div>
      </Screen>
    );
  }

  // STEP 8 — NPS
  if (step===8) return (
    <Screen step={8} total={TOTAL} showBack onBack={()=>{ setMetIdx(metricsList.length-1); setStep(7); }}>
      <Q>Would you recommend Hoppr to a friend?</Q>
      <div style={{ fontFamily:"'Space Mono',monospace", fontSize:11, color:"#555", marginBottom:24 }}>0 = not at all · 10 = absolutely yes</div>
      <NPS value={nps} onChange={v=>{ setNps(v); setTimeout(()=>setStep(9),400); }}/>
    </Screen>
  );

  // STEP 9 — CALLBACK + COMMENT
  if (step===9) return (
    <Screen step={9} total={TOTAL} showBack onBack={()=>setStep(8)}>
      {nps!==null&&nps<=6 ? <>
        <Q>Want us to follow up with you?</Q>
        <Option label="Yes please" emoji="📱" selected={wantsCB===true} onClick={()=>setWantsCB(true)}/>
        <Option label="No thanks" emoji="👋" selected={wantsCB===false} onClick={()=>setWantsCB(false)}/>
        {wantsCB && (
          <input value={contact} onChange={e=>setContact(e.target.value)} placeholder="Your WhatsApp number"
            style={{ width:"100%", background:"#0d0d0d", border:"1.5px solid #1e1e1e", borderRadius:12, color:"#fff", fontFamily:"'Space Mono',monospace", fontSize:16, padding:"18px", outline:"none", boxSizing:"border-box", WebkitAppearance:"none", marginTop:12 }}/>
        )}
        {wantsCB!==null && <Next onClick={handleSubmit} saving={saving}/>}
      </> : <>
        <Q>Anything else to share?</Q>
        <div style={{ fontFamily:"'Space Mono',monospace", fontSize:12, color:"#555", marginBottom:16 }}>Optional — we read every word.</div>
        <textarea value={comment} onChange={e=>setComment(e.target.value)} placeholder="Tell us what you loved or what we can do better..." rows={5}
          style={{ width:"100%", background:"#0d0d0d", border:"1.5px solid #1e1e1e", borderRadius:12, color:"#fff", fontFamily:"'Space Mono',monospace", fontSize:14, padding:"16px", outline:"none", boxSizing:"border-box", WebkitAppearance:"none" }}/>
        <Next label="Submit Feedback 🚀" onClick={handleSubmit} saving={saving}/>
      </>}
    </Screen>
  );

  return null;
}

// ── ADMIN LOGIN ───────────────────────────────────────────────────────────────
function AdminLogin({ onSuccess }) {
  const [email,setEmail]   = useState("");
  const [pass,setPass]     = useState("");
  const [loading,setLoad]  = useState(false);
  const [error,setError]   = useState("");

  const login = () => {
    setLoad(true); setError("");
    setTimeout(() => {
      if (email.trim().toLowerCase()===ADMIN_EMAIL && pass===ADMIN_PASSWORD) { onSuccess(); }
      else if (email.trim().toLowerCase()!==ADMIN_EMAIL) { setError("Access denied. Only info@hoppr.club is authorised."); }
      else { setError("Incorrect password."); }
      setLoad(false);
    }, 800);
  };

  const inp = { width:"100%", background:"#0d0d0d", border:"1.5px solid #1e1e1e", borderRadius:12, color:"#fff", fontFamily:"'Space Mono',monospace", fontSize:16, padding:"18px", outline:"none", boxSizing:"border-box", WebkitAppearance:"none", marginBottom:14 };

  return (
    <div style={{ position:"fixed", inset:0, background:"#000", display:"flex", flexDirection:"column", justifyContent:"center", padding:"32px 24px", overflowY:"auto" }}>
      <div style={{ textAlign:"center", marginBottom:40 }}>
        <div style={{ fontFamily:"'Rajdhani',sans-serif", fontSize:28, fontWeight:700, color:"#39FF14", letterSpacing:2, marginBottom:4 }}>HOPPR</div>
        <div style={{ fontFamily:"'Space Mono',monospace", fontSize:9, color:"#222", letterSpacing:3, marginBottom:28 }}>SPORTS CENTRES</div>
        <div style={{ fontSize:48, marginBottom:16 }}>🔐</div>
        <div style={{ fontFamily:"'Rajdhani',sans-serif", fontSize:26, fontWeight:700, color:"#fff", marginBottom:8 }}>Admin Access</div>
        <div style={{ fontFamily:"'Space Mono',monospace", fontSize:12, color:"#444", lineHeight:1.8 }}>Restricted to authorised Hoppr team only.</div>
      </div>
      <div style={{ fontFamily:"'Space Mono',monospace", fontSize:10, color:"#444", letterSpacing:2, textTransform:"uppercase", marginBottom:8 }}>Email</div>
      <input value={email} onChange={e=>setEmail(e.target.value)} placeholder="info@hoppr.club" type="email" style={inp}/>
      <div style={{ fontFamily:"'Space Mono',monospace", fontSize:10, color:"#444", letterSpacing:2, textTransform:"uppercase", marginBottom:8 }}>Password</div>
      <input value={pass} onChange={e=>setPass(e.target.value)} onKeyDown={e=>e.key==="Enter"&&login()} placeholder="Enter password" type="password" style={inp}/>
      {error && <div style={{ background:"#1a0000", border:"1px solid #7f1d1d", borderRadius:10, padding:"12px 16px", fontFamily:"'Space Mono',monospace", fontSize:12, color:"#f87171", marginBottom:16 }}>🚫 {error}</div>}
      <button onClick={login} disabled={!email.trim()||!pass.trim()||loading}
        style={{ width:"100%", padding:"20px", borderRadius:16, border:"none", background:!email.trim()||!pass.trim()||loading?"#111":"#39FF14", color:!email.trim()||!pass.trim()||loading?"#333":"#000", fontFamily:"'Rajdhani',sans-serif", fontWeight:700, fontSize:20, cursor:"pointer", WebkitTapHighlightColor:"transparent" }}>
        {loading?"Verifying…":"Access Dashboard →"}
      </button>
    </div>
  );
}

// ── ADMIN DASHBOARD ───────────────────────────────────────────────────────────
function avgF(arr){return arr.length?arr.reduce((a,b)=>a+b,0)/arr.length:0;}
function npsScore(arr){
  if(!arr.length)return null;
  return Math.round(arr.filter(n=>n>=9).length/arr.length*100-arr.filter(n=>n<=6).length/arr.length*100);
}

function AdminDashboard({ onLogout }) {
  const [centreF,setCF] = useState("All");
  const [divF,setDF]    = useState("All");
  const [tab,setTab]    = useState("overview");
  const [search,setSrch]= useState("");
  const [data,setData]  = useState(DUMMY);
  const [loading,setLd] = useState(false);

  const load = async () => {
    setLd(true);
    try { const res=await fetch(`${SHEET_URL}?action=fetch&t=${Date.now()}`); const j=await res.json(); if(j&&j.length) setData(j); }
    catch(_) {}
    setLd(false);
  };

  const rows = data.filter(r => {
    if (centreF!=="All"&&r.centre!==centreF) return false;
    if (divF!=="All"&&r.division!==divF) return false;
    return true;
  });

  const esc      = rows.filter(r=>r.escalated==="YES");
  const rtgs     = rows.map(r=>+r.overall_rating).filter(Boolean);
  const npsl     = rows.map(r=>+r.nps).filter(v=>!isNaN(v)&&String(v)!=="");
  const oAvg     = avgF(rtgs).toFixed(1);
  const nps      = npsScore(npsl);
  const escRate  = rows.length?Math.round(esc.length/rows.length*100):0;
  const paths    = {low:rows.filter(r=>r.path==="low").length,mid:rows.filter(r=>r.path==="mid").length,high:rows.filter(r=>r.path==="high").length};

  const issueMap={};
  rows.filter(r=>r.issue).forEach(r=>{issueMap[r.issue]=(issueMap[r.issue]||0)+1;});
  const topIssues=Object.entries(issueMap).sort((a,b)=>b[1]-a[1]);

  const sportMap={};
  rows.forEach(r=>{if(!sportMap[r.sport])sportMap[r.sport]=[];sportMap[r.sport].push(+r.overall_rating);});
  const sportStats=Object.entries(sportMap).map(([s,v])=>({sport:s,avg:avgF(v).toFixed(1),count:v.length})).sort((a,b)=>b.count-a.count);

  const mAvg=(list,div)=>list.map(m=>{const vals=rows.filter(r=>r.division===div).map(r=>{try{const p=JSON.parse(r.specific_ratings);return p[m]||0;}catch{return 0;}}).filter(Boolean);return{metric:m,avg:avgF(vals).toFixed(1)};});
  const comments=rows.filter(r=>r.comment).filter(r=>!search||r.comment.toLowerCase().includes(search.toLowerCase()));
  const cPerf=CENTRES.map(c=>{const cr=rows.filter(r=>r.centre===c);return{centre:c,count:cr.length,avg:avgF(cr.map(r=>+r.overall_rating)).toFixed(1),nps:npsScore(cr.map(r=>+r.nps)),esc:cr.filter(r=>r.escalated==="YES").length};}).filter(r=>r.count>0);

  const tag=(col,txt)=><span style={{fontFamily:"'Space Mono',monospace",fontSize:10,padding:"3px 8px",borderRadius:10,background:col+"22",color:col,border:`1px solid ${col}44`}}>{txt}</span>;
  const pill=(a)=>({padding:"8px 14px",borderRadius:20,border:"none",cursor:"pointer",fontFamily:"'Space Mono',monospace",fontSize:11,background:a?"#39FF14":"#111",color:a?"#000":"#555",whiteSpace:"nowrap",WebkitTapHighlightColor:"transparent"});
  const card={background:"#0d0d0d",border:"1px solid #1e1e1e",borderRadius:14,padding:"16px",marginBottom:12};
  const sT={fontSize:14,fontWeight:700,color:"#fff",marginBottom:12,marginTop:20,fontFamily:"'Space Mono',monospace"};
  const tabS=(a)=>({flex:1,padding:"13px 4px",border:"none",background:"transparent",cursor:"pointer",fontFamily:"'Space Mono',monospace",fontSize:9,letterSpacing:1,textTransform:"uppercase",color:a?"#39FF14":"#333",borderBottom:a?"2px solid #39FF14":"2px solid transparent",WebkitTapHighlightColor:"transparent"});

  return (
    <div style={{ minHeight:"100vh", background:"#000" }}>
      {/* Sticky header */}
      <div style={{ position:"sticky", top:0, background:"#000", borderBottom:"1px solid #111", padding:"16px 16px 0", zIndex:10 }}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:14 }}>
          <div>
            <div style={{ fontFamily:"'Rajdhani',sans-serif", fontSize:22, fontWeight:700, color:"#39FF14", letterSpacing:1 }}>HOPPR</div>
            <div style={{ fontFamily:"'Space Mono',monospace", fontSize:8, color:"#222", letterSpacing:2 }}>ADMIN DASHBOARD</div>
          </div>
          <div style={{ display:"flex", gap:8 }}>
            <button onClick={load} style={{ fontFamily:"'Space Mono',monospace", fontSize:12, padding:"9px 14px", borderRadius:8, border:"1px solid #1a1a1a", background:"#111", color:"#39FF14", cursor:"pointer" }}>
              {loading?"…":"↻ Refresh"}
            </button>
            <button onClick={onLogout} style={{ fontFamily:"'Space Mono',monospace", fontSize:12, padding:"9px 14px", borderRadius:8, border:"1px solid #3a1212", background:"#1a0000", color:"#f87171", cursor:"pointer" }}>
              Exit
            </button>
          </div>
        </div>
        {/* KPI */}
        <div style={{ display:"flex", gap:8, marginBottom:14 }}>
          {[["Resp",rows.length,"#fff"],["Avg",`${oAvg}★`,"#39FF14"],["NPS",nps!==null?nps:"—",nps!==null?(nps>=50?"#39FF14":nps>=0?"#facc15":"#f97316"):"#555"],["Esc%",`${escRate}%`,"#f87171"]].map(([l,v,c])=>(
            <div key={l} style={{ flex:1, background:"#0d0d0d", border:"1px solid #1e1e1e", borderRadius:12, padding:"10px 6px", textAlign:"center" }}>
              <div style={{ fontFamily:"'Space Mono',monospace", fontSize:8, color:"#444", letterSpacing:1, marginBottom:4 }}>{l}</div>
              <div style={{ fontFamily:"'Rajdhani',sans-serif", fontSize:20, fontWeight:700, color:c }}>{v}</div>
            </div>
          ))}
        </div>
        <div style={{ display:"flex", overflowX:"auto", borderBottom:"1px solid #111" }}>
          {[["overview","📊 Overview"],["escalations","🚨 Flags"],["breakdown","📈 Breakdown"],["comments","💬 Comments"],["feed","🕐 Feed"]].map(([t,l])=>(
            <button key={t} style={tabS(tab===t)} onClick={()=>setTab(t)}>{l}</button>
          ))}
        </div>
      </div>

      <div style={{ padding:"16px 16px 60px" }}>
        <div style={{ overflowX:"auto", paddingBottom:6, marginBottom:8 }}>
          <div style={{ display:"flex", gap:6, minWidth:"max-content" }}>
            {["All",...CENTRES].map(c=><button key={c} style={pill(centreF===c)} onClick={()=>setCF(c)}>{c}</button>)}
          </div>
        </div>
        <div style={{ display:"flex", gap:6, marginBottom:16 }}>
          {["All","Coaching","Pay & Play"].map(d=><button key={d} style={pill(divF===d)} onClick={()=>setDF(d)}>{d}</button>)}
        </div>

        {esc.length>0&&(
          <div style={{ background:"#1a0000", border:"1.5px solid #7f1d1d", borderRadius:12, padding:"12px 16px", marginBottom:16, display:"flex", alignItems:"center", gap:12 }}>
            <span style={{ fontSize:20 }}>🚨</span>
            <div>
              <div style={{ fontFamily:"'Rajdhani',sans-serif", fontWeight:700, color:"#f87171", fontSize:16 }}>{esc.length} Active Escalation{esc.length>1?"s":""}</div>
              <div style={{ fontFamily:"'Space Mono',monospace", fontSize:10, color:"#7f4f4f" }}>Requires immediate attention</div>
            </div>
          </div>
        )}

        {tab==="overview"&&<>
          <div style={sT}>Path Breakdown</div>
          {[["😔 Low",paths.low,"#f87171"],["😐 Mid",paths.mid,"#facc15"],["😊 High",paths.high,"#39FF14"]].map(([l,v,c])=>(
            <div key={l} style={{ ...card, display:"flex", alignItems:"center", gap:12 }}>
              <span style={{ fontFamily:"'Space Mono',monospace", fontSize:12, color:"#bbb", flex:1 }}>{l}</span>
              <div style={{ width:80, height:6, background:"#111", borderRadius:3, overflow:"hidden" }}>
                <div style={{ width:`${rows.length?v/rows.length*100:0}%`, height:"100%", background:c, borderRadius:3 }}/>
              </div>
              <span style={{ fontFamily:"'Rajdhani',sans-serif", fontWeight:700, color:c, fontSize:18, minWidth:24, textAlign:"right" }}>{v}</span>
            </div>
          ))}
          <div style={sT}>Centre Performance</div>
          <div style={{ overflowX:"auto" }}>
            <table style={{ width:"100%", borderCollapse:"collapse", fontFamily:"'Space Mono',monospace", fontSize:11, minWidth:320 }}>
              <thead><tr style={{ borderBottom:"1px solid #1a1a1a" }}>
                {["Centre","Resp","Avg","NPS","Esc"].map(h=><th key={h} style={{ padding:"10px 8px", color:"#39FF14", textAlign:"left", letterSpacing:1, whiteSpace:"nowrap" }}>{h}</th>)}
              </tr></thead>
              <tbody>
                {cPerf.map(c=>(
                  <tr key={c.centre} style={{ borderBottom:"1px solid #0a0a0a" }}>
                    <td style={{ padding:"10px 8px", color:"#bbb", whiteSpace:"nowrap" }}>{c.centre}</td>
                    <td style={{ padding:"10px 8px", color:"#fff" }}>{c.count}</td>
                    <td style={{ padding:"10px 8px", color:"#39FF14" }}>{c.avg}★</td>
                    <td style={{ padding:"10px 8px", color:c.nps>=50?"#39FF14":c.nps>=0?"#facc15":"#f97316" }}>{c.nps??"-"}</td>
                    <td style={{ padding:"10px 8px", color:c.esc>0?"#f87171":"#555" }}>{c.esc}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div style={sT}>Top Issues</div>
          {topIssues.length===0&&<div style={{ fontFamily:"'Space Mono',monospace", fontSize:12, color:"#444" }}>No issues ✅</div>}
          {topIssues.map(([issue,count])=>(
            <div key={issue} style={{ ...card, display:"flex", justifyContent:"space-between", alignItems:"center" }}>
              <span style={{ fontFamily:"'Space Mono',monospace", fontSize:12, color:"#bbb" }}>{issue}</span>
              <span style={{ fontFamily:"'Rajdhani',sans-serif", fontWeight:700, color:"#f87171", fontSize:18 }}>{count}×</span>
            </div>
          ))}
        </>}

        {tab==="escalations"&&<>
          <div style={{ fontFamily:"'Space Mono',monospace", fontSize:12, color:"#f87171", marginBottom:14 }}>{esc.length} requiring action</div>
          {esc.length===0&&<div style={{ fontFamily:"'Space Mono',monospace", fontSize:12, color:"#39FF14" }}>No escalations ✅</div>}
          {esc.map((r,i)=>(
            <div key={i} style={{ ...card, background:"#0d0000", border:"1px solid #7f1d1d", marginBottom:14 }}>
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:10 }}>
                <div style={{ display:"flex", gap:6 }}>{tag("#f87171","🚨 FLAGGED")}{tag("#f97316",r.division)}</div>
                <span style={{ fontFamily:"'Space Mono',monospace", fontSize:10, color:"#444" }}>{new Date(r.timestamp).toLocaleString("en-IN",{day:"2-digit",month:"short",hour:"2-digit",minute:"2-digit"})}</span>
              </div>
              <div style={{ fontFamily:"'Rajdhani',sans-serif", fontWeight:700, color:"#fff", fontSize:18, marginBottom:6 }}>{r.centre}</div>
              <div style={{ fontFamily:"'Space Mono',monospace", fontSize:12, color:"#f87171", marginBottom:6 }}>{"⭐".repeat(+r.overall_rating)} · {r.issue||"Not specified"}</div>
              {r.issue_detail&&<div style={{ fontFamily:"'Space Mono',monospace", fontSize:11, color:"#666", marginBottom:8 }}>"{r.issue_detail}"</div>}
              {r.contact&&<div style={{ fontFamily:"'Space Mono',monospace", fontSize:12, color:"#39FF14" }}>📱 {r.contact}</div>}
              <div style={{ marginTop:12 }}>{tag("#facc15","NEW")}</div>
            </div>
          ))}
        </>}

        {tab==="breakdown"&&<>
          <div style={sT}>🎓 Coaching Metrics</div>
          {mAvg(COACHING_METRICS,"Coaching").map(m=>(
            <div key={m.metric} style={card}>
              <div style={{ display:"flex", justifyContent:"space-between", marginBottom:10 }}>
                <span style={{ fontFamily:"'Space Mono',monospace", fontSize:12, color:"#888" }}>{m.metric}</span>
                <span style={{ fontFamily:"'Rajdhani',sans-serif", fontWeight:700, color:"#39FF14", fontSize:16 }}>{m.avg}★</span>
              </div>
              <div style={{ height:6, background:"#111", borderRadius:3, overflow:"hidden" }}>
                <div style={{ width:`${(+m.avg/5)*100}%`, height:"100%", background:"#39FF14", borderRadius:3 }}/>
              </div>
            </div>
          ))}
          <div style={sT}>🎾 Pay & Play Metrics</div>
          {mAvg(PAYPLAY_METRICS,"Pay & Play").map(m=>(
            <div key={m.metric} style={card}>
              <div style={{ display:"flex", justifyContent:"space-between", marginBottom:10 }}>
                <span style={{ fontFamily:"'Space Mono',monospace", fontSize:12, color:"#888" }}>{m.metric}</span>
                <span style={{ fontFamily:"'Rajdhani',sans-serif", fontWeight:700, color:"#39FF14", fontSize:16 }}>{m.avg}★</span>
              </div>
              <div style={{ height:6, background:"#111", borderRadius:3, overflow:"hidden" }}>
                <div style={{ width:`${(+m.avg/5)*100}%`, height:"100%", background:"#39FF14", borderRadius:3 }}/>
              </div>
            </div>
          ))}
          <div style={sT}>Sport Ratings</div>
          {sportStats.map(s=>(
            <div key={s.sport} style={{ ...card, display:"flex", justifyContent:"space-between", alignItems:"center" }}>
              <span style={{ fontFamily:"'Rajdhani',sans-serif", fontWeight:700, color:"#fff", fontSize:16 }}>{s.sport}</span>
              <div style={{ display:"flex", gap:12, alignItems:"center" }}>
                <span style={{ fontFamily:"'Space Mono',monospace", fontSize:11, color:"#555" }}>{s.count}x</span>
                <span style={{ fontFamily:"'Rajdhani',sans-serif", fontWeight:700, color:"#39FF14", fontSize:16 }}>{s.avg}★</span>
              </div>
            </div>
          ))}
        </>}

        {tab==="comments"&&<>
          <input value={search} onChange={e=>setSrch(e.target.value)} placeholder="Search comments..."
            style={{ width:"100%", background:"#0d0d0d", border:"1.5px solid #1e1e1e", borderRadius:12, color:"#fff", fontFamily:"'Space Mono',monospace", fontSize:14, padding:"14px", outline:"none", boxSizing:"border-box", WebkitAppearance:"none", marginBottom:16 }}/>
          {comments.length===0&&<div style={{ fontFamily:"'Space Mono',monospace", fontSize:12, color:"#444" }}>No comments found.</div>}
          {comments.map((r,i)=>(
            <div key={i} style={card}>
              <div style={{ display:"flex", gap:6, marginBottom:10, flexWrap:"wrap" }}>
                {tag("#39FF14",r.centre)}{tag("#888",r.division)}
                {r.escalated==="YES"&&tag("#f87171","🚨")}
              </div>
              <div style={{ fontFamily:"'Space Mono',monospace", fontSize:12, color:"#ccc", lineHeight:1.8, marginBottom:10 }}>"{r.comment}"</div>
              <div style={{ fontFamily:"'Space Mono',monospace", fontSize:11, color:"#444" }}>{"⭐".repeat(+r.overall_rating)} · NPS {r.nps} · {new Date(r.timestamp).toLocaleDateString("en-IN")}</div>
            </div>
          ))}
        </>}

        {tab==="feed"&&<>
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:14 }}>
            <div style={{ fontFamily:"'Rajdhani',sans-serif", fontWeight:700, color:"#fff", fontSize:18 }}>Live Feed</div>
            <div style={{ fontFamily:"'Space Mono',monospace", fontSize:10, color:"#444" }}>{new Date().toLocaleTimeString("en-IN",{hour:"2-digit",minute:"2-digit"})}</div>
          </div>
          <div style={{ overflowX:"auto" }}>
            <table style={{ width:"100%", borderCollapse:"collapse", fontFamily:"'Space Mono',monospace", fontSize:11, minWidth:380 }}>
              <thead><tr style={{ borderBottom:"1px solid #1a1a1a" }}>
                {["Time","Centre","Div","★","Path","🚨"].map(h=><th key={h} style={{ padding:"10px 6px", color:"#39FF14", textAlign:"left", whiteSpace:"nowrap" }}>{h}</th>)}
              </tr></thead>
              <tbody>
                {[...data].reverse().map((r,i)=>(
                  <tr key={i} style={{ borderBottom:"1px solid #0a0a0a" }}>
                    <td style={{ padding:"9px 6px", color:"#555", whiteSpace:"nowrap" }}>{new Date(r.timestamp).toLocaleTimeString("en-IN",{hour:"2-digit",minute:"2-digit"})}</td>
                    <td style={{ padding:"9px 6px", color:"#bbb", whiteSpace:"nowrap", maxWidth:90, overflow:"hidden", textOverflow:"ellipsis" }}>{r.centre}</td>
                    <td style={{ padding:"9px 6px", color:"#888" }}>{r.division==="Coaching"?"🎓":"🎾"}</td>
                    <td style={{ padding:"9px 6px", color:"#39FF14" }}>{r.overall_rating}★</td>
                    <td style={{ padding:"9px 6px" }}><span style={{ color:r.path==="low"?"#f87171":r.path==="mid"?"#facc15":"#39FF14", fontSize:10, textTransform:"uppercase" }}>{r.path}</span></td>
                    <td style={{ padding:"9px 6px" }}><span style={{ color:r.escalated==="YES"?"#f87171":"#333" }}>{r.escalated==="YES"?"🚨":"—"}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>}
      </div>
    </div>
  );
}

// ── ROOT ──────────────────────────────────────────────────────────────────────
export default function App() {
  const [page,setPage] = useState("feedback");
  const [auth,setAuth] = useState(false);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Rajdhani:wght@600;700&family=Space+Mono:wght@400;700&display=swap');
        *{box-sizing:border-box;margin:0;padding:0;}
        html,body,#root{width:100%;height:100%;background:#000;}
        body{-webkit-font-smoothing:antialiased;-webkit-text-size-adjust:100%;overflow-x:hidden;}
        button{outline:none;-webkit-tap-highlight-color:transparent;}
        input,textarea{outline:none;-webkit-appearance:none;}
        input:focus,textarea:focus{border-color:#39FF14!important;box-shadow:0 0 0 2px #39FF1422!important;}
        ::-webkit-scrollbar{width:2px;height:2px;}
        ::-webkit-scrollbar-thumb{background:#1a1a1a;border-radius:4px;}
      `}</style>
      {page==="feedback" && <FeedbackFlow onAdmin={()=>setPage("admin")}/>}
      {page==="admin" && !auth && <AdminLogin onSuccess={()=>setAuth(true)}/>}
      {page==="admin" && auth && <AdminDashboard onLogout={()=>{setAuth(false);setPage("feedback");}}/>}
    </>
  );
}
