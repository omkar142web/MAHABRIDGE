# SIH26129 — Problem Statement (Guide Direction)

> SIH Problem Statement: **SIH26129 — System integration and interoperability among government digital platforms, resulting in fragmented service delivery.**
> Product direction: **a simple, intelligent government-service guide — not a super-app, not an integration layer.**

---

## 1. The problem in one paragraph

Government services are organized around **departments, portals, and documents**, while citizens think in terms of **goals** (`I want an ATM card`, `I need a birth certificate`).

Today a citizen who wants one thing often discovers they need another thing first — and then another — without any clear explanation of what depends on what, what documents are required, or where to get them. They bounce between portals, relatives, agents, and outdated advice.

The fragmentation problem is real. But for this prototype we are **not solving it by integrating government systems**. We are solving the understanding problem:

> **Citizens cannot answer: What do I want? What does it need? What do I need first? What should I do next?**

---

## 2. Core product idea

One extremely simple principle:

> **A citizen should be able to come here with a goal or document in mind and understand what they need to do next.**

Example:

User says:

> "I want an ATM card."

System explains:

**ATM Card → requires PAN Card.**

If the user does not have a PAN Card:

> **You need a PAN Card first.**

User clicks **PAN Card** and sees:

- What it is
- Why it is needed
- Who provides it
- What documents are required
- What information is needed
- Basic eligibility / conditions if relevant
- Steps to obtain it
- Related prerequisites

The product is therefore a **visual, interactive guide through government-related requirements and dependencies.**

Mental model:

```text
USER GOAL
   ↓
FIND SERVICE / DOCUMENT
   ↓
UNDERSTAND IT
   ↓
SEE REQUIREMENTS
   ↓
SEE PREREQUISITES
   ↓
OPEN MISSING REQUIREMENT
   ↓
UNDERSTAND THAT REQUIREMENT
   ↓
FOLLOW THE GUIDANCE
```

---

## 3. What this product does (only this)

### A. Discover

Help users find the document / service they are looking for via simple search.

Homepage question:

> **What do you need help with?**

### B. Understand

Explain what that document / service is and what it is used for, in plain language.

### C. Requirements

Show what documents, information, or prerequisites are required.

### D. Hierarchy

Show dependencies clearly. Example:

```text
ATM Card
│
└── PAN Card
    │
    └── Required Documents
        ├── Aadhaar
        └── Photograph
```

### E. Guide

Tell the user what they should do next.

### F. Navigate

Allow the user to click into any prerequisite and understand that requirement as well.

That is the core product. Do not expand scope unless it directly improves this guidance experience.

---

## 4. What we are NOT building

Explicitly out of scope for this prototype:

- Government application submission
- Real government API integrations
- Cross-department workflow orchestration
- Application tracking / real-time status
- Government officer dashboards
- Document storage / wallet systems
- Automatic eligibility decisions
- Automatic government verification
- Payment processing
- Government database integration
- Notifications infrastructure
- Complex authentication / identity systems
- AI agents performing government actions
- Automated form filling
- Complex case management
- Government-side analytics
- Multi-department workflow engines

These may be future possibilities. They are **outside the current prototype**.

The prototype remains a guide.

---

## 5. Guidance, not authority

The system must never pretend to be the government.

Use language such as:

- "You may need…"
- "Typically required…"
- "Check the official requirements before applying."
- "Requirements can vary depending on your situation."
- "The final decision is made by the relevant authority."

Never say:

- "You are officially eligible."
- "Your application is approved."
- "The government has verified this."
- "You definitely qualify."

Unless such information actually comes from an official integrated system — which is outside this prototype.

---

## 6. Official information

- Use clearly identified mock / synthetic data where necessary.
- Do not fabricate official approvals, application statuses, or government responses.
- Clearly distinguish demo data from real government information.
- Where official links are available, direct the user to the appropriate official website / portal.
- Never imply the prototype itself is an official government authority.

---

## 7. Information hierarchy (internal)

```text
Government
    ↓
Department
    ↓
Category
    ↓
Service / Document
    ↓
Purpose
    ↓
Prerequisites
    ↓
Required Documents
    ↓
Required Information
    ↓
Steps
    ↓
Where / How to Obtain
```

This hierarchy is primarily an **internal information structure**. Do not force citizens to navigate every level.

A citizen should be able to search directly for "PAN card" or "I need a birth certificate" and immediately reach the relevant guide.

---

## 8. Success criteria

The prototype succeeds if a user arriving with almost no knowledge can answer:

- What am I trying to get?
- What do I need for it?
- What am I missing?
- What do I need first?
- Why do I need it?
- What should I do next?

---

## 9. One-sentence pitch

> **Tell us what you want. We'll tell you what you need, what comes first, what documents are required, and where / how to get them.**

What it is:

> **A simple, intelligent guide to government services and documents — the front door to understanding, while actual government authorities and official portals remain responsible for real service delivery.**

What it is not:

> A replacement for government portals.
