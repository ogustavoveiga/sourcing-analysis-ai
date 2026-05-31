# Prompt 07 — Strategic Recommendations

## Purpose
Translate all analytical findings into ranked, actionable recommendations for the recruitment team.

## Prompt Used

```
Based on the following findings from our recruitment dataset analysis:

FUNNEL: 8% overall hire rate. Biggest bottleneck at Test → Offer (30.5%). Strong offer acceptance (78.7%).

CHANNELS: Github (11%), Inbound (10.1%) best. Indicação (3.2%), Evento (4.9%) worst.
Inbound has lowest no-response rate (20.3%). Indicação has highest ghost rate (39.7%).

RECRUITERS: Bruno (15.3%) and Ana (13.3%) top performers. Fernanda (3.9%) and Diego (4.9%) lowest.
Every recruiter's best-channel rate is 2× their overall rate.

SIGNALS: Hired candidates score ~9 points higher on all assessments. Medium response time (3–6 days) = 15.3% hire rate.
Staff and Senior seniority outperform. Híbrido work mode outperforms Remote by 2.4×.

REJECTIONS: 62% engagement-driven (no response + low engagement). Only 16% quality-driven.

Generate 5 ranked, specific, actionable recommendations for the recruitment team.
Each recommendation must include:
- The specific action to take
- The data point that justifies it
- The expected impact
- Who is responsible for implementing it
```

## Why This Prompt

Recommendations without data are opinions. This prompt forces each recommendation to be anchored to a specific number from the analysis, making it defensible in a business review. Ranking by priority and assigning ownership makes it immediately implementable.

## Output

**Recommendation 1 — Fix outreach before adding volume**
Action: Audit and rewrite outreach messaging for channels with >35% no-response rates (LinkedIn 37%, Hunting 36%, Indicação 40%).
Data: 62% of all rejections are engagement-driven. 210 of 375 rejected candidates never responded.
Impact: Even a 15% improvement in response rate would add ~30 candidates to the active pipeline.
Owner: Recruiter lead + each recruiter for their primary channel.

**Recommendation 2 — Realign recruiters to their best channels**
Action: Assign Fernanda and Diego primarily to Hunting (their best channel). Reduce Gustavo's volume or focus him on Github.
Data: Every recruiter converts 2× better in their best channel vs overall. 3.9× gap between Bruno and Fernanda.
Impact: Channel realignment could improve team hire rate from 8% to ~11% without new headcount.
Owner: Talent Acquisition Manager.

**Recommendation 3 — Prioritize medium-response candidates**
Action: Create a fast-track process for candidates who respond in 3–6 days. Flag slow responders (7+ days) for lower priority follow-up.
Data: Medium responders convert at 15.3% vs 10.1% (fast) and 9.9% (slow).
Impact: Focusing effort on highest-intent candidates improves recruiter efficiency per hour spent.
Owner: All recruiters (SOP change).

**Recommendation 4 — Set minimum score thresholds before advancing to offer**
Action: Use technical ≥ 78 and behavior ≥ 78 as soft filters before generating an offer.
Data: Hired candidates average 81.6 on both. Not-hired average 72.9/74.0. The 9-point gap is consistent across all three assessments.
Impact: Reduces wasted offers on low-fit candidates, which are currently the 2nd biggest bottleneck (Test → Offer at 30.5%).
Owner: Hiring managers + recruiters (scoring rubric update).

**Recommendation 5 — Reduce investment in Evento and Indicação**
Action: Reallocate sourcing budget and time from Evento (4.9% hire rate) and Indicação (3.2%) toward Github and Inbound.
Data: Github and Inbound convert at 11% and 10.1% respectively with lower ghost rates.
Impact: Same sourcing effort applied to higher-yield channels could increase hires by 20–30% without adding headcount.
Owner: Talent Acquisition Manager (channel strategy review).
