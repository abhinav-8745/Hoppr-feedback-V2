import React, { useState, useEffect } from "react";

function useAppHeight() {
  const [h, setH] = useState(window.innerHeight);
  useEffect(() => {
    const set = () => setH(window.innerHeight);
    window.addEventListener("resize", set);
    window.addEventListener("orientationchange", set);
    return () => { window.removeEventListener("resize", set); window.removeEventListener("orientationchange", set); };
  }, []);
  return h;
}

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

// ── SHARED COMPONENTS ─────────────────────────────────────────────────────────
function Stars({ value, onChange, size=40 }) {
  const [h,setH] = useState(null);
  const labels = ["","Terrible","Poor","Okay","Good","Excellent!"];
  return (
    <div>
      <div style={{display:"flex",gap:8,justifyContent:"center"}}>
        {[1,2,3,4,5].map(s=>{
          const on=s<=(h??value);
          return <button key={s} onClick={()=>onChange?.(s)}
            onMouseEnter={()=>onChange&&setH(s)} onMouseLeave={()=>onChange&&setH(null)}
            style={{background:"none",border:"none",cursor:onChange?"pointer":"default",
              fontSize:size,lineHeight:1,padding:4,WebkitTapHighlightColor:"transparent",
              transition:"transform .15s",transform:on?"scale(1.2)":"scale(1)",
              filter:on?"drop-shadow(0 0 6px #39FF14)":"grayscale(1) opacity(.2)"}}>⭐</button>;
        })}
      </div>
      {(h??value)>0&&<div style={{textAlign:"center",color:"#39FF14",fontFamily:"'Space Mono',monospace",fontSize:12,marginTop:10,letterSpacing:1}}>{labels[h??value]}</div>}
    </div>
  );
}

function NPSPicker({value,onChange}) {
  const col=n=>n<=6?"#f97316":n<=8?"#facc15":"#39FF14";
  return (
    <div>
      <div style={{display:"flex",gap:6,flexWrap:"wrap",justifyContent:"center",marginBottom:10}}>
        {[...Array(11).keys()].map(n=>{
          const sel=value===n;
          return <button key={n} onClick={()=>onChange(n)}
            style={{width:42,height:42,borderRadius:10,border:sel?`2px solid ${col(n)}`:"2px solid #1a1a1a",
              background:sel?col(n)+"22":"#111",color:sel?col(n):"#555",
              fontFamily:"'Space Mono',monospace",fontSize:13,fontWeight:sel?700:400,
              cursor:"pointer",WebkitTapHighlightColor:"transparent",
              transform:sel?"scale(1.1)":"scale(1)",transition:"all .15s"}}>{n}</button>;
        })}
      </div>
      <div style={{display:"flex",justifyContent:"space-between",fontFamily:"'Space Mono',monospace",fontSize:9,color:"#333"}}>
        <span>Not likely</span><span>Extremely likely</span>
      </div>
    </div>
  );
}

function ProgressBar({step,total}) {
  return (
    <div style={{height:3,background:"#111",borderRadius:2,overflow:"hidden",marginBottom:6}}>
      <div style={{height:"100%",width:`${(step/total)*100}%`,background:"#39FF14",
        boxShadow:"0 0 8px #39FF14",transition:"width .4s ease",borderRadius:2}}/>
    </div>
  );
}

// ── FEEDBACK PAGE ─────────────────────────────────────────────────────────────
function FeedbackPage({onAdmin}) {
  const appH = useAppHeight();
  const TOTAL=9;
  const [step,setStep]       = useState(1);
  const [centre,setCentre]   = useState(null);
  const [division,setDiv]    = useState(null);
  const [role,setRole]       = useState(null);
  const [sport,setSport]     = useState(null);
  const [rating,setRating]   = useState(0);
  const [chips,setChips]     = useState([]);
  const [otherText,setOther] = useState("");
  const [metrics,setMetrics] = useState({});
  const [nps,setNps]         = useState(null);
  const [wantsCB,setWantsCB] = useState(false);
  const [contact,setContact] = useState("");
  const [comment,setComment] = useState("");
  const [saving,setSaving]   = useState(false);

  const isCoaching=division==="Coaching";
  const path=rating<=2?"low":rating===3?"mid":"high";
  const chipOptions=path==="low"?(isCoaching?COACHING_ISSUES:PAYPLAY_ISSUES):path==="mid"?(isCoaching?COACHING_MID:PAYPLAY_MID):(isCoaching?COACHING_HIGH:PAYPLAY_HIGH);
  const metricsList=isCoaching?COACHING_METRICS:PAYPLAY_METRICS;
  const toggle=c=>setChips(p=>p.includes(c)?p.filter(x=>x!==c):[...p,c]);
  const next=()=>{if(step===3&&!isCoaching){setStep(5);return;}setStep(s=>s+1);};
  const back=()=>{if(step===5&&!isCoaching){setStep(3);return;}setStep(s=>s-1);};
  const actualStep=step===5&&!isCoaching?4:step;

  const canNext=()=>{
    if(step===1)return!!centre;
    if(step===2)return!!division;
    if(step===3)return!!role;
    if(step===4)return!!sport;
    if(step===5)return rating>0;
    if(step===6)return chips.length>0;
    if(step===7)return metricsList.every(m=>metrics[m]>0);
    if(step===8)return nps!==null;
    return true;
  };

  const reset=()=>{setStep(1);setCentre(null);setDiv(null);setRole(null);setSport(null);setRating(0);setChips([]);setOther("");setMetrics({});setNps(null);setWantsCB(false);setContact("");setComment("");};

  const handleSubmit=async()=>{
    setSaving(true);
    try{
      await fetch(SHEET_URL,{method:"POST",mode:"no-cors",headers:{"Content-Type":"application/json"},
        body:JSON.stringify({timestamp:new Date().toISOString(),centre,division,role,sport,
          overall_rating:rating,path,issue:chips.join(", "),issue_detail:otherText,
          specific_ratings:JSON.stringify(metrics),nps,wants_followup:wantsCB?"Yes":"No",
          contact,comment,escalated:rating<=2||nps<=6?"YES":"no"})});
    }catch(_){}
    setSaving(false);setStep(10);
  };

  const s = {page:{position:"fixed",top:0,left:0,right:0,height:`${appH}px`,background:"#000",display:"flex",flexDirection:"column",overflow:"hidden"},
    head:  {padding:"16px 16px 0",flexShrink:0},
   body:{flex:1,overflowY:"auto",padding:"16px 16px 0",WebkitOverflowScrolling:"touch",display:"flex",flexDirection:"column"},
    foot:  {padding:"12px 16px 20px",flexShrink:0,background:"linear-gradient(to top,#000 70%,transparent)"},
    card:  {background:"#0f0f0f",border:"1px solid #1a1a1a",borderRadius:14,padding:"14px",marginBottom:10,width:"100%",boxSizing:"border-box"},
    selC:  {background:"#001800",border:"1.5px solid #39FF14",borderRadius:14,padding:"14px",marginBottom:10,width:"100%",boxSizing:"border-box",boxShadow:"0 0 10px #39FF1420"},
    btn:   {width:"100%",padding:"17px",borderRadius:13,border:"none",background:"#39FF14",color:"#000",fontWeight:700,fontSize:17,cursor:"pointer",fontFamily:"'Rajdhani',sans-serif",boxShadow:"0 0 20px #39FF1444",WebkitTapHighlightColor:"transparent",marginBottom:10},
    btnD:  {width:"100%",padding:"15px",borderRadius:13,border:"1.5px solid #222",background:"transparent",color:"#555",fontWeight:700,fontSize:15,cursor:"pointer",fontFamily:"'Rajdhani',sans-serif",WebkitTapHighlightColor:"transparent"},
    chip:  {padding:"10px 16px",borderRadius:22,border:"1.5px solid #1a1a1a",background:"#0f0f0f",color:"#777",fontSize:13,cursor:"pointer",fontFamily:"'Space Mono',monospace",WebkitTapHighlightColor:"transparent",marginBottom:8,marginRight:8},
    chipA: {padding:"10px 16px",borderRadius:22,border:"1.5px solid #39FF14",background:"#001800",color:"#39FF14",fontSize:13,cursor:"pointer",fontFamily:"'Space Mono',monospace",WebkitTapHighlightColor:"transparent",boxShadow:"0 0 8px #39FF1433",marginBottom:8,marginRight:8},
    inp:   {width:"100%",background:"#0f0f0f",border:"1.5px solid #1a1a1a",borderRadius:12,color:"#fff",fontFamily:"'Space Mono',monospace",fontSize:16,padding:"14px",outline:"none",boxSizing:"border-box",WebkitAppearance:"none"},
    lbl:   {fontFamily:"'Space Mono',monospace",fontSize:10,color:"#444",letterSpacing:2,textTransform:"uppercase",display:"block",marginBottom:8},
    h1:    {fontSize:24,fontWeight:700,color:"#fff",marginBottom:16,fontFamily:"'Rajdhani',sans-serif",lineHeight:1.2},
  };

  if(step===10) return (
    <div style={{...s.page,alignItems:"center",justifyContent:"center",padding:24,textAlign:"center"}}>
      <div style={{fontSize:72,marginBottom:20}}>{rating>=4?"🏆":rating<=2?"🙏":"✅"}</div>
      <div style={{fontFamily:"'Rajdhani',sans-serif",fontSize:26,fontWeight:700,color:"#fff",marginBottom:10}}>
        {rating>=4?"You made our day!":rating<=2?"We've flagged this.":"Thanks! We'll improve."}
      </div>
      <div style={{fontFamily:"'Space Mono',monospace",fontSize:11,color:"#555",lineHeight:1.9,marginBottom:40}}>
        {rating<=2?"Our team will make it right. 💪":"Your feedback helps Hoppr grow. 🎾"}
      </div>
      <button onClick={reset} style={{...s.btn,width:"auto",padding:"14px 32px"}}>Give More Feedback</button>
    </div>
  );

  return (
    <div style={s.page}>
      {/* HEADER */}
      <div style={s.head}>
        <div style={{textAlign:"center",marginBottom:14}}>
          <div style={{fontFamily:"'Rajdhani',sans-serif",fontSize:26,fontWeight:700,color:"#39FF14",letterSpacing:2,textShadow:"0 0 12px #39FF1455"}}>HOPPR</div>
          <div style={{fontFamily:"'Space Mono',monospace",fontSize:8,color:"#222",letterSpacing:3}}>SPORTS CENTRES</div>
        </div>
        <ProgressBar step={actualStep} total={TOTAL}/>
        <div style={{fontFamily:"'Space Mono',monospace",fontSize:9,color:"#333",letterSpacing:1,marginBottom:14,textAlign:"center"}}>STEP {actualStep} OF {TOTAL}</div>
      </div>

      {/* BODY */}
      <div style={s.body}>

      {step===1&&<>
  <span style={s.lbl}>Centre</span>
  <div style={s.h1}>Which centre did you visit?</div>
  <div style={{display:"flex",flexDirection:"column",gap:0,flex:1}}>
    {CENTRES.map(c=>(
      <button key={c} onClick={()=>setCentre(c)}
        style={{...(centre===c?s.selC:s.card),display:"flex",justifyContent:"space-between",
          alignItems:"center",border:"none",cursor:"pointer",textAlign:"left",
          WebkitTapHighlightColor:"transparent",flex:1,marginBottom:8}}>
        <span style={{fontFamily:"'Rajdhani',sans-serif",fontWeight:700,fontSize:17,color:centre===c?"#39FF14":"#ccc"}}>🏟️  {c}</span>
        {centre===c&&<span style={{color:"#39FF14",fontSize:18}}>✓</span>}
      </button>
    ))}
  </div>
</>}
        {step===2&&<>
          <span style={s.lbl}>Division</span>
          <div style={s.h1}>What brings you here?</div>
          {[["🎓","Coaching","For Parents & Kids in coaching"],["🎾","Pay & Play","For walk-in players"]].map(([e,d,sub])=>(
            <button key={d} onClick={()=>setDiv(d)}
              style={{...(division===d?s.selC:s.card),border:"none",cursor:"pointer",textAlign:"left",WebkitTapHighlightColor:"transparent"}}>
              <div style={{fontSize:30,marginBottom:6}}>{e}</div>
              <div style={{fontFamily:"'Rajdhani',sans-serif",fontWeight:700,fontSize:19,color:division===d?"#39FF14":"#fff",marginBottom:3}}>{d}</div>
              <div style={{fontFamily:"'Space Mono',monospace",fontSize:11,color:"#555"}}>{sub}</div>
            </button>
          ))}
        </>}

        {step===3&&<>
          <span style={s.lbl}>Role</span>
          <div style={s.h1}>And you are?</div>
          {[["👨‍👩‍👧","Parent"],["🏃","Kid / Student"]].map(([e,r])=>(
            <button key={r} onClick={()=>setRole(r)}
              style={{...(role===r?s.selC:s.card),display:"flex",alignItems:"center",gap:16,border:"none",cursor:"pointer",textAlign:"left",WebkitTapHighlightColor:"transparent"}}>
              <span style={{fontSize:32}}>{e}</span>
              <span style={{fontFamily:"'Rajdhani',sans-serif",fontWeight:700,fontSize:19,color:role===r?"#39FF14":"#ccc"}}>{r}</span>
            </button>
          ))}
        </>}

        {step===4&&<>
          <span style={s.lbl}>Sport</span>
          <div style={s.h1}>Which sport did you play?</div>
          <div style={{display:"flex",flexWrap:"wrap",marginTop:4}}>
            {SPORTS.map(sp=>(
              <button key={sp} onClick={()=>setSport(sp)} style={sport===sp?s.chipA:s.chip}>{sp}</button>
            ))}
          </div>
        </>}

        {step===5&&<>
          <span style={s.lbl}>Overall Rating</span>
          <div style={s.h1}>How was your session?</div>
          <div style={{marginTop:32,marginBottom:24}}><Stars value={rating} onChange={setRating} size={48}/></div>
        </>}

        {step===6&&<>
          <span style={s.lbl}>{path==="low"?"Issue":path==="mid"?"Improvement":"Highlight"}</span>
          <div style={s.h1}>{path==="low"?"What went wrong?":path==="mid"?"What could be better?":"What did you love?"}</div>
          <div style={{display:"flex",flexWrap:"wrap",marginTop:4}}>
            {chipOptions.map(c=>(
              <button key={c} onClick={()=>toggle(c)} style={chips.includes(c)?s.chipA:s.chip}>{c}</button>
            ))}
          </div>
          {chips.includes("Something else")&&(
            <textarea value={otherText} onChange={e=>setOther(e.target.value)}
              placeholder="Tell us more..." rows={3} style={{...s.inp,marginTop:8}}/>
          )}
        </>}

        {step===7&&<>
          <span style={s.lbl}>Detailed Ratings</span>
          <div style={s.h1}>Rate each area</div>
          {metricsList.map(m=>(
            <div key={m} style={s.card}>
              <div style={{fontFamily:"'Space Mono',monospace",fontSize:11,color:"#777",marginBottom:12}}>{m}</div>
              <Stars size={32} value={metrics[m]||0} onChange={v=>setMetrics(p=>({...p,[m]:v}))}/>
            </div>
          ))}
        </>}

        {step===8&&<>
          <span style={s.lbl}>Recommendation</span>
          <div style={s.h1}>Would you recommend Hoppr?</div>
          <div style={{fontFamily:"'Space Mono',monospace",fontSize:11,color:"#555",marginBottom:16}}>0 = not at all · 10 = absolutely yes</div>
          <div style={s.card}><NPSPicker value={nps} onChange={setNps}/></div>
          {nps!==null&&nps<=6&&(
            <div style={{...s.card,marginTop:10}}>
              <div style={{fontFamily:"'Space Mono',monospace",fontSize:11,color:"#777",marginBottom:12}}>Would you like a callback?</div>
              <div style={{display:"flex",gap:10,marginBottom:wantsCB?12:0}}>
                <button onClick={()=>setWantsCB(true)} style={wantsCB?s.chipA:s.chip}>Yes please</button>
                <button onClick={()=>setWantsCB(false)} style={!wantsCB?s.chipA:s.chip}>No thanks</button>
              </div>
              {wantsCB&&<input value={contact} onChange={e=>setContact(e.target.value)} placeholder="Your WhatsApp number" style={s.inp}/>}
            </div>
          )}
        </>}

        {step===9&&<>
          <span style={s.lbl}>Final Thoughts</span>
          <div style={s.h1}>Anything else?</div>
          <div style={{fontFamily:"'Space Mono',monospace",fontSize:11,color:"#555",marginBottom:14}}>Optional — we read every word.</div>
          <textarea value={comment} onChange={e=>setComment(e.target.value)}
            placeholder="Tell us what you loved or what we can do better..." rows={5}
            style={s.inp}/>
          <div style={{...s.card,background:"#001500",border:"1px solid #1a3a10",marginTop:12}}>
            <div style={{fontFamily:"'Space Mono',monospace",fontSize:10,color:"#39FF14",marginBottom:10,letterSpacing:1}}>YOUR SUMMARY</div>
            {[["Centre",centre],["Division",division],["Sport",sport],["Rating","⭐".repeat(rating)],["NPS",nps!==null?`${nps}/10`:"-"]].map(([k,v])=>(
              <div key={k} style={{display:"flex",justifyContent:"space-between",marginBottom:5}}>
                <span style={{fontFamily:"'Space Mono',monospace",fontSize:10,color:"#444"}}>{k}</span>
                <span style={{fontFamily:"'Space Mono',monospace",fontSize:10,color:"#aaa"}}>{v}</span>
              </div>
            ))}
          </div>
        </>}

        <div style={{flex:1,minHeight:20}}/>
      </div>

      {/* FOOTER */}
      <div style={s.foot}>
        <button
          style={{...s.btn,opacity:canNext()&&!saving?1:0.35,cursor:canNext()&&!saving?"pointer":"not-allowed"}}
          disabled={!canNext()||saving}
          onClick={async()=>{if(step<9){next();return;}await handleSubmit();}}>
          {saving?"Submitting…":step<9?"Continue →":"Submit Feedback 🚀"}
        </button>
        {step>1&&<button style={s.btnD} onClick={back}>← Back</button>}
        {step===1&&(
          <div style={{textAlign:"center",marginTop:10}}>
            <button onClick={onAdmin}
              style={{background:"none",border:"none",fontFamily:"'Space Mono',monospace",fontSize:10,color:"#252525",cursor:"pointer",letterSpacing:1,WebkitTapHighlightColor:"transparent"}}>
              Admin Access →
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

// ── ADMIN LOGIN ───────────────────────────────────────────────────────────────
function AdminLogin({onSuccess}) {
  const [email,setEmail]     = useState("");
  const [password,setPass]   = useState("");
  const [loading,setLoading] = useState(false);
  const [error,setError]     = useState("");

  const login=()=>{
    setLoading(true);setError("");
    setTimeout(()=>{
      if(email.trim().toLowerCase()===ADMIN_EMAIL&&password===ADMIN_PASSWORD){
        onSuccess(email.trim().toLowerCase());
      } else if(email.trim().toLowerCase()!==ADMIN_EMAIL){
        setError("Access denied. Only info@hoppr.club is authorised.");
      } else {
        setError("Incorrect password.");
      }
      setLoading(false);
    },800);
  };

  const s={
    page:{position:"fixed",inset:0,background:"#000",display:"flex",flexDirection:"column",justifyContent:"center",padding:"32px 20px",overflow:"hidden"},
    inp: {width:"100%",background:"#0f0f0f",border:"1.5px solid #1a1a1a",borderRadius:12,color:"#fff",fontFamily:"'Space Mono',monospace",fontSize:16,padding:"14px",outline:"none",boxSizing:"border-box",WebkitAppearance:"none",marginBottom:14},
    btn: {width:"100%",padding:"17px",borderRadius:13,border:"none",background:"#39FF14",color:"#000",fontWeight:700,fontSize:17,cursor:"pointer",fontFamily:"'Rajdhani',sans-serif",boxShadow:"0 0 20px #39FF1444",WebkitTapHighlightColor:"transparent"},
    lbl: {fontFamily:"'Space Mono',monospace",fontSize:10,color:"#444",letterSpacing:2,textTransform:"uppercase",display:"block",marginBottom:8},
  };

  return (
    <div style={s.page}>
      <div style={{textAlign:"center",marginBottom:36}}>
        <div style={{fontFamily:"'Rajdhani',sans-serif",fontSize:26,fontWeight:700,color:"#39FF14",letterSpacing:2,marginBottom:2}}>HOPPR</div>
        <div style={{fontFamily:"'Space Mono',monospace",fontSize:8,color:"#222",letterSpacing:3,marginBottom:24}}>SPORTS CENTRES</div>
        <div style={{fontSize:44,marginBottom:14}}>🔐</div>
        <div style={{fontFamily:"'Rajdhani',sans-serif",fontSize:24,fontWeight:700,color:"#fff",marginBottom:6}}>Admin Access</div>
        <div style={{fontFamily:"'Space Mono',monospace",fontSize:11,color:"#444",lineHeight:1.8}}>Restricted to authorised Hoppr team only.</div>
      </div>
      <span style={s.lbl}>Email</span>
      <input value={email} onChange={e=>setEmail(e.target.value)} placeholder="info@hoppr.club" type="email" style={s.inp}/>
      <span style={s.lbl}>Password</span>
      <input value={password} onChange={e=>setPass(e.target.value)} onKeyDown={e=>e.key==="Enter"&&login()} placeholder="Enter password" type="password" style={s.inp}/>
      {error&&<div style={{background:"#1a0000",border:"1px solid #7f1d1d",borderRadius:10,padding:"10px 14px",fontFamily:"'Space Mono',monospace",fontSize:11,color:"#f87171",marginBottom:16}}>🚫 {error}</div>}
      <button onClick={login} disabled={!email.trim()||!password.trim()||loading}
        style={{...s.btn,opacity:!email.trim()||!password.trim()||loading?0.4:1,marginTop:4}}>
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

function AdminDashboard({onLogout}) {
  const [centreF,setCF] = useState("All");
  const [divF,setDF]    = useState("All");
  const [tab,setTab]    = useState("overview");
  const [search,setSrch]= useState("");
  const [data,setData]  = useState(DUMMY);
  const [loading,setLd] = useState(false);

  const load=async()=>{
    setLd(true);
    try{const res=await fetch(`${SHEET_URL}?action=fetch&t=${Date.now()}`);const j=await res.json();if(j&&j.length)setData(j);}
    catch(_){}
    setLd(false);
  };

  const rows=data.filter(r=>{
    if(centreF!=="All"&&r.centre!==centreF)return false;
    if(divF!=="All"&&r.division!==divF)return false;
    return true;
  });

  const esc=rows.filter(r=>r.escalated==="YES");
  const rtgs=rows.map(r=>+r.overall_rating).filter(Boolean);
  const npsl=rows.map(r=>+r.nps).filter(v=>!isNaN(v)&&String(v)!=="");
  const oAvg=avgF(rtgs).toFixed(1);
  const nps=npsScore(npsl);
  const escRate=rows.length?Math.round(esc.length/rows.length*100):0;
  const paths={low:rows.filter(r=>r.path==="low").length,mid:rows.filter(r=>r.path==="mid").length,high:rows.filter(r=>r.path==="high").length};

  const issueMap={};
  rows.filter(r=>r.issue).forEach(r=>{issueMap[r.issue]=(issueMap[r.issue]||0)+1;});
  const topIssues=Object.entries(issueMap).sort((a,b)=>b[1]-a[1]);

  const sportMap={};
  rows.forEach(r=>{if(!sportMap[r.sport])sportMap[r.sport]=[];sportMap[r.sport].push(+r.overall_rating);});
  const sportStats=Object.entries(sportMap).map(([s,v])=>({sport:s,avg:avgF(v).toFixed(1),count:v.length})).sort((a,b)=>b.count-a.count);

  const mAvg=(list,div)=>list.map(m=>{
    const vals=rows.filter(r=>r.division===div).map(r=>{try{const p=JSON.parse(r.specific_ratings);return p[m]||0;}catch{return 0;}}).filter(Boolean);
    return{metric:m,avg:avgF(vals).toFixed(1)};
  });

  const comments=rows.filter(r=>r.comment).filter(r=>!search||r.comment.toLowerCase().includes(search.toLowerCase()));
  const cPerf=CENTRES.map(c=>{const cr=rows.filter(r=>r.centre===c);return{centre:c,count:cr.length,avg:avgF(cr.map(r=>+r.overall_rating)).toFixed(1),nps:npsScore(cr.map(r=>+r.nps)),esc:cr.filter(r=>r.escalated==="YES").length};}).filter(r=>r.count>0);

  const tag=(col,txt)=><span style={{fontFamily:"'Space Mono',monospace",fontSize:9,padding:"3px 8px",borderRadius:10,background:col+"22",color:col,border:`1px solid ${col}44`}}>{txt}</span>;
  const pill=(a)=>({padding:"7px 12px",borderRadius:20,border:"none",cursor:"pointer",fontFamily:"'Space Mono',monospace",fontSize:10,background:a?"#39FF14":"#111",color:a?"#000":"#555",whiteSpace:"nowrap",WebkitTapHighlightColor:"transparent"});
  const card={background:"#0f0f0f",border:"1px solid #1a1a1a",borderRadius:14,padding:"13px",marginBottom:10};
  const sT={fontSize:13,fontWeight:700,color:"#fff",marginBottom:10,marginTop:18,fontFamily:"'Space Mono',monospace"};
  const tabS=(a)=>({flex:1,padding:"12px 4px",border:"none",background:"transparent",cursor:"pointer",fontFamily:"'Space Mono',monospace",fontSize:9,letterSpacing:1,textTransform:"uppercase",color:a?"#39FF14":"#333",borderBottom:a?"2px solid #39FF14":"2px solid transparent",WebkitTapHighlightColor:"transparent"});

  return (
    <div style={{position:"fixed",inset:0,background:"#000",display:"flex",flexDirection:"column",overflow:"hidden"}}>
      {/* Sticky header */}
      <div style={{flexShrink:0,background:"#000",borderBottom:"1px solid #111",padding:"14px 14px 0"}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12}}>
          <div>
            <div style={{fontFamily:"'Rajdhani',sans-serif",fontSize:20,fontWeight:700,color:"#39FF14",letterSpacing:1}}>HOPPR</div>
            <div style={{fontFamily:"'Space Mono',monospace",fontSize:7,color:"#222",letterSpacing:2}}>ADMIN DASHBOARD</div>
          </div>
          <div style={{display:"flex",gap:8}}>
            <button onClick={load} style={{fontFamily:"'Space Mono',monospace",fontSize:11,padding:"8px 12px",borderRadius:8,border:"1px solid #1a1a1a",background:"#111",color:"#39FF14",cursor:"pointer",WebkitTapHighlightColor:"transparent"}}>
              {loading?"…":"↻ Refresh"}
            </button>
            <button onClick={onLogout} style={{fontFamily:"'Space Mono',monospace",fontSize:11,padding:"8px 12px",borderRadius:8,border:"1px solid #3a1212",background:"#1a0000",color:"#f87171",cursor:"pointer",WebkitTapHighlightColor:"transparent"}}>
              Exit
            </button>
          </div>
        </div>
        {/* KPI row */}
        <div style={{display:"flex",gap:8,marginBottom:12}}>
          {[["Resp",rows.length,"#fff"],["Avg",`${oAvg}★`,"#39FF14"],["NPS",nps!==null?nps:"—",nps!==null?(nps>=50?"#39FF14":nps>=0?"#facc15":"#f97316"):"#555"],["Esc",`${escRate}%`,"#f87171"]].map(([l,v,c])=>(
            <div key={l} style={{flex:1,background:"#0f0f0f",border:"1px solid #1a1a1a",borderRadius:12,padding:"10px 6px",textAlign:"center"}}>
              <div style={{fontFamily:"'Space Mono',monospace",fontSize:8,color:"#444",letterSpacing:1,marginBottom:4}}>{l}</div>
              <div style={{fontFamily:"'Rajdhani',sans-serif",fontSize:20,fontWeight:700,color:c}}>{v}</div>
            </div>
          ))}
        </div>
        {/* Tabs */}
        <div style={{display:"flex",overflowX:"auto",borderBottom:"1px solid #111"}}>
          {[["overview","📊 Overview"],["escalations","🚨 Flags"],["breakdown","📈 Breakdown"],["comments","💬 Comments"],["feed","🕐 Feed"]].map(([t,l])=>(
            <button key={t} style={tabS(tab===t)} onClick={()=>setTab(t)}>{l}</button>
          ))}
        </div>
      </div>

      {/* Scrollable body */}
      <div style={{flex:1,overflowY:"auto",padding:"14px 14px 40px",WebkitOverflowScrolling:"touch"}}>
        {/* Filters */}
        <div style={{overflowX:"auto",paddingBottom:6,marginBottom:8}}>
          <div style={{display:"flex",gap:6,minWidth:"max-content"}}>
            {["All",...CENTRES].map(c=><button key={c} style={pill(centreF===c)} onClick={()=>setCF(c)}>{c}</button>)}
          </div>
        </div>
        <div style={{display:"flex",gap:6,marginBottom:16}}>
          {["All","Coaching","Pay & Play"].map(d=><button key={d} style={pill(divF===d)} onClick={()=>setDF(d)}>{d}</button>)}
        </div>

        {esc.length>0&&(
          <div style={{background:"#1a0000",border:"1.5px solid #7f1d1d",borderRadius:12,padding:"10px 14px",marginBottom:14,display:"flex",alignItems:"center",gap:10}}>
            <span style={{fontSize:18}}>🚨</span>
            <div>
              <div style={{fontFamily:"'Rajdhani',sans-serif",fontWeight:700,color:"#f87171",fontSize:15}}>{esc.length} Active Escalation{esc.length>1?"s":""}</div>
              <div style={{fontFamily:"'Space Mono',monospace",fontSize:9,color:"#7f4f4f"}}>Requires immediate attention</div>
            </div>
          </div>
        )}

        {tab==="overview"&&<>
          <div style={sT}>Path Breakdown</div>
          {[["😔 Low (1–2★)",paths.low,"#f87171"],["😐 Mid (3★)",paths.mid,"#facc15"],["😊 High (4–5★)",paths.high,"#39FF14"]].map(([l,v,c])=>(
            <div key={l} style={{...card,display:"flex",alignItems:"center",gap:10}}>
              <span style={{fontFamily:"'Space Mono',monospace",fontSize:11,color:"#bbb",flex:1}}>{l}</span>
              <div style={{width:70,height:5,background:"#111",borderRadius:3,overflow:"hidden"}}>
                <div style={{width:`${rows.length?v/rows.length*100:0}%`,height:"100%",background:c,borderRadius:3}}/>
              </div>
              <span style={{fontFamily:"'Rajdhani',sans-serif",fontWeight:700,color:c,minWidth:24,textAlign:"right"}}>{v}</span>
            </div>
          ))}
          <div style={sT}>Centre Performance</div>
          <div style={{overflowX:"auto"}}>
            <table style={{width:"100%",borderCollapse:"collapse",fontFamily:"'Space Mono',monospace",fontSize:10,minWidth:320}}>
              <thead><tr style={{borderBottom:"1px solid #1a1a1a"}}>
                {["Centre","Resp","Avg","NPS","Esc"].map(h=><th key={h} style={{padding:"8px 6px",color:"#39FF14",textAlign:"left",letterSpacing:1,whiteSpace:"nowrap"}}>{h}</th>)}
              </tr></thead>
              <tbody>
                {cPerf.map(c=>(
                  <tr key={c.centre} style={{borderBottom:"1px solid #0a0a0a"}}>
                    <td style={{padding:"8px 6px",color:"#bbb",whiteSpace:"nowrap"}}>{c.centre}</td>
                    <td style={{padding:"8px 6px",color:"#fff"}}>{c.count}</td>
                    <td style={{padding:"8px 6px",color:"#39FF14"}}>{c.avg}★</td>
                    <td style={{padding:"8px 6px",color:c.nps>=50?"#39FF14":c.nps>=0?"#facc15":"#f97316"}}>{c.nps??"-"}</td>
                    <td style={{padding:"8px 6px",color:c.esc>0?"#f87171":"#555"}}>{c.esc}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div style={sT}>Top Issues</div>
          {topIssues.length===0&&<div style={{fontFamily:"'Space Mono',monospace",fontSize:11,color:"#444"}}>No issues ✅</div>}
          {topIssues.map(([issue,count])=>(
            <div key={issue} style={{...card,display:"flex",justifyContent:"space-between",alignItems:"center"}}>
              <span style={{fontFamily:"'Space Mono',monospace",fontSize:11,color:"#bbb"}}>{issue}</span>
              <span style={{fontFamily:"'Rajdhani',sans-serif",fontWeight:700,color:"#f87171",fontSize:16}}>{count}×</span>
            </div>
          ))}
        </>}

        {tab==="escalations"&&<>
          <div style={{fontFamily:"'Space Mono',monospace",fontSize:11,color:"#f87171",marginBottom:12}}>{esc.length} requiring action</div>
          {esc.length===0&&<div style={{fontFamily:"'Space Mono',monospace",fontSize:11,color:"#39FF14"}}>No escalations ✅</div>}
          {esc.map((r,i)=>(
            <div key={i} style={{...card,background:"#0d0000",border:"1px solid #7f1d1d",marginBottom:12}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:8}}>
                <div style={{display:"flex",gap:6}}>{tag("#f87171","🚨 FLAGGED")}{tag("#f97316",r.division)}</div>
                <span style={{fontFamily:"'Space Mono',monospace",fontSize:9,color:"#444"}}>{new Date(r.timestamp).toLocaleString("en-IN",{day:"2-digit",month:"short",hour:"2-digit",minute:"2-digit"})}</span>
              </div>
              <div style={{fontFamily:"'Rajdhani',sans-serif",fontWeight:700,color:"#fff",fontSize:16,marginBottom:4}}>{r.centre}</div>
              <div style={{fontFamily:"'Space Mono',monospace",fontSize:11,color:"#f87171",marginBottom:4}}>{"⭐".repeat(+r.overall_rating)} · {r.issue||"Not specified"}</div>
              {r.issue_detail&&<div style={{fontFamily:"'Space Mono',monospace",fontSize:11,color:"#666",marginBottom:6}}>"{r.issue_detail}"</div>}
              {r.contact&&<div style={{fontFamily:"'Space Mono',monospace",fontSize:11,color:"#39FF14"}}>📱 {r.contact}</div>}
              <div style={{marginTop:10}}>{tag("#facc15","NEW")}</div>
            </div>
          ))}
        </>}

        {tab==="breakdown"&&<>
          <div style={sT}>🎓 Coaching Metrics</div>
          {mAvg(COACHING_METRICS,"Coaching").map(m=>(
            <div key={m.metric} style={card}>
              <div style={{display:"flex",justifyContent:"space-between",marginBottom:8}}>
                <span style={{fontFamily:"'Space Mono',monospace",fontSize:11,color:"#888"}}>{m.metric}</span>
                <span style={{fontFamily:"'Rajdhani',sans-serif",fontWeight:700,color:"#39FF14"}}>{m.avg}★</span>
              </div>
              <div style={{height:5,background:"#111",borderRadius:3,overflow:"hidden"}}>
                <div style={{width:`${(+m.avg/5)*100}%`,height:"100%",background:"#39FF14",borderRadius:3}}/>
              </div>
            </div>
          ))}
          <div style={sT}>🎾 Pay & Play Metrics</div>
          {mAvg(PAYPLAY_METRICS,"Pay & Play").map(m=>(
            <div key={m.metric} style={card}>
              <div style={{display:"flex",justifyContent:"space-between",marginBottom:8}}>
                <span style={{fontFamily:"'Space Mono',monospace",fontSize:11,color:"#888"}}>{m.metric}</span>
                <span style={{fontFamily:"'Rajdhani',sans-serif",fontWeight:700,color:"#39FF14"}}>{m.avg}★</span>
              </div>
              <div style={{height:5,background:"#111",borderRadius:3,overflow:"hidden"}}>
                <div style={{width:`${(+m.avg/5)*100}%`,height:"100%",background:"#39FF14",borderRadius:3}}/>
              </div>
            </div>
          ))}
          <div style={sT}>Sport Ratings</div>
          {sportStats.map(s=>(
            <div key={s.sport} style={{...card,display:"flex",justifyContent:"space-between",alignItems:"center"}}>
              <span style={{fontFamily:"'Rajdhani',sans-serif",fontWeight:700,color:"#fff",fontSize:15}}>{s.sport}</span>
              <div style={{display:"flex",gap:10,alignItems:"center"}}>
                <span style={{fontFamily:"'Space Mono',monospace",fontSize:10,color:"#555"}}>{s.count}x</span>
                <span style={{fontFamily:"'Rajdhani',sans-serif",fontWeight:700,color:"#39FF14"}}>{s.avg}★</span>
              </div>
            </div>
          ))}
        </>}

        {tab==="comments"&&<>
          <input value={search} onChange={e=>setSrch(e.target.value)} placeholder="Search comments..."
            style={{width:"100%",background:"#0f0f0f",border:"1.5px solid #1a1a1a",borderRadius:12,color:"#fff",fontFamily:"'Space Mono',monospace",fontSize:14,padding:"13px",outline:"none",boxSizing:"border-box",WebkitAppearance:"none",marginBottom:14}}/>
          {comments.length===0&&<div style={{fontFamily:"'Space Mono',monospace",fontSize:11,color:"#444"}}>No comments found.</div>}
          {comments.map((r,i)=>(
            <div key={i} style={card}>
              <div style={{display:"flex",gap:6,marginBottom:8,flexWrap:"wrap"}}>
                {tag("#39FF14",r.centre)}{tag("#888",r.division)}
                {r.escalated==="YES"&&tag("#f87171","🚨")}
              </div>
              <div style={{fontFamily:"'Space Mono',monospace",fontSize:11,color:"#ccc",lineHeight:1.7,marginBottom:8}}>"{r.comment}"</div>
              <div style={{fontFamily:"'Space Mono',monospace",fontSize:10,color:"#444"}}>{"⭐".repeat(+r.overall_rating)} · NPS {r.nps} · {new Date(r.timestamp).toLocaleDateString("en-IN")}</div>
            </div>
          ))}
        </>}

        {tab==="feed"&&<>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12}}>
            <div style={{fontFamily:"'Rajdhani',sans-serif",fontWeight:700,color:"#fff",fontSize:16}}>Live Feed</div>
            <div style={{fontFamily:"'Space Mono',monospace",fontSize:9,color:"#444"}}>{new Date().toLocaleTimeString("en-IN",{hour:"2-digit",minute:"2-digit"})}</div>
          </div>
          <div style={{overflowX:"auto"}}>
            <table style={{width:"100%",borderCollapse:"collapse",fontFamily:"'Space Mono',monospace",fontSize:10,minWidth:380}}>
              <thead><tr style={{borderBottom:"1px solid #1a1a1a"}}>
                {["Time","Centre","Div","★","Path","🚨"].map(h=><th key={h} style={{padding:"8px 5px",color:"#39FF14",textAlign:"left",whiteSpace:"nowrap"}}>{h}</th>)}
              </tr></thead>
              <tbody>
                {[...data].reverse().map((r,i)=>(
                  <tr key={i} style={{borderBottom:"1px solid #0a0a0a"}}>
                    <td style={{padding:"7px 5px",color:"#555",whiteSpace:"nowrap"}}>{new Date(r.timestamp).toLocaleTimeString("en-IN",{hour:"2-digit",minute:"2-digit"})}</td>
                    <td style={{padding:"7px 5px",color:"#bbb",whiteSpace:"nowrap",maxWidth:90,overflow:"hidden",textOverflow:"ellipsis"}}>{r.centre}</td>
                    <td style={{padding:"7px 5px",color:"#888"}}>{r.division==="Coaching"?"🎓":"🎾"}</td>
                    <td style={{padding:"7px 5px",color:"#39FF14"}}>{r.overall_rating}★</td>
                    <td style={{padding:"7px 5px"}}><span style={{color:r.path==="low"?"#f87171":r.path==="mid"?"#facc15":"#39FF14",fontSize:9,textTransform:"uppercase"}}>{r.path}</span></td>
                    <td style={{padding:"7px 5px"}}><span style={{color:r.escalated==="YES"?"#f87171":"#333"}}>{r.escalated==="YES"?"🚨":"—"}</span></td>
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
  const [page,setPage]   = useState("feedback");
  const [auth,setAuth]   = useState(false);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Rajdhani:wght@600;700&family=Space+Mono:wght@400;700&display=swap');
        *{box-sizing:border-box;margin:0;padding:0;}
        html,body,#root{height:100%;width:100%;overflow:hidden;background:#000;}
        body{-webkit-font-smoothing:antialiased;-webkit-text-size-adjust:100%;}
        button{outline:none;-webkit-tap-highlight-color:transparent;}
        input,textarea{outline:none;-webkit-appearance:none;}
        input:focus,textarea:focus{border-color:#39FF14!important;box-shadow:0 0 0 2px #39FF1422!important;}
        ::-webkit-scrollbar{width:2px;height:2px;}
        ::-webkit-scrollbar-thumb{background:#1a1a1a;border-radius:4px;}
      `}</style>

      {page==="feedback" && (
        <FeedbackPage onAdmin={()=>setPage("admin")}/>
      )}
      {page==="admin" && !auth && (
        <AdminLogin onSuccess={()=>{setAuth(true);}}/>
      )}
      {page==="admin" && auth && (
        <AdminDashboard onLogout={()=>{setAuth(false);setPage("feedback");}}/>
      )}
    </>
  );
}
