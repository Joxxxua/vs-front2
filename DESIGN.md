---
name: Painel Clínica
description: Light, brand-green admin panel matching the Vida Saudável mobile app
colors:
  bg-page: "#f4f7f5"
  bg-page-soft: "#edf3ef"
  surface-1: "#ffffff"
  surface-2: "#f0f5f2"
  border-subtle: "#e3eae5"
  border-strong: "#c7d8cd"
  brand-600: "#0f9a48"
  brand-500: "#12a150"
  brand-ink: "#0f1a14"
  text-primary: "#0f1a14"
  text-secondary: "#5b6b62"
  text-disabled: "#9aa79f"
  status-agendado: "#135f7e"
  status-confirmado: "#0c7a3a"
  status-cancelado: "#b23232"
  status-realizado: "#5b6b62"
  danger: "#b23232"
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
    backgroundColor: "{colors.brand-500}"
    textColor: "{colors.brand-ink}"
    rounded: "{rounded.pill}"
    padding: "0 1rem"
    height: "44px"
  button-primary-hover:
    backgroundColor: "{colors.brand-600}"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.text-secondary}"
    rounded: "{rounded.pill}"
    padding: "0 1rem"
  chip-active:
    backgroundColor: "{colors.brand-500}"
    textColor: "{colors.brand-ink}"
    rounded: "{rounded.pill}"
  card:
    backgroundColor: "{colors.surface-1}"
    rounded: "{rounded.md}"
    padding: "1rem"
---

# Design System: Painel Clínica

## Overview

**Creative North Star: "Vida Saudável, by daylight"**

Painel Clínica is the staff-facing twin of Vida Saudável, the clinic's patient-facing mobile app. This redesign carries the app's brand identity — saturated signal-green, heavily rounded cards, Poppins at real weight contrast — onto a light ground: a very light green-gray page, white cards, near-black ink text. A dark variant shipped first in this project's history and was evaluated; the team's call was that a staff panel used all day under office/clinic lighting reads better light, so dark was kept only as a dormant, unactivated token set for a possible future opt-in (see Colors → Dormant Dark Variant).

The system is deliberately restrained outside the brand green: text, surfaces, and borders stay in a tight white/pale-green/ink range so the green reads as a single, confident signal rather than one accent among many. Status color (teal/red/muted-gray for agendado/cancelado/realizado) exists only where the business genuinely needs a second signal, and is never the sole way status is communicated — every badge pairs its color with an icon and a text label.

**Key Characteristics:**
- Very light green-gray ground (`#F4F7F5`) with pure white card surfaces — never flat/uniform; cards always sit one step lighter than the page, with a soft diffused shadow instead of a hard edge.
- One brand green (`#12A150` / `#0F9A48`) carries every primary action and active tab/chip state; it always sits under **dark ink text**, not white — verified by contrast computation, not assumed (see the Ink-on-Green Rule).
- A separate, deliberately darker green gradient (`#0A6E36` → `#0D8140`) is reserved for exactly one surface — the "próximo atendimento" hero card — dark enough that white text clears AA there, which the brand's flatter greens cannot.
- Pill buttons/chips and 20–28px rounded cards throughout; no sharp corners anywhere in the system.
- Status is always icon + label + color, never color alone.
- Poppins 600/700 for anything that needs to assert hierarchy; body text stays regular weight.

## Colors

The palette is a tight white/pale-green/ink scale with one brand green doing almost all of the color work, plus four muted status hues used only on badges and schedule blocks. Every pairing below was checked against WCAG AA (4.5:1 body text, 3:1 large text/UI components) by computing contrast ratios, not by eye.

### Primary
- **Brand Green** (`#12A150` primary, `#0F9A48` hover/pressed): the system's main saturated color. Used for primary buttons, active chip/category state, and the today-marker in the weekly grid. Text on a solid fill of either is always **ink** (`#0F1A14`) — white only reaches ~3.4:1 on `#12A150`, which fails AA; ink reaches ~5.3:1.
- **Hero Gradient** (`#0A6E36` → `#0D8140`, white text `#FFFFFF`): a separate, darker green reserved for the "próximo atendimento" card. The brief's literal brand values (`#0E8A43` → `#16B45B`) were tried first and measured at 4.4:1 and 2.7:1 against white — both below AA. This gradient was darkened until both stops clear 4.5:1 (measured 5.4:1 / 5.0:1) so the card can use light text the way the rest of the brand-green surfaces cannot.

### Neutral
- **Page** (`#F4F7F5` / soft `#EDF3EF`): page background, radial-tinted very faintly with brand green.
- **Surface** (`#FFFFFF`): the default card/panel surface.
- **Surface Raised** (`#F0F5F2`): inputs, nested chips, the weekly grid's sunken well — one step down from white.
- **Hairline** (`#E3EAE5` subtle / `#C7D8CD` strong): all borders.
- **Ink** (`#0F1A14`): primary text and headings — also the "text on solid brand green" color.
- **Slate** (`#5B6B62`): secondary/muted text, tinted toward the brand hue rather than a flat gray.
- **Faded** (`#9AA79F`): disabled text only; WCAG exempts disabled controls from the contrast floor, so this is deliberately lower-contrast.

### Status (badges and schedule blocks only)
- **Teal** (`#135F7E`, bg `#DCEFF6`): agendado — 6.0:1 on its own badge bg.
- **Forest** (`#0C7A3A`, bg `#E6F6EC`): confirmado — 4.9:1; also doubles as the weekly grid's "today" text color.
- **Clay** (`#B23232`, bg `#FBE4E4`): cancelado / danger — 5.1:1.
- **Slate** (`#5B6B62`, bg `#E7ECE9`): realizado — reuses the secondary text color, 4.7:1.

### Named Rules
**The Ink-on-Green Rule.** Any text or icon sitting directly on a *flat* solid brand-green fill (`#12A150`/`#0F9A48` — buttons, active chips/categories, the weekly grid's today header) uses **ink** (`#0F1A14`), never white — computed contrast rules this out (~3.4:1, fails AA). The one exception is the hero card, which uses its own darker, dedicated gradient specifically so it *can* carry white text (see Primary, above) — don't borrow that gradient for anything else, and don't put white text on the flat brand green.

**The Color-Plus Rule.** No status is ever communicated by color alone: every status badge and schedule block pairs its color with a distinct icon shape (dashed circle / check / x / double-check) and its text label.

### Dormant Dark Variant
The tokens carry a `:root[data-theme="dark"]` block in `src/index.css` holding the near-black palette this panel shipped with first (page `#0B0D0C`, surfaces `#171A18`/`#1E221F`, ink-white text, the same status/brand hues tuned for a dark ground). Nothing in the app sets `data-theme="dark"` — there is no toggle, no `prefers-color-scheme` media query, no JS reading OS theme. Light is the only theme a visitor sees today; the dark block exists purely so a future explicit opt-in (a settings toggle, say) doesn't require re-deriving a whole second palette from scratch.

## Typography

**Display/Body Font:** Poppins (loaded via Google Fonts, weights 400/500/600/700), falling back to Segoe UI / system sans.

**Character:** A geometric, confident sans used the same way the mobile app uses it — bold (700) for anything that needs to assert itself (page headings, button labels, hero numbers), regular weight for everything read at length.

### Hierarchy
- **Display** (700, `clamp(1.4rem, 2.4vw, 1.9rem)`, 1.16): the Agendamentos page greeting ("Olá! Veja o que está por vir na agenda.").
- **Title** (700, ~1.1–2.15rem): card and panel headings ("Acessar conta", "Agenda Semanal", modal titles, the login heading at a larger clamp).
- **Body** (400, 1rem, 1.5): paragraph and list copy.
- **Label** (600, 0.73–0.92rem, tracked uppercase for chips/badges): status pills, section eyebrows, form labels.

## Layout

Single-column app shell: a sticky glass header (blurred white surface) above a `max-width`-free fluid main column, padded `1rem` on mobile up to generous clamp-based padding on desktop. The weekly agenda is the one structurally-responsive view, not just a shrinking one: on desktop (>640px) it's still the 7-day grid, horizontally scrollable inside a rounded container at tablet widths; below 640px the grid itself is replaced outright by a horizontal day-strip (weekday + date, one tap per day) with that day's appointments listed below it — the mobile app's own agenda shape, not a compressed grid. Everything else reflows to a single column under ~640–900px (login, filter panel, dashboard nav, specialty chips scroll horizontally instead of wrapping).

## Elevation & Depth

Light-mode elevation: surfaces step up in brightness (page → surface-2 → white) and lean on a soft, diffused shadow rather than borders alone to separate floating elements from the page — the brief's own shadow value (`0 8px 24px rgba(16,40,28,.06)`) is the baseline `shadow-sm`, tinted dark-green-black rather than flat black so it reads as "lifted off this specific green-tinted page" rather than a generic gray shadow. Brand-green elements (hero card, login submit, primary "Novo Agendamento") additionally carry a tinted green glow (`shadow-brand`) so the one saturated surface on an otherwise quiet page feels lit from within.

### Shadow Vocabulary
- **shadow-sm** (`0 8px 24px rgba(16,40,28,.06)`): cards, header, controls at rest.
- **shadow-md** (`0 24px 60px rgba(16,40,28,.10)`): modal, login card, dropdown menu — anything overlaying content.
- **shadow-brand** (`0 14px 34px rgba(10,110,54,.22)`): brand-green elements only (login submit, hero card, logo mark, Novo Agendamento).

## Shapes

Heavily rounded throughout: pill (`999px`) for every button, chip, and segmented control; `20px` for standard cards; `28px` for the largest surfaces (login panel, hero card, modal, weekly board); `12px` for small controls (inputs, grid cells, icon tiles). No sharp corners exist anywhere in the system. Icon tiles (calendar/clock on the hero card, the appointment-card type icon, category chips) are circular, sitting in a translucent/soft-green chip.

## Components

### Buttons
- **Shape:** pill (`999px` radius), minimum 44px height everywhere (touch target floor).
- **Primary:** flat brand-green fill (`#12A150`, darkening to `#0F9A48` on hover), ink text, `shadow-brand`.
- **Ghost:** transparent fill, strong-hairline border, secondary text that darkens to ink on hover.
- **Danger:** translucent clay fill/border, clay text (cancel actions only).
- **Disabled:** 55–60% opacity, `cursor: not-allowed`/`wait`, no hover filter.

### Chips
- **Category chips (specialties):** circular icon badge (initial letter, or a drawn all-categories glyph for "Todos") above a small label, in a horizontally scrollable row; active state fills the circle solid brand green with ink text/initial.
- **Lista/Agenda Semanal toggle:** pill-track segmented control, active side filled solid brand green with ink text.

### Cards / Containers
- **Corner Style:** 20px (appointment cards, day-strip chips), 28px (hero, login, modal, weekly board).
- **Background:** white (`surface-1`), one step above the page.
- **Shadow Strategy:** `shadow-sm` at rest; appointment cards and day-agenda rows lift (`translateY(-1px/-2px)`) and strengthen their border on hover — never a colored left-border accent (the status pill already carries icon + label + color).
- **Border:** 1px hairline (`border-subtle`), strengthening to `border-strong` on hover/focus where relevant.
- **Appointment card header:** a soft-green icon circle + bold title + gray date subtitle on the left, status pill pinned to the corner — the same shape the mobile app's list uses.

### Inputs / Fields
- **Style:** `surface-2` fill, `border-strong` hairline, 12px radius, 44px min height, `color-scheme: light` so native date pickers render light.
- **Focus:** brand-green border + `focus-ring` (3px, 50% alpha brand green) — applied globally via `:focus-visible`, never on mouse click; this ring is the one explicitly-required "anel verde visível."
- **Error:** clay-tinted banner with a hairline border, assertive live region.

### Navigation
- **Desktop (>640px):** glass white pill header; two real nav links (Agendamentos / Perfil) in a pill-track segmented control, active link filled solid brand green.
- **Mobile (≤640px):** the header nav hides and a fixed glass bottom bar takes over — icon + label per route, active item in brand green on a soft-green pill, 44px+ targets, same glass/shadow treatment as the header so it reads as part of one system.
- Avatar is a soft brand-green circle with initials, in both layouts.

### Status Pill (signature component)
A small pill combining a 13px status icon (shape, not just color — dashed circle for agendado, check-circle for confirmado, x-circle for cancelado, double-check for realizado) with the status label, on a tinted light background of its own hue. On the hero card specifically, the pill's background switches to a near-opaque **white** chip (the inverse of a dark-theme "dark chip on bright field" trick) so the pill's own dark status colors stay legible against the darker hero gradient underneath.

### Weekly Agenda
- **Desktop grid:** light cells (`border-subtle` hairlines, white headers), today's column header highlighted with the soft brand tint and dark-green text (never a solid saturated fill — reserved for the hero card only), filled slots as soft status-tinted blocks with time/patient/doctor.
- **Mobile day-strip:** horizontal row of 7 day buttons (weekday + date); selected day fills solid brand green with ink text, today (if not selected) gets a brand-colored outline. Below it, that day's appointments list as simple rows (time, patient, doctor, status pill) — built entirely from the week's already-loaded data, no extra requests.

## Do's and Don'ts

### Do:
- **Do** use flat brand green (`#12A150`/`#0F9A48`) with **ink** text for buttons, active chips, and the today marker.
- **Do** reserve the darker hero gradient (`#0A6E36`→`#0D8140`) for the "próximo atendimento" card only, since it's the one surface dark enough to carry white text at AA.
- **Do** pair every status indicator with an icon and a text label, never color alone, and never a colored border as a stand-in for the pill.
- **Do** keep all interactive targets ≥44px and give every focusable element a visible `:focus-visible` ring.
- **Do** verify a new color pairing's contrast before shipping it — several of this system's values were darkened or swapped from their literal brief values specifically because the obvious choice (e.g. white text on `#12A150`) measured below AA.

### Don't:
- **Don't** put white or light-gray text directly on the flat brand green (`#12A150`/`#0F9A48`) — it fails AA; that's what the separate hero gradient is for.
- **Don't** introduce a second saturated accent color; status hues stay muted/desaturated and confined to badges and schedule blocks.
- **Don't** use sharp (0px) corners anywhere; the system has no "square" primitive.
- **Don't** add a colored `border-left`/`border-right` to cards or list rows as a status indicator — the status pill (icon + label + color) is the one signifier.
- **Don't** set `data-theme="dark"` or wire a `prefers-color-scheme` media query anywhere — the dark tokens are dormant by design; reactivating dark mode is a product decision, not a CSS one.
- **Don't** animate anything when `prefers-reduced-motion: reduce` is set — the skeleton shimmer and all transitions must degrade to an instant/static state.
