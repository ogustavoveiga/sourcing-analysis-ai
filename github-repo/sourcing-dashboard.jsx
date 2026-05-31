import { useState } from "react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell,
} from "recharts";

const FUNNEL_DATA = [
  { stage: "Sourced", value: 600 },
  { stage: "Responded", value: 408 },
  { stage: "Screening", value: 307 },
  { stage: "Interview", value: 233 },
  { stage: "Test", value: 200 },
  { stage: "Offer", value: 61 },
  { stage: "Hired", value: 48 },
];

const CHANNEL_DATA = [
  { channel: "Github", hire_rate: 11.0, no_response: 31.5 },
  { channel: "Inbound", hire_rate: 10.1, no_response: 20.3 },
  { channel: "Hunting", hire_rate: 9.3, no_response: 36.0 },
  { channel: "Banco Talentos", hire_rate: 8.8, no_response: 25.0 },
  { channel: "LinkedIn", hire_rate: 8.6, no_response: 37.0 },
  { channel: "Comunidade", hire_rate: 7.9, no_response: 32.6 },
  { channel: "Evento", hire_rate: 4.9, no_response: 32.9 },
  { channel: "Indicação", hire_rate: 3.2, no_response: 39.7 },
];

const RESPONSE_TIME_DATA = [
  { bucket: "Fast (0–2d)", hire_rate: 10.1 },
  { bucket: "Medium (3–6d)", hire_rate: 15.3 },
  { bucket: "Slow (7–12d)", hire_rate: 9.9 },
];

const RECRUITER_DATA = [
  { recruiter: "Bruno", hire_rate: 15.3, total: 98, hired: 15, best_channel: "Banco Talentos (28.6%)" },
  { recruiter: "Ana", hire_rate: 13.3, total: 75, hired: 10, best_channel: "Hunting (22.2%)" },
  { recruiter: "Carla", hire_rate: 8.0, total: 100, hired: 8, best_channel: "Banco Talentos (18.2%)" },
  { recruiter: "Gustavo", hire_rate: 5.0, total: 121, hired: 6, best_channel: "Github (14.3%)" },
  { recruiter: "Diego", hire_rate: 4.9, total: 103, hired: 5, best_channel: "Hunting (11.8%)" },
  { recruiter: "Fernanda", hire_rate: 3.9, total: 103, hired: 4, best_channel: "Hunting (8.3%)" },
];

const REJECTION_DATA = [
  { reason: "No response", count: 210 },
  { reason: "Failed test", count: 25 },
  { reason: "Timing", count: 24 },
  { reason: "Low tech fit", count: 23 },
  { reason: "Low engagement", count: 23 },
  { reason: "HC closed", count: 22 },
  { reason: "Salary", count: 18 },
  { reason: "Accepted other", count: 18 },
  { reason: "Culture", count: 12 },
];

const SENIORITY_DATA = [
  { level: "Staff", hire_rate: 13.3 },
  { level: "Senior", hire_rate: 9.4 },
  { level: "Pleno", hire_rate: 7.0 },
  { level: "Junior", hire_rate: 4.6 },
];

const DEPT_DATA = [
  { dept: "Tech", hire_rate: 11.2 },
  { dept: "Data", hire_rate: 7.9 },
  { dept: "People", hire_rate: 6.7 },
  { dept: "Operations", hire_rate: 6.4 },
];

const WORKMODE_DATA = [
  { mode: "Híbrido", hire_rate: 10.8 },
  { mode: "Presencial", hire_rate: 8.8 },
  { mode: "Remoto", hire_rate: 4.5 },
];

const C = {
  bg: "#0a0a0f", surface: "#111118", card: "#16161f", border: "#1e1e2e",
  accent: "#00d4b1", accent2: "#e94560", accent3: "#f7b731",
  text: "#e8e8f0", muted: "#6b6b8a", gridLine: "#1a1a2e",
};

const SectionTitle = ({ children, sub }) => (
  <div style={{ marginBottom: 24 }}>
    <h2 style={{ fontFamily: "Georgia, serif", fontSize: 22, fontWeight: 400, color: C.text, margin: 0 }}>{children}</h2>
    {sub && <p style={{ color: C.muted, fontSize: 12, margin: "4px 0 0", fontFamily: "monospace" }}>{sub}</p>}
  </div>
);

const KPICard = ({ label, value, sub, accent }) => (
  <div style={{
    background: C.card, border: `1px solid ${C.border}`, borderRadius: 12, padding: "20px 24px",
    borderTop: `2px solid ${accent || C.accent}`,
  }}>
    <div style={{ color: C.muted, fontSize: 11, textTransform: "uppercase", letterSpacing: "0.1em", fontFamily: "monospace" }}>{label}</div>
    <div style={{ color: accent || C.accent, fontSize: 32, fontWeight: 700, margin: "6px 0 2px", fontFamily: "Georgia, serif" }}>{value}</div>
    {sub && <div style={{ color: C.muted, fontSize: 12 }}>{sub}</div>}
  </div>
);

const Card = ({ children, style }) => (
  <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 12, padding: 24, ...style }}>{children}</div>
);

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 8, padding: "10px 14px", fontSize: 13, color: C.text, fontFamily: "monospace" }}>
        <div style={{ color: C.muted, marginBottom: 4 }}>{label}</div>
        {payload.map((p, i) => (
          <div key={i} style={{ color: p.color || C.accent }}>{p.name}: <strong>{p.value}</strong></div>
        ))}
      </div>
    );
  }
  return null;
};

const TABS = ["Funnel", "Channels", "Recruiters", "Signals", "✦ AI Scorer"];

const FORM_DEFAULTS = {
  source_channel: "Github", seniority: "Senior", department: "Tech", work_mode: "Híbrido",
  years_experience: 5, response_time_days: 3, screening_pass: "Yes",
  behavior_score: 75, technical_test_score: 78, manager_score: 72,
  recruiter: "Bruno", recruiter_notes: "",
};

const SELECT = ({ label, field, options, form, setForm }) => (
  <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
    <label style={{ color: C.muted, fontSize: 11, textTransform: "uppercase", letterSpacing: "0.08em", fontFamily: "monospace" }}>{label}</label>
    <select value={form[field]} onChange={e => setForm(f => ({ ...f, [field]: e.target.value }))}
      style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 8, padding: "10px 12px", color: C.text, fontSize: 14, outline: "none", fontFamily: "monospace" }}>
      {options.map(o => <option key={o} value={o}>{o}</option>)}
    </select>
  </div>
);

const SLIDER = ({ label, field, min, max, form, setForm, unit }) => (
  <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
    <label style={{ color: C.muted, fontSize: 11, textTransform: "uppercase", letterSpacing: "0.08em", fontFamily: "monospace", display: "block" }}>
      {label} <span style={{ color: C.accent }}>{form[field]}{unit || ""}</span>
    </label>
    <input type="range" min={min} max={max} value={form[field]}
      onChange={e => setForm(f => ({ ...f, [field]: Number(e.target.value) }))}
      style={{ accentColor: C.accent, width: "100%" }} />
    <div style={{ display: "flex", justifyContent: "space-between", color: C.muted, fontSize: 10, fontFamily: "monospace" }}>
      <span>{min}</span><span>{max}</span>
    </div>
  </div>
);

const AIScorer = () => {
  const [form, setForm] = useState(FORM_DEFAULTS);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const buildPrompt = (f) => `You are a senior Talent Acquisition analyst. You studied a recruitment dataset of 600 candidates with 8% overall hire rate.

Key patterns from the data:
- Best channels by hire rate: Github (11.0%), Inbound (10.1%), Hunting (9.3%)
- Worst: Indicação (3.2%), Evento (4.9%)
- Response time sweet spot: Medium 3-6 days (15.3%) beats Fast 0-2 days (10.1%) and Slow 7-12 days (9.9%)
- Top recruiters: Bruno (15.3%), Ana (13.3%) — bottom: Fernanda (3.9%), Diego (4.9%)
- Seniority hire rates: Staff 13.3% > Senior 9.4% > Pleno 7.0% > Junior 4.6%
- Work mode: Híbrido 10.8% > Presencial 8.8% > Remoto 4.5%
- Tech dept highest (11.2%), Operations lowest (6.4%)
- Hired avg scores: technical=81.6, behavior=81.6, manager=80.4, experience=6.5y
- Not-hired avg scores: technical=72.9, behavior=74.0, manager=73.1, experience=5.5y
- Biggest rejection: No response (56% of all rejections)

Evaluate this candidate:
- Source channel: ${f.source_channel}
- Seniority: ${f.seniority}
- Department: ${f.department}
- Work mode: ${f.work_mode}
- Years experience: ${f.years_experience}
- Response time: ${f.response_time_days} days
- Passed screening: ${f.screening_pass}
- Behavior score: ${f.behavior_score}/100
- Technical score: ${f.technical_test_score}/100
- Manager score: ${f.manager_score}/100
- Recruiter: ${f.recruiter}
${f.recruiter_notes ? `- Notes: "${f.recruiter_notes}"` : ""}

Respond ONLY with this exact JSON (no markdown, no extra text):
{"probability":"High|Medium|Low","score":<0-100>,"top_factors":[{"factor":"<name>","impact":"positive|negative","explanation":"<one sentence>"},{"factor":"<name>","impact":"positive|negative","explanation":"<one sentence>"},{"factor":"<name>","impact":"positive|negative","explanation":"<one sentence>"}],"recommendation":"<one actionable sentence>","persist":true|false,"persist_reason":"<one sentence>"}`;

  const runScorer = async () => {
    setLoading(true); setResult(null); setError(null);
    try {
      const response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514", max_tokens: 1000,
          messages: [{ role: "user", content: buildPrompt(form) }],
        }),
      });
      const data = await response.json();
      const text = data.content?.map(b => b.text || "").join("") || "";
      const clean = text.replace(/```json|```/g, "").trim();
      setResult(JSON.parse(clean));
    } catch (e) { setError("Error: " + e.message); }
    finally { setLoading(false); }
  };

  const probColor = (p) => p === "High" ? C.accent : p === "Medium" ? C.accent3 : C.accent2;

  return (
    <div>
      <SectionTitle sub="// live claude api · real-time candidate evaluation against dataset patterns">AI Candidate Scorer</SectionTitle>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
        <Card>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 18 }}>
            <SELECT label="Source Channel" field="source_channel" form={form} setForm={setForm} options={["Github","Inbound","Hunting","Banco de Talentos","LinkedIn","Comunidade","Evento","Indicação"]} />
            <SELECT label="Seniority" field="seniority" form={form} setForm={setForm} options={["Junior","Pleno","Senior","Staff"]} />
            <SELECT label="Department" field="department" form={form} setForm={setForm} options={["Tech","Data","People","Operations"]} />
            <SELECT label="Work Mode" field="work_mode" form={form} setForm={setForm} options={["Híbrido","Presencial","Remoto"]} />
            <SELECT label="Recruiter" field="recruiter" form={form} setForm={setForm} options={["Bruno","Ana","Carla","Gustavo","Diego","Fernanda"]} />
            <SELECT label="Screening Passed" field="screening_pass" form={form} setForm={setForm} options={["Yes","No"]} />
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 14, marginBottom: 18 }}>
            <SLIDER label="Years of Experience" field="years_experience" min={0} max={15} form={form} setForm={setForm} unit="y" />
            <SLIDER label="Response Time" field="response_time_days" min={0} max={12} form={form} setForm={setForm} unit="d" />
            <SLIDER label="Behavior Score" field="behavior_score" min={0} max={100} form={form} setForm={setForm} />
            <SLIDER label="Technical Test Score" field="technical_test_score" min={0} max={100} form={form} setForm={setForm} />
            <SLIDER label="Manager Score" field="manager_score" min={0} max={100} form={form} setForm={setForm} />
          </div>
          <div style={{ marginBottom: 18 }}>
            <label style={{ color: C.muted, fontSize: 11, textTransform: "uppercase", letterSpacing: "0.08em", fontFamily: "monospace", display: "block", marginBottom: 6 }}>Recruiter Notes (optional)</label>
            <textarea value={form.recruiter_notes} onChange={e => setForm(f => ({ ...f, recruiter_notes: e.target.value }))}
              placeholder="e.g. Strong cultural fit, salary expectation high..." rows={3}
              style={{ width: "100%", background: C.surface, border: `1px solid ${C.border}`, borderRadius: 8, padding: "10px 12px", color: C.text, fontSize: 13, outline: "none", resize: "vertical", boxSizing: "border-box", fontFamily: "monospace" }} />
          </div>
          <button onClick={runScorer} disabled={loading}
            style={{ width: "100%", padding: "14px 0", background: loading ? C.border : C.accent, color: loading ? C.muted : C.bg, border: "none", borderRadius: 10, fontSize: 14, fontWeight: 700, cursor: loading ? "not-allowed" : "pointer", letterSpacing: "0.05em", textTransform: "uppercase", fontFamily: "monospace" }}>
            {loading ? "Claude is reasoning..." : "▶  Score this candidate"}
          </button>
        </Card>

        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {!result && !loading && !error && (
            <Card style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: 12, minHeight: 400 }}>
              <div style={{ fontSize: 48 }}>🎯</div>
              <p style={{ color: C.muted, textAlign: "center", fontSize: 14, fontFamily: "monospace" }}>Fill in the candidate profile<br/>and click Score to get AI evaluation</p>
            </Card>
          )}
          {loading && (
            <Card style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: 16, minHeight: 400 }}>
              <div style={{ width: 40, height: 40, border: `3px solid ${C.border}`, borderTop: `3px solid ${C.accent}`, borderRadius: "50%", animation: "spin 1s linear infinite" }} />
              <p style={{ color: C.muted, fontFamily: "monospace", fontSize: 13 }}>Claude is analyzing the profile...</p>
              <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
            </Card>
          )}
          {error && <Card style={{ borderTop: `2px solid ${C.accent2}` }}><p style={{ color: C.accent2, fontFamily: "monospace", fontSize: 13 }}>{error}</p></Card>}
          {result && (
            <>
              <Card style={{ borderTop: `2px solid ${probColor(result.probability)}`, textAlign: "center" }}>
                <div style={{ color: C.muted, fontSize: 11, fontFamily: "monospace", textTransform: "uppercase", letterSpacing: "0.1em" }}>Hire Probability</div>
                <div style={{ color: probColor(result.probability), fontSize: 52, fontWeight: 800, fontFamily: "Georgia, serif", margin: "8px 0 4px" }}>{result.probability}</div>
                <div style={{ color: C.muted, fontSize: 13, fontFamily: "monospace" }}>Confidence score: {result.score}/100</div>
                <div style={{ background: C.border, borderRadius: 4, height: 6, marginTop: 12, overflow: "hidden" }}>
                  <div style={{ height: "100%", width: `${result.score}%`, background: probColor(result.probability), borderRadius: 4 }} />
                </div>
              </Card>
              <Card>
                <div style={{ color: C.muted, fontSize: 11, fontFamily: "monospace", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 12 }}>Key Factors</div>
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  {result.top_factors?.map((f, i) => (
                    <div key={i} style={{ display: "flex", gap: 10, alignItems: "flex-start", padding: "10px 12px", borderRadius: 8, background: f.impact === "positive" ? "rgba(0,212,177,0.07)" : "rgba(233,69,96,0.07)", border: `1px solid ${f.impact === "positive" ? "rgba(0,212,177,0.15)" : "rgba(233,69,96,0.15)"}` }}>
                      <span style={{ fontSize: 16 }}>{f.impact === "positive" ? "↑" : "↓"}</span>
                      <div>
                        <div style={{ color: f.impact === "positive" ? C.accent : C.accent2, fontSize: 12, fontWeight: 700, fontFamily: "monospace" }}>{f.factor}</div>
                        <div style={{ color: C.muted, fontSize: 12, marginTop: 2 }}>{f.explanation}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
              <Card style={{ borderTop: `2px solid ${result.persist ? C.accent : C.accent3}` }}>
                <div style={{ color: C.muted, fontSize: 11, fontFamily: "monospace", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 8 }}>Recruiter Recommendation</div>
                <p style={{ color: C.text, fontSize: 14, margin: "0 0 12px", lineHeight: 1.6 }}>{result.recommendation}</p>
                <div style={{ display: "inline-flex", gap: 8, alignItems: "center", padding: "6px 12px", borderRadius: 20, background: result.persist ? "rgba(0,212,177,0.1)" : "rgba(247,183,49,0.1)", border: `1px solid ${result.persist ? C.accent : C.accent3}` }}>
                  <span>{result.persist ? "✓" : "⚡"}</span>
                  <span style={{ color: result.persist ? C.accent : C.accent3, fontSize: 12, fontFamily: "monospace" }}>{result.persist ? "PERSIST WITH THIS CANDIDATE" : "REVIEW BEFORE PROCEEDING"}</span>
                </div>
                <p style={{ color: C.muted, fontSize: 12, margin: "10px 0 0" }}>{result.persist_reason}</p>
              </Card>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default function App() {
  const [tab, setTab] = useState(0);

  return (
    <div style={{ minHeight: "100vh", background: C.bg, color: C.text, fontFamily: "system-ui, sans-serif" }}>
      <style>{`* { box-sizing: border-box; } select option { background: #111118; }`}</style>

      <div style={{ borderBottom: `1px solid ${C.border}`, padding: "20px 40px", display: "flex", alignItems: "center", justifyContent: "space-between", background: C.surface, position: "sticky", top: 0, zIndex: 100 }}>
        <div>
          <div style={{ color: C.muted, fontFamily: "monospace", fontSize: 11, textTransform: "uppercase", letterSpacing: "0.1em" }}>Sourcing Intelligence · 600 candidates · 8 channels · 6 recruiters</div>
          <h1 style={{ fontFamily: "Georgia, serif", fontSize: 24, fontWeight: 400, margin: "4px 0 0", color: C.text }}>Recruitment Analytics <span style={{ color: C.accent }}>+ AI</span></h1>
        </div>
        <div style={{ background: "rgba(0,212,177,0.08)", border: `1px solid rgba(0,212,177,0.2)`, borderRadius: 8, padding: "6px 14px", color: C.accent, fontSize: 12, fontFamily: "monospace" }}>● Live Claude API</div>
      </div>

      <div style={{ display: "flex", padding: "0 40px", borderBottom: `1px solid ${C.border}`, background: C.surface }}>
        {TABS.map((t, i) => (
          <button key={t} onClick={() => setTab(i)} style={{ background: "none", border: "none", borderBottom: tab === i ? `2px solid ${C.accent}` : "2px solid transparent", padding: "14px 20px", cursor: "pointer", color: tab === i ? C.accent : C.muted, fontSize: 13, fontFamily: "monospace", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: -1, fontWeight: tab === i ? 700 : 400 }}>{t}</button>
        ))}
      </div>

      <div style={{ padding: "32px 40px", maxWidth: 1200, margin: "0 auto" }}>

        {/* FUNNEL TAB */}
        {tab === 0 && (
          <div>
            <SectionTitle sub="// stage-by-stage conversion · 600 candidates total">Recruitment Funnel</SectionTitle>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, marginBottom: 32 }}>
              <KPICard label="Overall Hire Rate" value="8.0%" sub="48 of 600 sourced" />
              <KPICard label="Response Rate" value="68.0%" sub="408 responded" accent={C.accent3} />
              <KPICard label="Offer Acceptance" value="78.7%" sub="48 of 61 offers" accent={C.accent2} />
              <KPICard label="Test → Offer" value="30.5%" sub="Steepest drop · 61 of 200" accent="#a78bfa" />
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
              <Card>
                <div style={{ color: C.muted, fontSize: 11, fontFamily: "monospace", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 16 }}>Pipeline Volume</div>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={FUNNEL_DATA} layout="vertical" margin={{ left: 20, right: 30 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke={C.gridLine} horizontal={false} />
                    <XAxis type="number" tick={{ fill: C.muted, fontSize: 11, fontFamily: "monospace" }} />
                    <YAxis type="category" dataKey="stage" tick={{ fill: C.muted, fontSize: 12, fontFamily: "monospace" }} width={80} />
                    <Tooltip content={<CustomTooltip />} />
                    <Bar dataKey="value" fill={C.accent} radius={[0, 4, 4, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </Card>
              <Card>
                <div style={{ color: C.muted, fontSize: 11, fontFamily: "monospace", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 16 }}>Stage Conversion Rates</div>
                {[
                  { from: "Sourced → Responded", rate: 68.0, color: C.accent },
                  { from: "Responded → Screening", rate: 75.2, color: C.accent },
                  { from: "Screening → Interview", rate: 75.9, color: C.accent3 },
                  { from: "Interview → Test", rate: 85.8, color: C.accent3 },
                  { from: "Test → Offer", rate: 30.5, color: C.accent2 },
                  { from: "Offer → Hired", rate: 78.7, color: C.accent },
                ].map((item, i) => (
                  <div key={i} style={{ marginBottom: 14 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                      <span style={{ color: C.muted, fontSize: 12, fontFamily: "monospace" }}>{item.from}</span>
                      <span style={{ color: item.color, fontSize: 12, fontWeight: 700, fontFamily: "monospace" }}>{item.rate}%</span>
                    </div>
                    <div style={{ background: C.border, borderRadius: 3, height: 5 }}>
                      <div style={{ height: "100%", width: `${item.rate}%`, background: item.color, borderRadius: 3 }} />
                    </div>
                  </div>
                ))}
                <div style={{ marginTop: 16, padding: "12px 14px", background: "rgba(233,69,96,0.07)", borderRadius: 8, border: `1px solid rgba(233,69,96,0.15)` }}>
                  <span style={{ color: C.accent2, fontSize: 11, fontFamily: "monospace" }}>⚠ KEY BOTTLENECK: </span>
                  <span style={{ color: C.muted, fontSize: 12 }}>Test → Offer at 30.5% is the steepest cliff. Only 61 of 200 tested candidates received an offer.</span>
                </div>
              </Card>
            </div>
            <Card style={{ marginTop: 24 }}>
              <div style={{ color: C.muted, fontSize: 11, fontFamily: "monospace", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 16 }}>Rejection Reasons</div>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={REJECTION_DATA} margin={{ left: 0, right: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke={C.gridLine} vertical={false} />
                  <XAxis dataKey="reason" tick={{ fill: C.muted, fontSize: 11, fontFamily: "monospace" }} />
                  <YAxis tick={{ fill: C.muted, fontSize: 11, fontFamily: "monospace" }} />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar dataKey="count" fill={C.accent2} radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
              <div style={{ marginTop: 12, padding: "12px 14px", background: "rgba(0,212,177,0.05)", borderRadius: 8, border: `1px solid rgba(0,212,177,0.12)` }}>
                <span style={{ color: C.accent, fontFamily: "monospace", fontSize: 12 }}>Key insight: </span>
                <span style={{ color: C.muted, fontSize: 12 }}>"No response" = 210 rejections (56% of all). This is an outreach problem, not a candidate quality problem.</span>
              </div>
            </Card>
          </div>
        )}

        {/* CHANNELS TAB */}
        {tab === 1 && (
          <div>
            <SectionTitle sub="// hire rate · no-response rate by source channel">Channel Performance</SectionTitle>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16, marginBottom: 32 }}>
              <KPICard label="Best Channel" value="Github" sub="11.0% hire rate" />
              <KPICard label="Worst Channel" value="Indicação" sub="3.2% hire rate · 39.7% ghost rate" accent={C.accent2} />
              <KPICard label="Highest Volume" value="Comunidade" sub="89 candidates" accent={C.accent3} />
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
              <Card>
                <div style={{ color: C.muted, fontSize: 11, fontFamily: "monospace", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 16 }}>Hire Rate by Channel</div>
                <ResponsiveContainer width="100%" height={280}>
                  <BarChart data={CHANNEL_DATA} layout="vertical" margin={{ left: 60, right: 40 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke={C.gridLine} horizontal={false} />
                    <XAxis type="number" tick={{ fill: C.muted, fontSize: 11, fontFamily: "monospace" }} unit="%" />
                    <YAxis type="category" dataKey="channel" tick={{ fill: C.muted, fontSize: 12, fontFamily: "monospace" }} width={100} />
                    <Tooltip content={<CustomTooltip />} />
                    <Bar dataKey="hire_rate" name="hire_rate" radius={[0, 4, 4, 0]}>
                      {CHANNEL_DATA.map((e, i) => <Cell key={i} fill={e.hire_rate >= 9 ? C.accent : e.hire_rate >= 7 ? C.accent3 : C.accent2} />)}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </Card>
              <Card>
                <div style={{ color: C.muted, fontSize: 11, fontFamily: "monospace", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 16 }}>No-Response Rate by Channel</div>
                <ResponsiveContainer width="100%" height={280}>
                  <BarChart data={[...CHANNEL_DATA].sort((a,b)=>b.no_response-a.no_response)} layout="vertical" margin={{ left: 60, right: 40 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke={C.gridLine} horizontal={false} />
                    <XAxis type="number" tick={{ fill: C.muted, fontSize: 11, fontFamily: "monospace" }} unit="%" />
                    <YAxis type="category" dataKey="channel" tick={{ fill: C.muted, fontSize: 12, fontFamily: "monospace" }} width={100} />
                    <Tooltip content={<CustomTooltip />} />
                    <Bar dataKey="no_response" name="no_response_rate" fill={C.accent2} radius={[0, 4, 4, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </Card>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16, marginTop: 24 }}>
              {[
                { title: "Seniority → Hire Rate", data: SENIORITY_DATA, key: "level", color: C.accent },
                { title: "Department → Hire Rate", data: DEPT_DATA, key: "dept", color: C.accent3 },
                { title: "Work Mode → Hire Rate", data: WORKMODE_DATA, key: "mode", color: "#a78bfa" },
              ].map((section, si) => (
                <Card key={si}>
                  <div style={{ color: C.muted, fontSize: 11, fontFamily: "monospace", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 14 }}>{section.title}</div>
                  {section.data.map((d, i) => (
                    <div key={i} style={{ marginBottom: 12 }}>
                      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                        <span style={{ color: C.text, fontSize: 13, fontFamily: "monospace" }}>{d[section.key]}</span>
                        <span style={{ color: section.color, fontSize: 13, fontFamily: "monospace", fontWeight: 700 }}>{d.hire_rate}%</span>
                      </div>
                      <div style={{ background: C.border, borderRadius: 2, height: 4 }}>
                        <div style={{ height: "100%", width: `${d.hire_rate * 7.5}%`, background: section.color, borderRadius: 2 }} />
                      </div>
                    </div>
                  ))}
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* RECRUITERS TAB */}
        {tab === 2 && (
          <div>
            <SectionTitle sub="// individual hire rate · volume · best channel per recruiter">Recruiter Performance</SectionTitle>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16, marginBottom: 32 }}>
              <KPICard label="Top Recruiter" value="Bruno" sub="15.3% hire rate · 98 candidates" />
              <KPICard label="Team Average" value="8.0%" sub="across 6 recruiters" accent={C.accent3} />
              <KPICard label="Performance Gap" value="3.9×" sub="Bruno vs Fernanda" accent={C.accent2} />
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
              <Card>
                <div style={{ color: C.muted, fontSize: 11, fontFamily: "monospace", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 16 }}>Hire Rate by Recruiter</div>
                <ResponsiveContainer width="100%" height={280}>
                  <BarChart data={RECRUITER_DATA} margin={{ left: 0, right: 30, bottom: 20 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke={C.gridLine} vertical={false} />
                    <XAxis dataKey="recruiter" tick={{ fill: C.muted, fontSize: 12, fontFamily: "monospace" }} />
                    <YAxis tick={{ fill: C.muted, fontSize: 11, fontFamily: "monospace" }} unit="%" />
                    <Tooltip content={<CustomTooltip />} />
                    <Bar dataKey="hire_rate" name="hire_rate" radius={[4, 4, 0, 0]}>
                      {RECRUITER_DATA.map((e, i) => <Cell key={i} fill={e.hire_rate >= 12 ? C.accent : e.hire_rate >= 8 ? C.accent3 : C.accent2} />)}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </Card>
              <Card>
                <div style={{ color: C.muted, fontSize: 11, fontFamily: "monospace", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 16 }}>Recruiter Scorecard</div>
                <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
                  <thead>
                    <tr>{["Recruiter","Total","Hired","Rate","Best Channel"].map(h => (
                      <th key={h} style={{ textAlign:"left", color:C.muted, fontFamily:"monospace", fontSize:10, textTransform:"uppercase", letterSpacing:"0.08em", padding:"0 8px 12px 0", fontWeight:400 }}>{h}</th>
                    ))}</tr>
                  </thead>
                  <tbody>
                    {RECRUITER_DATA.map((r, i) => (
                      <tr key={i} style={{ borderTop: `1px solid ${C.border}` }}>
                        <td style={{ padding:"10px 8px 10px 0", color:C.text, fontFamily:"monospace" }}>{r.recruiter}</td>
                        <td style={{ padding:"10px 8px 10px 0", color:C.muted, fontFamily:"monospace" }}>{r.total}</td>
                        <td style={{ padding:"10px 8px 10px 0", color:C.muted, fontFamily:"monospace" }}>{r.hired}</td>
                        <td style={{ padding:"10px 8px 10px 0", fontFamily:"monospace", fontWeight:700, color: r.hire_rate>=12?C.accent:r.hire_rate>=8?C.accent3:C.accent2 }}>{r.hire_rate}%</td>
                        <td style={{ padding:"10px 0", color:C.muted, fontSize:11, fontFamily:"monospace" }}>{r.best_channel}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div style={{ marginTop:16, padding:"12px 14px", background:"rgba(0,212,177,0.05)", borderRadius:8, border:`1px solid rgba(0,212,177,0.12)` }}>
                  <p style={{ color:C.muted, fontSize:12, margin:0 }}>
                    <span style={{ color:C.accent }}>Recommendation: </span>
                    Pair low-performing recruiters with their best channel. Fernanda should prioritize Hunting (8.3% — 2× her overall rate).
                  </p>
                </div>
              </Card>
            </div>
          </div>
        )}

        {/* SIGNALS TAB */}
        {tab === 3 && (
          <div>
            <SectionTitle sub="// response time · score thresholds · conversion predictors">Hiring Signals</SectionTitle>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, marginBottom: 32 }}>
              <KPICard label="Optimal Response" value="3–6 days" sub="15.3% hire rate — peak" />
              <KPICard label="Avg Tech Score (Hired)" value="81.6" sub="vs 72.9 not hired" accent={C.accent3} />
              <KPICard label="Avg Experience (Hired)" value="6.5y" sub="vs 5.5y not hired" accent="#a78bfa" />
              <KPICard label="Behavior Score (Hired)" value="81.6" sub="vs 74.0 not hired" accent={C.accent2} />
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
              <Card>
                <div style={{ color:C.muted, fontSize:11, fontFamily:"monospace", textTransform:"uppercase", letterSpacing:"0.08em", marginBottom:16 }}>Hire Rate by Response Time</div>
                <ResponsiveContainer width="100%" height={220}>
                  <BarChart data={RESPONSE_TIME_DATA} margin={{ left:0, right:20 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke={C.gridLine} vertical={false} />
                    <XAxis dataKey="bucket" tick={{ fill:C.muted, fontSize:12, fontFamily:"monospace" }} />
                    <YAxis tick={{ fill:C.muted, fontSize:11, fontFamily:"monospace" }} unit="%" />
                    <Tooltip content={<CustomTooltip />} />
                    <Bar dataKey="hire_rate" name="hire_rate" radius={[4,4,0,0]}>
                      {RESPONSE_TIME_DATA.map((e,i) => <Cell key={i} fill={e.hire_rate>=15?C.accent:e.hire_rate>=10?C.accent3:C.accent2} />)}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
                <div style={{ marginTop:12, padding:"12px 14px", background:"rgba(247,183,49,0.07)", borderRadius:8, border:`1px solid rgba(247,183,49,0.15)` }}>
                  <span style={{ color:C.accent3, fontFamily:"monospace", fontSize:12 }}>Insight: </span>
                  <span style={{ color:C.muted, fontSize:12 }}>Medium-speed responders (3–6d) convert at 15.3% — 53% higher than fast responders. Deliberate candidates outperform impulsive ones.</span>
                </div>
              </Card>
              <Card>
                <div style={{ color:C.muted, fontSize:11, fontFamily:"monospace", textTransform:"uppercase", letterSpacing:"0.08em", marginBottom:16 }}>Score Gap: Hired vs Not Hired</div>
                {[
                  { label:"Technical Score", hired:81.6, not_hired:72.9, color:C.accent },
                  { label:"Behavior Score", hired:81.6, not_hired:74.0, color:C.accent3 },
                  { label:"Manager Score", hired:80.4, not_hired:73.1, color:"#a78bfa" },
                  { label:"Years Experience", hired:6.5, not_hired:5.5, color:C.accent2, unit:"y", scale:8 },
                ].map((item,i) => (
                  <div key={i} style={{ marginBottom:20 }}>
                    <div style={{ display:"flex", justifyContent:"space-between", marginBottom:8 }}>
                      <span style={{ color:C.muted, fontSize:12, fontFamily:"monospace" }}>{item.label}</span>
                      <span style={{ color:item.color, fontSize:12, fontFamily:"monospace", fontWeight:700 }}>{item.hired}{item.unit||""} vs {item.not_hired}{item.unit||""}</span>
                    </div>
                    {[["Hired", item.hired, true],["Not hired", item.not_hired, false]].map(([lbl,val,fill],j) => (
                      <div key={j} style={{ display:"flex", gap:8, alignItems:"center", marginBottom:4 }}>
                        <span style={{ color:C.muted, fontSize:10, fontFamily:"monospace", width:60 }}>{lbl}</span>
                        <div style={{ flex:1, background:C.border, borderRadius:3, height:7 }}>
                          <div style={{ height:"100%", width:`${val*(item.scale||1)}%`, background:fill?item.color:"transparent", borderRadius:3, border:fill?"none":`1px solid ${item.color}` }} />
                        </div>
                      </div>
                    ))}
                  </div>
                ))}
              </Card>
            </div>
            <Card style={{ marginTop:24 }}>
              <div style={{ color:C.muted, fontSize:11, fontFamily:"monospace", textTransform:"uppercase", letterSpacing:"0.08em", marginBottom:16 }}>Recruiter Decision Guide</div>
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:16 }}>
                {[
                  { title:"✓ Persist — High Signal", color:C.accent, bg:"rgba(0,212,177,0.05)", border:"rgba(0,212,177,0.15)", items:["Response in 3–6 days","Technical score ≥ 78","Behavior score ≥ 78","Github or Inbound sourced","Staff or Senior level","Híbrido work mode","Tech or Data dept"] },
                  { title:"✗ Deprioritize — Low Signal", color:C.accent2, bg:"rgba(233,69,96,0.05)", border:"rgba(233,69,96,0.15)", items:["No response after 2 follow-ups","Slow response (7+ days)","Technical score < 73","Indicação or Evento sourced","Junior seniority","Remote-only preference","Operations dept"] },
                ].map((col,i) => (
                  <div key={i} style={{ padding:16, background:col.bg, borderRadius:10, border:`1px solid ${col.border}` }}>
                    <div style={{ color:col.color, fontSize:12, fontFamily:"monospace", textTransform:"uppercase", marginBottom:10 }}>{col.title}</div>
                    {col.items.map((item,j) => (
                      <div key={j} style={{ color:C.muted, fontSize:13, padding:"5px 0", borderBottom:`1px solid ${C.border}`, display:"flex", gap:8 }}>
                        <span style={{ color:col.color }}>→</span>{item}
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </Card>
          </div>
        )}

        {/* AI SCORER TAB */}
        {tab === 4 && <AIScorer />}
      </div>

      <div style={{ borderTop:`1px solid ${C.border}`, padding:"16px 40px", display:"flex", justifyContent:"space-between", marginTop:40 }}>
        <span style={{ color:C.muted, fontFamily:"monospace", fontSize:11 }}>Sourcing Analysis with AI · Technical Challenge · 600 candidates · cleaned dataset</span>
        <span style={{ color:C.muted, fontFamily:"monospace", fontSize:11 }}>AI powered by Claude Sonnet · Anthropic</span>
      </div>
    </div>
  );
}
