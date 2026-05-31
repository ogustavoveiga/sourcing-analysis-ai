# Prompt 06 — Rejection Analysis

## Purpose
Understand why candidates are rejected and at which stages, to identify systemic problems vs individual ones.

## Prompt Used

```
Analyze the rejection_reason column in the dataset.

1. Count and rank all rejection reasons by frequency
2. Calculate what % of total rejections each reason represents
3. Group rejection reasons into categories:
   - Candidate-driven (e.g. accepted another offer, salary mismatch)
   - Process-driven (e.g. headcount closed, timing mismatch)
   - Quality-driven (e.g. failed technical test, low technical fit)
   - Engagement-driven (e.g. no response, low engagement)

4. Which category dominates?
5. For each category, what is the recruiter's lever to reduce it?
6. What % of all rejections could theoretically have been prevented with better outreach?
```

## Why This Prompt

Grouping rejection reasons into categories surfaces systemic issues. "No response" sounds like a candidate problem but is actually an outreach problem — the category analysis makes that visible. Asking "what % could be prevented" forces a business case for improving outreach quality.

## Output

| Reason | Count | % of Rejections |
|--------|-------|----------------|
| No response | 210 | 56.0% |
| Failed technical test | 25 | 6.7% |
| Timing mismatch | 24 | 6.4% |
| Low technical fit | 23 | 6.1% |
| Low engagement | 23 | 6.1% |
| Headcount closed | 22 | 5.9% |
| Salary mismatch | 18 | 4.8% |
| Accepted another offer | 18 | 4.8% |
| Culture add mismatch | 12 | 3.2% |

**Categories:**
- Engagement-driven (No response + Low engagement): **62%** of rejections
- Quality-driven (Failed test + Low fit + Culture): 16%
- Process-driven (Timing + Headcount closed): 12%
- Candidate-driven (Salary + Accepted other): 10%

**Key finding:** Over 60% of rejections are engagement-driven — meaning the candidate never properly entered the process. This points to outreach message quality, timing, and channel selection — all recruiter-controllable variables.
