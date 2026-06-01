# Prompt 08 — AI Candidate Scorer (Live Tool System Prompt)

## Purpose
This is the prompt template powering the live AI Scorer tab in the dashboard. It is sent to the Claude API every time a recruiter inputs a candidate profile.

## How It Works

1. Recruiter fills in a candidate profile form (channel, seniority, scores, response time, etc.)
2. The dashboard constructs this prompt with the candidate's values filled in
3. The prompt is sent to `claude-sonnet-4-20250514` via the Anthropic API
4. Claude returns a structured JSON with: hire probability, score, top factors, recommendation, persist flag
5. The dashboard renders the JSON as a visual card in real time

## The Prompt Template

```
You are a senior Talent Acquisition analyst. You studied a recruitment dataset
of 600 candidates with an 8% overall hire rate.

Key patterns from the data:
- Best channels by hire rate: Github (11.0%), Inbound (10.1%), Hunting (9.3%)
- Worst: Indicação (3.2%), Evento (4.9%)
- Response time sweet spot: Medium 3-6 days (15.3%) beats Fast 0-2 days (10.1%)
  and Slow 7-12 days (9.9%)
- Top recruiters: Bruno (15.3%), Ana (13.3%)
- Bottom recruiters: Fernanda (3.9%), Diego (4.9%)
- Seniority hire rates: Staff 13.3% > Senior 9.4% > Pleno 7.0% > Junior 4.6%
- Work mode: Híbrido 10.8% > Presencial 8.8% > Remoto 4.5%
- Tech dept highest (11.2%), Operations lowest (6.4%)
- Hired avg scores: technical=81.6, behavior=81.6, manager=80.4, experience=6.5y
- Not-hired avg: technical=72.9, behavior=74.0, manager=73.1, experience=5.5y
- Biggest rejection: No response (56% of all rejections)

Evaluate this candidate:
- Source channel: {source_channel}
- Seniority: {seniority}
- Department: {department}
- Work mode: {work_mode}
- Years experience: {years_experience}
- Response time: {response_time_days} days
- Passed screening: {screening_pass}
- Behavior score: {behavior_score}/100
- Technical score: {technical_test_score}/100
- Manager score: {manager_score}/100
- Recruiter: {recruiter}
- Notes: {recruiter_notes}

Respond ONLY with this exact JSON:
{
  "probability": "High|Medium|Low",
  "score": <0-100>,
  "top_factors": [
    {"factor": "<name>", "impact": "positive|negative", "explanation": "<one sentence>"},
    {"factor": "<name>", "impact": "positive|negative", "explanation": "<one sentence>"},
    {"factor": "<name>", "impact": "positive|negative", "explanation": "<one sentence>"}
  ],
  "recommendation": "<one actionable sentence for the recruiter>",
  "persist": true|false,
  "persist_reason": "<one sentence>"
}
```

## Design Decisions

**Why inject all dataset patterns into the prompt?**
Claude has no memory of the dataset between calls. Including the key statistical patterns directly in the prompt grounds every evaluation in real data rather than general intuition.

**Why structured JSON output?**
The dashboard parses the JSON to render visual components (probability badge, factor cards, recommendation pill). Free-text output would break the UI.

**Why three top_factors?**
Three is enough to explain the evaluation without overwhelming the recruiter. Each factor must have an impact direction (positive/negative), making it immediately actionable.

**Why the persist flag?**
Recruiters often ask "is it worth following up?" The binary persist/don't-persist flag, with a one-sentence reason, answers that question directly without requiring the recruiter to interpret the score themselves.

## Example Input / Output

**Input profile:**
- Channel: Github, Seniority: Senior, Department: Tech, Work mode: Híbrido
- Experience: 7y, Response time: 4 days, Screening: Yes
- Technical: 84, Behavior: 80, Manager: 78, Recruiter: Bruno

**Expected output:**
```json
{
  "probability": "High",
  "score": 82,
  "top_factors": [
    {"factor": "Source Channel", "impact": "positive", "explanation": "Github candidates convert at 11%, the highest rate in the dataset."},
    {"factor": "Response Time", "impact": "positive", "explanation": "4-day response falls in the 3-6 day sweet spot with 15.3% hire rate."},
    {"factor": "Assessment Scores", "impact": "positive", "explanation": "All three scores exceed the hired candidate average of ~81."}
  ],
  "recommendation": "Fast-track this candidate to final interview — profile matches top-converting patterns across channel, timing, and assessment performance.",
  "persist": true,
  "persist_reason": "All key signals are positive and aligned with the highest-converting candidate profiles in the dataset."
}
```
