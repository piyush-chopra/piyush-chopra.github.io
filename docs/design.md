# Portfolio design: intelligence, made useful

## Review and thesis

Good foundation; the previous cream/green blueprint treatment was visually distant from the requested Apple/AI direction. This is a public website for recruiters and engineering teams, built with semantic HTML/CSS and small progressive enhancements. Its job is to turn engineering evidence into a clear picture of Piyush's product judgment.

Medium: small utility text and dense decorative labels compete with the projects. Enlarge body copy, simplify eyebrows, and remove the blueprint scaffolding and artificial window chrome. Low: branding needs a distinct expression. Use a single spectrum sculpture joining three interlocking loops: interfaces, intelligence, infrastructure. This comes from Piyush's actual engineering scope, rather than an imaginary chat assistant.

Keep real product imagery, native details, working project filters, honest resume-sourced outcomes, contact links, and keyboard semantics. Apply Apple's foundations to the web; do not imitate native app tab bars or claim native Liquid Glass behavior.

## Reference decisions

References read from apple-design-skill/references/hig; short quotes refer to those files and headings.

- accessibility.md › Vision: “Support larger text sizes.” Verify text at 200%, narrow widths, and both themes.
- layout.md › Best practices: “Group related items to help people find the information they want.” Group each project as a solid card with related evidence.
- typography.md › Best practices: “In general, avoid light font weights.” Use regular through bold system typography.
- color.md › Best practices: “Avoid using the same color to mean different things.” Blue means action; spectrum artwork is decorative.
- designing-for-macos.md › Best practices: use available display space while retaining comfortable density. Translate to responsive browser layouts and keyboard access.
- liquid-glass.md › The two layers: content and functional layers remain distinct.
- materials.md › Liquid Glass: “Don’t use Liquid Glass in the content layer.” Only floating navigation has translucent material; content cards are opaque.
- dark-mode.md › Best practices: “Ensure that your app looks good in both appearance modes.” Follow system preference by default; retain an explicit web theme preference for existing users.
- motion.md › Best practices: “Make motion optional.” A brief entrance on the decorative sculpture, then stillness. No perpetual looping or scroll-jacking.
- generative-ai.md › Best practices: “Keep people in control.” This portfolio has no live AI assistant; the sculpture is decorative and hidden from assistive technology.

## Tokens

Background: light #f5f5f7, dark #0b0b0f. Opaque elevated surface: light #ffffff, dark #17171d. The following ratios are computed against the respective elevated surface:

| Role      | Light   | Contrast | Dark    | Contrast |
| --------- | ------- | -------- | ------- | -------- |
| Content   | #1d1d1f | 16.83:1  | #f5f5f7 | 16.39:1  |
| Secondary | #626268 | 6.06:1   | #a1a1aa | 6.96:1   |
| Action    | #0066cc | 5.57:1   | #80b5ff | 8.47:1   |
| Accent    | #673dcc | 6.74:1   | #bba5ff | 8.45:1   |

Decorative spectrum: cyan #55d9f4, blue #5687ff, violet #9665f5, magenta #ee73bd, coral #ff9479. These colors do not carry text or status meaning. White button text sits on #0066cc in both themes (5.57:1). Borders distinguish groups; focus rings use the action color.

Type: system UI stack; display 44–86px, section 36–56px, project 26–40px, body 17px, introduction 20–22px, utilities 11–14px. All sizes use rem with responsive clamping. Spacing: 4/8/12/16/24/32/48/64/96/128; controls at least 44px; card radius 28px, floating navigation radius 32px.

## Layout

Centered product introduction, followed by actual engineering artifacts, outcomes, experience, and direct contact.

Regular:

```
     [ Name          Work Experience About Contact   Theme ]
                    [ spectrum sculpture ]
                    Role + expressive headline
                    Intro / primary action
                 Interfaces · Intelligence · Infrastructure
     [ Section heading                         context ]
     [ Foundry Office story       actual application screenshot ]
     [ Project                       Project ]
     [ Project                       Project ]
     [ Outcomes   |    Outcomes    |    Outcomes ]
     [ Experience dates      role and evidence ]
     [ About                      capabilities ]
     [ Contact and links ]
```

Compact:

```
[ Name                 Theme ]
[ Work Experience About Contact ]
[ Sculpture / heading / intro ]
[ Actions / discipline labels ]
[ Featured story / image ]
[ Filters / stacked projects ]
[ Stacked outcomes / experience ]
[ About / skills / contact ]
```

## Craft critique and verification

The initial generic AI orb idea became three interlocking spectrum loops, connecting directly to Piyush's breadth across interfaces, intelligence, and infrastructure. The rest remains quiet. Removed numbered section labels and fake window controls. The screenshot is the project's evidence, not another decorative panel.

Opaque fallback for reduced transparency, stronger boundaries for increased contrast, forced-color support, visible focus, no essential hover interactions, and reduced-motion behavior are built into the CSS. Validate browser screenshots, 320/390/768/1440px widths, 200% text, theme persistence, native disclosure, filters, clipboard, navigation, no-JS content, and axe WCAG A/AA. Automated checks supplement visual review; they do not establish complete assistive-technology conformance.

## Verified result

Local Chromium checks passed at 320, 390, 768, and 1440px, including 200% text reflow. Axe WCAG A/AA checks passed for desktop and mobile light appearances and desktop dark appearance. Filters, disclosures, theme persistence, clipboard, anchors, keyboard skip navigation, no-JS content, and 404 recovery passed. Reduced motion produced no running animations; reduced transparency and increased contrast removed navigation blur. Desktop hero and featured work, mobile hero/contact, dark appearance, and the social preview were inspected visually.

## Frosted navigation refinement

The floating header now uses a 28px backdrop blur, a 155% saturation boost, a diagonal specular wash, and narrow inset edge reflections. Its neutral fill is 70% white in light appearance and 76% graphite in dark appearance. This is a CSS approximation of frosted glass; it does not reproduce Apple's native adaptive material. The label layer stays crisp and small brand text uses the full foreground color to maintain contrast over changing backgrounds. No pointer tracking, refraction animation, or additional glass surfaces were added.

References: `liquid-glass.md › Cross-platform translation` describes “Backdrop blur” and “hairline highlight”; `materials.md › Liquid Glass` says “Use Liquid Glass effects sparingly.” The opaque no-blur fallback remains for reduced transparency, increased contrast, and browsers without backdrop-filter support.
