# Sourcing Analysis with AI

**Technical Challenge — Talent Acquisition Analytics**

A recruitment funnel analysis built on a dataset of 600 candidates across 8 source channels and 6 recruiters, with a live AI-powered candidate scoring tool embedded in the dashboard.

---

## Live Demo

**Live Report:** https://sourcing-analysis-ai.vercel.app/
**GitHub:** https://github.com/ogustavoveiga/sourcing-analysis-ai

> Open `sourcing-dashboard.jsx` in [Claude Artifacts](https://claude.ai) or any React environment.
> The AI Scorer tab calls the Claude API in real-time — no backend required.

---

## Repository Structure

```
├── README.md                        ← You are here
├── data/
│   └── mock_sourcing_dataset.xlsx   ← Original dataset (601 rows, 35 columns)
├── prompts/
│   ├── 01_data_exploration.md       ← Initial dataset profiling prompt
│   ├── 02_funnel_analysis.md        ← Stage-by-stage conversion analysis
│   ├── 03_channel_analysis.md       ← Source channel performance
│   ├── 04_recruiter_analysis.md     ← Recruiter benchmarking
│   ├── 05_signal_analysis.md        ← Predictive hiring signals
│   ├── 06_rejection_analysis.md     ← Drop-off and rejection breakdown
│   ├── 07_recommendations.md        ← AI-generated strategic recommendations
│   └── 08_scorer_system_prompt.md   ← Live AI Scorer prompt template
├── outputs/
│   ├── key_insights.md              ← All findings with numbers
│   └── recommendations.md          ← Actionable recruiter recommendations
└── sourcing-dashboard.jsx           ← Full interactive React dashboard
```

---

## Key Findings

| Metric | Value |
|--------|-------|
| Overall hire rate | 8.0% (48/600) |
| Best channel | Github — 11.0% |
| Worst channel | Indicação — 3.2% |
| Top recruiter | Bruno — 15.3% |
| Biggest bottleneck | Test → Offer (30.5%) |
| #1 rejection reason | No response (56% of all rejections) |
| Optimal response window | 3–6 days (15.3% hire rate) |
| Score gap (hired vs not) | ~9 points across all assessments |

---

## AI Usage in This Project

AI (Claude Sonnet) was used in three distinct ways:

**1. Data Analysis** — The raw Excel dataset was analyzed via Claude prompts to compute all conversion rates, cross-tabs, and segment breakdowns without any manual scripting.

**2. Insight Generation** — Claude was prompted to interpret patterns in the data and generate recruiter-facing recommendations grounded in the numbers.

**3. Live AI Scorer (embedded in dashboard)** — The AI Scorer tab sends real candidate profiles to the Claude API and returns hire probability, top contributing factors, and a recruiter recommendation — all in real time.

All prompts used in this workflow are documented in the `/prompts` folder with their exact wording and the reasoning behind each one.

---

## How to Run the Dashboard

1. Copy the contents of `sourcing-dashboard.jsx`
2. Open [claude.ai](https://claude.ai)
3. Paste the code and ask Claude to render it as a React artifact
4. Navigate the 5 tabs — the AI Scorer tab is fully live

---

## Tech Stack

| Layer | Tool |
|-------|------|
| Analysis | Claude Sonnet (via chat prompts) |
| Dashboard | React + Recharts |
| AI Scoring | Anthropic Claude API (live) |
| Data | Excel → manual extraction via Claude |
| Repository | GitHub |

---

## Dataset Notes

- 601 rows total; 1 row (candidate_id 601) removed due to negative response_time_days (data entry error)
- Clean dataset: **600 candidates**
- 35 columns including sourcing metadata, stage flags, assessment scores, and recruiter notes
- Hire rate: 48 hired (8.0%)

---

*Built as part of a Talent Acquisition technical challenge. All candidate data is fictional.*
