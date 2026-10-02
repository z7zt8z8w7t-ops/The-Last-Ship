# v77 verification

All nine automated suites pass, including existing gameplay, events, sentry/crew, audio isolation, cinematic cues, dropship layers, round countdown and terminal-session checks, plus interface recovery tests.

New checks verify one-second ticks from 08:00, 05:00, 02:00 and 01:00, clamping at 00:00, exactly five seconds of countdown, no animation redraw on ticks, fixed outer endpoints for every keyframe, and separate glyph centres. EVAC follows removal of the two-hour screen, does not fire at other tested rounds, and is not replayed if the boundary is reprocessed.

Terminal checks cover a sound on every Acknowledge press at 20% gain, no duplicate final closing sound, no linked startup/drone restart, audio exceptions during closure, and recovery after a delayed closing timer. Gameplay tests cover event movement after media failure, acknowledgement completion despite a redraw failure, sequence-lock cleanup and turn-flip cleanup despite a failed redraw.

The same simulated closing-audio error leaves v76 permanently locked but v77 releases it. This reproduces one failure path; it does not establish the exact cause of the user's iPad freeze.

TLS EVAC matches the uploaded bytes; all 28 previous embedded audio payloads are unchanged. External and inline JavaScript syntax checks pass. ZIP integrity and reconstruction over v76 pass.

No browser runtime or physical iPad visual/audio test was available. Please playtest the animation, sounds and movement on iPad.
