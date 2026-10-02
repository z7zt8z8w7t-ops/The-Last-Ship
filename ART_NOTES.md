# v83 sentry artwork

Approved emplacement artwork and two-part sentry preview replace the previous sentry artwork references. The gun and base are separate SVG-clipped layers from sentry-parts.png; original imagery is preserved. The gun rotates around its mounting pivot, with a separate animated red indicator and opaque dark lens for the spent state. gun-emplacement.png provides a clear pale mounting pad. Superseded sentry-base.webp and sentry-turret.webp are no longer referenced; they may be removed from the host.

## v86 overhead sentry
Built-in image generation produced sentry-overhead-parts.png. Prompt: two disassembled Aliens-inspired sentry components, strict orthographic overhead, fixed tripod left, barrel-up upper right, weathered olive-grey metal and transparent background. SVG crops separate the components; base bearing (448,560) and upper bearing (1280,735) map to the same hex centre. Upper rotates in 2D only; muzzle at (0,-54) and LED at (10.425,-6.375) share its transform. Old sentry-parts.png is no longer referenced by production code and need not remain on the host.

## v87
v87: marine-tokens.png was generated using the approved marine comparison as reference, extracting four overhead roles without baked names/rings/text. Built-in prompt: overhead Sergeant/Weapons Tech/Medic/Science Officer, gritty olive-grey armour, gold/cyan/red/purple role accents, transparent four-column sheet. Runtime SVG crops 543px columns and overlays live initials/rims/status. alien-overhead.png is the approved overhead reference-derived creature (elongated head, crouched limbs, curled tail, grey-green highlights). Both are external image assets; audio stays embedded.
