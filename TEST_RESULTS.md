# v27 verification

Playwright WebKit 26.5 at 1024 × 768 touch viewport, 2026-09-30.

Both AudioContext constructors were replaced by throwing test stubs. All checks passed with Web Audio unavailable:

- Complete boot text, full-screen touch and finished title drawing.
- All 15 embedded recordings loaded through native audio elements.
- Native wind player active after MU-TH-UR gesture.
- Add-player once per tap and roster data retention.
- Mute pauses every active player; unmute resumes wind.
- Start Game invokes the replacement creature screech.
- Briefing, handoff, private orders and gameplay rendering.
- ECG sample playback and abort stopping its timer.
- Reload and all native audio playable after the server is disconnected.
- Zero external MP3 or audio-folder requests.
- No unexpected browser errors.
- Syntax checks, embedded payload validation and matching cache asset versions.

The user's live v26 index.html and game.js matched the delivered files byte-for-byte. The user confirmed native sound-check playback works on their iPad; v27 adopts that playback path. Physical iPad gameplay audio and subjective quality of the replacement screech are not verified by these tests.
