# v96 validation

- 24 JavaScript verification scripts passed. Detailed output: verification/v96-validation.json.
- 100 seeded four/six-player state-machine playthroughs passed with real popup markup rendering: {"games":100,"rounds":899,"moves":7501,"reports":3204,"captures":738,"boardings":4}
- Four complete event decks (28 events) passed through production queue/refill, popup rendering and acknowledgement. Master list stayed intact, a new mission received all seven events, and movement/turn handover remained available.
- Missing-title reports remained renderable and dismissible.
- Verified six event opening sound routes and discovery/thunder gains.
- Verified whole-tile eligible overlays, selected state and confirm/cancel cleanup for targeting actions.
- Verified three/two/one-tile tracker contact and scheduled pings (1800/1100/650 ms), four-tile cutoff, capture suppression and unchanged board-icon visibility.
- Native canvas checks passed for feathered ship lighting, APC forward/rear lighting and preserved darkness in unexplored tiles. Red storm lighting and delayed once-only thunder checks passed.
- Existing boarding, quarantine/endings, capture timing, terminal transitions, item use, tile spacing and audio lifecycle checks passed.
- Standalone and executable inline JavaScript syntax passed.
- All 31 embedded recordings match the source hashes and decode successfully. Safe version bump preserves media bytes.
- verification/v96-board.png is a native canvas composite using production terrain and sprite sizes, not a browser screenshot.

The reproduced event-deck defect is fixed and regression-tested. These checks use simulated DOM/audio/timers and native canvas; they do not emulate iPad Safari. A real iPad playthrough is still needed to confirm no other device-specific freezes remain.
