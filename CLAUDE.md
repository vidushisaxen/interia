@AGENTS.md
@template-guide.md

# Haven Spaces: project rules

These rules come from `template-guide.md` and apply to every change in this repo. Follow them without being asked.

## Template

This repo is the **Haven Spaces** template. Prefix: `haven`. Everything below applies to the whole app in `src/app/(main)/` and `src/components/`.

## 1. Folder structure

```
src/app/(main)/
  page.tsx                metadata, fonts, section order
  layout.tsx
  haven-styles.css      the only stylesheet (sizes, tokens, scoped base)
src/assets/               images + og image, imported statically
src/components/
  Header.tsx, Hero.tsx, ... one file per section
  Animations/             gsapAnim.tsx (shared reveals), reducedMotion.tsx, eases.ts
  Buttons/                icons.tsx and template-specific buttons
  Canvas/                 custom WebGL / canvas work (glass sculpture, shaders, ASCII field)
  effects/<name>/index.tsx  effects taken from hyperiux-pro-components
  Forms/                  forms, fields, validation
  LenisSmoothScroll.tsx, ScrollTopOnLoad.tsx
```

- Videos and other large media go in `public/` and are referenced by URL. Next can't import `.mp4` like an image.
- If you copy original HTML in for reference, delete it once the port is done.

### Effects from hyperiux-pro-components

- Every effect taken from the registry (`hyperiux-pro-components/registry/effects/<category>/<name>`) lives in `src/components/effects/<name>/index.tsx`, named exactly as in the registry (same pattern as vantage).
- The effect owns the motion and mechanics and is driven by props. The section passes in content and classes and imports the effect directly (`import ArrowFillButton from "./effects/arrow-fill-button"`).
- Shared reveals (`FadeUp`, `LineReveal`, `RevealGroup`, `LineDraw`, counters) stay in `Animations/gsapAnim.tsx`, not in `effects/`.
- Custom effects that don't come from the registry go in `Canvas/` (or another topic folder), not in `effects/`.
- Don't pass ref-reading functions into render props (the React Compiler lint rejects it). Pass a component type instead (`card={ProblemCard}`, `content={TrialContent}`).

## 2. Header line and comments

- Every `.tsx`, `.ts` and `.css` file starts with `// Built using Hyperiux Vault: https://vault.hyperiux.com` (in CSS: `/* ... */`).
- No other comments in component code.

## 3. `page.tsx`

- Import the stylesheet first: `import "./haven-styles.css";`
- Fonts come from `next/font/google`, exposed as CSS variables (`variable: "--font-haven-head"`). If TypeScript says a font isn't exported, add it to `src/types/declarations.d.ts`.
- `metadata` has `title`, `description`, `alternates.canonical` (`https://vault.hyperiux.com/templates/haven-spaces`), `openGraph` and `twitter` using the og image from `src/assets/`.
- Above-the-fold sections (header, hero) are normal imports. Everything below the fold uses `dynamic(() => import(...))`.
- Everything sits in one element carrying the scope class and font variables: `<div className={`haven-page relative ${headFont.variable} ...`}>`.

## 4. Naming

- The prefix is `haven`. Use it for the scope class (`.haven-page`), CSS variables (`--haven-accent`), utility classes (`.bg-haven-accent`), data attributes (`data-haven-inert`) and font variables.
- When porting outside code, rename everything. No class names, variables, keyframes or props from the original author survive.

## 5. The stylesheet

`haven-styles.css` is one file, scoped to `.haven-page` and unlayered. It holds only what Tailwind can't express cleanly:

1. Tokens on `.haven-page` (colours, gradients).
2. Base font family for `.haven-page *`, heading font for `h1, h2, h3` and their children.
3. The text-size scale (section 6).
4. Container and section spacing classes (`.haven-container`, `.haven-section`).
5. Things Tailwind truly can't do (mask-image line class for SplitText, scrollbar, selection).

Three media blocks: base (desktop), `@media (max-width: 1025px)` (tablet), `@media (max-width: 768px)` (mobile).

### Cascade gotcha

The stylesheet is **unlayered**, so it always beats Tailwind utilities, whatever the specificity.

- Never put a Tailwind `text-[...]`, `leading-*` or `tracking-*` utility on an `h1`/`h2` to change something the stylesheet sets. Change the stylesheet instead.
- Don't use a custom colour class (`text-haven-ink`) on an element that also needs a `hover:` colour. Use arbitrary hex for both states: `text-[#0a0a0a] hover:text-[#fafafa]`.
- Scoped `.haven-page h1/h2/h3` rules must set font family, weight and line-height so they win over any global heading rule.

## 6. Text sizes

Eight sizes only, named by their px size at a 1920px-wide screen (`text-28` is about 28px at 1920, 1.4vw).

| Role | Class | Where |
|---|---|---|
| Display | `h1` element / `text-128` | Hero headline, menu links, intro label |
| Section heading | `h2` element / `text-64` | Section titles, statements, quotes, big numbers |
| Sub-heading | `text-40` | Large card titles, short statements between `h2` and `h3` |
| Card title | `text-30` | Every `h3`, captions, emails |
| Paragraph | `text-28` | All body copy under `h1`/`h2`, descriptions |
| Small paragraph | `text-24` | Captions and secondary copy next to a `text-28` paragraph |
| Link / button | `text-22` | Header items, buttons, footer and menu links, inputs |
| Small | `text-14` | Meta, dates, labels, counts, bottom bar |

- `h1` and `h2` get their size from the element rule, so they take no size class. Every `h3` gets its size class directly: `<h3 className="text-30">`.
- A non-heading element in a heading role uses the alias class (`<p className="text-64">`).
- Each size is defined once per breakpoint in the stylesheet, with letter-spacing in `vw` next to it for the big sizes.
- No one-off sizes (`text-[3.2vw]`). No Tailwind fixed sizes (`text-sm`, `text-lg`) or `rem`.

## 7. Units

| What | Use | Don't use |
|---|---|---|
| Widths | `vw` or `%`: `w-[25vw]`, `w-[46%]` | `max-w-*` of any kind, `ch` |
| Padding | `px` always in `vw`; `py` in `%` for sections, `vh` for blocks, `vw` for links and cards (section 9 scale) | `rem`, `px`, `em` |
| Heights | `vh`: `h-[5.8vh]`, `h-screen`, `h-[400vh]` | heights in `vw` |
| Circles and square controls | `h-[5vh] aspect-square` | `size-[3.1vw]` next to vh-tall buttons |
| Corners | `rounded-xs` … `rounded-3xl`, `rounded-full`, `rounded-t-3xl` | `rounded-[1vw]` |
| Gaps between siblings | Tailwind scale: `gap-6`, `gap-x-8`, `space-y-4`, with `max-lg:`/`max-md:` overrides | `gap-[1.5vw]` (only when a gap must equal a vw padding, e.g. a seamless marquee) |
| Hairlines and thin bars | `h-px`, `h-0.5`, `border` | `h-[0.1vw]` |
| Text | the size classes (section 6) | `text-[3vw]`, `text-sm`, `em` |
| Things inside text (inline images, button icons) | `vw` worked out from that text's size at each breakpoint | `em`, **never** |

- `min()` with viewport units is fine: `w-[min(100%,54vh)]`.
- No `calc(100vw - 24px)` or other viewport-minus-pixel calcs.
- Never more than one decimal: `1.55vw` → `1.6vw`.
- vw to vh: work it out for a reference screen per breakpoint (desktop 1440×900, tablet 820×1180, mobile 390×844). A 52px button is `h-[5.8vh] max-lg:h-[4.2vh] max-md:h-[6.4vh]`.
- Text block widths: `<p className="w-[28%] text-28 max-lg:w-[70%] max-md:w-full">`, never `max-w-[34ch]`.

## 8. Responsive

- Desktop first: the desktop class, then `max-lg:` (tablet, below 1025px), then `max-md:` (mobile, below 768px).
- Never use `sm:`, `md:`, `lg:`, `xl:` or `min-[...]:`.
- Every vw/vh value usually needs tablet and mobile overrides: `px-[2vw] max-lg:px-[4vw] max-md:px-[5vw]`.
- Drop an override that repeats the value above it (`rounded-2xl max-lg:rounded-2xl` → `rounded-2xl`).
- In JS, use `gsap.matchMedia()` with `(min-width: 1026px)` / `(max-width: 1025px)`.

## 9. Layout and spacing

- Plain flex (`flex`, `flex-col`, `justify-between`, `w-[30%]`, `gap-6`). Grid for real grids (`grid grid-cols-4`).
- **No one-sided spacing**: no `pt-`, `pb-`, `pl-`, `pr-`, `mt-`, `mb-`, `ml-`, `mr-` or any margin. Use `gap-*` / `space-y-*` / `space-x-*` between siblings and symmetric `px-[..vw]` / `py-[..vw]` for padding.
- **Never use a header-clearing spacer** (an empty `aria-hidden` div sized in `vh` to push content below the fixed header). Get the room from the section's symmetric `py-*` and `gap-*`.
- Uneven padding in a pill (label left, icon circle right): give the pill a small even `px` and the label its own `px`.
- Hairlines between blocks: `<div className="h-px w-full bg-black/10" />` inside a flex column, not `border-t` + `pt`.
- Section padding comes from `haven-container` and `haven-section`.
- One exception in the stylesheet: the SplitText mask line class uses `padding-block` with an equal negative `margin-block` so masked letters don't clip.
- No `style` prop unless the value is computed at runtime in JS.

### Padding scale

Desktop / tablet / mobile. Don't invent in-between values; pick the closest role.

| Role | `px` | `py` |
|---|---|---|
| Page container (`.haven-container`) | `5vw` / `6vw` / `7vw` (in the stylesheet) | none |
| Section | none (container handles it) | `py-[8%] max-lg:py-[12%] max-md:py-[15%]` |
| Block inside a section (hero copy, footer columns, page intros) | none | `py-[8vh] max-lg:py-[5vh] max-md:py-[4vh]` |
| Fixed header bar | container value | `py-[3vh] max-md:py-[1.6vh]` |
| Card or panel | `px-[2vw] max-lg:px-[4vw] max-md:px-[5vw]` | `py-[2vw] max-lg:py-[4vw] max-md:py-[5vw]` |
| Button (height-driven, no `py`) | `px-[0.9vw] max-lg:px-[1.8vw] max-md:px-[3vw]` | `h-[4.4vh] max-lg:h-[3.4vh] max-md:h-[4.4vh]` |
| Text link (header, footer, menu) | `px-[0.4vw] max-lg:px-[0.8vw] max-md:px-[1.2vw]` | `py-[0.2vw] max-lg:py-[0.4vw] max-md:py-[0.6vw]` |

## 10. Colour

- Tokens live on `.haven-page` as CSS variables, with a few utility classes (`.bg-haven-accent`, `.text-haven-muted`) for elements without hover changes.
- Anything with a hover/focus colour change uses arbitrary hex (`bg-[#e8473b]`).
- No dark-mode variants (`dark:`, `prefers-color-scheme`). One look.
- No shadows unless the source design has them.

## 11. Images and video

- Import images statically from `src/assets/`. Put the size on the wrapper and make the image fill it:

```tsx
<div className="aspect-[4/5] w-full overflow-hidden rounded-2xl">
  <Image src={work} alt="…" sizes="25vw" className="h-full w-full object-cover" />
</div>
```

- The hero image gets `loading="eager"` and `fetchPriority="high"`.
- Videos: a small `AutoVideo` component that loads on first view, plays only while visible, and doesn't autoplay under reduced motion.

## 12. Animation

- **GSAP for all motion** (`gsap`, `@gsap/react` `useGSAP`, `ScrollTrigger`, `SplitText`), with Lenis for smooth scroll (`LenisSmoothScroll.tsx`, driven from `gsap.ticker`). Tailwind `transition-*` only for small colour hovers.
- Never use GSAP `pin`. Use a tall relative outer section (`h-[400vh]` or a JS-set height) with a `sticky top-0 h-screen` inner container, driven by a scrubbed `ScrollTrigger` on the outer section (`start: "top top", end: "bottom bottom"`).
- Shared reveals live in `Animations/gsapAnim.tsx`. Reuse them; don't re-implement per section.
- Every animation checks `prefersReducedMotion()` and shows the final state instead.
- **Don't combine Tailwind transform utilities with GSAP transforms on the same element.** Tailwind v4's `translate-*`, `scale-*` and `rotate-*` write to the separate CSS `translate`/`scale`/`rotate` properties, which stack with GSAP's `transform`. Let GSAP set the starting state, or use an arbitrary transform (`[transform:scaleX(0)]`) GSAP can take over.
- An intro overlay (curtain, pixel transition) must be in the server HTML so the page never flashes through, with a `<noscript>` rule that hides it.

## 13. Accessibility

- Real `button`s for actions, `a` for navigation, `aria-expanded`/`aria-controls` on menu toggles, `aria-label` on icon-only buttons.
- Mark decorative duplicates `aria-hidden` (rolled button labels, marquee copies).
- When a full-screen menu is open, make the page behind it `inert` and stop Lenis.

## 14. Content

- Never use em dashes anywhere in content: headings, body copy, captions, labels, alt text, metadata or code comments. Use a comma, full stop, colon or parentheses. Hyphens in compound words are fine.
- Never use eyebrow text (a small, uppercase or tracked label above a section heading). A section starts with its heading.

## 15. Checklist before handing over

- [ ] `npx tsc --noEmit -p tsconfig.json` shows no errors.
- [ ] `npx eslint src/components "src/app/(main)"` is clean.
- [ ] No `max-w-`, no `ch`, no `em`, no `px`/`rem` sizing, no values with two decimals.
- [ ] Widths and padding in `vw`/`%`, heights in `vh`, corners and gaps from Tailwind's scale.
- [ ] No `pt-`/`pb-`/`pl-`/`pr-`, no margins: spacing comes from `gap-*`, `space-y-*` or symmetric `px`/`py`.
- [ ] Only the text-size classes are used, and every `h3` has its size class.
- [ ] No `sm:`/`md:`/`lg:` prefixes, no `dark:`, no GSAP `pin`.
- [ ] Screenshots at 1440, 820 and 390 wide look right, with no horizontal overflow.
- [ ] Reduced motion shows every section in its final state.
- [ ] No em dashes in any content, and no eyebrow text above section headings.
- [ ] No version bumps or changelog edits unless asked.
