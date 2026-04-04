import React, { useState } from 'react';
const SHEET_URL = [
  'https://script.google.com/macros/s/',
  'AKfycbwxiot1JdvFVuD0dla6ONJ2tOar-zeOaSP-',
  'RO_Di_bB_7vp-RZtGZrWNzFS1673pJTaRg/exec',
].join('');
const ADMIN_EMAIL = 'info@hoppr.club';
const ADMIN_PASSWORD = 'Topsports@100';

const DUMMY_RESPONSES = [
  {
    timestamp: '2024-03-15T09:12:00Z',
    centre: 'RK Puram',
    division: 'Coaching',
    role: 'Parent',
    sport: 'Badminton',
    overall_rating: 5,
    path: 'high',
    issue: '',
    issue_detail: '',
    specific_ratings:
      '{"Coach quality":5,"Drill variety":4,"Progress feedback":5,"Punctuality":5,"Court condition":4}',
    nps: 10,
    wants_followup: 'No',
    contact: '',
    comment: 'Coach Rahul is amazing. My son has improved so much in 2 months!',
    escalated: 'no',
  },
  {
    timestamp: '2024-03-15T10:30:00Z',
    centre: 'Dwarka Sector 9',
    division: 'Pay & Play',
    role: '',
    sport: 'Pickleball',
    overall_rating: 2,
    path: 'low',
    issue: 'Too crowded',
    issue_detail: 'Had to wait 40 mins for a court',
    specific_ratings:
      '{"Court availability":1,"Ease of booking":2,"Value for money":2,"Equipment quality":3,"Crowd/wait time":1}',
    nps: 3,
    wants_followup: 'Yes',
    contact: '9876543210',
    comment: 'Please manage crowd better',
    escalated: 'YES',
  },
  {
    timestamp: '2024-03-15T11:45:00Z',
    centre: 'Sushant Lok',
    division: 'Coaching',
    role: 'Kid',
    sport: 'Football',
    overall_rating: 4,
    path: 'high',
    issue: '',
    issue_detail: '',
    specific_ratings:
      '{"Coach quality":4,"Drill variety":5,"Progress feedback":3,"Punctuality":4,"Court condition":4}',
    nps: 8,
    wants_followup: 'No',
    contact: '',
    comment: 'Really fun drills today!',
    escalated: 'no',
  },
  {
    timestamp: '2024-03-15T13:00:00Z',
    centre: 'Sector 7 Gurugram',
    division: 'Pay & Play',
    role: '',
    sport: 'Cricket',
    overall_rating: 3,
    path: 'mid',
    issue: 'Equipment',
    issue_detail: '',
    specific_ratings:
      '{"Court availability":3,"Ease of booking":4,"Value for money":3,"Equipment quality":2,"Crowd/wait time":3}',
    nps: 6,
    wants_followup: 'Yes',
    contact: '9988776655',
    comment: 'Equipment needs upgrade badly',
    escalated: 'YES',
  },
  {
    timestamp: '2024-03-15T14:20:00Z',
    centre: 'RK Puram',
    division: 'Coaching',
    role: 'Parent',
    sport: 'Badminton',
    overall_rating: 5,
    path: 'high',
    issue: '',
    issue_detail: '',
    specific_ratings:
      '{"Coach quality":5,"Drill variety":5,"Progress feedback":5,"Punctuality":4,"Court condition":5}',
    nps: 10,
    wants_followup: 'No',
    contact: '',
    comment: 'Best coaching centre in Delhi!',
    escalated: 'no',
  },
  {
    timestamp: '2024-03-15T15:10:00Z',
    centre: 'Greater Noida',
    division: 'Pay & Play',
    role: '',
    sport: 'Badminton',
    overall_rating: 1,
    path: 'low',
    issue: 'Courts not available',
    issue_detail: 'All 4 courts were booked when we arrived',
    specific_ratings:
      '{"Court availability":1,"Ease of booking":1,"Value for money":1,"Equipment quality":3,"Crowd/wait time":1}',
    nps: 2,
    wants_followup: 'Yes',
    contact: '9123456789',
    comment: 'Very disappointing. Wasted 2 hours.',
    escalated: 'YES',
  },
  {
    timestamp: '2024-03-15T16:30:00Z',
    centre: 'Dwarka Sector 18',
    division: 'Coaching',
    role: 'Kid',
    sport: 'Pickleball',
    overall_rating: 4,
    path: 'high',
    issue: '',
    issue_detail: '',
    specific_ratings:
      '{"Coach quality":4,"Drill variety":4,"Progress feedback":4,"Punctuality":5,"Court condition":3}',
    nps: 9,
    wants_followup: 'No',
    contact: '',
    comment: '',
    escalated: 'no',
  },
  {
    timestamp: '2024-03-15T17:00:00Z',
    centre: 'New Faridabad',
    division: 'Pay & Play',
    role: '',
    sport: 'Football',
    overall_rating: 4,
    path: 'high',
    issue: '',
    issue_detail: '',
    specific_ratings:
      '{"Court availability":4,"Ease of booking":5,"Value for money":4,"Equipment quality":4,"Crowd/wait time":4}',
    nps: 8,
    wants_followup: 'No',
    contact: '',
    comment: 'Great facility overall',
    escalated: 'no',
  },
  {
    timestamp: '2024-03-16T09:00:00Z',
    centre: 'RK Puram',
    division: 'Coaching',
    role: 'Parent',
    sport: 'Badminton',
    overall_rating: 3,
    path: 'mid',
    issue: 'Progress tracking',
    issue_detail: '',
    specific_ratings:
      '{"Coach quality":3,"Drill variety":3,"Progress feedback":2,"Punctuality":4,"Court condition":4}',
    nps: 5,
    wants_followup: 'Yes',
    contact: '9001122334',
    comment: 'Need better progress reports for parents',
    escalated: 'YES',
  },
  {
    timestamp: '2024-03-16T10:15:00Z',
    centre: 'Sushant Lok',
    division: 'Pay & Play',
    role: '',
    sport: 'Pickleball',
    overall_rating: 5,
    path: 'high',
    issue: '',
    issue_detail: '',
    specific_ratings:
      '{"Court availability":5,"Ease of booking":5,"Value for money":4,"Equipment quality":5,"Crowd/wait time":5}',
    nps: 10,
    wants_followup: 'No',
    contact: '',
    comment: 'Perfect experience. Will come every weekend!',
    escalated: 'no',
  },
];

const CENTRES = [
  'RK Puram',
  'Sushant Lok',
  'Sector 7 Gurugram',
  'Dwarka Sector 9',
  'Dwarka Sector 18',
  'Greater Noida',
  'New Faridabad',
];
const SPORTS = ['Badminton', 'Pickleball', 'Cricket', 'Football', 'General'];
const COACHING_ISSUES = [
  'Poor coach quality',
  'No progress',
  'Bad punctuality',
  'Boring drills',
  'Dirty courts',
  'Something else',
];
const PAYPLAY_ISSUES = [
  'Courts not available',
  'Bad equipment',
  'Too crowded',
  'Overpriced',
  'Hard to book',
  'Something else',
];
const COACHING_MID = [
  'Coach quality',
  'Drill variety',
  'Progress tracking',
  'Punctuality',
  'Court condition',
];
const PAYPLAY_MID = [
  'Court availability',
  'Equipment',
  'Crowd management',
  'Pricing',
  'Booking experience',
];
const COACHING_HIGH = [
  'Amazing coach',
  'Great drills',
  'Visible progress',
  'Always on time',
  'Great courts',
];
const PAYPLAY_HIGH = [
  'Easy booking',
  'Great courts',
  'Good value',
  'Quality equipment',
  'Good crowd',
];
const COACHING_METRICS = [
  'Coach quality',
  'Drill variety',
  'Progress feedback',
  'Punctuality',
  'Court condition',
];
const PAYPLAY_METRICS = [
  'Court availability',
  'Ease of booking',
  'Value for money',
  'Equipment quality',
  'Crowd/wait time',
];

const S = {
 app: { minHeight:"100vh", background:"#000", fontFamily:"'Rajdhani',sans-serif", color:"#fff", width:"100%", maxWidth:"100%", margin:"0 auto", padding:"0 0 40px 0", overflowX:"hidden" },
  card: {
    background: '#0a0a0a',
    border: '1px solid #1a1a1a',
    borderRadius: 16,
    padding: '16px',
  },
  selCard: {
    background: '#001a00',
    border: '1.5px solid #39FF14',
    borderRadius: 16,
    padding: '16px',
    boxShadow: '0 0 12px #39FF1433',
  },
  label: {
    color: '#555',
    fontSize: 10,
    letterSpacing: 2,
    textTransform: 'uppercase',
    fontFamily: "'Space Mono',monospace",
    marginBottom: 8,
    display: 'block',
  },
  h1: { fontSize: 26, fontWeight: 700, color: '#fff', marginBottom: 4 },
  h2: { fontSize: 18, fontWeight: 700, color: '#fff', marginBottom: 12 },
  btn: {
    width: '100%',
    padding: '14px',
    borderRadius: 12,
    border: 'none',
    background: '#39FF14',
    color: '#000',
    fontWeight: 700,
    fontSize: 15,
    cursor: 'pointer',
    fontFamily: "'Rajdhani',sans-serif",
    boxShadow: '0 0 16px #39FF1466',
    letterSpacing: 0.5,
  },
  btnOff: {
    width: '100%',
    padding: '14px',
    borderRadius: 12,
    border: '1.5px solid #1a1a1a',
    background: 'transparent',
    color: '#444',
    fontWeight: 700,
    fontSize: 15,
    cursor: 'pointer',
    fontFamily: "'Rajdhani',sans-serif",
  },
  chip: {
    padding: '8px 14px',
    borderRadius: 20,
    border: '1.5px solid #1a1a1a',
    background: '#0a0a0a',
    color: '#888',
    fontSize: 13,
    cursor: 'pointer',
    fontFamily: "'Space Mono',monospace",
    transition: 'all .15s',
  },
  chipOn: {
    padding: '8px 14px',
    borderRadius: 20,
    border: '1.5px solid #39FF14',
    background: '#001a00',
    color: '#39FF14',
    fontSize: 13,
    cursor: 'pointer',
    fontFamily: "'Space Mono',monospace",
    boxShadow: '0 0 8px #39FF1433',
  },
  input: {
    width: '100%',
    background: '#0a0a0a',
    border: '1.5px solid #1a1a1a',
    borderRadius: 10,
    color: '#fff',
    fontFamily: "'Space Mono',monospace",
    fontSize: 12,
    padding: '12px',
    outline: 'none',
    boxSizing: 'border-box',
  },
  tabB: (a) => ({
    flex: 1,
    padding: '12px 0',
    border: 'none',
    background: 'transparent',
    cursor: 'pointer',
    fontFamily: "'Space Mono',monospace",
    fontSize: 10,
    letterSpacing: 2,
    textTransform: 'uppercase',
    color: a ? '#39FF14' : '#333',
    borderBottom: a ? '2px solid #39FF14' : '2px solid transparent',
    transition: 'all .2s',
  }),
  pill: (a) => ({
    padding: '6px 12px',
    borderRadius: 20,
    border: 'none',
    cursor: 'pointer',
    fontFamily: "'Space Mono',monospace",
    fontSize: 10,
    background: a ? '#39FF14' : '#111',
    color: a ? '#000' : '#555',
    transition: 'all .15s',
    whiteSpace: 'nowrap',
  }),
};

function Stars({ value, onChange, size = 36 }) {
  const [h, setH] = useState(null);
  const labels = ['', 'Terrible', 'Poor', 'Okay', 'Good', 'Excellent!'];
  return (
    <div>
      <div style={{ display: 'flex', gap: 6, justifyContent: 'center' }}>
        {[1, 2, 3, 4, 5].map((s) => {
          const on = s <= (h ?? value);
          return (
            <button
              key={s}
              onClick={() => onChange?.(s)}
              onMouseEnter={() => onChange && setH(s)}
              onMouseLeave={() => onChange && setH(null)}
              style={{
                background: 'none',
                border: 'none',
                cursor: onChange ? 'pointer' : 'default',
                fontSize: size,
                lineHeight: 1,
                padding: 2,
                transition: 'transform .15s, filter .15s',
                transform: on ? 'scale(1.2)' : 'scale(1)',
                filter: on
                  ? 'drop-shadow(0 0 6px #39FF14)'
                  : 'grayscale(1) opacity(.2)',
              }}
            >
              ⭐
            </button>
          );
        })}
      </div>
      {(h ?? value) > 0 && (
        <div
          style={{
            textAlign: 'center',
            color: '#39FF14',
            fontFamily: "'Space Mono',monospace",
            fontSize: 11,
            marginTop: 6,
            letterSpacing: 1,
          }}
        >
          {labels[h ?? value]}
        </div>
      )}
    </div>
  );
}

function Progress({ step, total }) {
  return (
    <div
      style={{
        height: 3,
        background: '#111',
        borderRadius: 2,
        marginBottom: 24,
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          height: '100%',
          width: `${(step / total) * 100}%`,
          background: '#39FF14',
          borderRadius: 2,
          boxShadow: '0 0 8px #39FF14',
          transition: 'width .4s ease',
        }}
      />
    </div>
  );
}

function NPSPicker({ value, onChange }) {
  const col = (n) => (n <= 6 ? '#f97316' : n <= 8 ? '#facc15' : '#39FF14');
  return (
    <div>
      <div
        style={{
          display: 'flex',
          gap: 5,
          flexWrap: 'wrap',
          justifyContent: 'center',
          marginBottom: 8,
        }}
      >
        {[...Array(11).keys()].map((n) => {
          const sel = value === n;
          return (
            <button
              key={n}
              onClick={() => onChange(n)}
              style={{
                width: 36,
                height: 36,
                borderRadius: 8,
                border: sel ? `2px solid ${col(n)}` : '2px solid #1a1a1a',
                background: sel ? col(n) + '22' : '#0a0a0a',
                color: sel ? col(n) : '#555',
                fontFamily: "'Space Mono',monospace",
                fontSize: 12,
                fontWeight: sel ? 700 : 400,
                cursor: 'pointer',
                transition: 'all .15s',
                transform: sel ? 'scale(1.1)' : 'scale(1)',
              }}
            >
              {n}
            </button>
          );
        })}
      </div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          fontFamily: "'Space Mono',monospace",
          fontSize: 9,
          color: '#333',
        }}
      >
        <span>Not likely</span>
        <span>Extremely likely</span>
      </div>
    </div>
  );
}

// ── ADMIN LOGIN ───────────────────────────────────────────────────────────────
function AdminLogin({ onSuccess }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = () => {
    setLoading(true);
    setError('');
    setTimeout(() => {
      if (
        email.trim().toLowerCase() === ADMIN_EMAIL &&
        password === ADMIN_PASSWORD
      ) {
        onSuccess(email.trim().toLowerCase());
      } else if (email.trim().toLowerCase() !== ADMIN_EMAIL) {
        setError('Access denied. Only info@hoppr.club is authorised.');
      } else {
        setError('Incorrect password. Please try again.');
      }
      setLoading(false);
    }, 800);
  };

  return (
    <div style={{ padding: '48px 24px', textAlign: 'center' }}>
      <div style={{ fontSize: 48, marginBottom: 16 }}>🔐</div>
      <div
        style={{
          fontFamily: "'Rajdhani',sans-serif",
          fontSize: 24,
          fontWeight: 700,
          color: '#fff',
          marginBottom: 6,
        }}
      >
        Admin Access
      </div>
      <div
        style={{
          fontFamily: "'Space Mono',monospace",
          fontSize: 11,
          color: '#555',
          marginBottom: 32,
          lineHeight: 1.8,
        }}
      >
        Restricted to authorised
        <br />
        Hoppr team members only.
      </div>

      <div style={{ textAlign: 'left', marginBottom: 12 }}>
        <span style={S.label}>Google Email</span>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your Google email"
          type="email"
          style={{ ...S.input, marginBottom: 0 }}
        />
      </div>

      <div style={{ textAlign: 'left', marginBottom: 16 }}>
        <span style={S.label}>Password</span>
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
          placeholder="Enter admin password"
          type="password"
          style={{ ...S.input, marginBottom: 0 }}
        />
      </div>

      {error && (
        <div
          style={{
            background: '#1a0000',
            border: '1px solid #7f1d1d',
            borderRadius: 10,
            padding: '10px 14px',
            fontFamily: "'Space Mono',monospace",
            fontSize: 11,
            color: '#f87171',
            marginBottom: 16,
            textAlign: 'left',
          }}
        >
          🚫 {error}
        </div>
      )}

      <button
        onClick={handleLogin}
        disabled={!email.trim() || !password.trim() || loading}
        style={{
          ...S.btn,
          opacity: !email.trim() || !password.trim() || loading ? 0.4 : 1,
          cursor:
            !email.trim() || !password.trim() || loading
              ? 'not-allowed'
              : 'pointer',
        }}
      >
        {loading ? 'Verifying…' : 'Access Dashboard →'}
      </button>

      <div
        style={{
          fontFamily: "'Space Mono',monospace",
          fontSize: 9,
          color: '#2a2a2a',
          marginTop: 20,
        }}
      >
        Authorised Hoppr team access only
      </div>
    </div>
  );
}

// ── FEEDBACK FORM ─────────────────────────────────────────────────────────────
function FeedbackForm({ onDone }) {
  const TOTAL = 9;
  const [step, setStep] = useState(1);
  const [centre, setCentre] = useState(null);
  const [division, setDiv] = useState(null);
  const [role, setRole] = useState(null);
  const [sport, setSport] = useState(null);
  const [rating, setRating] = useState(0);
  const [chips, setChips] = useState([]);
  const [otherText, setOther] = useState('');
  const [metrics, setMetrics] = useState({});
  const [nps, setNps] = useState(null);
  const [wantsCB, setWantsCB] = useState(false);
  const [contact, setContact] = useState('');
  const [comment, setComment] = useState('');
  const [saving, setSaving] = useState(false);

  const isCoaching = division === 'Coaching';
  const path = rating <= 2 ? 'low' : rating === 3 ? 'mid' : 'high';
  const chipOptions =
    path === 'low'
      ? isCoaching
        ? COACHING_ISSUES
        : PAYPLAY_ISSUES
      : path === 'mid'
      ? isCoaching
        ? COACHING_MID
        : PAYPLAY_MID
      : isCoaching
      ? COACHING_HIGH
      : PAYPLAY_HIGH;
  const metricsList = isCoaching ? COACHING_METRICS : PAYPLAY_METRICS;

  const toggle = (c) =>
    setChips((prev) =>
      prev.includes(c) ? prev.filter((x) => x !== c) : [...prev, c]
    );
  const next = () => {
    if (step === 3 && division === 'Pay & Play') {
      setStep(5);
      return;
    }
    setStep((s) => s + 1);
  };
  const back = () => {
    if (step === 5 && division === 'Pay & Play') {
      setStep(3);
      return;
    }
    setStep((s) => s - 1);
  };

  const canNext = () => {
    if (step === 1) return !!centre;
    if (step === 2) return !!division;
    if (step === 3) return !!role;
    if (step === 4) return !!sport;
    if (step === 5) return rating > 0;
    if (step === 6) return chips.length > 0;
    if (step === 7) return metricsList.every((m) => metrics[m] > 0);
    if (step === 8) return nps !== null;
    return true;
  };

  const actualStep = step === 5 && division === 'Pay & Play' ? 4 : step;

  const handleSubmit = async () => {
    setSaving(true);
    try {
      await fetch(SHEET_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          timestamp: new Date().toISOString(),
          centre,
          division,
          role,
          sport,
          overall_rating: rating,
          path,
          issue: chips.join(', '),
          issue_detail: otherText,
          specific_ratings: JSON.stringify(metrics),
          nps,
          wants_followup: wantsCB ? 'Yes' : 'No',
          contact,
          comment,
          escalated: rating <= 2 || nps <= 6 ? 'YES' : 'no',
        }),
      });
    } catch (_) {}
    setSaving(false);
    setStep(10);
  };

  if (step === 10)
    return (
      <div style={{ textAlign: 'center', padding: '60px 20px' }}>
        <div style={{ fontSize: 64, marginBottom: 16 }}>
          {rating >= 4 ? '🏆' : rating <= 2 ? '🙏' : '✅'}
        </div>
        <div
          style={{
            fontSize: 24,
            fontWeight: 700,
            color: '#fff',
            marginBottom: 8,
          }}
        >
          {rating >= 4
            ? 'You made our day!'
            : rating <= 2
            ? "We've flagged this for our team."
            : "Thanks! We'll keep improving."}
        </div>
        <div
          style={{
            fontFamily: "'Space Mono',monospace",
            fontSize: 11,
            color: '#555',
            lineHeight: 1.8,
            marginBottom: 32,
          }}
        >
          {rating <= 2
            ? "We'll make it right. 💪"
            : 'Your feedback helps Hoppr grow across Delhi. 🎾'}
        </div>
        <button
          onClick={onDone}
          style={{ ...S.btn, width: 'auto', padding: '12px 28px' }}
        >
          Give More Feedback
        </button>
      </div>
    );

  return (
    <div style={{ padding:"16px 14px" }}>
      <Progress step={actualStep} total={TOTAL} />
      <div
        style={{
          fontFamily: "'Space Mono',monospace",
          fontSize: 10,
          color: '#333',
          marginBottom: 20,
        }}
      >
        STEP {actualStep} OF {TOTAL}
      </div>

      {step === 1 && (
        <>
          <span style={S.label}>Centre</span>
          <div style={S.h1}>Which centre did you visit?</div>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 10,
              marginBottom: 24,
            }}
          >
            {CENTRES.map((c) => (
              <button
                key={c}
                onClick={() => setCentre(c)}
                style={{
                  ...(centre === c ? S.selCard : S.card),
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  border: 'none',
                  cursor: 'pointer',
                  width: '100%',
                  textAlign: 'left',
                }}
              >
                <span
                  style={{
                    fontWeight: 700,
                    fontSize: 15,
                    color: centre === c ? '#39FF14' : '#bbb',
                  }}
                >
                  🏟️ {c}
                </span>
                {centre === c && <span style={{ color: '#39FF14' }}>✓</span>}
              </button>
            ))}
          </div>
        </>
      )}

      {step === 2 && (
        <>
          <span style={S.label}>Division</span>
          <div style={S.h1}>What brings you here?</div>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 12,
              marginBottom: 24,
            }}
          >
            {[
              ['🎓', 'Coaching', 'For Parents & Kids enrolled in coaching'],
              ['🎾', 'Pay & Play', 'For walk-in players'],
            ].map(([e, d, sub]) => (
              <button
                key={d}
                onClick={() => setDiv(d)}
                style={{
                  ...(division === d ? S.selCard : S.card),
                  border: 'none',
                  cursor: 'pointer',
                  textAlign: 'left',
                  width: '100%',
                }}
              >
                <div style={{ fontSize: 28, marginBottom: 6 }}>{e}</div>
                <div
                  style={{
                    fontWeight: 700,
                    fontSize: 17,
                    color: division === d ? '#39FF14' : '#fff',
                    marginBottom: 2,
                  }}
                >
                  {d}
                </div>
                <div
                  style={{
                    fontFamily: "'Space Mono',monospace",
                    fontSize: 11,
                    color: '#555',
                  }}
                >
                  {sub}
                </div>
              </button>
            ))}
          </div>
        </>
      )}

      {step === 3 && (
        <>
          <span style={S.label}>Role</span>
          <div style={S.h1}>And you are?</div>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 12,
              marginBottom: 24,
            }}
          >
            {[
              ['👨‍👩‍👧', 'Parent'],
              ['🏃', 'Kid / Student'],
            ].map(([e, r]) => (
              <button
                key={r}
                onClick={() => setRole(r)}
                style={{
                  ...(role === r ? S.selCard : S.card),
                  display: 'flex',
                  alignItems: 'center',
                  gap: 14,
                  border: 'none',
                  cursor: 'pointer',
                  textAlign: 'left',
                  width: '100%',
                }}
              >
                <span style={{ fontSize: 30 }}>{e}</span>
                <span
                  style={{
                    fontWeight: 700,
                    fontSize: 17,
                    color: role === r ? '#39FF14' : '#bbb',
                  }}
                >
                  {r}
                </span>
              </button>
            ))}
          </div>
        </>
      )}

      {step === 4 && (
        <>
          <span style={S.label}>Sport</span>
          <div style={S.h1}>Which sport did you play?</div>
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: 10,
              marginBottom: 24,
            }}
          >
            {SPORTS.map((s) => (
              <button
                key={s}
                onClick={() => setSport(s)}
                style={sport === s ? S.chipOn : S.chip}
              >
                {s}
              </button>
            ))}
          </div>
        </>
      )}

      {step === 5 && (
        <>
          <span style={S.label}>Overall Rating</span>
          <div style={S.h1}>How was your session?</div>
          <div style={{ margin: '32px 0' }}>
            <Stars value={rating} onChange={setRating} size={42} />
          </div>
        </>
      )}

      {step === 6 && (
        <>
          <span style={S.label}>
            {path === 'low'
              ? 'Issue'
              : path === 'mid'
              ? 'Improvement'
              : 'Highlight'}
          </span>
          <div style={S.h1}>
            {path === 'low'
              ? 'What went wrong?'
              : path === 'mid'
              ? 'What could be better?'
              : 'What did you love?'}
          </div>
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: 8,
              marginBottom: 16,
            }}
          >
            {chipOptions.map((c) => (
              <button
                key={c}
                onClick={() => toggle(c)}
                style={chips.includes(c) ? S.chipOn : S.chip}
              >
                {c}
              </button>
            ))}
          </div>
          {chips.includes('Something else') && (
            <textarea
              value={otherText}
              onChange={(e) => setOther(e.target.value)}
              placeholder="Tell us more..."
              rows={3}
              style={{ ...S.input, marginBottom: 8 }}
            />
          )}
        </>
      )}

      {step === 7 && (
        <>
          <span style={S.label}>Detailed Ratings</span>
          <div style={S.h2}>Rate each area</div>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 16,
              marginBottom: 24,
            }}
          >
            {metricsList.map((m) => (
              <div key={m} style={S.card}>
                <div
                  style={{
                    fontFamily: "'Space Mono',monospace",
                    fontSize: 11,
                    color: '#888',
                    marginBottom: 10,
                  }}
                >
                  {m}
                </div>
                <Stars
                  size={28}
                  value={metrics[m] || 0}
                  onChange={(v) => setMetrics((prev) => ({ ...prev, [m]: v }))}
                />
              </div>
            ))}
          </div>
        </>
      )}

      {step === 8 && (
        <>
          <span style={S.label}>Recommendation</span>
          <div style={S.h1}>Would you recommend Hoppr?</div>
          <div
            style={{
              fontFamily: "'Space Mono',monospace",
              fontSize: 11,
              color: '#555',
              marginBottom: 20,
            }}
          >
            0 = not at all · 10 = absolutely yes
          </div>
          <div style={{ ...S.card, marginBottom: 16 }}>
            <NPSPicker value={nps} onChange={setNps} />
          </div>
          {nps !== null && nps <= 6 && (
            <div style={{ ...S.card, marginBottom: 8 }}>
              <div
                style={{
                  fontFamily: "'Space Mono',monospace",
                  fontSize: 11,
                  color: '#888',
                  marginBottom: 12,
                }}
              >
                Would you like a callback from our team?
              </div>
              <div
                style={{
                  display: 'flex',
                  gap: 10,
                  marginBottom: wantsCB ? 12 : 0,
                }}
              >
                <button
                  onClick={() => setWantsCB(true)}
                  style={wantsCB ? S.chipOn : S.chip}
                >
                  Yes please
                </button>
                <button
                  onClick={() => setWantsCB(false)}
                  style={!wantsCB && wantsCB !== null ? S.chipOn : S.chip}
                >
                  No thanks
                </button>
              </div>
              {wantsCB && (
                <input
                  value={contact}
                  onChange={(e) => setContact(e.target.value)}
                  placeholder="Your WhatsApp number"
                  style={S.input}
                />
              )}
            </div>
          )}
        </>
      )}

      {step === 9 && (
        <>
          <span style={S.label}>Final Thoughts</span>
          <div style={S.h1}>Anything else?</div>
          <div
            style={{
              fontFamily: "'Space Mono',monospace",
              fontSize: 11,
              color: '#555',
              marginBottom: 16,
            }}
          >
            Optional — we read every word.
          </div>
          <div style={S.card}>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Tell us what you loved or what we can do better..."
              rows={4}
              style={{ ...S.input, border: 'none', padding: 0 }}
            />
          </div>
          <div
            style={{
              ...S.card,
              background: '#001500',
              border: '1px solid #1a3a10',
              marginTop: 12,
              marginBottom: 20,
            }}
          >
            <div
              style={{
                fontFamily: "'Space Mono',monospace",
                fontSize: 10,
                color: '#39FF14',
                marginBottom: 10,
                letterSpacing: 1,
              }}
            >
              YOUR SUMMARY
            </div>
            {[
              ['Centre', centre],
              ['Division', division],
              ['Sport', sport],
              ['Rating', '⭐'.repeat(rating)],
              ['NPS', nps !== null ? `${nps}/10` : '-'],
            ].map(([k, v]) => (
              <div
                key={k}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  marginBottom: 4,
                }}
              >
                <span
                  style={{
                    fontFamily: "'Space Mono',monospace",
                    fontSize: 10,
                    color: '#444',
                  }}
                >
                  {k}
                </span>
                <span
                  style={{
                    fontFamily: "'Space Mono',monospace",
                    fontSize: 10,
                    color: '#aaa',
                  }}
                >
                  {v}
                </span>
              </div>
            ))}
          </div>
        </>
      )}

      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        <button
          style={
            canNext()
              ? S.btn
              : {
                  ...S.btn,
                  opacity: 0.3,
                  cursor: 'not-allowed',
                  boxShadow: 'none',
                }
          }
          disabled={!canNext() || saving}
          onClick={async () => {
            if (step < 9) {
              next();
              return;
            }
            await handleSubmit();
          }}
        >
          {saving
            ? 'Submitting…'
            : step < 9
            ? 'Continue →'
            : 'Submit Feedback 🚀'}
        </button>
        {step > 1 && (
          <button style={S.btnOff} onClick={back}>
            ← Back
          </button>
        )}
      </div>
    </div>
  );
}

// ── ADMIN DASHBOARD ───────────────────────────────────────────────────────────
function avg(arr) {
  return arr.length ? arr.reduce((a, b) => a + b, 0) / arr.length : 0;
}
function npsScore(arr) {
  if (!arr.length) return null;
  return Math.round(
    (arr.filter((n) => n >= 9).length / arr.length) * 100 -
      (arr.filter((n) => n <= 6).length / arr.length) * 100
  );
}

function AdminDashboard({ onLogout, adminEmail }) {
  const [centreF, setCentreF] = useState('All');
  const [divF, setDivF] = useState('All');
  const [timeF, setTimeF] = useState('All Time');
  const [tab, setTab] = useState('overview');
  const [search, setSearch] = useState('');
  const [data, setData] = useState(DUMMY_RESPONSES);
  const [loading, setLoading] = useState(false);

  const loadLive = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${SHEET_URL}?action=fetch&t=${Date.now()}`, {
        method: 'GET',
        mode: 'cors',
      });
      const json = await res.json();
      if (json && json.length) setData(json);
    } catch (err) {
      console.log('Sheet fetch error:', err);
    }
    setLoading(false);
  };

  const now = new Date();
  const rows = data.filter((r) => {
    if (centreF !== 'All' && r.centre !== centreF) return false;
    if (divF !== 'All' && r.division !== divF) return false;
    if (timeF === 'Today') {
      const d = new Date(r.timestamp);
      if (d.toDateString() !== now.toDateString()) return false;
    }
    return true;
  });

  const escalated = rows.filter((r) => r.escalated === 'YES');
  const ratings = rows.map((r) => +r.overall_rating).filter(Boolean);
  const npsList = rows.map((r) => +r.nps).filter((v) => !isNaN(v) && v !== '');
  const oAvg = avg(ratings).toFixed(1);
  const nps = npsScore(npsList);
  const escRate = rows.length
    ? Math.round((escalated.length / rows.length) * 100)
    : 0;
  const paths = {
    low: rows.filter((r) => r.path === 'low').length,
    mid: rows.filter((r) => r.path === 'mid').length,
    high: rows.filter((r) => r.path === 'high').length,
  };

  const issueMap = {};
  rows
    .filter((r) => r.issue)
    .forEach((r) => {
      issueMap[r.issue] = (issueMap[r.issue] || 0) + 1;
    });
  const topIssues = Object.entries(issueMap).sort((a, b) => b[1] - a[1]);

  const sportMap = {};
  rows.forEach((r) => {
    if (!sportMap[r.sport]) sportMap[r.sport] = { ratings: [] };
    sportMap[r.sport].ratings.push(+r.overall_rating);
  });
  const sportStats = Object.entries(sportMap)
    .map(([s, v]) => ({
      sport: s,
      avg: avg(v.ratings).toFixed(1),
      count: v.ratings.length,
    }))
    .sort((a, b) => b.count - a.count);

  const metricAvg = (list, div) =>
    list.map((m) => {
      const vals = rows
        .filter((r) => r.division === div)
        .map((r) => {
          try {
            const p = JSON.parse(r.specific_ratings);
            return p[m] || 0;
          } catch {
            return 0;
          }
        })
        .filter(Boolean);
      return { metric: m, avg: avg(vals).toFixed(1), count: vals.length };
    });
  const coachingMetrics = metricAvg(COACHING_METRICS, 'Coaching');
  const payplayMetrics = metricAvg(PAYPLAY_METRICS, 'Pay & Play');
  const comments = rows
    .filter((r) => r.comment)
    .filter(
      (r) => !search || r.comment.toLowerCase().includes(search.toLowerCase())
    );
  const centrePerf = CENTRES.map((c) => {
    const cr = rows.filter((r) => r.centre === c);
    return {
      centre: c,
      count: cr.length,
      avg: avg(cr.map((r) => +r.overall_rating)).toFixed(1),
      nps: npsScore(cr.map((r) => +r.nps)),
      esc: cr.filter((r) => r.escalated === 'YES').length,
    };
  }).filter((r) => r.count > 0);

  const mono = { fontFamily: "'Space Mono',monospace" };
  const card = { ...S.card, marginBottom: 10 };
  const sT = {
    fontSize: 14,
    fontWeight: 700,
    color: '#fff',
    marginBottom: 10,
    marginTop: 16,
    ...mono,
  };
  const tag = (color, text) => (
    <span
      style={{
        ...mono,
        fontSize: 9,
        padding: '2px 7px',
        borderRadius: 10,
        background: color + '22',
        color,
        border: `1px solid ${color}44`,
        letterSpacing: 1,
      }}
    >
      {text}
    </span>
  );

  return (
    <div style={{ padding: '16px 16px 48px' }}>
      {/* Admin header */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 16,
          background: '#0a0a0a',
          border: '1px solid #1a1a1a',
          borderRadius: 12,
          padding: '10px 14px',
        }}
      >
        <div>
          <div
            style={{
              ...mono,
              fontSize: 9,
              color: '#39FF14',
              letterSpacing: 2,
              marginBottom: 2,
            }}
          >
            LOGGED IN AS
          </div>
          <div style={{ ...mono, fontSize: 11, color: '#fff' }}>
            {adminEmail}
          </div>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <button
            onClick={loadLive}
            style={{
              ...mono,
              fontSize: 10,
              padding: '7px 12px',
              borderRadius: 8,
              border: '1px solid #1a1a1a',
              background: '#111',
              color: '#39FF14',
              cursor: 'pointer',
            }}
          >
            {loading ? 'Loading…' : '↻ Refresh'}
          </button>
          <button
            onClick={onLogout}
            style={{
              ...mono,
              fontSize: 10,
              padding: '7px 12px',
              borderRadius: 8,
              border: '1px solid #3a1212',
              background: '#1a0000',
              color: '#f87171',
              cursor: 'pointer',
            }}
          >
            Logout
          </button>
        </div>
      </div>

      {/* KPI bar */}
      <div
        style={{ display: 'flex', gap: 8, marginBottom: 16, flexWrap: 'wrap' }}
      >
        {[
          ['Responses', rows.length, '#fff'],
          ['Avg Rating', `${oAvg}★`, '#39FF14'],
          [
            'NPS',
            nps !== null ? nps : '—',
            nps !== null
              ? nps >= 50
                ? '#39FF14'
                : nps >= 0
                ? '#facc15'
                : '#f97316'
              : '#555',
          ],
          ['Esc %', `${escRate}%`, '#f87171'],
        ].map(([l, v, c]) => (
          <div
            key={l}
            style={{
              ...S.card,
              flex: 1,
              minWidth: 80,
              textAlign: 'center',
              padding: '12px 8px',
            }}
          >
            <div
              style={{
                ...mono,
                fontSize: 9,
                color: '#444',
                letterSpacing: 1,
                marginBottom: 6,
              }}
            >
              {l}
            </div>
            <div style={{ fontSize: 20, fontWeight: 700, color: c }}>{v}</div>
          </div>
        ))}
      </div>

      {/* Escalation banner */}
      {escalated.length > 0 && (
        <div
          style={{
            background: '#1a0000',
            border: '1.5px solid #7f1d1d',
            borderRadius: 12,
            padding: '12px 14px',
            marginBottom: 16,
            display: 'flex',
            alignItems: 'center',
            gap: 10,
          }}
        >
          <span style={{ fontSize: 18 }}>🚨</span>
          <div>
            <div style={{ fontWeight: 700, color: '#f87171', fontSize: 14 }}>
              {escalated.length} Active Escalation
              {escalated.length > 1 ? 's' : ''}
            </div>
            <div style={{ ...mono, fontSize: 10, color: '#7f4f4f' }}>
              Requires immediate attention
            </div>
          </div>
        </div>
      )}

      {/* Filters */}
      <div style={{ overflowX: 'auto', paddingBottom: 4, marginBottom: 8 }}>
        <div style={{ display: 'flex', gap: 6, minWidth: 'max-content' }}>
          {['All', ...CENTRES].map((c) => (
            <button
              key={c}
              style={S.pill(centreF === c)}
              onClick={() => setCentreF(c)}
            >
              {c}
            </button>
          ))}
        </div>
      </div>
      <div style={{ display: 'flex', gap: 6, marginBottom: 8 }}>
        {['All', 'Coaching', 'Pay & Play'].map((d) => (
          <button key={d} style={S.pill(divF === d)} onClick={() => setDivF(d)}>
            {d}
          </button>
        ))}
      </div>
      <div style={{ display: 'flex', gap: 6, marginBottom: 18 }}>
        {['Today', 'This Week', 'This Month', 'All Time'].map((t) => (
          <button
            key={t}
            style={S.pill(timeF === t)}
            onClick={() => setTimeF(t)}
          >
            {t}
          </button>
        ))}
      </div>

      {/* Sub tabs */}
      <div
        style={{
          display: 'flex',
          borderBottom: '1px solid #111',
          marginBottom: 20,
          overflowX: 'auto',
        }}
      >
        {[
          ['overview', '📊 Overview'],
          ['escalations', '🚨 Flags'],
          ['breakdown', '📈 Breakdown'],
          ['comments', '💬 Comments'],
          ['feed', '🕐 Live Feed'],
        ].map(([t, l]) => (
          <button key={t} style={S.tabB(tab === t)} onClick={() => setTab(t)}>
            {l}
          </button>
        ))}
      </div>

      {tab === 'overview' && (
        <>
          <div style={sT}>Path Breakdown</div>
          {[
            ['😔 Low (1–2★)', paths.low, '#f87171'],
            ['😐 Mid (3★)', paths.mid, '#facc15'],
            ['😊 High (4–5★)', paths.high, '#39FF14'],
          ].map(([l, v, c]) => (
            <div
              key={l}
              style={{
                ...card,
                display: 'flex',
                alignItems: 'center',
                gap: 12,
              }}
            >
              <span style={{ ...mono, fontSize: 11, color: '#bbb', flex: 1 }}>
                {l}
              </span>
              <div
                style={{
                  width: 80,
                  height: 5,
                  background: '#111',
                  borderRadius: 3,
                  overflow: 'hidden',
                }}
              >
                <div
                  style={{
                    width: `${rows.length ? (v / rows.length) * 100 : 0}%`,
                    height: '100%',
                    background: c,
                    borderRadius: 3,
                  }}
                />
              </div>
              <span
                style={{
                  fontWeight: 700,
                  color: c,
                  minWidth: 20,
                  textAlign: 'right',
                }}
              >
                {v}
              </span>
            </div>
          ))}
          <div style={sT}>Centre Performance</div>
          <div style={{ overflowX: 'auto' }}>
            <table
              style={{
                width: '100%',
                borderCollapse: 'collapse',
                ...mono,
                fontSize: 11,
              }}
            >
              <thead>
                <tr style={{ borderBottom: '1px solid #1a1a1a' }}>
                  {['Centre', 'Resp', 'Avg', 'NPS', 'Esc'].map((h) => (
                    <th
                      key={h}
                      style={{
                        padding: '8px 6px',
                        color: '#39FF14',
                        textAlign: 'left',
                        fontWeight: 600,
                        letterSpacing: 1,
                      }}
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {centrePerf.map((c) => (
                  <tr
                    key={c.centre}
                    style={{ borderBottom: '1px solid #0a0a0a' }}
                  >
                    <td style={{ padding: '8px 6px', color: '#bbb' }}>
                      {c.centre}
                    </td>
                    <td style={{ padding: '8px 6px', color: '#fff' }}>
                      {c.count}
                    </td>
                    <td style={{ padding: '8px 6px', color: '#39FF14' }}>
                      {c.avg}★
                    </td>
                    <td
                      style={{
                        padding: '8px 6px',
                        color:
                          c.nps >= 50
                            ? '#39FF14'
                            : c.nps >= 0
                            ? '#facc15'
                            : '#f97316',
                      }}
                    >
                      {c.nps ?? '-'}
                    </td>
                    <td
                      style={{
                        padding: '8px 6px',
                        color: c.esc > 0 ? '#f87171' : '#555',
                      }}
                    >
                      {c.esc}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div style={sT}>Top Issues</div>
          {topIssues.length === 0 && (
            <div style={{ ...mono, fontSize: 11, color: '#444' }}>
              No issues reported ✅
            </div>
          )}
          {topIssues.map(([issue, count]) => (
            <div
              key={issue}
              style={{
                ...card,
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <span style={{ ...mono, fontSize: 11, color: '#bbb' }}>
                {issue}
              </span>
              <span style={{ fontWeight: 700, color: '#f87171', fontSize: 14 }}>
                {count}×
              </span>
            </div>
          ))}
        </>
      )}

      {tab === 'escalations' && (
        <>
          <div
            style={{
              ...mono,
              fontSize: 11,
              color: '#f87171',
              marginBottom: 14,
            }}
          >
            {escalated.length} escalation{escalated.length !== 1 ? 's' : ''}{' '}
            requiring action
          </div>
          {escalated.length === 0 && (
            <div style={{ ...mono, fontSize: 11, color: '#39FF14' }}>
              No escalations. All clear ✅
            </div>
          )}
          {escalated.map((r, i) => (
            <div
              key={i}
              style={{
                ...card,
                background: '#0d0000',
                border: '1px solid #7f1d1d',
                marginBottom: 12,
              }}
            >
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: 8,
                }}
              >
                <div style={{ display: 'flex', gap: 6 }}>
                  {tag('#f87171', '🚨 FLAGGED')}
                  {tag('#f97316', r.division.toUpperCase())}
                </div>
                <span style={{ ...mono, fontSize: 9, color: '#444' }}>
                  {new Date(r.timestamp).toLocaleString('en-IN', {
                    day: '2-digit',
                    month: 'short',
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </span>
              </div>
              <div style={{ fontWeight: 700, color: '#fff', marginBottom: 4 }}>
                {r.centre}
              </div>
              <div
                style={{
                  ...mono,
                  fontSize: 11,
                  color: '#f87171',
                  marginBottom: 4,
                }}
              >
                {'⭐'.repeat(+r.overall_rating)} · Issue:{' '}
                {r.issue || 'Not specified'}
              </div>
              {r.issue_detail && (
                <div
                  style={{
                    ...mono,
                    fontSize: 11,
                    color: '#666',
                    marginBottom: 6,
                  }}
                >
                  "{r.issue_detail}"
                </div>
              )}
              {r.contact && (
                <div style={{ ...mono, fontSize: 11, color: '#39FF14' }}>
                  📱 {r.contact}
                </div>
              )}
              <div style={{ display: 'flex', gap: 6, marginTop: 10 }}>
                {tag('#facc15', 'NEW')}
              </div>
            </div>
          ))}
        </>
      )}

      {tab === 'breakdown' && (
        <>
          <div style={sT}>🎓 Coaching Metrics</div>
          {coachingMetrics.map((m) => (
            <div key={m.metric} style={card}>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  marginBottom: 8,
                }}
              >
                <span style={{ ...mono, fontSize: 11, color: '#888' }}>
                  {m.metric}
                </span>
                <span style={{ fontWeight: 700, color: '#39FF14' }}>
                  {m.avg}★
                </span>
              </div>
              <div
                style={{
                  height: 5,
                  background: '#111',
                  borderRadius: 3,
                  overflow: 'hidden',
                }}
              >
                <div
                  style={{
                    width: `${(+m.avg / 5) * 100}%`,
                    height: '100%',
                    background: '#39FF14',
                    borderRadius: 3,
                    boxShadow: '0 0 6px #39FF1488',
                  }}
                />
              </div>
            </div>
          ))}
          <div style={sT}>🎾 Pay & Play Metrics</div>
          {payplayMetrics.map((m) => (
            <div key={m.metric} style={card}>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  marginBottom: 8,
                }}
              >
                <span style={{ ...mono, fontSize: 11, color: '#888' }}>
                  {m.metric}
                </span>
                <span style={{ fontWeight: 700, color: '#39FF14' }}>
                  {m.avg}★
                </span>
              </div>
              <div
                style={{
                  height: 5,
                  background: '#111',
                  borderRadius: 3,
                  overflow: 'hidden',
                }}
              >
                <div
                  style={{
                    width: `${(+m.avg / 5) * 100}%`,
                    height: '100%',
                    background: '#39FF14',
                    borderRadius: 3,
                    boxShadow: '0 0 6px #39FF1488',
                  }}
                />
              </div>
            </div>
          ))}
          <div style={sT}>Sport-wise Ratings</div>
          {sportStats.map((s) => (
            <div
              key={s.sport}
              style={{
                ...card,
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <span style={{ fontWeight: 700, color: '#fff' }}>{s.sport}</span>
              <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                <span style={{ ...mono, fontSize: 10, color: '#555' }}>
                  {s.count} sessions
                </span>
                <span style={{ fontWeight: 700, color: '#39FF14' }}>
                  {s.avg}★
                </span>
              </div>
            </div>
          ))}
        </>
      )}

      {tab === 'comments' && (
        <>
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search comments..."
            style={{ ...S.input, marginBottom: 14 }}
          />
          {comments.length === 0 && (
            <div style={{ ...mono, fontSize: 11, color: '#444' }}>
              No comments found.
            </div>
          )}
          {comments.map((r, i) => (
            <div key={i} style={card}>
              <div
                style={{
                  display: 'flex',
                  gap: 6,
                  marginBottom: 8,
                  flexWrap: 'wrap',
                }}
              >
                {tag('#39FF14', r.centre)}
                {tag('#888', r.division)}
                {r.escalated === 'YES' && tag('#f87171', '🚨 FLAGGED')}
              </div>
              <div
                style={{
                  ...mono,
                  fontSize: 12,
                  color: '#ccc',
                  lineHeight: 1.7,
                  marginBottom: 8,
                }}
              >
                "{r.comment}"
              </div>
              <div style={{ ...mono, fontSize: 10, color: '#444' }}>
                {'⭐'.repeat(+r.overall_rating)} · NPS {r.nps} ·{' '}
                {new Date(r.timestamp).toLocaleDateString('en-IN')}
              </div>
            </div>
          ))}
        </>
      )}

      {tab === 'feed' && (
        <>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: 14,
            }}
          >
            <div style={{ fontWeight: 700, color: '#fff', fontSize: 14 }}>
              All Submissions
            </div>
            <div style={{ ...mono, fontSize: 9, color: '#555' }}>
              Last refreshed{' '}
              {new Date().toLocaleTimeString('en-IN', {
                hour: '2-digit',
                minute: '2-digit',
              })}
            </div>
          </div>
          <div style={{ overflowX: 'auto' }}>
            <table
              style={{
                width: '100%',
                borderCollapse: 'collapse',
                ...mono,
                fontSize: 10,
                minWidth: 500,
              }}
            >
              <thead>
                <tr style={{ borderBottom: '1px solid #1a1a1a' }}>
                  {[
                    'Time',
                    'Centre',
                    'Division',
                    'Sport',
                    'Rating',
                    'Path',
                    'Status',
                  ].map((h) => (
                    <th
                      key={h}
                      style={{
                        padding: '8px 6px',
                        color: '#39FF14',
                        textAlign: 'left',
                        letterSpacing: 1,
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[...data].reverse().map((r, i) => (
                  <tr key={i} style={{ borderBottom: '1px solid #0a0a0a' }}>
                    <td
                      style={{
                        padding: '8px 6px',
                        color: '#555',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {new Date(r.timestamp).toLocaleTimeString('en-IN', {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </td>
                    <td
                      style={{
                        padding: '8px 6px',
                        color: '#bbb',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {r.centre}
                    </td>
                    <td style={{ padding: '8px 6px', color: '#888' }}>
                      {r.division}
                    </td>
                    <td style={{ padding: '8px 6px', color: '#888' }}>
                      {r.sport}
                    </td>
                    <td style={{ padding: '8px 6px', color: '#39FF14' }}>
                      {'⭐'.repeat(+r.overall_rating)}
                    </td>
                    <td style={{ padding: '8px 6px' }}>
                      <span
                        style={{
                          color:
                            r.path === 'low'
                              ? '#f87171'
                              : r.path === 'mid'
                              ? '#facc15'
                              : '#39FF14',
                          textTransform: 'uppercase',
                          fontSize: 9,
                        }}
                      >
                        {r.path}
                      </span>
                    </td>
                    <td style={{ padding: '8px 6px' }}>
                      <span
                        style={{
                          color: r.escalated === 'YES' ? '#f87171' : '#444',
                          fontWeight: r.escalated === 'YES' ? 700 : 400,
                        }}
                      >
                        {r.escalated === 'YES' ? '🚨 YES' : 'no'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
}

// ── ROOT APP ──────────────────────────────────────────────────────────────────
export default function App() {
  const [view, setView] = useState('feedback');
  const [reset, setReset] = useState(0);
  const [adminAuth, setAdminAuth] = useState(false);
  const [adminEmail, setAdminEmail] = useState('');

  const handleAdminLogin = (email) => {
    setAdminAuth(true);
    setAdminEmail(email);
  };

  const handleLogout = () => {
    setAdminAuth(false);
    setAdminEmail('');
    setView('feedback');
  };

  return (
    <>
     <style>{`
  @import url('https://fonts.googleapis.com/css2?family=Rajdhani:wght@600;700&family=Space+Mono:wght@400;700&display=swap');
  *{box-sizing:border-box;margin:0;padding:0;}
  html,body,#root{height:100%;width:100%;}
  body{background:#000;overflow-x:hidden;}
  button{outline:none;-webkit-tap-highlight-color:transparent;}
  input,textarea{outline:none;-webkit-appearance:none;}
  input:focus,textarea:focus{border-color:#39FF14!important;}
  ::-webkit-scrollbar{width:3px;height:3px;}
  ::-webkit-scrollbar-thumb{background:#1a1a1a;border-radius:4px;}
`}</style>
      <div style={S.app}>
        <div
          <div style={{padding:"16px 14px 0",borderBottom:"1px solid #0f0f0f"}}>
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: 16,
            }}
          >
            <div>
              <div
                style={{
                  fontSize: 24,
                  fontWeight: 700,
                  color: '#39FF14',
                  letterSpacing: 1,
                  textShadow: '0 0 12px #39FF1466',
                }}
              >
                HOPPR
              </div>
              <div
                style={{
                  fontFamily: "'Space Mono',monospace",
                  fontSize: 8,
                  color: '#222',
                  letterSpacing: 3,
                }}
              >
                SPORTS CENTRES
              </div>
            </div>
            <div
              style={{
                fontFamily: "'Space Mono',monospace",
                fontSize: 9,
                color: '#222',
                background: '#0a0a0a',
                border: '1px solid #111',
                borderRadius: 8,
                padding: '5px 10px',
              }}
            >
              {view === 'feedback' ? '💬 FEEDBACK' : '📊 ADMIN'}
            </div>
          </div>
          <div style={{ display: 'flex', borderBottom: '1px solid #111' }}>
            <button
              style={S.tabB(view === 'feedback')}
              onClick={() => setView('feedback')}
            >
              Feedback
            </button>
            <button
              style={S.tabB(view === 'admin')}
              onClick={() => setView('admin')}
            >
              Admin
            </button>
          </div>
        </div>

        {view === 'feedback' ? (
          <FeedbackForm key={reset} onDone={() => setReset((r) => r + 1)} />
        ) : adminAuth ? (
          <AdminDashboard onLogout={handleLogout} adminEmail={adminEmail} />
        ) : (
          <AdminLogin onSuccess={handleAdminLogin} />
        )}
      </div>
    </>
  );
}
