# Prompt 03 — Channel Analysis

## Purpose
Determine which sourcing channels convert best, which waste the most effort, and where the no-response problem is worst.

## Prompt Used

```
For each source_channel in the dataset, calculate:

1. Total candidates sourced
2. Number hired
3. Hire rate (hired / total)
4. No-response rate (candidates where response_received = False / total)
5. Screening pass rate (screening_pass = True / total)

Sort results by hire rate descending.

Then answer:
- Which channel is the most efficient (best hire rate)?
- Which channel wastes the most recruiter effort (highest no-response + lowest hire rate)?
- Is there a channel with high volume but low conversion that should be reconsidered?
- Are there any channels where fixing the no-response problem alone would significantly improve overall performance?
```

## Why This Prompt

Hire rate alone is misleading — a channel could have a good hire rate but terrible volume or ghost rate. Combining hire rate + no-response rate + screening pass rate gives a 3-dimensional view of channel health. Asking "which channel should be reconsidered" forces a strategic recommendation, not just reporting.

## Output

| Channel | Total | Hired | Hire Rate | No-Response Rate |
|---------|-------|-------|-----------|-----------------|
| Github | 73 | 8 | **11.0%** | 31.5% |
| Inbound | 69 | 7 | **10.1%** | 20.3% |
| Hunting | 75 | 7 | 9.3% | 36.0% |
| Banco de Talentos | 68 | 6 | 8.8% | 25.0% |
| LinkedIn | 81 | 7 | 8.6% | 37.0% |
| Comunidade | 89 | 7 | 7.9% | 32.6% |
| Evento | 82 | 4 | 4.9% | 32.9% |
| Indicação | 63 | 2 | **3.2%** | **39.7%** |

**Key findings:**
- Github is most efficient despite moderate volume
- Inbound has the lowest no-response rate (20.3%) AND a top-2 hire rate — the highest ROI channel
- Indicação underperforms on all three dimensions — high no-response, lowest hire rate
- Evento has the 2nd highest volume but the 2nd lowest hire rate — poor ROI
- LinkedIn has 37% ghost rate — outreach messaging likely needs revision
