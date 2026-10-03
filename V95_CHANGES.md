# The Last Ship v95

Apply this changed-files update over v94. The visible build marker and code/cache versions are v95.

- Staging-area arrival no longer opens boarding confirmation. Board Dropship explicitly opens it. Cancel replaces the shared terminal's Acknowledge label for this dialog, retaining the existing power-down sound and gain. Confirm Boarding is unchanged.
- Lightning is brighter, icy blue, and illuminates the valley and revealed terrain above the darkness mask. Hidden hexes remain hidden. A generated low thunder rumble follows by 0.65–1.3 seconds, once per strike, using the existing audio context. Mute, suspension and launch stop thunder. Reduced-motion mode suppresses lightning and thunder.
- Marine ambient halos are smaller and weaker; their directional torch beam is brighter. Hidden terrain is not illuminated.
- The approved small flare sprite replaces the drawn stick. A broad red glow lights revealed terrain. Duration and lure rules are unchanged.
- Revealed alien sprites breathe subtly and sway their tail, turn briefly before travelling, and scuttle during movement. Glowing contact and visibility rules are unchanged; reduced-motion mode disables idle/scuttle animations.
- The ramp is layered above the hex outlines. Port/red and starboard/green wing navigation lights have small halos. The off-board ship/ramp receive a soft local lighting pool. Staging hazard lights retain their existing two-hours-left trigger.
- DIAGNOSTIC sits beside Sound, outside the game root, with direct handlers independent of gameplay locks. Its status line records the current phase/player and blocking flag. The screenshot-friendly panel includes recent taps, last move attempt, pending reports/waits, active sequence owners and recorded JavaScript errors. Opening it does not discard reports or force a transition. A snapshot is stored locally when opened or when an error is recorded.

The intermittent iPad freeze has not been reproduced in this environment. No speculative clearing of active gameplay sequences was added. If it recurs, press DIAGNOSTIC and take a screenshot before restarting. If the browser itself stops processing events, use the last visible status line in the screenshot.
