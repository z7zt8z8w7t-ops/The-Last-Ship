# v97 validation

- All 25 JavaScript verification scripts passed; detailed output is in verification/v97-validation.json.
- 100 seeded four/six-player virtual playthroughs passed, including actual popup markup and repeated event deck refills.
- All executable inline and standalone JavaScript passed syntax checks.
- All 32 embedded recordings passed integrity and decode checks. The original 31 recordings remain unchanged.
- New checks cover smaller forward sentry deployment, unchanged tile/action state, actual Field Manual rendering, the Spore Burst opening cue, and four-corner storm lighting with unrevealed tiles kept dark.
- Audio checks verify the countdown gain has no end ramp.
- Existing capture, boarding, quarantine, terminal transitions, targeting, tracker, event and audio lifecycle regressions passed.
- verification/v97-board.png is a native canvas composite, not a browser screenshot.

These checks use simulated DOM/audio/timers and native canvas. An iPad Safari playthrough remains necessary to verify device-specific behavior.
