---
description: Feasibility study for an Assisted Living Facility for the Neurodivergent at a given location (address, city, county, or state)
argument-hint: <address | city | county | state>
---

# Assisted Living Facility for the Neurodivergent — Feasibility Study

You are producing a **site-feasibility study** for opening a residential
**Assisted Living Facility serving neurodivergent adults** (autism, ADHD,
intellectual & developmental disabilities (IDD), and related conditions) at
the location below. The goal is a clear **GO / CONDITIONAL / NO-GO** decision
backed by data.

**Target location:** `$ARGUMENTS`

If `$ARGUMENTS` is empty, ask the user for a location (address, city, county,
or state) before proceeding. Resolve ambiguous places (e.g. "Springfield")
by asking which state.

---

## Ground rules

1. **Use the tools you have.** Use `WebSearch` and `WebFetch` for demographics,
   crime, market, real-estate, and competitor data. Use the legal-research
   tools (Descrybe Legal Engine: `search_laws_and_rules`,
   `search_cases_by_concept`, `find_case_from_reference`) for statutes,
   regulations, and licensing rules. Load any deferred tools with `ToolSearch`
   first.
2. **Cite every material fact** with a source (agency name + URL, statute/reg
   citation, or dataset). Put the source inline or in a footnote.
3. **Never invent numbers.** If a figure (a Medicaid rate, an occupancy rate,
   a crime stat) cannot be sourced, write **"DATA GAP — needs verification"**
   and say exactly where the user should look (which agency, form, or dataset).
4. **Resolve the licensure pathway early — this is the #1 trap.** "Assisted
   Living" for the elderly and "group homes / residential programs for adults
   with IDD/autism" are usually licensed by **different state agencies under
   different rules and different funding**. Identify which pathway (or
   combination) actually fits a *neurodivergent-adult* facility in this
   jurisdiction before analyzing rates and zoning, and state your assumption.
5. **Scale the analysis to the input.** A full street address → include parcel
   zoning, local permitting, and neighborhood-level crime/competition. A
   county or state → analyze at that level and flag that local (municipal)
   zoning/permitting must still be checked per-site.

---

## Required report sections

Produce a Markdown report titled
`Feasibility Study — Neurodivergent ALF — <location> (<today's date>)`
with these sections:

### 1. Executive Summary & Verdict
- One-paragraph recommendation: **GO / CONDITIONAL / NO-GO** with the 3–5
  decisive factors. Put this first.

### 2. Location Overview & Demographics
- Jurisdiction (state / county / municipality), population, age & income
  distribution, growth trend.
- Prevalence/estimated count of the target population (autism, IDD) in the
  service area; state waitlists for IDD/HCBS services if available.

### 3. Regulatory & Licensing
- Governing **state agency(ies)** and the **license/certification type(s)**
  that apply to a neurodivergent-adult residential facility (e.g. DDS / IDD
  agency residential programs vs. Assisted Living Residence certification).
- Key statutes & regulations (cite them), staffing ratios, training
  requirements, admission/level-of-care criteria, inspection regime.
- Background-check, abuse-registry, and incident-reporting requirements.
- Approximate timeline and cost to obtain licensure.

### 4. Permitting & Zoning
- Local land-use / zoning treatment of group homes & residential care.
- **Fair Housing Act** group-home protections and any state group-home
  zoning preemption (these often override restrictive local zoning — check
  and cite).
- Occupancy limits, building/fire/life-safety code (e.g. NFPA 101), ADA,
  parking, and any special-use permit or variance needed.

### 5. Reimbursement & Rates
- **Medicaid**: relevant HCBS waiver(s) and IDD/DD program rates; room-and-board
  vs. service reimbursement; rate-setting method.
- **Private pay** market rates for comparable residential care in the area.
- Other payers (SSI/SSDI offsets, state supplements, private insurance).
- Build a small rate table (payer → unit → rate → source).

### 6. Level of Care / Need
- Acuity profile the facility would serve and the matching license tier.
- Documented unmet need: waitlists, provider shortages, referral pipelines
  (state IDD agency, hospitals, school transition programs, guardianship orgs).

### 7. Crime & Safety
- Neighborhood/city/county crime rates vs. state & national benchmarks
  (cite FBI UCR/NIBRS, local PD, or reputable aggregators).
- Safety implications for a vulnerable-resident facility.

### 8. Market Analysis
- Supply vs. demand, occupancy rates, and demographic demand drivers.
- Growth outlook and reimbursement-environment trend.

### 9. Competitive Landscape
- Existing neurodivergent/IDD residential providers in the service area:
  name, capacity, payer mix, and apparent gaps you could fill.
- Differentiation opportunity.

### 10. Real Estate
- Suitability & availability of property; typical acquisition/lease cost;
  retrofit needs for accessibility and code compliance.

### 11. Financial Feasibility (high-level)
- Rough startup costs (licensure, build-out, working capital), operating cost
  drivers (staffing is dominant), and a break-even sketch at expected
  occupancy & rates. Mark assumptions clearly.

### 12. Risks & Open Questions
- Top risks (regulatory, reimbursement, zoning, staffing, market) and the
  specific next verification steps / contacts for each **DATA GAP**.

---

## Output

- Write the report to a file named
  `feasibility-<location-slug>.md` in the repo root (slugify the location),
  and also summarize the verdict and top findings in your chat reply.
- Keep it decision-useful: lead with the verdict, be concrete, cite sources,
  and never paper over a data gap with a guess.
