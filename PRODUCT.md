# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Clinic administrative/reception staff ("Painel Clínica") who manage appointment scheduling for a healthcare clinic. They log in with administrative credentials (not patient accounts) and spend their working day confirming, cancelling, and completing appointments created through the companion patient-facing mobile app. [Inferred from login copy "Use suas credenciais administrativas para entrar." and the staff-only action set (confirmar/cancelar/realizar) in `AgendamentosPage.tsx`; not separately confirmed with the user.]

## Product Purpose

A web admin panel ("Painel Clínica") that gives clinic staff a real-time, operational view of appointments (agendamentos): list and weekly-calendar views, filtering by specialty/status/date range, and status transitions (AGENDADO → CONFIRMADO → REALIZADO, or CANCELADO). Success is staff being able to find, triage, and act on the day's/week's appointments quickly and without error.

## Positioning

This panel is the staff-facing counterpart to "Vida Saudável" ("Healthy Life"), the clinic's patient-facing mobile app (API host `api.vidasaudavel.app`, referenced directly in login copy: "Painel Vida Saudável"). Patients book through the mobile app; staff operate the booking lifecycle here. The two surfaces are visually disconnected today (panel: light pastel green/white; app: dark, saturated green) despite being part of one product family — this work exists to close that gap.

## Operating Context

- Company: Blufy — healthtech/govtech, Petrolina, Brazil (per global project instructions).
- Stack: React 19 + Vite + TypeScript, React Router, plain CSS (no CSS framework, no component library, no icon library).
- Backend: separate NestJS/Prisma API (`api.vidasaudavel.app`), reached through a Vite dev proxy at `/api` and a Vercel proxy in production (recent commit history: CORS fix, API URL fix, pagination limit fix, login body `{ email, password }` fix).
- Routes: `/login`, `/privacidade` (public); `/` (Agendamentos, protected, index), `/perfil` (protected). No separate "Painel" page distinct from Agendamentos exists today — the dashboard shell's header currently shows a text section indicator ("Painel • Agendamentos"), not real multi-page nav.
- Four pre-existing ESLint errors (two `AgendamentosPage.tsx` React-purity/effect rules around `Date.now()`/`useMemo`, one `AuthContext.tsx` fast-refresh rule, one `agendamentoLabels.ts` escape-character rule) are known and out of scope for this visual work.

## Capabilities and Constraints

- Constraint (explicit, user-stated): this and all related visual work is presentation-only — CSS, design tokens, and markup/structure. No changes to `authService`, `api`, routes, business/status rules, or field names sent to the API. The login request body stays `{ email, password }`.
- Constraint: no heavy new dependencies. Fonts via Google Fonts (justified exception) or an already-used package.
- Constraint: do not fix or worsen the four pre-existing lint errors noted above.
- Constraint: accessibility floor — AA contrast, visible keyboard focus, ≥44px touch targets, `prefers-reduced-motion` respected, status never conveyed by color alone (icon or label required).
- Constraint: responsive from 360px to 1440px; the weekly agenda needs controlled horizontal scroll on mobile.
- Constraint: deploy/push require explicit user confirmation; work proceeds as local commits per stage with a build check after each.

## Brand Commitments

- Product/brand name: "Vida Saudável" (patient-facing mobile app) and "Painel Clínica" (this staff panel), both parts of one product family.
- Binding visual reference (user-specified, verbatim intent): dark theme with near-black background (#0B0D0C–#111412), very dark graphite surfaces (#171A18 / #1E221F), subtle 1px borders (~8–12% white); saturated brand green (#12A150–#16B45B) for primary actions, active chips/tabs, icons, and hero-card gradients; light text (#F2F5F3) on dark surfaces, secondary text in muted green-gray (#9AA59E); heavily rounded shapes (20–28px cards, pill chips/buttons), icons in translucent dark-green circles, generous breathing room; a modern geometric sans (Poppins or similar) at 600–700 weight for headings. This is the mobile app's existing design language, documented here as the explicit target direction for the panel's redesign (see `DESIGN.md` for the committed token system once built).

## Evidence on Hand

- No design file, Figma, or screenshot of the mobile app was provided in this session — the palette, shapes, and component language above come from the user's written brief, treated as the direction source of truth. Future sessions should not need to re-ask for it.
- Current panel implementation (light theme, pastel lime/white) is the incumbent system being replaced, kept only as anti-reference per the user's explicit redesign request.

## Product Principles

1. Staff speed over decoration: every screen optimizes for scanning and acting on appointments quickly.
2. One product, one visual language: the panel must read as the same product family as the "Vida Saudável" mobile app, not a lookalike theme.
3. Never let presentation work touch business logic, API contracts, or routing — the boundary is absolute.
4. Status is always legible without color (label/icon), and always AA-compliant even on dark, saturated surfaces.
5. Ship in small, buildable, revertible stages — tokens before components, one commit per stage, no silent scope creep into logic.

## Accessibility & Inclusion

User-stated requirements: WCAG AA minimum contrast on all text and status badges; visible keyboard focus ring; touch targets ≥44px; `prefers-reduced-motion` honored; status communicated redundantly (not color-only).
