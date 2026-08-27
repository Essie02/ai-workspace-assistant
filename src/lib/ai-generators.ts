/**
 * Deterministic, client-side simulation of AI-generated workplace content.
 * Produces detailed, realistic, professional output from structured prompts.
 */

export type EmailInput = {
  purpose: string;
  recipient: string;
  tone: string;
  details: string;
  length: string;
};

export type EmailOutput = { subject: string; body: string };

const toneOpeners: Record<string, string> = {
  Professional: "I hope this message finds you well.",
  Friendly: "Hope you're having a good week so far!",
  Formal: "I trust this correspondence reaches you in good order.",
  Persuasive: "I'm reaching out because there is a clear, time-sensitive opportunity here.",
  Executive: "Sharing a brief update and the decision required from your side.",
};

const toneClosers: Record<string, string> = {
  Professional: "Thank you for your time and continued partnership.",
  Friendly: "Thanks so much — really appreciate your help on this.",
  Formal: "I remain at your disposal should further clarification be required.",
  Persuasive: "I'm confident this is the right next step, and I'd welcome your go-ahead.",
  Executive: "Happy to discuss trade-offs in more depth if useful.",
};

const variantSalt = () => Math.floor(Math.random() * 3);

export function generateEmail(input: EmailInput): EmailOutput {
  const { purpose, recipient, tone, details, length } = input;
  const v = variantSalt();
  const opener = toneOpeners[tone] ?? toneOpeners.Professional;
  const closer = toneClosers[tone] ?? toneClosers.Professional;

  const subjectVariants = [
    `${capitalize(purpose)} — Next Steps and Requested Confirmation`,
    `Action Required: ${capitalize(purpose)}`,
    `${capitalize(purpose)}: Summary, Timeline and Owner Sign-off`,
  ];
  const subject = subjectVariants[v];

  const detailLines = splitDetails(details);

  const short = [
    `Dear ${recipient},`,
    "",
    opener,
    "",
    `I'm writing regarding ${lower(purpose)}. ${detailLines[0] ?? "The key context is summarised below."}`,
    "",
    ...(detailLines.length > 1 ? [detailLines.slice(1).map((d) => `• ${d}`).join("\n"), ""] : []),
    `Could you confirm your agreement by end of day so we can proceed without slipping the schedule?`,
    "",
    closer,
    "",
    "Best regards,",
    "[Your Name]",
    "[Title] | [Company]",
  ];

  const medium = [
    `Dear ${recipient},`,
    "",
    opener,
    "",
    `I'm reaching out regarding ${lower(purpose)}. Following our recent work in this area, I wanted to consolidate the current position into a single note so that you have everything required to make a decision without additional back-and-forth.`,
    "",
    "Key points:",
    detailLines.map((d) => `• ${d}`).join("\n"),
    "",
    `From my perspective, the most important consideration is sequencing: acting now keeps the delivery window intact, while a delay of more than one week would push dependent workstreams into the following reporting cycle. I have already aligned the supporting stakeholders so that execution can begin immediately once we have your confirmation.`,
    "",
    "Requested next step:",
    "• Confirm your approval (or flag concerns) by close of business Friday.",
    "• Nominate a point of contact on your side for day-to-day coordination.",
    "",
    closer,
    "",
    "Best regards,",
    "[Your Name]",
    "[Title] | [Company]",
    "[Phone] | [Email]",
  ];

  const long = [
    `Dear ${recipient},`,
    "",
    opener,
    "",
    `I'm writing to provide a consolidated update on ${lower(purpose)} and to request a clear decision so that we can move into execution with confidence. This note sets out the background, the specifics you asked about, the implications of each option, and the single action required from you.`,
    "",
    "Background",
    `This item has been under review with the relevant stakeholders, and we have now reached the point where the remaining questions are commercial and timing-related rather than technical. Delaying resolution creates avoidable rework, so I have summarised everything below rather than scheduling another meeting.`,
    "",
    "Key details",
    detailLines.map((d, i) => `${i + 1}. ${d}`).join("\n"),
    "",
    "Implications",
    "• Proceeding as proposed keeps us inside the agreed timeline and budget envelope.",
    "• A two-week delay would require re-planning dependent activities and would likely shift the completion date into the next reporting period.",
    "• No change in scope is being requested; the ask is confirmation, not renegotiation.",
    "",
    "Proposed next steps",
    "1. You confirm approval of the approach outlined above.",
    "2. We circulate a short written summary to all stakeholders within 24 hours of your confirmation.",
    "3. Execution begins the following working day, with a status update issued weekly.",
    "",
    `If any element of this does not reflect your understanding, I would rather correct it now than discover the gap later — a fifteen-minute call this week would be sufficient to close it out.`,
    "",
    closer,
    "",
    "Best regards,",
    "[Your Name]",
    "[Title] | [Company]",
    "[Phone] | [Email]",
  ];

  const map: Record<string, string[]> = { Short: short, Medium: medium, Long: long };
  const body = (map[length] ?? medium).join("\n");
  return { subject, body };
}

export type TaskInput = {
  goal: string;
  deadline: string;
  priority: string;
  teamSize: string;
  notes: string;
};

export function generateTaskPlan(input: TaskInput): string {
  const { goal, deadline, priority, teamSize, notes } = input;
  const g = capitalize(goal);
  return [
    `ACTION PLAN — ${g.toUpperCase()}`,
    `Priority: ${priority}   |   Target date: ${deadline || "TBC"}   |   Team size: ${teamSize || "TBC"}`,
    "",
    "1. KEY OBJECTIVES",
    `• Deliver ${lower(goal)} to an agreed quality standard by ${deadline || "the target date"}.`,
    "• Establish clear ownership for every workstream so no task is unassigned at any point.",
    "• Maintain a single source of truth for scope, status and decisions.",
    "• Protect delivery quality while holding the schedule — no silent scope growth.",
    "",
    "2. ACTION STEPS",
    "Phase 1 — Discovery & Alignment (Week 1)",
    "  1.1 Run a 60-minute kick-off; confirm scope boundaries and the definition of done.",
    "  1.2 Document current-state constraints, assumptions and open questions.",
    "  1.3 Assign a directly responsible individual (DRI) to each workstream.",
    "Phase 2 — Design & Preparation (Week 2)",
    "  2.1 Produce the detailed work breakdown and estimate each task in effort-days.",
    "  2.2 Secure required approvals, budget and tooling access up front.",
    "  2.3 Agree the review and escalation path.",
    "Phase 3 — Execution (Weeks 3–5)",
    "  3.1 Deliver work in weekly increments with a demonstrable output each Friday.",
    "  3.2 Hold a 15-minute daily stand-up focused on blockers only.",
    "  3.3 Track progress against the plan and re-forecast weekly, not at the end.",
    "Phase 4 — Review & Handover (Week 6)",
    "  4.1 Quality review against the definition of done; log and close defects.",
    "  4.2 Stakeholder sign-off and formal handover of documentation.",
    "  4.3 Retrospective; capture reusable assets and lessons learned.",
    "",
    "3. TIMELINE",
    "  Week 1  Discovery, alignment, ownership confirmed",
    "  Week 2  Detailed plan approved, dependencies unblocked",
    "  Weeks 3–5  Execution in weekly increments",
    "  Week 6  Review, sign-off, handover",
    "",
    "4. MILESTONES",
    "  M1  Scope and definition of done approved",
    "  M2  Detailed plan and estimates baselined",
    "  M3  First working increment demonstrated",
    "  M4  Feature-complete and quality-reviewed",
    `  M5  Sign-off delivered${deadline ? ` by ${deadline}` : ""}`,
    "",
    "5. DEPENDENCIES",
    "• Stakeholder availability for kick-off and weekly reviews.",
    "• Budget and tooling access confirmed before Phase 2 completes.",
    `• ${teamSize ? `Capacity of the ${teamSize}-person team held stable` : "Team capacity held stable"} across the delivery window.`,
    "• Timely input from adjacent teams on shared interfaces.",
    "",
    "6. RISK FACTORS & MITIGATIONS",
    `• Scope creep (${priority === "Critical" ? "High" : "Medium"}) — enforce a written change-control step; anything new enters a backlog, not the current sprint.`,
    "• Key-person dependency (Medium) — document decisions publicly and pair on critical tasks.",
    "• Approval latency (Medium) — pre-book decision slots in stakeholder calendars now.",
    "• Estimation error (Medium) — re-forecast weekly and surface variance above 15% immediately.",
    "• Quality debt under schedule pressure (Low–Medium) — treat the definition of done as non-negotiable.",
    "",
    "7. SUCCESS METRICS",
    "• On-time delivery against the baselined milestone dates (target: 100% of M1–M5).",
    "• Effort variance within ±10% of the baselined estimate.",
    "• Zero critical defects outstanding at sign-off.",
    "• Stakeholder satisfaction rated 4/5 or higher in the closing review.",
    "",
    "8. RECOMMENDATIONS",
    "• Freeze scope at the end of Phase 2; route later ideas to a follow-on phase.",
    "• Keep the plan visible in one shared location and update it weekly.",
    `• Given a ${priority.toLowerCase()} priority rating, review progress with the sponsor ${priority === "Critical" ? "twice weekly" : "weekly"}.`,
    notes ? `\n9. NOTES CONSIDERED\n${splitDetails(notes).map((n) => `• ${n}`).join("\n")}` : "",
  ]
    .filter(Boolean)
    .join("\n");
}

export type ResearchInput = { topic: string; industry: string; depth: string };

export function generateResearch(input: ResearchInput): string {
  const { topic, industry, depth } = input;
  const t = capitalize(topic);
  const ind = industry || "the sector";

  const base = [
    `RESEARCH BRIEF — ${t.toUpperCase()}`,
    `Industry: ${ind}   |   Depth: ${depth}   |   Prepared by: Senior Business Analyst`,
    "",
    "EXECUTIVE SUMMARY",
    `${t} has moved from an exploratory topic to an operational priority across ${ind}. Organisations that treated it as a pilot two years ago are now embedding it into core processes, while later adopters are facing compressed timelines and a tighter talent market. The evidence indicates that value accrues less from the underlying technology or approach itself and more from the operating model built around it: clear ownership, measurable objectives, and disciplined change management. Leaders should expect measurable returns within two to four quarters where scope is narrow and outcomes are instrumented, and materially weaker returns where initiatives are broad, unsponsored, or measured only by activity.`,
    "",
    "KEY FINDINGS",
    `1. Adoption is uneven. Within ${ind}, a leading cohort has operationalised ${lower(topic)} end to end, while the majority remain at pilot stage with limited process integration.`,
    "2. The primary constraint is organisational, not technical. Capability gaps, unclear ownership and weak data foundations explain most stalled initiatives.",
    "3. Measured benefits cluster around cycle-time reduction (15–30%), error-rate reduction, and redeployment of skilled time to higher-value work.",
    "4. Cost profiles are front-loaded: integration, training and governance typically exceed the direct tooling spend in year one.",
    "5. Buyer expectations are rising faster than delivery capability, creating a short-term differentiation window for fast movers.",
    "",
    "INDUSTRY TRENDS",
    `• Consolidation of point solutions into integrated platforms as ${ind} buyers push back on tool sprawl.`,
    "• Governance moving from a compliance afterthought to a design requirement, driven by regulatory attention and client due diligence.",
    "• A shift from headcount-replacement narratives to augmentation and throughput narratives, which survive board scrutiny better.",
    "• Increasing demand for auditability and explainability in any automated or AI-assisted decision path.",
    "• Talent concentration: a small pool of practitioners commands a growing premium, favouring build-plus-partner over pure build.",
    "",
    "OPPORTUNITIES",
    `• Target two or three high-volume, rules-heavy processes where ${lower(topic)} produces quantifiable savings within a single quarter.`,
    "• Package early internal wins as client-facing proof points; the market currently rewards demonstrated outcomes over stated ambition.",
    "• Build a reusable enablement layer (templates, guardrails, training) so the second and third use cases cost materially less than the first.",
    "• Use partnerships to cover capability gaps rather than attempting to hire a full internal team in a constrained market.",
    "",
    "RISKS",
    "• Quality and accuracy risk — unreviewed outputs entering client-facing or regulated workflows.",
    "• Governance and compliance risk — insufficient audit trail for decisions influenced by automated systems.",
    "• Change-fatigue risk — over-broad rollout diluting focus and eroding staff confidence.",
    "• Vendor concentration risk — deep coupling to a single provider's roadmap and pricing.",
    "• Benefit-realisation risk — savings claimed but never converted into redeployed capacity or reduced cost.",
    "",
    "RECOMMENDATIONS",
    "1. Select a narrow, high-frequency use case and instrument it with baseline metrics before any rollout.",
    "2. Appoint a single accountable owner with authority over process, tooling and training decisions.",
    "3. Establish a lightweight governance standard now — review thresholds, audit logging, and escalation — rather than retrofitting it.",
    "4. Fund enablement explicitly; budget training and change management at no less than a third of programme cost.",
    "5. Review outcomes quarterly against the baseline and stop initiatives that fail to show movement after two cycles.",
    "",
    "CONCLUSION",
    `${t} represents a durable shift in how work is performed in ${ind} rather than a short-lived cycle. The differentiating factor over the next 12–24 months will not be access to capability — that is rapidly commoditising — but the discipline with which organisations narrow scope, measure outcomes, and govern quality. A focused programme with executive sponsorship and honest measurement will outperform a broad, under-governed one by a wide margin.`,
  ];

  if (depth === "Quick Summary") {
    return [...base.slice(0, 12), "", base[base.length - 2], base[base.length - 1]].join("\n");
  }
  if (depth === "Comprehensive Report") {
    return [
      ...base,
      "",
      "APPENDIX A — METHODOLOGY",
      "Synthesis of publicly reported industry benchmarks, comparable programme outcomes, and structured practitioner reasoning. Figures are indicative ranges intended for planning, not audited statistics.",
      "",
      "APPENDIX B — 90-DAY ACTION ROADMAP",
      "  Days 1–30   Baseline current process metrics; select use case; confirm owner and sponsor.",
      "  Days 31–60  Pilot with a controlled user group; establish review and audit standards.",
      "  Days 61–90  Measure against baseline; decide scale, iterate or stop; publish results internally.",
      "",
      "APPENDIX C — OPEN QUESTIONS FOR STAKEHOLDERS",
      "• Which process owner is accountable for benefit realisation, not just delivery?",
      "• What is the acceptable error tolerance, and who reviews outputs before external use?",
      "• How will freed capacity be redeployed, and who tracks that it actually is?",
    ].join("\n");
  }
  return base.join("\n");
}

function splitDetails(details: string): string[] {
  const parts = details
    .split(/\n|(?<=\.)\s+/)
    .map((s) => s.trim())
    .filter(Boolean);
  return parts.length ? parts : ["Context and supporting details to be confirmed."];
}

function capitalize(s: string) {
  const v = s.trim();
  return v ? v.charAt(0).toUpperCase() + v.slice(1) : v;
}

function lower(s: string) {
  const v = s.trim();
  return v ? v.charAt(0).toLowerCase() + v.slice(1) : v;
}
