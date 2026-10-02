# The Last Ship v77 — changed-files update

Extract over existing v76, replacing matching files.

Countdown lines keep both outer endpoints attached to the orange perimeter; only the interior vertices animate. Each digit and colon is centred separately in its box. The display ticks once per second during its five seconds, for example 05:00, 04:59, 04:58, 04:57, 04:56. Tick updates change only the text, preserving animation continuity. Zero stays at 00:00.

The status label reads IMPREGNATED, without PRIVATE. Visibility and infection mechanics are unchanged.

Every enabled Acknowledge press plays TLS crt pwr dwn short at 20% gain, including presses that reveal the rest of a typed message or advance linked reports. Final closure does not duplicate that sound. Linked briefing drone/startup continues through transitions without restarting. Ordinary non-Acknowledge closures retain their existing closing cue.

TLS EVAC.m4a plays once at 100% gain after the two-hour countdown has disappeared and the next handoff screen has rendered. It is embedded unchanged in index.html.

Freeze protection: terminal media errors no longer abort cleanup; expired closing locks can clear even if a timer is delayed. Popup acknowledgement resolves despite a redraw failure, event/message sequence locks clear in finally blocks, and turn-flip completion is scheduled before drawing. A permanent lock from a simulated audio failure was reproduced in v76 and no longer occurs in the same v77 check. The exact cause of the reported iPad freeze remains unconfirmed.


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
