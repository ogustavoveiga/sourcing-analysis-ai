# Prompt 04 — Recruiter Analysis

## Purpose
Benchmark each recruiter's performance and identify channel-recruiter combinations that maximize conversion.

## Prompt Used

```
For each recruiter in the dataset, calculate:
1. Total candidates managed
2. Number hired
3. Hire rate

Then for each recruiter, find their best-performing source_channel
(minimum 5 candidates in that channel to be statistically meaningful).
Show: recruiter × channel × hire rate for their top channel.

Finally:
- Who is the top performer and what makes their approach different?
- Who has the biggest gap between their overall rate and their best-channel rate?
- What would happen to team performance if every recruiter operated in their best channel?
```

## Why This Prompt

The recruiter × channel cross-tab is more actionable than raw recruiter ranking alone. If Fernanda's overall rate is 3.9% but her Hunting rate is 8.3%, the recommendation is channel reallocation — not performance management. The "what if" question forces a quantified business case.

## Output

| Recruiter | Total | Hired | Rate | Best Channel |
|-----------|-------|-------|------|--------------|
| Bruno | 98 | 15 | **15.3%** | Banco de Talentos (28.6%) |
| Ana | 75 | 10 | **13.3%** | Hunting (22.2%) |
| Carla | 100 | 8 | 8.0% | Banco de Talentos (18.2%) |
| Gustavo | 121 | 6 | 5.0% | Github (14.3%) |
| Diego | 103 | 5 | 4.9% | Hunting (11.8%) |
| Fernanda | 103 | 4 | **3.9%** | Hunting (8.3%) |

**Key findings:**
- 3.9× performance gap between Bruno and Fernanda
- Every recruiter's best-channel rate is at least 2× their overall rate
- Gustavo manages the highest volume (121) but one of the lowest hire rates — may be spread too thin
- Simple channel realignment could materially improve team output without hiring anyone new
