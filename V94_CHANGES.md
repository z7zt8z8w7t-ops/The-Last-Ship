# v94 changes

## Round-transition lock

A specific v93 failure is reproduced: if a queued report opens on the handoff phase, the renderer displays only the handoff screen, omitting the report's acknowledge button. The live popup promise and sequence lock then wait for an inaccessible acknowledgement; Sound On/Off bypasses that gameplay lock.

One concrete route is a sentry firing, returning the alien to the nest and capturing a surface player there. That capture report was queued on the sentry path but not drained before the countdown. The report could subsequently open during handoff.

- Sentry-return capture reports now drain before the alien step completes. Any remaining alien-turn reports drain before countdown or mission-end transitions.
- A live report is explicitly rendered and acknowledgeable on handoff, mission briefing and launch-ready screens.
- New-turn setup clears the preceding turn's private/flip/die presentation flags.
- Short visual waits record deadlines. An overdue wait can complete on touch or visibility return if its browser timer callback was delayed or missed, while active acknowledgement dialogs remain locked until acknowledged.
- If a live report has lost its DOM node, interaction reconstructs the report rather than bypassing acknowledgement. Input diagnostics now include outstanding waits.

This confirms and fixes a real blocked-control path. It does not prove that every reported physical iPad freeze had the same cause.

## Darker level and lights

A reusable canvas darkness layer darkens the existing approved terrain, vehicle artwork and valley surround. Hex outlines are subdued while remaining readable; cliff-base mist is stronger. No tile artwork is replaced.

Each free surface marine casts a soft warm torch pool and a directional beam matching their travel/guard/detection facing. Captive and boarded marines have no torch. Vehicle occupants do not cast marine torches; APC/staging lamps keep these zones readable. Lighting is clipped to revealed hexes and does not alter terrain discovery or alien visibility. Reduced-motion preference suppresses animated beam sweeps.

Flare rendering had been omitted from the board marker layer. Each active flare now has a bright marker, glow and gentle smoke animation, plus a flickering red-orange pool on revealed terrain. Its marker can identify a flare thrown onto an unrevealed hex, but the surrounding terrain stays hidden. Existing attraction and round-expiry rules are unchanged. Reduced-motion preference makes flare effects stationary.

## Validation

All 19 JavaScript verification scripts pass. New tests reproduce the inaccessible v93 handoff report using the actual old renderer, verify the corrected renderer, exercise sentry capture through countdown and next-turn activation, simulate a missed countdown timer callback, and check stale turn flag cleanup. Canvas pixel tests verify dark terrain, marine visibility, beam direction, no hidden-hex illumination, captive/boarded torch removal and flare lighting. Board markup checks verify that a used flare is visible without changing discovery or expiry.

100 simulated games with actual finish/report-queue handling completed: 879 rounds, 7,590 moves, 3,043 reports, 589 captures and five boardings. The 1,000-layout terrain checks and existing audio, UI and transition regressions also pass. All production JavaScript syntax passes; all 31 embedded recordings match source hashes and fully decode.

Physical iPad/Safari testing is still required to confirm long-session reliability and lighting appearance on the user's device. Previously documented unrelated audit findings remain unchanged.
