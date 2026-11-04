---
version: 1
slug: "src"
primary_target: "src"
related_targets: []
---

## Direction contract

THESIS: the panel stops looking like a separate, lighter product and becomes the staff-facing surface of "Vida Saudável" — the category default this refuses is "redo the dashboard in a generic dark-admin theme"; instead it inherits the mobile app's actual brand system (near-black ground, saturated signal-green, pill/rounded-20-28 forms, geometric-sans headings) atom for atom.

OWN-WORLD: ground `--bg-page` #0B0D0C → #111412 (radial, very subtle); surfaces `--surface-1` #171A18, `--surface-2` #1E221F; hairline borders `rgba(255,255,255,.08-.12)`; brand green `--brand-500` #16B45B / `--brand-600` #12A150, used at page scale (Committed strategy: primary actions, active chips/segmented state, hero gradient, focus ring, status-confirmado) not as a scattered accent; text `--text-primary` #F2F5F3, `--text-secondary` #9AA59E; radii `--radius-card` 20-28px, `--radius-pill` 999px; type: Poppins 600/700 for headings and labels, system sans fallback for body; icons: small authored inline-SVG set (calendar, clock, chevron, eye/eye-off, user, check, x), one stroke weight, sitting inside translucent dark-green circular tiles.

STORY: staff open the panel and immediately recognize it as the same product as the app patients use — dark, calm, green-branded — then scan specialty chips, the list/weekly toggle, and the next-appointment hero card to find and act on today's schedule without hunting for contrast or guessing a status from color alone.

FIRST VIEWPORT: sticky dark header (brand mark, "Painel Clínica" wordmark + section label, avatar) over the filter row (pill specialty chips, dark segmented Lista/Agenda control, graphite status/date fields, solid-green "Buscar" + ghost "Limpar") over either the weekly grid (dark cells, today's column-header lit green, filled slots as green status blocks with time/patient/doctor) or the card list (dark rounded cards styled like the mobile app's "Próximo atendimento" card), with the "próximo atendimento" hero kept as a distinct green-gradient card.

FORM: brief-pinned direction, not a concept-seed roll — out of scope per new-work.md ("never run the script for... a precisely specified narrow request"). Source of the pinned world: the user's literal design brief, itself derived from the existing "Vida Saudável" mobile app (hex values, shapes, component list given verbatim). No challengers, no re-roll.

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance.
