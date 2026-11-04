---
name: Painel Clínica
description: Dark, brand-green admin panel matching the Vida Saudável mobile app
colors:
  bg-page: "#0b0d0c"
  bg-page-soft: "#111412"
  surface-1: "#171a18"
  surface-2: "#1e221f"
  border-subtle: "rgba(255, 255, 255, 0.10)"
  border-strong: "rgba(255, 255, 255, 0.16)"
  brand-600: "#12a150"
  brand-500: "#16b45b"
  brand-ink: "#06130b"
  text-primary: "#f2f5f3"
  text-secondary: "#9aa59e"
  status-agendado: "#5b9cff"
  status-confirmado: "#2fd16b"
  status-cancelado: "#ff6b6b"
  status-realizado: "#b7c4be"
  danger: "#ff6b6b"
typography:
  display:
    fontFamily: "Poppins, Segoe UI, -apple-system, BlinkMacSystemFont, sans-serif"
    fontSize: "clamp(1.4rem, 2.4vw, 1.9rem)"
    fontWeight: 700
    lineHeight: 1.12
  title:
    fontFamily: "Poppins, Segoe UI, -apple-system, BlinkMacSystemFont, sans-serif"
    fontWeight: 700
    fontSize: "1.1rem"
    lineHeight: 1.2
  body:
    fontFamily: "Poppins, Segoe UI, -apple-system, BlinkMacSystemFont, sans-serif"
    fontWeight: 400
    fontSize: "1rem"
    lineHeight: 1.5
  label:
    fontFamily: "Poppins, Segoe UI, -apple-system, BlinkMacSystemFont, sans-serif"
    fontWeight: 600
    fontSize: "0.82rem"
    letterSpacing: "0.04em"
rounded:
  sm: "12px"
  md: "20px"
  lg: "28px"
  pill: "999px"
spacing:
  1: "0.25rem"
  2: "0.5rem"
  3: "0.75rem"
  4: "1rem"
  5: "1.5rem"
  6: "2rem"
components:
  button-primary:
    backgroundColor: "{colors.brand-600}"
    textColor: "{colors.brand-ink}"
    rounded: "{rounded.pill}"
    padding: "0 1rem"
    height: "44px"
  button-primary-hover:
    backgroundColor: "{colors.brand-500}"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.text-secondary}"
    rounded: "{rounded.pill}"
    padding: "0 1rem"
  chip-active:
    backgroundColor: "{colors.brand-600}"
    textColor: "{colors.brand-ink}"
    rounded: "{rounded.pill}"
  card:
    backgroundColor: "{colors.surface-1}"
    rounded: "{rounded.md}"
    padding: "1rem"
---

# Design System: Painel Clínica

## Overview

**Creative North Star: "The Clinic's Night Shift"**

Painel Clínica is the staff-facing twin of Vida Saudável, the clinic's dark, saturated-green patient app. The panel was previously a separate pastel-lime, white-card dashboard; this redesign inherits the mobile app's visual language atom-for-atom instead of inventing a parallel "dark admin" theme — near-black grounds, very dark graphite surfaces, one saturated brand green doing the work of every primary action and status-positive signal, heavily rounded pill and 20-28px-radius forms, and a geometric sans (Poppins) carrying real weight contrast.

The system is deliberately restrained outside the brand green: text, surfaces, and borders stay in a tight near-black/graphite/white range so the green reads as a single, confident signal rather than one accent among many. Status color (blue/red/muted-gray for agendado/cancelado/realizado) exists only where the business genuinely needs a second signal, and is never the sole way status is communicated — every badge pairs its color with an icon and a text label.

**Key Characteristics:**
- Near-black ground with very dark graphite card surfaces (never pure black-on-black; cards always sit one step lighter than the page).
- One saturated brand green (#16B45B / #12A150) carries every primary action, active tab/chip state, and the "confirmado" status.
- Pill buttons/chips and 20-28px rounded cards throughout; no sharp corners anywhere in the system.
- Status is always icon + label + color, never color alone.
- Poppins 600/700 for anything that needs to assert hierarchy; body text stays regular weight.

## Colors

The palette is a tight near-black/graphite scale with one saturated green doing almost all of the color work, plus four muted status hues used only on badges and schedule blocks.

### Primary
- **Brand Green** (`#16B45B`, deep variant `#12A150`): the system's only saturated color. Used at page scale — primary buttons, active chip/tab state, the "próximo atendimento" hero card gradient, the today-column header in the weekly grid, focus rings, avatar accents, and the confirmado status. Text on a solid green fill is always **Brand Ink** (`#06130B`), never white — white fails AA contrast against this green (~2.5:1).

### Neutral
- **Void** (`#0B0D0C` / `#111412`): page background, radial-tinted very faintly with brand green.
- **Graphite Surface** (`#171A18`): the default card/panel surface, one step above the page.
- **Graphite Surface Raised** (`#1E221F`): inputs, hover surfaces, nested chips — one step above the card surface.
- **Hairline** (`rgba(255,255,255,0.10)` / `0.16` strong): all borders. Never a solid light gray; always a translucent white over the dark ground.
- **Ink White** (`#F2F5F3`): primary text.
- **Green-Gray** (`#9AA59E`): secondary/muted text — tinted toward the brand hue rather than a flat gray, per the "tint secondary text from the surface hue" rule.

### Status (badges and schedule blocks only)
- **Sky** (`#5B9CFF`, bg `rgba(91,156,255,.16)`): agendado.
- **Signal Green** (`#2FD16B`, bg `rgba(22,180,91,.18)`): confirmado, off-brand-green so it reads against dark neutral surfaces; on the brand-green hero card the badge switches to a near-opaque dark chip (`rgba(6,19,11,.8)`) so every status color keeps ≥4.5:1 against it.
- **Coral** (`#FF6B6B`, bg `rgba(255,107,107,.16)`): cancelado / danger.
- **Muted Sage** (`#B7C4BE`, bg `rgba(154,165,158,.16)`): realizado.

### Named Rules
**The Ink-on-Green Rule.** Any text or icon sitting directly on a solid brand-green fill uses Brand Ink (`#06130B`), never white or light gray — verified at ~7:1 contrast vs. ~2.5:1 for white.

**The Color-Plus Rule.** No status is ever communicated by color alone: every status badge and schedule block pairs its color with a distinct icon shape (dashed circle / check / x / double-check) and its text label.

## Typography

**Display/Body Font:** Poppins (loaded via Google Fonts, weights 400/500/600/700), falling back to Segoe UI / system sans.

**Character:** A geometric, confident sans used the same way the mobile app uses it — bold (700) for anything that needs to assert itself (page headings, button labels, hero numbers), regular weight for everything read at length.

### Hierarchy
- **Display** (700, `clamp(1.4rem, 2.4vw, 1.9rem)`, 1.12): page-level intro heading above the hero card; also the login page's large headline at a bigger clamp (`clamp(2.35rem, 4.8vw, 4rem)`).
- **Title** (700, ~1.1–1.95rem): card and panel headings ("Acessar conta", "Agenda Semanal", modal titles).
- **Body** (400, 1rem, 1.5): paragraph and list copy.
- **Label** (600, 0.73–0.92rem, tracked uppercase for chips/badges): status pills, section eyebrows, form labels.

## Layout

Single-column app shell: a sticky glass header (blurred dark surface) above a `max-width`-free fluid main column, padded `1rem` on mobile up to generous clamp-based padding on desktop. The weekly agenda is the one horizontally-constrained element: its grid has a fixed `min-width: 980px` and scrolls horizontally inside a rounded container on narrow viewports (360-640px), rather than compressing columns unreadably. Everything else reflows to a single column under ~800-900px (login grid, filter panel, dashboard nav).

## Elevation & Depth

Flat-by-default, dark-mode elevation: surfaces step up in lightness (page → surface-1 → surface-2) rather than relying on heavy shadows, since shadows barely read on a near-black ground. A soft, large-blur shadow (`shadow-sm`/`shadow-md`, offset + blur, never a hard edge) marks floating elements (header, modal, dropdown) and brand-green elements additionally carry a tinted green glow (`shadow-brand`) to make the primary action/hero card feel lit from within.

### Shadow Vocabulary
- **shadow-sm** (`0 8px 24px rgba(0,0,0,.32)`): cards, header, controls at rest.
- **shadow-md** (`0 24px 60px rgba(0,0,0,.5)`): modal, dropdown menu — anything overlaying content.
- **shadow-brand** (`0 14px 34px rgba(18,161,80,.3)`): brand-green elements only (login submit, hero card, logo mark, Novo Agendamento).

## Shapes

Heavily rounded throughout: pill (`999px`) for every button, chip, and segmented control; `20px` for standard cards; `28px` for the largest surfaces (login panel, hero card, modal, weekly board); `12px` for small controls (inputs, grid cells, icon tiles). No sharp corners exist anywhere in the system. Icon tiles (calendar/clock on the hero card) are circular, sitting in a translucent dark chip over the green field.

## Components

### Buttons
- **Shape:** pill (`999px` radius), minimum 44px height everywhere (touch target floor).
- **Primary:** brand gradient fill (`#12A150` → `#16B45B`), Brand Ink text, `shadow-brand`; brightens 8% on hover.
- **Ghost:** transparent fill, strong-hairline border, secondary text that brightens to primary text on hover.
- **Danger:** translucent coral fill/border, coral text (cancel actions only).
- **Disabled:** 55% opacity, `cursor: not-allowed`, no hover filter.

### Chips / Segmented Controls
- **Specialty chips:** graphite-surface pill, secondary text; active state is the full brand gradient with Brand Ink text.
- **Lista/Agenda Semanal toggle:** same active/inactive pattern inside a pill-shaped track.

### Cards / Containers
- **Corner Style:** 20px (appointment cards), 28px (hero, login, modal, weekly board).
- **Background:** `surface-1`, one step above the page.
- **Shadow Strategy:** `shadow-sm` at rest; appointment cards lift (`translateY(-2px)`) and brighten their border on hover.
- **Border:** 1px hairline (`border-subtle`), strengthening to `border-strong` on hover/focus where relevant.

### Inputs / Fields
- **Style:** `surface-2` fill, `border-strong` hairline, 12px radius, 44px min height, `color-scheme: dark` so native date pickers render dark.
- **Focus:** brand-green border + `focus-ring` (3px, 50% alpha brand green) — applied globally via `:focus-visible`, never on mouse click.
- **Error:** coral-tinted banner with a hairline border, assertive live region.

### Navigation
- Dark glass pill header; two real nav links (Agendamentos / Perfil) in a pill-track segmented control, active link filled with the brand gradient. Stacks to a full-width row under 900px. Avatar is a translucent brand-green circle with initials.

### Status Pill (signature component)
A small pill combining a 13px status icon (shape, not just color — dashed circle for agendado, check-circle for confirmado, x-circle for cancelado, double-check for realizado) with the status label, on a tinted translucent background of its own hue. On the brand-green hero card, the pill's background switches to a near-opaque dark chip so every status color clears AA contrast against the green field.

## Do's and Don'ts

### Do:
- **Do** use the brand gradient (`#12A150` → `#16B45B`) for exactly one primary action per view/section; everything else is ghost or neutral.
- **Do** pair every status indicator with an icon and a text label, never color alone.
- **Do** keep all interactive targets ≥44px and give every focusable element a visible `:focus-visible` ring.
- **Do** use Brand Ink (`#06130B`) for text on any solid green fill.

### Don't:
- **Don't** use white or light-gray text directly on solid brand green — it fails AA contrast.
- **Don't** introduce a second saturated accent color; status hues stay muted/desaturated and confined to badges and schedule blocks.
- **Don't** use sharp (0px) corners anywhere; the system has no "square" primitive.
- **Don't** animate anything when `prefers-reduced-motion: reduce` is set — the skeleton shimmer and all transitions must degrade to an instant/static state.
