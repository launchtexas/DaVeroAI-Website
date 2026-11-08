# Technology & governance `/governance`

> Editorial note: Generic governance copy. Controls below describe design principles; deployment details must be agreed for each engagement. No certification, audit or compliance status is asserted.

- **SEO title:** Technology & Governance | DaveroAI
- **Meta description:** Human approval, clear responsibilities and traceable agent actions. Governance designed around your workflows, platform and data.

## Hero `#hero`

**Humans review and approve. Agents do the rest.**

Agents prepare the work. Your team keeps authority over the outcome. Our governance approach starts with clear responsibilities, defined boundaries and evidence you can review.

## Human in the loop `#hitl`

**Prepare → Review → Approve → Record**

1. **Agent · Prepare.** Prepare the work end to end, with supporting evidence and exceptions ready for review.
2. **Human · Review.** Your subject-matter experts check the work against the workflow, rules and business context.
3. **Human · Approve.** An authorised person approves the result before the workflow proceeds. Unresolved exceptions return for correction.
4. **Platform · Record.** Keep a full audit trail of agent actions, human decisions and resulting changes inside the platform.

The audit trail should identify who did what, when, which version ran and what was approved. Protect logs against alteration, restrict access and agree retention periods. Capture the evidence needed to reconstruct decisions without copying unnecessary sensitive data.

## Five actors around every agent `#actors`

- **Subject expert · Client or consultant.** Defines the workflow, rules and edge cases.
- **Forward Deployed Agent Engineer · DaveroAI.** Builds the agent around those requirements.
- **Validator · Client or consultant.** Checks controls and approves results in the platform.
- **Operator · DaveroAI.** Runs the agent, monitors exceptions and coordinates resolution.
- **Owner · DaveroAI.** Owns the agent and its ongoing improvement.

The client defines and approves. DaveroAI owns and runs the agents.

## Hardened with a constitution `#constitution`

**Rules, controls and edge cases that make the skill reliable.**

The constitution defines permitted actions, required approvals and when to stop and escalate.

- **Access control.** Apply least privilege: give each person and agent only the access needed for its task. Separate preparation from approval; review and revoke permissions as responsibilities change.
- **Monitoring.** Check model and agent performance against agreed acceptance criteria. Track errors, unexpected behaviour and changes in output quality; route exceptions to a named person.
- **Change control.** Version prompts, models, tools and workflow rules. Test changes, document review and approval, and keep a rollback path before release.
- **Incident response.** Define how to pause an agent, contain an issue, preserve evidence and notify responsible people. Investigate the cause and validate corrections before restarting.

**Frameworks we align with:** This approach is designed to align with the NIST Artificial Intelligence Risk Management Framework (AI RMF), ISO/IEC 42001 and SOC 2 practices.

## Platform-native `#platform-native`

**Work inside your platform. Keep data within agreed boundaries.**

The design aim is for agents to run inside your platform and for business data to stay there. Confirm any model-provider or integration data flows before deployment. Limit collection to the task, define approved uses, protect sensitive fields and agree retention and deletion rules.

## Start a conversation `#cta`

Bring a workflow. Define the approvals, data boundaries and evidence it needs.

[Start a conversation](/contact#form)

## Sources

- [NIST — AI RMF Playbook: Manage](https://airc.nist.gov/airmf-resources/playbook/manage/)
- [ISO — ISO/IEC 42001 explained](https://www.iso.org/insights/iso-42001-explained)
- [AICPA & CIMA — SOC 2 description criteria](https://www.aicpa-cima.com/resources/download/get-description-criteria-for-your-organizations-soc-2-r-report)
- Internal: `docs/design.md` §1; `docs/content.md`, human-in-the-loop and governance copy.
