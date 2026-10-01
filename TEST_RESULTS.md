# v63 release checks

Passed automated checks:

- New cue harness: title speech starts on the A animation event; MU-TH-UR speech starts on the first character of the CHANCES line. Both are one-shot.

- Audio harness: preparing media creates no playback sources and calls no native Play; unlocking does not start prepared effects; launch requests only screech and score (ongoing wind remains); startup gain 0.6, discovery gain 1.2, drone gain 0.55; natural startup completion callback; one circular drone source across linked dialogs; suspended context resumes; cancellation, mute and visibility handling; legacy fallback preparation remains silent.
- Game harness: confirmed redirect preserves its hidden queued destination while removing yellow selection; turn handover clears target state; timed popup schedules five seconds and remains manually closable. Previous terrain, free inventory, egg incineration, victory rules, capture recordings, roar rules, intro behaviour and startup error recovery checks pass.
- Terminal harness: image container moves into a dedicated panel outside the message area; Acknowledge stays in the footer; one startup across linked dialogs, silent closure, early-close cancellation and handoff continuity remain.
- Dropship drawing harness: hull above board layers; shadow/sweeps remain on ground; launch hull travels beyond the board edge into an extended canvas; final departure retained.
- All 22 retained embedded recordings match v62 byte for byte; the two new embedded recordings match the user-supplied M4A files byte for byte. JavaScript syntax passed. Offline asset paths and ZIP integrity are checked during packaging.

Tests use simulated DOM, audio, canvas and timers. No physical iPad or real-browser rendering test was available. The bulk playback mechanism reported at launch is removed and guarded by tests; final sound balance, visual layering and frame sizing require an iPad playtest.

Run each verification/*.test.js with Node.
