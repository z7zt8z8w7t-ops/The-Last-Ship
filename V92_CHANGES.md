# The Last Ship v92

Apply this changed-files patch over v91. Replace matching files and add new files. Reload after uploading; the visible build label is v92.

## Changes

- Continuous, smaller-scale overhead green terrain. Removed the old CSS/canvas landscape seam, rectangular dropship apron and repeated opaque SVG atlas fragments.
- Shared ground beneath open ground, cover and spores. True-alpha cover/spore rings, bridge ends and dropship/platform artwork. The ship remains attached to the staging ramp.
- Hex outlines use softer green and 40% thinner base lines. Movement/target emphasis stays readable and green.
- Countdown cross closes inward, holds briefly and resets directly to open. Counter/label remain protected from crossing lines. Perimeter endpoints and second-by-second digits remain intact.
- Collapsed bridges retain normal brightness and remain impassable.
- Staging beacons stay off until two hours remain, then rotate yellow with feathered light sweeps. No red phase.
- Revealed PDT sites regain the original wireless icon.
- Alien figure appears only on a revealed hex adjacent to an active, non-captive surface Marine. Other positions use the glowing contact, including unrevealed hexes. Boarded/captive players cannot reveal it.
- Alien activity indicator sits below progress indicators.

## Reliability work

- Terminal readiness has a deadline even if startup audio begins but never produces its completion event. A failed follow-up callback cannot suppress later callbacks.
- Held terminals with no visible report are hidden and cannot intercept input.
- Async sequence ownership is explicit; orphan flags can be released without clearing live report/capture work.
- Expired panel flips can release their input gate. Audio preparation cannot prevent a transmission acknowledgement.
- Terrain rendering failures are isolated from input setup; terrain animation resumes after the page becomes visible again.
- Removed repeated large data-URI terrain sprites from the SVG foreground. Existing cache light overlays are suppressed on gun emplacements.

These address identified blocking risks. The reported intermittent iPad Safari freeze was not reproduced on a real iPad here, so its complete resolution is not confirmed.

## Validation

All 16 JavaScript checks passed: 15 behavior/render checks and one check documenting remaining audit findings. 100 deterministic virtual games completed, with 900 rounds, 7,761 moves, 3,268 reports and 611 captures. Tests include interrupted startup audio, callback errors, mission/handoff transitions, fourth-player flare input and 1,000 terrain layouts. Native canvas rendering verified the new artwork and visibility resumption.

Virtual games use mocked DOM/audio/timers; they are not Safari device tests. The existing Facehugger attack-turn movement discrepancy remains documented in verification/audit-findings.test.js.

Embedded audio is byte-for-byte identical to v91: SHA-256 48388d44ebdbd56bc51ef9082e939d2d8159f254aeed828863e64f09aaf0e917. All production JavaScript syntax checks passed. No audio recordings or gain settings changed.

## Artwork

Built-in image generation produced the shared overhead ground, transparent landing assembly, transparent cover/spore sheet and transparent bridge overlay. Final sprites are embedded in terrain.js; board-ground.webp supplies the matching fallback surface. Generated originals remain in generated_images. Assets were encoded as WebP without changing their content.

Prompt specifications: ground — directly overhead dark green fine gravel, small mineral stones, quiet repeatable texture, no features or labels. Landing — preserve approved ship/ramp/platform positions, extract from rocky ground, remove hex lines and deactivate staging beacons. Cover/spores — isolate approved peripheral pods/boulders into two transparent rings, retain clear centres. Bridge — isolate the approved diagonal grated bridge on transparency, preserving rails and deck.
