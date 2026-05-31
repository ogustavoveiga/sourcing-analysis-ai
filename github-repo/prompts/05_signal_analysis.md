# Prompt 05 — Signal Analysis (Predictive Hiring Signals)

## Purpose
Identify which measurable candidate attributes correlate most strongly with being hired, so recruiters know where to focus attention.

## Prompt Used

```
Using the dataset, identify signals that predict whether a candidate will be hired.

1. Response time analysis:
   - Bucket response_time_days into three groups: Fast (0-2 days), Medium (3-6 days), Slow (7-12 days)
   - Calculate hire rate for each bucket
   - Which response speed correlates with highest conversion?

2. Assessment score analysis:
   - For technical_test_score, behavior_score, and manager_score:
     Calculate average score for hired=True vs hired=False candidates
   - What is the score gap between hired and not-hired?

3. Experience analysis:
   - Average years_experience for hired vs not-hired

4. Seniority analysis:
   - Hire rate by seniority level (Junior, Pleno, Senior, Staff)

5. Work mode analysis:
   - Hire rate by work_mode (Remoto, Presencial, Híbrido)

6. Department analysis:
   - Hire rate by department

For each finding, state: what the signal is, how strong it is, and what action a recruiter should take based on it.
```

## Why This Prompt

Splitting signals into multiple specific sub-questions prevents Claude from giving vague answers like "higher scores = more likely hired." Asking for action at the end of each finding keeps the output recruiter-facing, not just analytical.

## Output

| Signal | Hired | Not Hired | Delta |
|--------|-------|-----------|-------|
| Technical Score | 81.6 | 72.9 | +8.7 |
| Behavior Score | 81.6 | 74.0 | +7.6 |
| Manager Score | 80.4 | 73.1 | +7.3 |
| Years Experience | 6.5y | 5.5y | +1.0y |

**Response time:** Medium (3–6 days) = 15.3% hire rate — beats Fast (10.1%) and Slow (9.9%)

**Seniority:** Staff 13.3% > Senior 9.4% > Pleno 7.0% > Junior 4.6%

**Work mode:** Híbrido 10.8% > Presencial 8.8% > Remoto 4.5%

**Department:** Tech 11.2% > Data 7.9% > People 6.7% > Operations 6.4%

**Interpretation:** Candidates who respond in 3–6 days are more deliberate and engaged — not impulsive or disengaged. Technical fit (score ≥ 78) combined with behavioral alignment (score ≥ 78) is the strongest composite signal.
