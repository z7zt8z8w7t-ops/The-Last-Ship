# v77 verification

All nine automated suites pass, including existing gameplay, events, sentry/crew, audio isolation, cinematic cues, dropship layers, round countdown and terminal-session checks, plus interface recovery tests.

New checks verify one-second ticks from 08:00, 05:00, 02:00 and 01:00, clamping at 00:00, exactly five seconds of countdown, no animation redraw on ticks, fixed outer endpoints for every keyframe, and separate glyph centres. EVAC follows removal of the two-hour screen, does not fire at other tested rounds, and is not replayed if the boundary is reprocessed.

Terminal checks cover a sound on every Acknowledge press at 20% gain, no duplicate final closing sound, no linked startup/drone restart, audio exceptions during closure, and recovery after a delayed closing timer. Gameplay tests cover event movement after media failure, acknowledgement completion despite a redraw failure, sequence-lock cleanup and turn-flip cleanup despite a failed redraw.

The same simulated closing-audio error leaves v76 permanently locked but v77 releases it. This reproduces one failure path; it does not establish the exact cause of the user's iPad freeze.

TLS EVAC matches the uploaded bytes; all 28 previous embedded audio payloads are unchanged. External and inline JavaScript syntax checks pass. ZIP integrity and reconstruction over v76 pass.

No browser runtime or physical iPad visual/audio test was available. Please playtest the animation, sounds and movement on iPad.


## v78
Background recording embedded as 44.1 kHz stereo PCM with a two-second equal-power wrap crossfade, played at 35% gain from board fade until dropship Launch is pressed. Capture recording starts immediately; its acknowledgement report appears four seconds later. Sentry perspective adjusted, including directional aim. Sentry deploys on the current hex after Use → Confirm. Medkit is displayed as Med Evac and returns the player automatically to the APC after confirmation; the embryo remains.

Input recovery: pointer-up routes taps without depending on a synthetic click; duplicate compatibility clicks and drags are rejected. Closing terminal overlays no longer intercept taps, reverse panel faces cannot intercept front controls, and alien transition locks release on errors. Automated tests exercise the actual input route, redraw, item confirmation, delayed capture, audio lifecycle and existing gameplay. No browser engine or physical iPad was available; the reported intermittent freeze requires iPad verification.


## v79 — smaller embedded background audio
Background converted to 22.05 kHz mono PCM, preserving the existing crossfade and playback behaviour. Its embedded size is reduced by about 75%; index.html is below 25,000,000 bytes. This trades stereo and upper-frequency detail for a smaller upload while retaining PCM gapless looping.


## v80 — replacement background recording
Game background LQ.m4a replaces the v79 background. Original compressed AAC audio retained, with artwork/metadata removed. A two-second equal-power circular crossfade is built once after Web Audio decoding. Stereo is retained. Playback gain remains 35%, starting with board fade and stopping at dropship Launch. Native fallback plays the compressed file on repeat without the decoded crossfade. Audio lifecycle and waveform crossfade regression checks pass; physical iPad verification remains outstanding.


## v81
Scientist discovery audio repeats on every recovery, including scientists dropped after capture. Rescued.m4a plays on boarding report opening. Egg discovery uses TLS Discovery at 130%; acknowledgement power-down remains 20%. Background pauses for combined capture audio, resumes from its saved position 0.5 seconds before the recording ends, and fades in over 1.5 seconds. The four-second capture-report delay is retained. Countdown endpoints slide on the octagonal perimeter as the four inner vertices converge, including the reopening phase.

Input work: independent touch-end path handles pointer cancellation without depending on a generated click, with per-gesture duplicate suppression; stale intro input-blocking classes and orphan terminal overlays are removed. Live popup/sequence gates remain. ShipInputDiagnostics() exposes bounded recent input and lock state for further diagnosis. Player-four flare, subsequent movement, duplicate click, drag rejection, protected sequence, repeated scientist recovery, egg/boarding cues, capture timing, background position/fade/overlap, and perimeter intersections pass automated checks. Actual iPad freeze remains unconfirmed; no physical iPad or browser-engine test was performed. Four available verification scripts pass.


## v82
Fixes the reproducible v81 mission acknowledgement freeze. Input recovery checked for `.mission-overlay .card`, but terminal synchronization had already moved that card into `.wrist-content` and removed the wrapper. Touch-down therefore cancelled the visible popup before its Acknowledge action could run. The selector list now recognizes moved mission content and generic `.wrist-dialog` content, including final launch dialogs. Regression checks reproduce v81's failure with its original selectors and pass with the corrected selectors; mission acknowledgement proceeds through handoff to play.

Small green CRT-style SKIP controls sit bottom left. MU-TH-UR skip cancels its audio/typing/timers and goes directly to the crew roster. Title skip cancels the title timer, zoom/glow and its audio, and starts the APC entrance at the APC audio start, preserving the subsequent board arrival. Buttons are removed when pressed and recreated in a fresh matching sequence. All six available automated verification scripts pass. No native browser or physical iPad testing performed; the earlier intermittent mid-game freeze is not proven resolved by this fix.
