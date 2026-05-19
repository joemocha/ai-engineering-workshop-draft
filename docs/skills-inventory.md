# Skills Inventory

This file lists the agent skills available in this workspace, what each skill is generally used for, and where it comes from. _Custom_ entries are workspace- or user-private skills — your own setup will differ.

## Repository-local skills

| Skill | General use | Source |
| --- | --- | --- |
| `plan-to-issues` | Creating `bd`/beads issues from plans, briefs, conversations, follow-ups, or issue-derived plans. | custom |
| `code-simplification` | Simplifying code for clarity while preserving behavior. | custom |
| `taskfast-beads-from-issue` | Breaking a GitHub issue into a tracer-bullet beads breakdown. | custom |
| `bd-molecules` | Creating structured issue workflows using `bd` molecules and formulas. | custom |
| `fixing-accessibility` | Auditing and fixing web accessibility issues such as ARIA labels, keyboard navigation, focus management, contrast, forms, and interactive components. | custom |
| `fixing-metadata` | Auditing and fixing HTML metadata: titles, descriptions, canonicals, Open Graph, Twitter cards, favicons, JSON-LD, and robots directives. | custom |
| `git-history-triage` | Git-history-first audit of unfamiliar or risky repositories: churn, hotspots, ownership risk, delivery rhythm, and firefighting signals. | custom |
| `perplexity` | Web research with citations through a Perplexity/Sonar wrapper. | custom |
| `qmd` | Searching markdown knowledge bases, notes, and documentation with QMD. | custom |
| `research-codebase` | Factual current-state research of code flows, modules, validation paths, and architecture. | custom |
| `showboat` | Creating or verifying executable demo documents, golden paths, and runbooks with the `showboat` CLI. | custom |
| `solidity-security` | Writing or auditing Solidity smart contracts and applying smart-contract security best practices. | custom |
| `taskfast-pm-benson` | Routing product-management-level questions to a designated external PM/context agent. | custom |

## Global/local user skills

| Skill | General use |
| --- | --- |
| `graphify` | Turning code/docs/media into a knowledge graph, clustered communities, HTML, JSON, and `GRAPH_REPORT.md`. |
| `accessibility` | Generic WCAG accessibility audits and improvements. |
| `babysit-pr` | Legacy generic PR babysitter for polling review comments, CI checks, and mergeability. |
| `best-practices` | Applying modern web development best practices for security, compatibility, and code quality. |
| `caveman` | Ultra-compressed communication mode for lower token usage. |
| `code-review-pro` | One-shot broad code review covering security, performance, maintainability, and best practices. |
| `code-simplifier` | Generic code cleanup and readability refactoring while preserving functionality. |
| `core-web-vitals` | Optimizing LCP, INP, CLS, and page experience. |
| `design-an-interface` | Exploring multiple radically different API/interface designs, often via parallel sub-agents. |
| `diagnose` | Disciplined bug diagnosis: reproduce, minimize, hypothesize, instrument, fix, and regression-test. |
| `find-skills` | Discovering and installing agent skills for a requested capability. |
| `github-triage` | Triaging GitHub issues through a label-based state machine. |
| `grill-me` | Stress-testing a plan or design through intensive questioning. |
| `huashu-design` | Creating high-fidelity HTML prototypes, interaction demos, animations, design variants, and expert design reviews. |
| `improve-codebase-architecture` | Finding architectural improvement and refactoring opportunities informed by domain language and architecture decisions. |
| `performance` | Generic web performance optimization and audits. |
| `request-refactor-plan` | Creating detailed refactor plans with tiny commits and filing them as GitHub issues. |
| `rust-best-practices` | Writing, reviewing, or refactoring idiomatic Rust, including ownership, errors, performance, and tests. |
| `seo` | Generic technical SEO, structured data, sitemap/indexing, and search optimization work. |
| `skill-creator` | Creating or improving skills with evals, benchmarks, trigger tuning, and iterative review. |
| `to-issues` | Breaking generic plans, specs, or PRDs into independently grabbable GitHub issues. |
| `to-prd` | Turning conversation context into a PRD and submitting it as a GitHub issue. |
| `web-quality-audit` | Lighthouse-style audit across performance, accessibility, SEO, and best practices. |
| `write-a-skill` | Quickly drafting a new agent skill without a full benchmark/eval loop. |

## Global SWE skills

All `swe:`-prefixed skills are sourced from [cdd.dev/skill](https://cdd.dev/skill/) — click any skill name below to see its upstream definition.

| Skill | General use | Source |
| --- | --- | --- |
| [`swe:babysit-pr`](https://cdd.dev/skill/swe-babysit-pr) | Preferred SWE PR babysitter: monitors one open PR, handles review feedback and CI until merge-ready or blocked. | cdd.dev |
| [`swe:capture-knowledge`](https://cdd.dev/skill/swe-capture-knowledge) | Auditing a repo for implicit conventions and drafting agent-facing guidance updates. | cdd.dev |
| [`swe:change-validation-planner`](https://cdd.dev/skill/swe-change-validation-planner) | Planning the narrowest trustworthy validation path for a scoped code change or diff. | cdd.dev |
| [`swe:create-skill`](https://cdd.dev/skill/swe-create-skill) | Creating or revising repository-ready `swe:` skills with trigger boundaries and eval assets. | cdd.dev |
| [`swe:docs-drift-audit`](https://cdd.dev/skill/swe-docs-drift-audit) | Finding human-facing or operational docs that drifted from code, config, interfaces, workflows, or repo structure. | cdd.dev |
| [`swe:incident-followup-audit`](https://cdd.dev/skill/swe-incident-followup-audit) | Verifying durable engineering follow-up after incidents: tests, monitors, docs, runbooks, ownership, and tickets. | cdd.dev |
| [`swe:init`](https://cdd.dev/skill/swe-init) | Creating optional repo-local agent collaboration preferences at `.ai/swe.json`. | cdd.dev |
| [`swe:merged-pr-monitoring`](https://cdd.dev/skill/swe-merged-pr-monitoring) | Reviewing recently merged PRs, confirming deployment, and summarizing observable production impact. | cdd.dev |
| [`swe:observability-gap-hunt`](https://cdd.dev/skill/swe-observability-gap-hunt) | Finding missing or weak logs, metrics, traces, alerts, dashboards, and deployment telemetry. | cdd.dev |
| [`swe:ownership-risk-map`](https://cdd.dev/skill/swe-ownership-risk-map) | Mapping ownership and bus-factor risk using git history, churn, CODEOWNERS, tests, and repo evidence. | cdd.dev |
| [`swe:performance-hunt`](https://cdd.dev/skill/swe-performance-hunt) | Hunting concrete performance bottlenecks using profiler output, benchmarks, query plans, traces, bundles, or repo evidence. | cdd.dev |
| [`swe:pr-risk-review`](https://cdd.dev/skill/swe-pr-risk-review) | Reviewing open or draft PRs for merge risk, validation gaps, rollout/rollback issues, migrations, and hidden coupling. | cdd.dev |
| [`swe:recent-commit-bug-hunt`](https://cdd.dev/skill/swe-recent-commit-bug-hunt) | Scanning recent commits for likely regressions using concrete repo evidence. | cdd.dev |
| [`swe:refactor-opportunities`](https://cdd.dev/skill/swe-refactor-opportunities) | Producing a short backlog of small, low-risk refactor tickets with validation paths. | cdd.dev |
| [`swe:repo-introspection`](https://cdd.dev/skill/swe-repo-introspection) | Producing an orientation report for an unfamiliar repo: structure, tooling, entry points, boundaries, active surfaces, and safe starts. | cdd.dev |
| [`swe:security-audit`](https://cdd.dev/skill/swe-security-audit) | Auditing dependency vulnerabilities, outdated security-sensitive packages, license issues, and dependency hygiene. | cdd.dev |
| [`swe:test-gap-hunt`](https://cdd.dev/skill/swe-test-gap-hunt) | Finding and improving high-value test coverage gaps using the local test stack. | cdd.dev |

## Other package-provided skills

| Skill | General use | Source |
| --- | --- | --- |
| `tdd` | Test-driven development with red-green-refactor for planned feature work and bug fixes when TDD is explicitly requested. | custom |
| `librarian` | Researching open-source library internals with evidence-backed answers and GitHub permalinks. | `pi-web-access` (npm) |

## External skill sources

Recommended places to discover and pull in additional agent skills:

- [cdd.dev/skill](https://cdd.dev/skill/) — upstream for all `swe:`-prefixed skills listed above.
- [aihero.dev](https://www.aihero.dev/) — good source of agent skills, patterns, and worked examples.

## General precedence notes

- Prefer repository-local skills over generic global skills when both apply to the same task.
- Prefer narrower skills over broader skills. For example, use accessibility, metadata, PR monitoring, or validation-planning skills when the request is specifically about those areas.
- Use `bd`/beads skills for beads issue workflows and GitHub issue skills for GitHub-native issue workflows.
- Use SWE-prefixed skills for disciplined software-engineering workflows when available.
