# The activity card, without the tells

Throwaway design work, not shipped UI. Delete this file with the pad
(`src/views/DesignView.vue` + its route in `src/router/index.ts`) once a
direction is picked.

Comes from issue #150, *"Activity card too AI like"*. The card in question is
`src/components/ui/TileCard.vue` as used by `UpcomingActivitiesCards.vue` on the
homepage and by `OverviewActivities.vue` on `/activities`.

## 1. Research: what actually reads as "AI"

Four sources, each answering a different question.

### 1.1 Why it happens — Anthropic, *Improving frontend design through Skills*

The mechanism is **distributional convergence**: during sampling a model predicts
tokens from statistical patterns in its training data, and "safe design choices —
those that work universally and offend no one — dominate web training data.
Without direction, Claude samples from this high-probability center." Their named
symptoms are Inter, purple gradients on white, and minimal animation, and they
warn about the second-order failure: told to avoid those, models **converge again
on a new local maximum** (they name Space Grotesk explicitly).

The transferable technique from that post is not a ban list, it is the altitude
of the instruction: type should use **extremes** (weights 100/200 against 800/900,
"size jumps of 3×+, not 1.5×"), because the averaged answer picks 400 against 600
and a 1.4× jump. That is a description of most card designs, including this one.

<https://claude.com/blog/improving-frontend-design-through-skills>

### 1.2 Which tells people name — Styles Gallery, reading a 3.2M-post corpus

Someone scanned **3.2 million Reddit posts** across 47 subreddits, isolated
**46,971 on-topic posts** and harvested **3,033 comments from 125 threads** about
why AI-built sites look identical. "They all look the same" appears in ~**13%**
of on-topic posts, and the volume of that conversation grew ~**150×** between
2023 and 2024. Tells ranked by share of comments:

| share | tell | cause |
|---|---|---|
| 2.5% | the default kit (`rounded-lg` cards, `bg-muted/20` bands, `h-16` bar) | shadcn/Tailwind defaults |
| 2.3% | **one particular indigo-violet** | Tailwind `indigo-500` |
| 2.0% | gradient headline / violet page gradient | same |
| 1.1% | every section fades and slides in | scroll-triggered entrance defaults |
| 0.8% | **one radius on everything** | a single `--radius` |
| 0.7% | glow rings, blurred everything | effects treated as decoration |
| 0.5% | emoji as icons | — |
| 0.4% | Inter/Geist on everything | scaffold default |
| 0.4% | symmetric hero over three equal cards | layout default |

Two things matter more than the ranking. **The tells move** — what replaces them
next is cream backgrounds, a display serif and tiny grey text. And the fixes that
survive are structural: a **radius ladder** (small corners on small things) or a
deliberate extreme, a palette where an accent is genuinely small, and layout
density rather than a repaint, because "'AI-built' is partly a spacing signature."

<https://styles.gallery/blog/why-ai-built-sites-look-the-same>

### 1.3 The review test — Ralabs, *AI design slop*

The sharpest formulation of the problem, and the one that applies to a card
rather than a landing page:

> AI design slop is interface work that is **competent and interchangeable.
> Nothing is broken, and nothing was chosen.**

The durable diagnostic is not "does this look generated" but *"which choices here
are specific to this product, and which would work unchanged on someone else's?"*
Four failure modes are named that this card can be measured against:

- **Containers standing in for decisions.** "Generated layouts reach for
  containers instead, because a border is easier to add than a decision about
  what matters. Cards inside cards. A bordered box holding one line of supporting
  text that didn't need a box. Each container was added to make something feel
  deliberate, and the accumulated effect is that nothing is emphasised, because
  everything is."
- **Everything in one colour register.** "If four colours are competing, none of
  them can carry a meaning." A working palette is mostly neutral with a genuinely
  small amount of accent *doing the pointing*.
- **Decoration that carries no information.** "An icon in a rounded tile … above
  every heading. A gradient running through a headline. A drop shadow under a
  button that wasn't floating above anything." The test is whether the effect
  encodes something.
- **Data doesn't behave.** "Every generated interface is designed around content
  of a convenient length. Real names run to forty characters. A layout that only
  holds together at demo dimensions isn't finished, it's staged."

<https://ralabs.org/blog/ai-design-slop-how-to-review-ai-generated-interfaces/>

### 1.4 The parody checklist, and its expiry date — Slopstrap

Mike Lacher's Slopstrap is a CSS framework built to look LLM-generated
("scientifically averaged from 400,000+ Tailwind SaaS landing pages"), and its
source is a checklist with class names and hex codes: gradient text, indigo
accents, the dark void with blurred orbs, glassmorphism cards, emoji icons,
`rounded-2xl` everywhere, one italic serif word in a sans headline, fat coloured
left borders, fake proof (status dots, eyebrow pills, invented stats).

The comments on its HN thread are the reason to cite it rather than just use it:
**the list is already last season.** "This isn't even it, this is like the
previous incarnation" — the current default is "small type sizing, serif fonts and
beige/tan colour schemes." So following the list lands you on the newer slop.
What survives is the closing advice: gradients and rounded corners are fine on
their own, they become a tell when they are on the page because nobody chose
anything, and "what protects you is real content and a few design decisions you
can explain."

<https://dev.to/alanwest/how-to-make-your-website-not-look-ai-generated-9-tells-from-slopstraps-css-3a73>

## 2. What this card is actually guilty of

Read off `TileCard.vue` at current `main`:

1. **Two tracked all-caps strings on one line** — the date at `1.2rem`/`0.1em`
   and the type label at `0.95rem`/`0.12em`/`700`. This is the #1 typography tell
   in every source above, and here it appears twice, side by side.
2. **All five type steps within 2× of each other** — `0.95` label, `1.2` date,
   `1.35` teaser, `1.9` title — on weights 400/500/600/700/800. The averaged
   scale the Anthropic post describes, not a chosen one.
3. **One radius on every surface** — `main.css` pins 4px globally (that was a
   deliberate earlier choice; it is now the 0.8% tell).
4. **Three competing accents** — the coloured type word, the blue "Read more",
   and a type-coloured hover glow. When everything is tinted, "Social" carries no
   meaning.
5. **A `→` glued to the footer link on every card**, and a `Read more` on cards
   that are already entirely clickable.
6. **Uniform tiles** — identical height, crop and rhythm; nothing leads, so the
   grid is a list.

## 3. Principles used on the pad

| | principle | source |
|---|---|---|
| **P1** | Nothing chosen is the tell. A choice must be defensible as *this product's*, not any product's. | Ralabs |
| **P2** | One loud element, everything else quiet — and get loud with **extremes**: 3× size steps, 200 against 800, not 400 against 600. | Anthropic, Ralabs |
| **P3** | At most **one** tracked all-caps string per card, and only if it encodes something. | Styles Gallery, Slopstrap |
| **P4** | A border, rule or pill around a single word is a substitute for a decision about spacing. | Ralabs |
| **P5** | One accent doing the pointing; the rest of the card is neutral. | Ralabs |
| **P6** | Radius is a ladder or a deliberate extreme — never one value on everything. | Styles Gallery |
| **P7** | Decoration must carry information. Arrows, glows and lifts only where they say something. | Ralabs, Slopstrap |
| **P8** | Design for real data: a 60-character title, a missing photo, no type label at all. | Ralabs |
| **P9** | Don't dodge a cliché into the next one (cream + display serif + tiny grey text). | Slopstrap/HN, Anthropic |

## 4. The six cards on the pad

Each option changes **one** axis, so the axes stay separable afterwards. All six
use the same real staging content, the same Inter, the same card width, and no
option relies on a gradient, a serif, a beige ground or an animation.

| | name | the decision | principles |
|---|---|---|---|
| **A** | One voice | Both caps strings replaced by one sentence-case line (`29 Nov, 13:00` + type in its colour). The title becomes the only loud thing (2.6rem/800 against 1.25rem/400 meta) and the arrow is gone. | P2 P3 P5 P7 |
| **B** | Weigh it, don't track it | Caps stay, letter-spacing goes. The **day** becomes the loud element as a light oversized numeral (3.4rem/200) while the type label is heavy (1.15rem/800) and the title is deliberately quiet (1.9rem/600). | P2 P3 P5 |
| **C** | Programme line | The card becomes an agenda entry: oversized day numeral in a left gutter, month and start time under it, the type as a plain coloured word. No box — entries are separated by a hairline. | P2 P3 P4 P6 |
| **D** | Facts first | The practical facts (when, where, type) are set as a small two-column definition list at 700 weight, and the title sits under them. The card answers "what is this and when" before it advertises. | P1 P2 P4 |
| **E** | No card | The box, the radius and the footer link are removed entirely: a ruled row with a square photo, the date as a tabular column and a one-line teaser. The grid reads as a printed programme. | P4 P6 P8 |
| **F** | Lead and rest | Hierarchy between cards instead of inside them: the first activity is a lead (16:9 photo, 2.8rem title, full teaser) and the others are quiet rows with no photo. | P2 P8 |

## 5. Next step

Pick a letter (or a mix — the axes are independent: A's meta line works with C's
gutter, F's lead can sit on any of them). Then:

1. Re-set the date/label block and the footer in `TileCard.vue` to the pick.
2. Verify on the homepage and `/activities` at 1920 and 390, light and dark, en
   and nl, with a long title and a missing photo (P8).
3. Fix the dead `:global(.dark) .type-label` rule found in the previous pass —
   `color-mix(in srgb, var(--type) 62%, var(--p-text-color))` instead of a `.dark`
   selector, which this build drops from scoped styles.
4. Delete `DesignView.vue`, its route entry, and this file.

---

# Round 2 — the contents, at homepage size

Round 1 settled the chrome. Round 2 keeps it (hairline box, 4px, no glow, no arrow) and draws every card at the
**homepage geometry** — a 421×131 row, photo at 33% on the right — then varies **only what the card says**.

## Locked so far (from the review of round 1)

| decision | note |
| --- | --- |
| **Title above the facts**, not below | the title is the link label; facts support it |
| **Teaser = `promo`, else description** | the backend already documents `promoEn/promoNl` as "let it be a teaser, so people would want to read your full activity description". 7 of 16 staging activities have none, so the description is the fallback |
| **One-line variant shows the start time only** | the end time belongs to the detail page |
| chrome | hairline border, 4px radius, no hover glow, no arrow, no box-shadow |

## Research for the content question

- **University of Leeds event card** (`designsystem.leeds.ac.uk/components/detail/uol-event-cards--default.html`) —
  the whole card is *title + start date (+ end date, collapsed) + time range*, and nothing else: no location, no
  teaser, no image. Time is omitted entirely when the start is 00:00, and a same-day range prints as
  `11:00am – 4:30pm`. The lesson is not "copy it" but "a date is allowed to be the only non-title content".
- **NN/g, Information Scent** (`nngroup.com/articles/information-scent`) — a representation ("what the user sees")
  is judged on two questions: *will this page answer me* and *how long will it take*. The accompanying snippet's job
  is to "convey the gist … and add detail to the link label", and labels like *Learn more* have **low** scent. For a
  card that is itself a link, a footer saying "Read more" adds no scent; facts do.
- **NN/g, Progressive Disclosure** — two-level presentation beats one level of everything: the list answers the
  decision, the page answers the detail. Practically: a card should carry the facts that *differ between the
  options* (when, where, cost, can I still sign up), not everything the detail page holds.
- **The old Inter-Actief site** (`inter-actief.utwente.nl/activities/`, not `old.inter-actief…`) — their own
  established convention is a **table**: date + weekday, activity label, title, and a status line
  (`Inschrijving gesloten`). No location, no time, no teaser. So *sign-up state* is not an invention: it is what the
  association has always put in the list, and the new card dropped it.
- Consensus across the event-card material gathered in round 1 (envydesign, OneCraft "five facts first", Cambridge
  editorial style): keep the **metadata order identical on every card** (date → time → venue → price) so the eye can
  scan one column, put the total price up front, and use **status** ("3 spots left", "Full", "Closed") as the one
  piece of urgency.

## What the API can actually give (audited against staging, 27 Nov 2026)

Fields that exist and are worth one line on a card: `begin`/`end` (full range, so duration is free), `location`
(free text, sometimes empty, sometimes "TBD"), `organizer.name` (a committee — social proof for members),
`activityLabel {name,color}`, `price` (+`hasCosts`), `enrollment`, `enrollmentEnd` (a real sign-up deadline),
`enrollmentFull`, `promo`/`descriptionShort`/`description`.

Landmines found in the real data:

- `hasCosts: true` with `price: "0.00"` on most activities → **cost must be conditioned on `price > 0`, never on
  `hasCosts`**.
- `enrollmentOpen` and `enrollmentClosed` **crash the query** when `enrollmentEnd` is null
  (`'<' not supported between instances of 'NoneType' and 'datetime.datetime'`). Derive them client-side from
  `enrollmentEnd`, or fix the backend.
- `location` is `""` on one upcoming activity and `"TBD"` on another.
- `maximum` is null nearly everywhere, so "x spots left" is not available; only the deadline is.
- `descriptionShort` is preformatted like `Social - 02/11/2026, 12:45 @Abscint …` — unusable as a teaser.
- `activityLabel.name` comes back **in Dutch** ("Sociaal", "Onderwijs", "Carrière") even on the English API.

## The options (live at `http://localhost:5173/design`)

| | content decision | fields |
| --- | --- | --- |
| 0 | shipping card, redrawn at row size for reference | begin, label, description |
| 1 | **when / where / what** (the pick from round 1) | begin, location, activityLabel |
| 2 | **the hours, not just the hour** — commitment is what you decide on (45 min vs 13 hrs) | begin + end |
| 3 | **say who runs it** — "By Cooking Club" instead of "Type" | organizer.name |
| 4 | **can I still join, and what does it cost** — deadline / walk-in / Free | enrollment, enrollmentEnd, price |
| 5 | **one line, no labels** — same facts as a sentence, start time only, which buys a second teaser line | as 1 |
| 6 | **four facts in two lines** — 2×2 spec sheet, no teaser at all | begin, location, price, deadline |
| 7 | **missing data** — option 1 on the worst records (no location, TBD, 16-day window, no colour) | — |

## Next steps

1. Pick the content set (they are mixable: e.g. 1's labels with 3's organiser, or 5's line with 4's sign-up state).
2. Apply the two data guards (`price > 0`, derive sign-up state from `enrollmentEnd`) wherever the card reads them.
3. Land it in `TileCard.vue` at the real homepage/overview sizes, then delete this pad and its route.

---

# Round 3 — the content is settled, now the design

Locked going in: **one metaline, no field labels, start time only** (`Mon 30 Nov, 15:45 · MBasement · Social`), the
**title above** it, and the **promo as teaser** with the description as fallback. Every card is 421×131 — the homepage
row — so a variant can be dropped into the real grid without re-measuring.

| | design move | axis |
| --- | --- | --- |
| 0 | today, for reference | the two tracked caps strings + raw type colour |
| 1 | **one line, no labels** | the settled content, nothing else changed |
| 2 | **the day is the loud element** | the date numeral carries the weight (costs one teaser line) |
| 3 | **take the box away** | rules instead of a container, picture to the edge, no radius |
| 4 | **the colour goes on the edge** | a 3px type-coloured edge, the word goes neutral |
| 5 | **picture on the left** | reading order: picture → title |
| 6 | **picture shrinks, text grows** | small square thumb so the metaline never wraps |

## Both dark-mode fixes, measured

Real painted colours (canvas-resolved, alpha composited over the page) on the actual card backgrounds, `#ffffff`
light and `#1a325e` dark. Small text needs **4.5:1**.

| carrier | light (worst of 12 cards) | dark (worst) | verdict |
| --- | --- | --- | --- |
| raw `var(--type)` — what ships today | 3.70 | **1.06** | fails both |
| **mixed ink** `color-mix(in srgb, var(--type) 45%, var(--p-text-color))` | 6.64 | 5.79 | passes both |
| **neutral word** + colour dot / edge rule | 4.76 | 4.93 | passes both |

The mixed-ink rule has no `.dark` selector, which is the point: `--p-text-color` itself flips, so one declaration
darkens on a light card and lightens on a dark one. That matters because the previous attempt —
`:global(.dark) .type-label` inside a **scoped** block — compiles to nothing at all (verified: the only rule that
ships is `.type-label[data-v-53db1d96] { color: var(--type) }`).

Also caught by the same probe: the pad's cards inherited `#000` text because this app sets **no global body colour**,
which made the title 1.19:1 in dark. Fixed by naming `color: var(--p-text-color)` on the card — worth remembering for
any new component that does not go through TileCard.

## Next

1. Pick the design (they compose: 4's edge + 6's thumb, 1's layout + 2's numeral, …).
2. Port to `TileCard.vue`, keeping `--type` for the glow/border and using mixed ink for the word.
3. Re-verify at 1920 / 390 in light + dark + en/nl, then delete this pad.

---

# Round 4 — the title first

Variant 1 is picked, so the content is fixed: one metaline (`Mon 30 Nov, 15:45 · MBasement · Social`), title, promo as
teaser, picture right, mixed-ink type word. Round 4 re-cuts it with the **title above the facts**, one change per option,
the same three activities in every row.

| | move |
| --- | --- |
| 0 | variant 1 as picked (facts above the title) — reference |
| A | title, metaline, teaser — the plain flip |
| B | title + metaline bound together, teaser pushed away |
| C | title, teaser, metaline as the last line |
| D | title at section size, teaser gives up a line |
| E | no teaser at all |
| F | a hairline between the facts and the prose |

Verified: 7 sections × 3 cards, every card 131px (the homepage row height), no broken images; and in dark mode
`.type` 7.17:1, `.meta` 4.93:1, `.title` 12.64:1, `.teaser` 4.93:1 — all above the 4.5:1 floor.

These compose: C's footer line works with D's title size, F's hairline with B's binding, and so on.

## Round 5 — the hover, made quiet (shipped)

What shipped did three things at once on hover: the border took the activity type's
colour, a shadow glowed underneath in that colour, and the title underlined. The
colour repeated the type word, so it carried no information, and up close the ring
read as a pastel outline (bright pastel on navy in dark mode).

Two signals survive, on the user's pick:

- **the frame goes to ink** — `--p-text-color`, so one declaration darkens it on a
  light card and flips it to white on a dark one. No shadow, no lift.
- **a 2px rule grows from the left under the title** — the site-wide `.link`
  mechanism (`::after` + `scaleX(0) → scaleX(1)`, 300ms).

The rule follows the *title block*, not the words: the title is `line-clamp-2` and
cannot become an inline-block without losing the clamp, so on a wrapped title
("Pepernoten Bakken / Workshop") the bar spans the longer first line. Accepted —
it reads as a rule rather than a half-finished underline.

Measured after shipping: border `rgb(51,65,85)` light / `rgb(255,255,255)` dark,
bar `matrix(1,0,0,1,0,0)`, computed shadow identical to rest, no
text-decoration, and the animation sampled frame by frame as monotonic
(0 → 0.038 → 0.113 → 0.22 → ... → 1.0 over ~300ms). Same on `/publications`,
because every card is one component.

Rejected on the way: coloured glow (decoration), plain `text-decoration`
underline on any card that also changes its frame (two signals is enough, three
is noise), hover tint of the paper (fights the card's own light/dark background),
and "no hover at all" (no affordance).
