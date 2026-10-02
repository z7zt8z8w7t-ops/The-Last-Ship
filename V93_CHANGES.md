# v93 changes

- Valley backdrop: dark green cliff walls with a flat floor beneath the playable hexes and space for the dropship clearing. Subtle moving mist and occasional branching lightning paint only outside the hexes, behind the ship, tokens and UI. No weather audio or gameplay effects. Lightning is disabled for reduced-motion preference, and mist becomes stationary. The existing 15 fps terrain loop pauses while hidden; weather adds no timers or input locks.
- Countdown: the orange cross draws last, above the timer and its background, as requested. Removed the masking that broke its lines. Inward-only animation, perimeter attachment, five-second display and second-by-second countdown are retained.
- Orbital sound: endCredits previously used a native media element after a delayed transition, which can encounter iPad playback restrictions. It now uses the already unlocked Web Audio engine. Its long recording is decoded only when departure starts, rather than during game preload. It begins at orbital fade-in and keeps the existing one-shot, mute/visibility pause and resume behavior. No recording bytes or gain settings changed.
- Alien: a revealed hex within distance two of a non-captive, non-boarded player shows the glowing contact. A revealed adjacent hex shows the creature. An unrevealed hex or a contact beyond distance two has no board icon. Captive and boarded players do not supply board visibility. Motion Echo no longer bypasses unrevealed terrain for the board icon. Tracker logic is unchanged.

## Verification

All 17 JavaScript verification scripts pass, including 100 simulated games (900 rounds, 7,761 moves, 3,268 reports and 611 captures), 1,000 generated layouts, terminal/input regression checks, real terrain asset decoding/rendering, alien distance/fog tests and weather clipping/reduced-motion checks. The audio engine test verifies that orbital playback starts through Web Audio without native media playback, and that its decode is excluded from game preload. All 31 embedded sound recordings match their source hashes and fully decode. All production JavaScript syntax checks pass.

These are automated and canvas-render checks, not physical iPad/Safari validation. Existing documented unrelated findings in the prior audit remain unchanged.

## Artwork

Project asset: board-valley.webp. Created with the built-in image generator, converted to WebP for the game.

Prompt: Top-down sci-fi hex board game environmental backdrop, landscape 4:3. Dark alien valley seen directly overhead, jagged black and dark moss-green cliff walls around the outermost margins, broad flat fine gravel valley floor occupying the central 85 percent. Detailed painted cinematic sci-fi terrain, muted green-grey, eerie restrained lighting, cohesive realistic game texture. Centre unobstructed flat fine gravel; upper-right level dropship clearing without a vehicle. Subtle mist at cliff bases. No hex grid, UI, symbols, text, people or baked-in lightning.
