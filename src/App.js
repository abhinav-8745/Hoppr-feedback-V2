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

function Stars({value,onChange,size=40}) {
  const [h,setH]=useState(null);
  const labels=["","Terrible","Poor","Okay","Good","Excellent!"];
  return (
    <div>
      <div style={{display:"flex",gap:8,justifyContent:"center"}}>
        {[1,2,3,4,5].map(s=>{
          const on=s<=(h??value);
          return <button key={s} onClick={()=>onChange?.(s)}
            onMouseEnter={()=>onChange&&setH(s)} onMouseLeave={()=>onChange&&setH(null)}
            style={{background:"none",border:"none",cursor:onChange?"pointer":"default",fontSize:size,lineHeight:1,padding:4,WebkitTapHighlightColor:"transparent",transition:"transform .15s",transform:on?"scale(1.2)":"scale(1)",filter:on?"drop-shadow(0 0 6px #39FF14)":"grayscale(1) opacity(.2)"}}>⭐</button>;
        })}
      </div>
      {(h??value)>0&&<div style={{textAlign:"center",color:"#39FF14",fontFamily:"'Space Mono',monospace",fontSize:13,marginTop:10,letterSpacing:1}}>{labels[h??value]}</div>}
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
            style={{width:44,height:44,borderRadius:10,border:sel?`2px solid ${col(n)}`:"2px solid #222",background:sel?col(n)+"22":"#111",color:sel?col(n):"#555",fontFamily:"'Space Mono',monospace",fontSize:14,fontWeight:sel?700:400,cursor:"pointer",WebkitTapHighlightColor:"transparent",transform:sel?"scale(1.1)":"scale(1)"}}>{n}</button>;
        })}
      </div>
      <div style={{display:"flex",justifyContent:"space-between",fontFamily:"'Space Mono',monospace",fontSize:10,color:"#333"}}>
        <span>Not likely</span><span>Extremely likely</span>
      </div>
    </div>
  );
}

function FeedbackPage({onAdmin}) {
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
    try{await fetch(SHEET_URL,{method:"POST",mode:"no-cors",headers:{"Content-Type":"application/json"},body:JSON.stringify({timestamp:new Date().toISOString(),centre,division,role,sport,overall_rating:rating,path,issue:chips.join(", "),issue_detail:otherText,specific_ratings:JSON.stringify(metrics),nps,wants_followup:wantsCB?"Yes":"No",contact,comment,escalated:rating<=2||nps<=6?"YES":"no"})});}catch(_){}
    setSaving(false);setStep(10);
  };

  // SHARED STYLES
  const card=(sel)=>({
    display:"flex",justifyContent:"space-between",alignItems:"center",
    width:"100%",padding:"20px 18px",marginBottom:10,borderRadius:14,
    border:sel?"1.5px solid #39FF14":"1px solid #1e1e1e",
    background:sel?"#001800":"#0f0f0f",
    boxShadow:sel?"0 0 12px #39FF1422":"none",
    cursor:"pointer",textAlign:"left",WebkitTapHighlightColor:"transparent",
    boxSizing:"border-box",
  });
  const divCard=(sel)=>({
    width:"100%",padding:"22px 18px",marginBottom:12,borderRadius:14,
    border:sel?"1.5px solid #39FF14":"1px solid #1e1e1e",
    background:sel?"#001800":"#0f0f0f",
    cursor:"pointer",textAlign:"left",WebkitTapHighlightColor:"transparent",
    boxSizing:"border-box",
  });
  const metCard={width:"100%",padding:"18px",marginBottom:12,borderRadius:14,border:"1px solid #1e1e1e",background:"#0f0f0f",boxSizing:"border-box"};
  const chip=(sel)=>({padding:"12px 18px",borderRadius:22,border:sel?"1.5px solid #39FF14":"1.5px solid #1e1e1e",background:sel?"#001800":"#0f0f0f",color:sel?"#39FF14":"#777",fontSize:14,cursor:"pointer",fontFamily:"'Space Mono',monospace",WebkitTapHighlightColor:"transparent",marginBottom:10,marginRight:8,display:"inline-block"});
  const inp={width:"100%",background:"#0f0f0f",border:"1.5px solid #1e1e1e",borderRadius:12,color:"#fff",fontFamily:"'Space Mono',monospace",fontSize:16,padding:"16px",outline:"none",boxSizing:"border-box",WebkitAppearance:"none"};
  const lbl={fontFamily:"'Space Mono',monospace",fontSize:11,color:"#444",letterSpacing:2,textTransform:"uppercase",display:"block",marginBottom:10};
  const h1={fontSize:26,fontWeight:700,color:"#fff",marginBottom:20,fontFamily:"'Rajdhani',sans-serif",lineHeight:1.2};
  const CTAbtn=(active)=>({
    width:"100%",padding:"20px",borderRadius:14,border:"none",
    background:active?"#39FF14":"#1a1a1a",
    color:active?"#000":"#444",
    fontWeight:700,fontSize:18,cursor:active?"pointer":"not-allowed",
    fontFamily:"'Rajdhani',sans-serif",
    boxShadow:active?"0 0 20px #39FF1444":"none",
    WebkitTapHighlightColor:"transparent",
    letterSpacing:0.5,
  });
  const backBtn={width:"100%",padding:"18px",borderRadius:14,border:"1.5px solid #222",background:"transparent",color:"#555",fontWeight:700,fontSize:16,cursor:"pointer",fontFamily:"'Rajdhani',sans-serif",WebkitTapHighlightColor:"transparent",marginTop:10};

  if(step===10) return (
    <div style={{minHeight:"100vh",background:"#000",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:"32px 20px",textAlign:"center"}}>
      <div style={{fontSize:80,marginBottom:20}}>{rating>=4?"🏆":rating<=2?"🙏":"✅"}</div>
      <div style={{fontFamily:"'Rajdhani',sans-serif",fontSize:28,fontWeight:700,color:"#fff",marginBottom:12}}>
        {rating>=4?"You made our day!":rating<=2?"We've flagged this.":"Thanks! We'll improve."}
      </div>
      <div style={{fontFamily:"'Space Mono',monospace",fontSize:12,color:"#555",lineHeight:2,marginBottom:40}}>
        {rating<=2?"Our team will make it right. 💪":"Your feedback helps Hoppr grow. 🎾"}
      </div>
      <button onClick={reset} style={{...CTAbtn(true),width:"auto",padding:"18px 36px"}}>Give More Feedback</button>
    </div>
  );

  return (
    <div style={{minHeight:"100vh",background:"#000",display:"flex",flexDirection:"column"}}>

      {/* HEADER */}
      <div style={{padding:"20px 20px 0",flexShrink:0}}>
        <div style={{textAlign:"center",marginBottom:16}}>
          <div style={{fontFamily:"'Rajdhani',sans-serif",fontSize:28,fontWeight:700,color:"#39FF14",letterSpacing:2,textShadow:"0 0 12px #39FF1455"}}>HOPPR</div>
          <div style={{fontFamily:"'Space Mono',monospace",fontSize:9,color:"#222",letterSpacing:3}}>SPORTS CENTRES</div>
        </div>
        {/* Progress bar */}
        <div style={{height:3,background:"#111",borderRadius:2,overflow:"hidden",marginBottom:6}}>
          <div style={{height:"100%",width:`${(actualStep/TOTAL)*100}%`,background:"#39FF14",boxShadow:"0 0 8px #39FF14",transition:"width .4s ease",borderRadius:2}}/>
        </div>
        <div style={{fontFamily:"'Space Mono',monospace",fontSize:10,color:"#333",letterSpacing:1,marginBottom:0,textAlign:"center"}}>STEP {actualStep} OF {TOTAL}</div>
      </div>

      {/* SCROLLABLE BODY */}
      <div style={{flex:1,overflowY:"auto",padding:"20px 20px 20px",WebkitOverflowScrolling:"touch"}}>

        {step===1&&<>
          <span style={lbl}>Centre</span>
          <div style={h1}>Which centre did you visit?</div>
          {CENTRES.map(c=>(
            <button key={c} onClick={()=>setCentre(c)} style={card(centre===c)}>
              <span style={{fontFamily:"'Rajdhani',sans-serif",fontWeight:700,fontSize:20,color:centre===c?"#39FF14":"#ccc"}}>🏟️  {c}</span>
              {centre===c&&<span style={{color:"#39FF14",fontSize:20}}>✓</span>}
            </button>
          ))}
        </>}

        {step===2&&<>
          <span style={lbl}>Division</span>
          <div style={h1}>What brings you here?</div>
          {[["🎓","Coaching","For Parents & Kids in coaching"],["🎾","Pay & Play","For walk-in players"]].map(([e,d,sub])=>(
            <button key={d} onClick={()=>setDiv(d)} style={divCard(division===d)}>
              <div style={{fontSize:34,marginBottom:8}}>{e}</div>
              <div style={{fontFamily:"'Rajdhani',sans-serif",fontWeight:700,fontSize:22,color:division===d?"#39FF14":"#fff",marginBottom:4}}>{d}</div>
              <div style={{fontFamily:"'Space Mono',monospace",fontSize:12,color:"#555"}}>{sub}</div>
            </button>
          ))}
        </>}

        {step===3&&<>
          <span style={lbl}>Role</span>
          <div style={h1}>And you are?</div>
          {[["👨‍👩‍👧","Parent"],["🏃","Kid / Student"]].map(([e,r])=>(
            <button key={r} onClick={()=>setRole(r)} style={{...card(role===r),padding:"24px 18px"}}>
              <div style={{display:"flex",alignItems:"center",gap:16}}>
                <span style={{fontSize:36}}>{e}</span>
                <span style={{fontFamily:"'Rajdhani',sans-serif",fontWeight:700,fontSize:22,color:role===r?"#39FF14":"#ccc"}}>{r}</span>
              </div>
            </button>
          ))}
        </>}

        {step===4&&<>
          <span style={lbl}>Sport</span>
          <div style={h1}>Which sport did you play?</div>
          <div style={{display:"flex",flexWrap:"wrap"}}>
            {SPORTS.map(sp=>(
              <button key={sp} onClick={()=>setSport(sp)} style={chip(sport===sp)}>{sp}</button>
            ))}
          </div>
        </>}

        {step===5&&<>
          <span style={lbl}>Overall Rating</span>
          <div style={h1}>How was your session?</div>
          <div style={{marginTop:32,marginBottom:24}}><Stars value={rating} onChange={setRating} size={50}/></div>
        </>}

        {step===6&&<>
          <span style={lbl}>{path==="low"?"Issue":path==="mid"?"Improvement":"Highlight"}</span>
          <div style={h1}>{path==="low"?"What went wrong?":path==="mid"?"What could be better?":"What did you love?"}</div>
          <div style={{display:"flex",flexWrap:"wrap"}}>
            {chipOptions.map(c=>(
              <button key={c} onClick={()=>toggle(c)} style={chip(chips.includes(c))}>{c}</button>
            ))}
          </div>
          {chips.includes("Something else")&&(
            <textarea value={otherText} onChange={e=>setOther(e.target.value)} placeholder="Tell us more..." rows={3} style={{...inp,marginTop:12}}/>
          )}
        </>}

        {step===7&&<>
          <span style={lbl}>Detailed Ratings</span>
          <div style={h1}>Rate each area</div>
          {metricsList.map(m=>(
            <div key={m} style={metCard}>
              <div style={{fontFamily:"'Space Mono',monospace",fontSize:12,color:"#777",marginBottom:14}}>{m}</div>
              <Stars size={34} value={metrics[m]||0} onChange={v=>setMetrics(p=>({...p,[m]:v}))}/>
            </div>
          ))}
        </>}

        {step===8&&<>
          <span style={lbl}>Recommendation</span>
          <div style={h1}>Would you recommend Hoppr?</div>
          <div style={{fontFamily:"'Space Mono',monospace",fontSize:12,color:"#555",marginBottom:16}}>0 = not at all · 10 = absolutely yes</div>
          <div style={{background:"#0f0f0f",border:"1px solid #1e1e1e",borderRadius:14,padding:"18px",marginBottom:14}}>
            <NPSPicker value={nps} onChange={setNps}/>
          </div>
          {nps!==null&&nps<=6&&(
            <div style={{background:"#0f0f0f",border:"1px solid #1e1e1e",borderRadius:14,padding:"18px",marginBottom:14}}>
              <div style={{fontFamily:"'Space Mono',monospace",fontSize:12,color:"#777",marginBottom:14}}>Would you like a callback?</div>
              <div style={{display:"flex",gap:10,marginBottom:wantsCB?14:0}}>
                <button onClick={()=>setWantsCB(true)} style={chip(wantsCB)}>Yes please</button>
                <button onClick={()=>setWantsCB(false)} style={chip(!wantsCB)}>No thanks</button>
              </div>
              {wantsCB&&<input value={contact} onChange={e=>setContact(e.target.value)} placeholder="Your WhatsApp number" style={inp}/>}
            </div>
          )}
        </>}

        {step===9&&<>
          <span style={lbl}>Final Thoughts</span>
          <div style={h1}>Anything else?</div>
          <div style={{fontFamily:"'Space Mono',monospace",fontSize:12,color:"#555",marginBottom:14}}>Optional — we read every word.</div>
          <textarea value={comment} onChange={e=>setComment(e.target.value)} placeholder="Tell us what you loved or what we can do better..." rows={5} style={inp}/>
          <div style={{background:"#001500",border:"1px solid #1a3a10",borderRadius:14,padding:"16px",marginTop:14}}>
            <div style={{fontFamily:"'Space Mono',monospace",fontSize:10,color:"#39FF14",marginBottom:12,letterSpacing:1}}>YOUR SUMMARY</div>
            {[["Centre",centre],["Division",division],["Sport",sport],["Rating","⭐".repeat(rating)],["NPS",nps!==null?`${nps}/10`:"-"]].map(([k,v])=>(
              <div key={k} style={{display:"flex",justifyContent:"space-between",marginBottom:6}}>
                <span style={{fontFamily:"'Space Mono',monospace",fontSize:11,color:"#444"}}>{k}</span>
                <span style={{fontFamily:"'Space Mono',monospace",fontSize:11,color:"#aaa"}}>{v}</span>
              </div>
            ))}
          </div>
        </>}

        {/* BOTTOM BUTTONS */}
        <div style={{marginTop:24}}>
          <button
            style={CTAbtn(canNext()&&!saving)}
            disabled={!canNext()||saving}
            onClick={async()=>{if(step<9){next();return;}await handleSubmit();}}>
            {saving?"Submitting…":step<9?"Continue →":"Submit Feedback 🚀"}
          </button>
          {step>1&&<button style={backBtn} onClick={back}>← Back</button>}
          {step===1&&(
            <div style={{textAlign:"center",marginTop:20,paddingBottom:10}}>
              <button onClick={onAdmin} style={{background:"none",border:"none",fontFamily:"'Space Mono',monospace",fontSize:10,color:"#252525",cursor:"pointer",letterSpacing:1,WebkitTapHighlightColor:"transparent"}}>
                Admin Access →
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function AdminLogin({onSuccess}) {
  const [email,setEmail]   = useState("");
  const [password,setPass] = useState("");
  const [loading,setLoad]  = useState(false);
  const [error,setError]   = useState("");

  const login=()=>{
    setLoad(true);setError("");
    setTimeout(()=>{
      if(email.trim().toLowerCase()===ADMIN_EMAIL&&password===ADMIN_PASSWORD){onSuccess();}
      else if(email.trim().toLowerCase()!==ADMIN_EMAIL){setError("Access denied. Only info@hoppr.club is authorised.");}
      else{setError("Incorrect password.");}
      setLoad(false);
    },800);
  };

  const inp={width:"100%",background:"#0f0f0f",border:"1.5px solid #1e1e1e",borderRadius:12,color:"#fff",fontFamily:"'Space Mono',monospace",fontSize:16,padding:"16px",outline:"none",boxSizing:"border-box",WebkitAppearance:"none",marginBottom:14};
  const lbl={fontFamily:"'Space Mono',monospace",fontSize:11,color:"#444",letterSpacing:2,textTransform:"uppercase",display:"block",marginBottom:8};

  return (
    <div style={{minHeight:"100vh",background:"#000",display:"flex",flexDirection:"column",justifyContent:"center",padding:"32px 20px"}}>
      <div style={{textAlign:"center",marginBottom:40}}>
        <div style={{fontFamily:"'Rajdhani',sans-serif",fontSize:28,fontWeight:700,color:"#39FF14",letterSpacing:2,marginBottom:2}}>HOPPR</div>
        <div style={{fontFamily:"'Space Mono',monospace",fontSize:9,color:"#222",letterSpacing:3,marginBottom:28}}>SPORTS CENTRES</div>
        <div style={{fontSize:48,marginBottom:14}}>🔐</div>
        <div style={{fontFamily:"'Rajdhani',sans-serif",fontSize:26,fontWeight:700,color:"#fff",marginBottom:8}}>Admin Access</div>
        <div style={{fontFamily:"'Space Mono',monospace",fontSize:12,color:"#444",lineHeight:1.8}}>Restricted to authorised Hoppr team only.</div>
      </div>
      <span style={lbl}>Email</span>
      <input value={email} onChange={e=>setEmail(e.target.value)} placeholder="info@hoppr.club" type="email" style={inp}/>
      <span style={lbl}>Password</span>
      <input value={password} onChange={e=>setPass(e.target.value)} onKeyDown={e=>e.key==="Enter"&&login()} placeholder="Enter password" type="password" style={inp}/>
      {error&&<div style={{background:"#1a0000",border:"1px solid #7f1d1d",borderRadius:10,padding:"12px 16px",fontFamily:"'Space Mono',monospace",fontSize:12,color:"#f87171",marginBottom:16}}>🚫 {error}</div>}
      <button onClick={login} disabled={!email.trim()||!password.trim()||loading}
        style={{width:"100%",padding:"20px",borderRadius:14,border:"none",background:!email.trim()||!password.trim()||loading?"#1a1a1a":"#39FF14",color:!email.trim()||!password.trim()||loading?"#444":"#000",fontWeight:700,fontSize:18,cursor:"pointer",fontFamily:"'Rajdhani',sans-serif",boxShadow:"0 0 20px #39FF1444",WebkitTapHighlightColor:"transparent",marginTop:4}}>
        {loading?"Verifying…":"Access Dashboard →"}
      </button>
    </div>
  );
}

function avgF(arr){return arr.length?arr.reduce((a,b)=>a+b,0)/arr.length:0;}
function npsScore(arr){
  if(!arr.length)return null;
  return Math.round(arr.filter(n=>n>=9).length/arr.length*100-arr.filter(n=>n<=6).length/arr.length*100);
}

function AdminDashboard({onLogout}) {
  const [centreF,setCF]=useState("All");
  const [divF,setDF]   =useState("All");
  const [tab,setTab]   =useState("overview");
  const [search,setSrch]=useState("");
  const [data,setData] =useState(DUMMY);
  const [loading,setLd]=useState(false);

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
  const mAvg=(list,div)=>list.map(m=>{const vals=rows.filter(r=>r.division===div).map(r=>{try{const p=JSON.parse(r.specific_ratings);return p[m]||0;}catch{return 0;}}).filter(Boolean);return{metric:m,avg:avgF(vals).toFixed(1)};});
  const comments=rows.filter(r=>r.comment).filter(r=>!search||r.comment.toLowerCase().includes(search.toLowerCase()));
  const cPerf=CENTRES.map(c=>{const cr=rows.filter(r=>r.centre===c);return{centre:c,count:cr.length,avg:avgF(cr.map(r=>+r.overall_rating)).toFixed(1),nps:npsScore(cr.map(r=>+r.nps)),esc:cr.filter(r=>r.escalated==="YES").length};}).filter(r=>r.count>0);

  const tag=(col,txt)=><span style={{fontFamily:"'Space Mono',monospace",fontSize:10,padding:"3px 8px",borderRadius:10,background:col+"22",color:col,border:`1px solid ${col}44`}}>{txt}</span>;
  const pill=(a)=>({padding:"8px 14px",borderRadius:20,border:"none",cursor:"pointer",fontFamily:"'Space Mono',monospace",fontSize:11,background:a?"#39FF14":"#111",color:a?"#000":"#555",whiteSpace:"nowrap",WebkitTapHighlightColor:"transparent"});
  const card={background:"#0f0f0f",border:"1px solid #1e1e1e",borderRadius:14,padding:"14px",marginBottom:10};
  const sT={fontSize:14,fontWeight:700,color:"#fff",marginBottom:12,marginTop:20,fontFamily:"'Space Mono',monospace"};
  const tabS=(a)=>({flex:1,padding:"13px 4px",border:"none",background:"transparent",cursor:"pointer",fontFamily:"'Space Mono',monospace",fontSize:9,letterSpacing:1,textTransform:"uppercase",color:a?"#39FF14":"#333",borderBottom:a?"2px solid #39FF14":"2px solid transparent",WebkitTapHighlightColor:"transparent"});

  return (
    <div style={{minHeight:"100vh",background:"#000"}}>
      {/* Sticky header */}
      <div style={{position:"sticky",top:0,background:"#000",borderBottom:"1px solid #111",padding:"16px 16px 0",zIndex:10}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:14}}>
          <div>
            <div style={{fontFamily:"'Rajdhani',sans-serif",fontSize:22,fontWeight:700,color:"#39FF14",letterSpacing:1}}>HOPPR</div>
            <div style={{fontFamily:"'Space Mono',monospace",fontSize:8,color:"#222",letterSpacing:2}}>ADMIN DASHBOARD</div>
          </div>
          <div style={{display:"flex",gap:8}}>
            <button onClick={load} style={{fontFamily:"'Space Mono',monospace",fontSize:12,padding:"9px 14px",borderRadius:8,border:"1px solid #1a1a1a",background:"#111",color:"#39FF14",cursor:"pointer"}}>
              {loading?"…":"↻ Refresh"}
            </button>
            <button onClick={onLogout} style={{fontFamily:"'Space Mono',monospace",fontSize:12,padding:"9px 14px",borderRadius:8,border:"1px solid #3a1212",background:"#1a0000",color:"#f87171",cursor:"pointer"}}>
              Exit
            </button>
          </div>
        </div>
        {/* KPI */}
        <div style={{display:"flex",gap:8,marginBottom:14}}>
          {[["Responses",rows.length,"#fff"],["Avg Rating",`${oAvg}★`,"#39FF14"],["NPS Score",nps!==null?nps:"—",nps!==null?(nps>=50?"#39FF14":nps>=0?"#facc15":"#f97316"):"#555"],["Escalations",`${escRate}%`,"#f87171"]].map(([l,v,c])=>(
            <div key={l} style={{flex:1,background:"#0f0f0f",border:"1px solid #1e1e1e",borderRadius:12,padding:"10px 6px",textAlign:"center"}}>
              <div style={{fontFamily:"'Space Mono',monospace",fontSize:8,color:"#444",letterSpacing:1,marginBottom:4}}>{l}</div>
              <div style={{fontFamily:"'Rajdhani',sans-serif",fontSize:20,fontWeight:700,color:c}}>{v}</div>
            </div>
          ))}
        </div>
        <div style={{display:"flex",overflowX:"auto",borderBottom:"1px solid #111"}}>
          {[["overview","📊 Overview"],["escalations","🚨 Flags"],["breakdown","📈 Breakdown"],["comments","💬 Comments"],["feed","🕐 Feed"]].map(([t,l])=>(
            <button key={t} style={tabS(tab===t)} onClick={()=>setTab(t)}>{l}</button>
          ))}
        </div>
      </div>

      {/* Body */}
      <div style={{padding:"16px 16px 60px"}}>
        <div style={{overflowX:"auto",paddingBottom:6,marginBottom:8}}>
          <div style={{display:"flex",gap:6,minWidth:"max-content"}}>
            {["All",...CENTRES].map(c=><button key={c} style={pill(centreF===c)} onClick={()=>setCF(c)}>{c}</button>)}
          </div>
        </div>
        <div style={{display:"flex",gap:6,marginBottom:16}}>
          {["All","Coaching","Pay & Play"].map(d=><button key={d} style={pill(divF===d)} onClick={()=>setDF(d)}>{d}</button>)}
        </div>

        {esc.length>0&&(
          <div style={{background:"#1a0000",border:"1.5px solid #7f1d1d",borderRadius:12,padding:"12px 16px",marginBottom:16,display:"flex",alignItems:"center",gap:12}}>
            <span style={{fontSize:20}}>🚨</span>
            <div>
              <div style={{fontFamily:"'Rajdhani',sans-serif",fontWeight:700,color:"#f87171",fontSize:16}}>{esc.length} Active Escalation{esc.length>1?"s":""}</div>
              <div style={{fontFamily:"'Space Mono',monospace",fontSize:10,color:"#7f4f4f"}}>Requires immediate attention</div>
            </div>
          </div>
        )}

        {tab==="overview"&&<>
          <div style={sT}>Path Breakdown</div>
          {[["😔 Low (1–2★)",paths.low,"#f87171"],["😐 Mid (3★)",paths.mid,"#facc15"],["😊 High (4–5★)",paths.high,"#39FF14"]].map(([l,v,c])=>(
            <div key={l} style={{...card,display:"flex",alignItems:"center",gap:12}}>
              <span style={{fontFamily:"'Space Mono',monospace",fontSize:12,color:"#bbb",flex:1}}>{l}</span>
              <div style={{width:80,height:6,background:"#111",borderRadius:3,overflow:"hidden"}}>
                <div style={{width:`${rows.length?v/rows.length*100:0}%`,height:"100%",background:c,borderRadius:3}}/>
              </div>
              <span style={{fontFamily:"'Rajdhani',sans-serif",fontWeight:700,color:c,minWidth:24,textAlign:"right",fontSize:16}}>{v}</span>
            </div>
          ))}
          <div style={sT}>Centre Performance</div>
          <div style={{overflowX:"auto"}}>
            <table style={{width:"100%",borderCollapse:"collapse",fontFamily:"'Space Mono',monospace",fontSize:11,minWidth:320}}>
              <thead><tr style={{borderBottom:"1px solid #1a1a1a"}}>
                {["Centre","Resp","Avg","NPS","Esc"].map(h=><th key={h} style={{padding:"10px 8px",color:"#39FF14",textAlign:"left",letterSpacing:1,whiteSpace:"nowrap"}}>{h}</th>)}
              </tr></thead>
              <tbody>
                {cPerf.map(c=>(
                  <tr key={c.centre} style={{borderBottom:"1px solid #0a0a0a"}}>
                    <td style={{padding:"10px 8px",color:"#bbb",whiteSpace:"nowrap"}}>{c.centre}</td>
                    <td style={{padding:"10px 8px",color:"#fff"}}>{c.count}</td>
                    <td style={{padding:"10px 8px",color:"#39FF14"}}>{c.avg}★</td>
                    <td style={{padding:"10px 8px",color:c.nps>=50?"#39FF14":c.nps>=0?"#facc15":"#f97316"}}>{c.nps??"-"}</td>
                    <td style={{padding:"10px 8px",color:c.esc>0?"#f87171":"#555"}}>{c.esc}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div style={sT}>Top Issues</div>
          {topIssues.length===0&&<div style={{fontFamily:"'Space Mono',monospace",fontSize:12,color:"#444"}}>No issues reported ✅</div>}
          {topIssues.map(([issue,count])=>(
            <div key={issue} style={{...card,display:"flex",justifyContent:"space-between",alignItems:"center"}}>
              <span style={{fontFamily:"'Space Mono',monospace",fontSize:12,color:"#bbb"}}>{issue}</span>
              <span style={{fontFamily:"'Rajdhani',sans-serif",fontWeight:700,color:"#f87171",fontSize:18}}>{count}×</span>
            </div>
          ))}
        </>}

        {tab==="escalations"&&<>
          <div style={{fontFamily:"'Space Mono',monospace",fontSize:12,color:"#f87171",marginBottom:14}}>{esc.length} requiring action</div>
          {esc.length===0&&<div style={{fontFamily:"'Space Mono',monospace",fontSize:12,color:"#39FF14"}}>No escalations ✅</div>}
          {esc.map((r,i)=>(
            <div key={i} style={{...card,background:"#0d0000",border:"1px solid #7f1d1d",marginBottom:14}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:10}}>
                <div style={{display:"flex",gap:6}}>{tag("#f87171","🚨 FLAGGED")}{tag("#f97316",r.division)}</div>
                <span style={{fontFamily:"'Space Mono',monospace",fontSize:10,color:"#444"}}>{new Date(r.timestamp).toLocaleString("en-IN",{day:"2-digit",month:"short",hour:"2-digit",minute:"2-digit"})}</span>
              </div>
              <div style={{fontFamily:"'Rajdhani',sans-serif",fontWeight:700,color:"#fff",fontSize:18,marginBottom:6}}>{r.centre}</div>
              <div style={{fontFamily:"'Space Mono',monospace",fontSize:12,color:"#f87171",marginBottom:6}}>{"⭐".repeat(+r.overall_rating)} · {r.issue||"Not specified"}</div>
              {r.issue_detail&&<div style={{fontFamily:"'Space Mono',monospace",fontSize:11,color:"#666",marginBottom:8}}>"{r.issue_detail}"</div>}
              {r.contact&&<div style={{fontFamily:"'Space Mono',monospace",fontSize:12,color:"#39FF14"}}>📱 {r.contact}</div>}
              <div style={{marginTop:12}}>{tag("#facc15","NEW")}</div>
            </div>
          ))}
        </>}

        {tab==="breakdown"&&<>
          <div style={sT}>🎓 Coaching Metrics</div>
          {mAvg(COACHING_METRICS,"Coaching").map(m=>(
            <div key={m.metric} style={card}>
              <div style={{display:"flex",justifyContent:"space-between",marginBottom:10}}>
                <span style={{fontFamily:"'Space Mono',monospace",fontSize:12,color:"#888"}}>{m.metric}</span>
                <span style={{fontFamily:"'Rajdhani',sans-serif",fontWeight:700,color:"#39FF14",fontSize:16}}>{m.avg}★</span>
              </div>
              <div style={{height:6,background:"#111",borderRadius:3,overflow:"hidden"}}>
                <div style={{width:`${(+m.avg/5)*100}%`,height:"100%",background:"#39FF14",borderRadius:3}}/>
              </div>
            </div>
          ))}
          <div style={sT}>🎾 Pay & Play Metrics</div>
          {mAvg(PAYPLAY_METRICS,"Pay & Play").map(m=>(
            <div key={m.metric} style={card}>
              <div style={{display:"flex",justifyContent:"space-between",marginBottom:10}}>
                <span style={{fontFamily:"'Space Mono',monospace",fontSize:12,color:"#888"}}>{m.metric}</span>
                <span style={{fontFamily:"'Rajdhani',sans-serif",fontWeight:700,color:"#39FF14",fontSize:16}}>{m.avg}★</span>
              </div>
              <div style={{height:6,background:"#111",borderRadius:3,overflow:"hidden"}}>
                <div style={{width:`${(+m.avg/5)*100}%`,height:"100%",background:"#39FF14",borderRadius:3}}/>
              </div>
            </div>
          ))}
          <div style={sT}>Sport Ratings</div>
          {sportStats.map(s=>(
            <div key={s.sport} style={{...card,display:"flex",justifyContent:"space-between",alignItems:"center"}}>
              <span style={{fontFamily:"'Rajdhani',sans-serif",fontWeight:700,color:"#fff",fontSize:16}}>{s.sport}</span>
              <div style={{display:"flex",gap:12,alignItems:"center"}}>
                <span style={{fontFamily:"'Space Mono',monospace",fontSize:11,color:"#555"}}>{s.count}x</span>
                <span style={{fontFamily:"'Rajdhani',sans-serif",fontWeight:700,color:"#39FF14",fontSize:16}}>{s.avg}★</span>
              </div>
            </div>
          ))}
        </>}

        {tab==="comments"&&<>
          <input value={search} onChange={e=>setSrch(e.target.value)} placeholder="Search comments..."
            style={{width:"100%",background:"#0f0f0f",border:"1.5px solid #1e1e1e",borderRadius:12,color:"#fff",fontFamily:"'Space Mono',monospace",fontSize:14,padding:"14px",outline:"none",boxSizing:"border-box",WebkitAppearance:"none",marginBottom:16}}/>
          {comments.length===0&&<div style={{fontFamily:"'Space Mono',monospace",fontSize:12,color:"#444"}}>No comments found.</div>}
          {comments.map((r,i)=>(
            <div key={i} style={card}>
              <div style={{display:"flex",gap:6,marginBottom:10,flexWrap:"wrap"}}>
                {tag("#39FF14",r.centre)}{tag("#888",r.division)}
                {r.escalated==="YES"&&tag("#f87171","🚨")}
              </div>
              <div style={{fontFamily:"'Space Mono',monospace",fontSize:12,color:"#ccc",lineHeight:1.8,marginBottom:10}}>"{r.comment}"</div>
              <div style={{fontFamily:"'Space Mono',monospace",fontSize:11,color:"#444"}}>{"⭐".repeat(+r.overall_rating)} · NPS {r.nps} · {new Date(r.timestamp).toLocaleDateString("en-IN")}</div>
            </div>
          ))}
        </>}

        {tab==="feed"&&<>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:14}}>
            <div style={{fontFamily:"'Rajdhani',sans-serif",fontWeight:700,color:"#fff",fontSize:18}}>Live Feed</div>
            <div style={{fontFamily:"'Space Mono',monospace",fontSize:10,color:"#444"}}>{new Date().toLocaleTimeString("en-IN",{hour:"2-digit",minute:"2-digit"})}</div>
          </div>
          <div style={{overflowX:"auto"}}>
            <table style={{width:"100%",borderCollapse:"collapse",fontFamily:"'Space Mono',monospace",fontSize:11,minWidth:380}}>
              <thead><tr style={{borderBottom:"1px solid #1a1a1a"}}>
                {["Time","Centre","Div","★","Path","🚨"].map(h=><th key={h} style={{padding:"10px 6px",color:"#39FF14",textAlign:"left",whiteSpace:"nowrap"}}>{h}</th>)}
              </tr></thead>
              <tbody>
                {[...data].reverse().map((r,i)=>(
                  <tr key={i} style={{borderBottom:"1px solid #0a0a0a"}}>
                    <td style={{padding:"9px 6px",color:"#555",whiteSpace:"nowrap"}}>{new Date(r.timestamp).toLocaleTimeString("en-IN",{hour:"2-digit",minute:"2-digit"})}</td>
                    <td style={{padding:"9px 6px",color:"#bbb",whiteSpace:"nowrap",maxWidth:90,overflow:"hidden",textOverflow:"ellipsis"}}>{r.centre}</td>
                    <td style={{padding:"9px 6px",color:"#888"}}>{r.division==="Coaching"?"🎓":"🎾"}</td>
                    <td style={{padding:"9px 6px",color:"#39FF14"}}>{r.overall_rating}★</td>
                    <td style={{padding:"9px 6px"}}><span style={{color:r.path==="low"?"#f87171":r.path==="mid"?"#facc15":"#39FF14",fontSize:10,textTransform:"uppercase"}}>{r.path}</span></td>
                    <td style={{padding:"9px 6px"}}><span style={{color:r.escalated==="YES"?"#f87171":"#333"}}>{r.escalated==="YES"?"🚨":"—"}</span></td>
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

export default function App() {
  const [page,setPage] = useState("feedback");
  const [auth,setAuth] = useState(false);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Rajdhani:wght@600;700&family=Space+Mono:wght@400;700&display=swap');
        *{box-sizing:border-box;margin:0;padding:0;}
        html,body,#root{width:100%;background:#000;}
        body{-webkit-font-smoothing:antialiased;-webkit-text-size-adjust:100%;overflow-x:hidden;}
        button{outline:none;-webkit-tap-highlight-color:transparent;}
        input,textarea{outline:none;-webkit-appearance:none;}
        input:focus,textarea:focus{border-color:#39FF14!important;box-shadow:0 0 0 2px #39FF1422!important;}
        ::-webkit-scrollbar{width:2px;height:2px;}
        ::-webkit-scrollbar-thumb{background:#1a1a1a;border-radius:4px;}
      `}</style>
      {page==="feedback"&&<FeedbackPage onAdmin={()=>setPage("admin")}/>}
      {page==="admin"&&!auth&&<AdminLogin onSuccess={()=>setAuth(true)}/>}
      {page==="admin"&&auth&&<AdminDashboard onLogout={()=>{setAuth(false);setPage("feedback");}}/>}
    </>
  );
}
