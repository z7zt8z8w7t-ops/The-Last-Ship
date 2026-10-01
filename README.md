# The Last Ship — v59

Replace the existing game files with the contents of this ZIP. Keep all files together. Open the hosted game online once to refresh its offline cache and confirm the v59 marker.

## New in v59

All gameplay dialogs and the How to Play window use one fixed, centred CRT terminal frame. On the board, the frame is centred over the board. Normal dialogs are green; Company Representative private dialogs and egg instructions are red. Long content scrolls within the frame.

The supplied CRT startup plays once when a terminal session begins, followed immediately by the looping drone. Button presses that lead to another dialog keep the same session and drone, including event report → choice → outcome and first-turn handoff → private representative orders. Only the final close stops the drone and plays the supplied power-down once. Closing early cancels startup and prevents the drone starting afterwards. Automatic and manual closes use the same path. Muting stops terminal audio. The visual closing effect lasts approximately 2.25 seconds, matching the power-down recording.

Company Man is renamed Company Representative throughout the game and its field manual. Existing capture and discovery sounds remain; their playback waits for terminal startup to finish.

## Retained from v58

Searches, spores, jetpacks and incineration still generate gameplay noise but do not play a standalone alien roar. Alien Lunge plays a roar as movement begins unless it will capture a player; then the combined capture recording plays instead. Cache and false PDT searches retain their discovery sound; scientists retain their discovery sound.

Inventory use and specimen research cost no action. Caches and PDTs cannot occupy Gravity Wells, the nest, APC or Dropship. The egg can only be destroyed at the APC. Both scientists must be aboard before launch. Egg aboard means Company victory, regardless of its carrier or the representative’s survival; no egg aboard means Crew victory, with others allowed to remain behind. Everyone captured means Alien victory. Missing the nine-round departure window means mission failure.

The separate Dropship terrain and oversized ship artwork, round-seven yellow hazard sweeps, engine ignition and 6.2-second launch animation are retained unchanged. The roster music loop still stops at Launch Mission. No saved-game continuation is added.

## Checks

Run `node verification/terminal-session.test.js` and `node verification/gameplay.test.js`. See TEST_RESULTS.md for the release checks and device-testing limitation.
