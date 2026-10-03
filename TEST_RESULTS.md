# v101 validation

Passed CRT keyboard actions: characters/numbers, case, space, backspace, clear, 24-character limit, next/done, voice toggle round trips, and guards outside roster editing. Verified read-only name inputs and removal of native select reads.

Passed native canvas rendering and draw-order assertions: platform/ramp before Marines/aliens, flying hull afterward, actor/death/engine/hatch/blackout checkpoints.

Passed 500 last-stand layout/crew combinations and every four/six-player quarantine purge combination. Gunfire and three death timestamps remain unchanged.

Passed 100 virtual games: 899 rounds, 7,501 moves and 3,204 reports. All 33 embedded audio payloads compare exactly with v100. Changed JavaScript passes syntax checks.

Physical iPad/Safari keyboard layout and rendering still require device testing.
