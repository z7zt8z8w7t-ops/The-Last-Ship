# v26 test results

WebKit 26.5, 1024 × 768 touch viewport, 2026-09-30.

Passed: complete boot text; full-screen taps; completed title drawing; decoding of all 15 embedded MP3 files; running audio context after gesture; add-player once per tap; mute/unmute; roster data retention; distinct Start Game screech; mission briefing and handoff; sampled ECG; abort stopping ECG; offline reload with all audio available.

Confirmed ZERO external MP3/audio-folder requests. Audio folder and audio.js were absent during tests. JavaScript syntax and embedded payload validation passed.

No unexpected browser errors. A service-worker update request fails as expected when the test server is deliberately disconnected.

Physical iPad speaker playback has not been tested.
