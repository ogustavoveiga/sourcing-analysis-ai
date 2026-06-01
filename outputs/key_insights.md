# Key Insights — Sourcing Analysis

*Generated via Claude Sonnet from mock_sourcing_dataset.xlsx (600 candidates)*

---

## 1. Funnel Overview

| Stage | Count | Stage Conv. | From Source |
|-------|-------|-------------|-------------|
| Sourced | 600 | — | 100% |
| Responded | 408 | 68.0% | 68.0% |
| Screening Pass | 307 | 75.2% | 51.2% |
| Interview Pass | 233 | 75.9% | 38.8% |
| Test Taken | 200 | 85.8% | 33.3% |
| Offer Sent | 61 | 30.5% | 10.2% |
| Hired | 48 | 78.7% | 8.0% |

**Overall hire rate: 8.0%**
**Primary bottleneck: Test → Offer (30.5%)**
**Strongest stage: Interview → Test (85.8%)**

---

## 2. Channel Performance

| Channel | Total | Hired | Hire Rate | No-Response |
|---------|-------|-------|-----------|-------------|
| Github | 73 | 8 | 11.0% | 31.5% |
| Inbound | 69 | 7 | 10.1% | 20.3% |
| Hunting | 75 | 7 | 9.3% | 36.0% |
| Banco de Talentos | 68 | 6 | 8.8% | 25.0% |
| LinkedIn | 81 | 7 | 8.6% | 37.0% |
| Comunidade | 89 | 7 | 7.9% | 32.6% |
| Evento | 82 | 4 | 4.9% | 32.9% |
| Indicação | 63 | 2 | 3.2% | 39.7% |

---

## 3. Recruiter Performance

| Recruiter | Total | Hired | Hire Rate | Best Channel |
|-----------|-------|-------|-----------|--------------|
| Bruno | 98 | 15 | 15.3% | Banco de Talentos (28.6%) |
| Ana | 75 | 10 | 13.3% | Hunting (22.2%) |
| Carla | 100 | 8 | 8.0% | Banco de Talentos (18.2%) |
| Gustavo | 121 | 6 | 5.0% | Github (14.3%) |
| Diego | 103 | 5 | 4.9% | Hunting (11.8%) |
| Fernanda | 103 | 4 | 3.9% | Hunting (8.3%) |

**Performance gap: 3.9× between top (Bruno) and bottom (Fernanda)**

---

## 4. Hiring Signals

### Response Time
| Bucket | Total | Hired | Hire Rate |
|--------|-------|-------|-----------|
| Fast (0–2d) | 89 | 9 | 10.1% |
| Medium (3–6d) | 137 | 21 | **15.3%** |
| Slow (7–12d) | 182 | 18 | 9.9% |

### Score Gap: Hired vs Not Hired
| Metric | Hired | Not Hired | Delta |
|--------|-------|-----------|-------|
| Technical Score | 81.6 | 72.9 | +8.7 |
| Behavior Score | 81.6 | 74.0 | +7.6 |
| Manager Score | 80.4 | 73.1 | +7.3 |
| Years Experience | 6.5y | 5.5y | +1.0y |

### Seniority
| Level | Total | Hire Rate |
|-------|-------|-----------|
| Staff | 60 | 13.3% |
| Senior | 203 | 9.4% |
| Pleno | 228 | 7.0% |
| Junior | 109 | 4.6% |

### Work Mode
| Mode | Hire Rate |
|------|-----------|
| Híbrido | 10.8% |
| Presencial | 8.8% |
| Remoto | 4.5% |

### Department
| Dept | Hire Rate |
|------|-----------|
| Tech | 11.2% |
| Data | 7.9% |
| People | 6.7% |
| Operations | 6.4% |

---

## 5. Rejection Breakdown

| Reason | Count | % |
|--------|-------|---|
| No response | 210 | 56.0% |
| Failed technical test | 25 | 6.7% |
| Timing mismatch | 24 | 6.4% |
| Low technical fit | 23 | 6.1% |
| Low engagement | 23 | 6.1% |
| Headcount closed | 22 | 5.9% |
| Salary mismatch | 18 | 4.8% |
| Accepted another offer | 18 | 4.8% |
| Culture add mismatch | 12 | 3.2% |

**62% engagement-driven · 16% quality-driven · 12% process-driven · 10% candidate-driven**

---

## 6. Data Quality Note

Candidate ID 601 removed: `response_time_days = -3` (impossible value, data entry error).
All analysis conducted on **600 clean records**.
