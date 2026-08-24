# Devansh Mishra Motion Portfolio — Build Notes

## Creative direction

The site uses an acid-yellow, near-black editorial system with oversized typography, irregular color plates, isolated technology objects, and scroll-directed scene changes. The reference video informed the pacing and confidence of the motion; the layouts, writing, project artwork, and interaction details are original and tied to Devansh Mishra’s CV.

The experience is intentionally hybrid. Content and artwork remain normal HTML, CSS, and PNG so they stay sharp and responsive. GSAP handles the staged, scroll-linked movement. This gives the page a cinematic feel without putting the whole website inside a heavy canvas.

## Current tools

- **React 19 + TypeScript** — page structure, CV-backed project data, case-study panels, contact state, and form behavior.
- **Vinext + Vite** — application bundling and Cloudflare-compatible rendering.
- **GSAP 3 + ScrollTrigger** — the loader, pinned hero scenes, journey zoom sequence, scroll reveals, project entrances, parallax, and the contact transition.
- **Lenis** — smooth momentum scrolling, synchronized with GSAP’s ticker.
- **CSS** — responsive editorial layout, clipping masks, dot fields, technical diagrams, orbital details, ticker motion, hover states, and reduced-motion fallbacks.
- **Original transparent PNG artwork** — three purpose-made 3D technology objects representing BreachWise, LifeSync, and the College Gym Management Platform.
- **Archivo Variable + Caveat Variable** — the heavy grotesk system and handwritten accent type.
- **Cloudflare D1 + Drizzle ORM** — durable storage for meeting requests and reviews submitted through the contact form.

## How the motion is made

### Loader and first reveal

The loader is a CSS grid of animated cells. GSAP scales and rotates the cells in a center-out wave, collapses them, then removes the entire layer with a clip-path wipe. The name reveal begins before that wipe completely finishes, so the transition has no dead frame.

### Scroll-staged hero

The hero is pinned while one GSAP timeline maps page scroll to a series of distinct scenes. The first name exits, the surname enters and leaves, the full-stack pipeline assembles node by node, and the central device arrives only after the diagram has had its own frame. Elements are deliberately removed before the next scene so they do not overlap.

### Full-stack pipeline

The React, server, and database cards are HTML elements. Connector lines grow with `scaleX`; packets move along those lines with small transforms; the terminal is revealed with an inset clip-path; and its code lines expand from the left. Because it is DOM-based, the diagram remains crisp at every screen size.

### Education and development journey

The journey uses five stacked cards inside a pinned frame. Scroll progress controls each card’s opacity, depth, scale, tilt, blur, and exit. Only one chapter is fully readable at a time: school, Class XII, Bennett University, the build phase, and the next internship/placement chapter. A progress line and step labels update through the same timeline.

### Project showcase

The three cards are generated from one typed project data array based on the CV:

1. **BreachWise** — AI incident-response training with adaptive scoring, history, an Intel Library, and NIST/MITRE-aligned scenarios.
2. **LifeSync** — daily-routine analysis, posture/diet/lifestyle guidance, reminders, and engagement motion.
3. **College Gym Management Platform** — queue flow, workout planning, student participation, and facility-usage features.

Each card combines a transparent PNG object with an animated CSS orbit, status signal, irregular plate, and gentle GSAP float. Clicking a card opens a semantic case-study panel containing the CV description, delivered features, and verified tools. No repository or live-project URL is invented.

### Contact transition and backend

The reach-out section pins on larger screens. A near-black layer rises over yellow while the two headline words enter from opposite sides. Meeting and review forms POST to `/api/contact`. The server validates the request, checks a hidden honeypot, and stores accepted records in the `portfolio_messages` D1 table.

## Responsive and performance decisions

- Major motion uses transforms and opacity, minimizing layout recalculation.
- ScrollTrigger measurements refresh after fonts and layout settle.
- PNG art is lazy-loaded outside the hero.
- Smooth-wheel momentum is disabled on compact/touch layouts where native scrolling feels better.
- Mobile switches the project row to a readable vertical sequence.
- The custom cursor is hidden on touch devices.
- `prefers-reduced-motion` disables repeating CSS motion and turns pinned sequences into stable fallbacks.
- Generated artwork contains no baked-in text; all titles remain accessible HTML.

## Content source

Project names, education, experience, technologies, and professional claims come from `Devansh_Mishra_Technology_Intern_CV.pdf`. The only intentionally unconnected items are individual repository/live-demo links because the CV does not list verified URLs for each project.
