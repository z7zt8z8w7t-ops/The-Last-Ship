# v96 changes

## Confirmed freeze fix

The diagnostic error was `undefined is not an object (evaluating m.title.startsWith)`. The event queue shared the master event array. Seven events consumed that master list; refill then produced an undefined event and an invisible popup that blocked gameplay.

The master event list is now immutable and each initial/refill deck is a shuffled copy. Missing popup titles receive FIELD REPORT, including protection for a malformed popup already present in UI state. Automated playthroughs now run the actual popup markup instead of skipping that renderer.

## Audio and events

- Earthquake is now Seismic Shift; bridge collapse/reveal behaviour remains.
- TLS discovery uses 150% gain for existing discovery uses plus Adrenaline Surge, Motion Echo and Seismic Shift openings.
- PDT Locator opening uses the scientist-found recording.
- Existing terminal close sounds and other additional effects retain their settings.
- Thunder gain is 50% higher than v95, with the existing delayed rolling rumble.

## Board, lights and target selection

- Player-facing hex wording is now tile; internal coordinate names remain compatible.
- Eligible targets for Flare, Jetpack, Scanner recharge, False PDT and Redirect Alien pulse translucent red across the whole tile. Selected targets pulse more strongly; confirm/cancel removes overlays. Reduced-motion mode uses a steady overlay.
- Muted green, thinner and lower-opacity tile perimeter lines blend into terrain.
- Removed the hard rectangular dropship lighting clip; soft radial lighting fades into the valley and keeps unexplored tiles dark.
- Green navigation lamp moved onto the matching surface of the opposite wing pod.
- Added a pale landing-light beam under the dropship nose.
- APC gains two pale forward headlight beams and two red rear lamps/glows.
- Visible lightning bolts removed. Deep red atmospheric flashes remain, followed by thunder.

## Three-tile tracker

Tracker contact now extends to three tiles. Noise and visual pulse share 1.8-second intervals at three tiles, 1.1 seconds at two, and 0.65 seconds at one or closer. The board alien icon remains limited to the previous revealed-tile range; unknown tiles stay tracker-only. Capture suppression and sound/visibility handling remain.

Apply over v95. Only changed files are included.
