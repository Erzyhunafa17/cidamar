# MindMarket — Style Reference
> Warm storybook on cream paper — a friendly editorial canvas where oversized Inter headlines and paper-cut characters share a sunlit, sticker-soft surface.

**Theme:** light

Source measurements are normalized; roles and recommendations are interpreted. Font summary lists are independent, not paired by position. HTML examples are reconstructions, not source components.

MindMarket is a warm, illustrated editorial system built on a cream-paper canvas rather than stark white, with massive Inter display type that fills the frame and a single vivid green accent that anchors the brand across navigation strokes, borders, and hero fills. The visual language borrows from paper-cut storybook illustration — flat, vibrant character art sits directly on warm neutral backgrounds, never on photographic or gradient surfaces, and the UI chrome is deliberately minimal so the artwork leads. Components are generously rounded (50–64px radii on cards and nav), creating a soft, sticker-like quality. Color behaves decoratively rather than functionally: the green, blue, red, and yellow accents repeat across illustrations and are used sparingly in UI as borders, icon accents, and surface highlights rather than as a strict semantic state system. The overall density is breathable and confident — few elements per screen, enormous type, wide margins, and the cream canvas doing the structural work that shadow systems usually handle in product UIs.

## Tokens — Colors

| Name | Value | Token | Role |
|------|-------|-------|------|
| Fresh Grass | `#8ed462` | `--color-fresh-grass` | Primary brand accent — navigation strokes, card borders, decorative highlights. The single chromatic anchor that ties the cream canvas to the brand identity |
| Cream Paper | `#f5f1e4` | `--color-cream-paper` | Dominant page background and soft card surface. Warm off-white that replaces stark white as the structural canvas |
| Ink Black | `#2c2e2a` | `--color-ink-black` | Primary text, icons, nav borders, and the dominant hairline border color. Warm near-black that reads softer than pure black on cream |
| Pure White | `#ffffff` | `--color-pure-white` | Elevated card surfaces, floating nav background, text on dark illustrations. The highest surface level in the stack |
| Sandstone | `#e0dbce` | `--color-sandstone` | Secondary surface tone for inset or recessed card states. Slightly deeper than the cream canvas |
| Stone Gray | `#80827f` | `--color-stone-gray` | Muted body text and secondary link borders. The only true mid-gray for de-emphasized content |
| Hairline Mist | `#d5d5d4` | `--color-hairline-mist` | Subtle nav dividers and low-contrast borders. Barely visible structural lines |
| Pure Ink | `#000000` | `--color-pure-ink` | Icon fills, body text on light surfaces, and high-contrast borders. Used where maximum contrast is needed against the cream |
| Sky Pop | `#2ba0ff` | `--color-sky-pop` | Decorative illustration accent and card border accent. Vivid blue used illustratively and as a small functional punctuation in icon dots |
| Coral Pop | `#ff705d` | `--color-coral-pop` | Red outline accent for tags, dividers, and focused UI edges. Do not promote it to the primary CTA color |
| Sunshine Pop | `#f5e211` | `--color-sunshine-pop` | Footer highlight and decorative illustration accent. Bright yellow used sparingly for warmth and playfulness |

## Tokens — Typography

### Inter
- **Substitute:** Inter (Google Fonts) — no substitute needed
- **Weights:** 400, 500
- **Sizes:** 9px, 15px, 17px, 18px, 20px, 30px, 53px, 81px, 140px, 144px
- **Line height:** 0.95–2.00 (display 0.95–1.20, body 1.50)
- **Letter spacing:** -0.06em at 81px and above, -0.04em at 53px, normal at body sizes
- **Role:** Single-family system: Inter carries everything from 9px micro-labels to 144px display headlines. The use of Inter at display scale is a signature choice.

### Type Scale

| Role | Family | Weight | Size | Line Height | Letter Spacing | Token |
|------|--------|--------|------|-------------|----------------|-------|
| body-sm | — | — | 15px | 1.5 | — | `--text-body-sm` |
| body-lg | — | — | 18px | 1.5 | — | `--text-body-lg` |
| subheading | — | — | 20px | 1.25 | — | `--text-subheading` |
| heading-sm | — | — | 30px | 1.2 | — | `--text-heading-sm` |
| heading | — | — | 53px | 1.15 | -2.12px | `--text-heading` |
| heading-lg | — | — | 81px | 1.2 | -4.86px | `--text-heading-lg` |
| display | — | — | 140px | 0.95 | -8.4px | `--text-display` |
| display-lg | — | — | 144px | 0.95 | -8.64px | `--text-display-lg` |

## Tokens — Spacing & Shapes

**Base unit:** 4px

**Density:** comfortable

### Spacing Scale

| Name | Value | Token |
|------|-------|-------|
| 4 | 4px | `--spacing-4` |
| 20 | 20px | `--spacing-20` |
| 60 | 60px | `--spacing-60` |
| 136 | 136px | `--spacing-136` |
| 216 | 216px | `--spacing-216` |

### Border Radius

| Element | Value |
|---------|-------|
| nav | 50px |
| cards | 50px |
| small | 10px |
| buttons | 50px |
| illustration-containers | 63.75px |

### Layout

- **Page max-width:** 1200px
- **Section gap:** 80-120px
- **Card padding:** 20-21px
- **Element gap:** 17-21px

## Components

### Floating Pill Navigation Bar
White (#ffffff) pill-shaped bar with 50px border-radius, floating over the cream canvas with generous margins.

### Primary CTA Button
Light/white pill button with 50px radius, 15px Inter 500 #2c2e2a text reading 'Get a quote'. Features a small circular icon accent (blue #2ba0ff).

### Content Card
White (#ffffff) surface with 50–64px border-radius, 21px internal padding.

### Hero Display Block
Full-bleed cream canvas section. Headline at 140–144px Inter weight 500, #2c2e2a, letter-spacing -0.06em, line-height 0.95.

### Footer Accent Block
#f5e211 yellow fill section at the page bottom.
