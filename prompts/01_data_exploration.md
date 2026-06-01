# Prompt 01 — Data Exploration

## Purpose
Initial dataset profiling to understand structure, data quality, and scope before any analysis.

## Prompt Used

```
I have a recruitment dataset with 601 rows and 35 columns in Excel format.
Please analyze it and tell me:

1. What columns are present and what each one represents
2. What data types each column contains
3. Whether there are any null values, outliers, or data quality issues
4. What the distribution of the main outcome variable (hired) looks like
5. What the distribution of each categorical variable looks like (source_channel, recruiter, department, seniority, work_mode, final_stage, rejection_reason)
6. Descriptive statistics for all numeric columns (years_experience, response_time_days, technical_test_score, behavior_score, manager_score, stage_duration_days)

Flag any data issues that should be addressed before analysis.
```

## Why This Prompt

Starting with data exploration before jumping into analysis prevents drawing conclusions from dirty data. The explicit list of things to check (nulls, outliers, distributions) ensures nothing is missed.

## Output Summary

- Dataset confirmed: 601 rows × 35 columns
- 1 data quality issue found: candidate_id 601 has response_time_days = -3 (impossible value, likely data entry error)
- Clean dataset after removing row 601: **600 candidates**
- Hired: 48 (8.0%) | Not hired: 552 (92.0%)
- No missing values in key analysis columns
- All score columns (technical, behavior, manager) range 0–100 with realistic distributions

## Data Quality Decision

Candidate 601 was removed from all subsequent analyses. The negative response time is physically impossible and would distort response-time bucket analysis. This decision is documented and defensible.
