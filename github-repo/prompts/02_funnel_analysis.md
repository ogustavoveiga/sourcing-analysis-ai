# Prompt 02 — Funnel Analysis

## Purpose
Compute stage-by-stage conversion rates to identify where candidates drop off and where the biggest bottleneck sits.

## Prompt Used

```
Using the recruitment dataset (600 candidates after cleaning), calculate the full recruitment funnel.

For each stage below, give me:
- Absolute number of candidates who reached that stage
- Conversion rate from the previous stage
- Conversion rate from the original sourced pool (600)

Stages in order:
1. Sourced (baseline = 600)
2. Response Received (response_received = True)
3. Screening Pass (screening_pass = True)
4. Interview Pass (interview1_pass = True)
5. Test Taken (test_taken = True)
6. Offer Sent (offer_sent = True)
7. Hired (hired = True)

Then identify:
- Which stage has the steepest drop-off
- Which stage has the highest conversion rate (least friction)
- Overall sourced-to-hired conversion rate
```

## Why This Prompt

Breaking the funnel into sequential stages with both absolute numbers and conversion rates gives two useful perspectives: the raw scale of drop-off and the relative efficiency of each stage. Asking explicitly for "steepest drop" forces Claude to interpret, not just report.

## Output

| Stage | Count | Stage Conv. | From Source |
|-------|-------|-------------|-------------|
| Sourced | 600 | — | 100% |
| Responded | 408 | 68.0% | 68.0% |
| Screening Pass | 307 | 75.2% | 51.2% |
| Interview Pass | 233 | 75.9% | 38.8% |
| Test Taken | 200 | 85.8% | 33.3% |
| Offer Sent | 61 | 30.5% | 10.2% |
| Hired | 48 | 78.7% | 8.0% |

**Biggest bottleneck:** Test → Offer (30.5%) — only 61 of 200 candidates who took the test received an offer.

**Least friction:** Interview → Test (85.8%) — candidates who pass the interview almost always take the test.

**Key insight:** The offer acceptance rate (78.7%) is strong — the problem is getting candidates TO the offer, not closing them.
