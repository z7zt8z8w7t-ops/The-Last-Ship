# The Last Ship — v61

Replace the existing game files with this ZIP’s contents. Keep them together. Open the hosted game online once to refresh its offline cache and confirm the v61 marker.

## Changes

- INITIALISE powers the MU-TH-UR screen on from point → horizontal line → full green CRT, with a brief flicker before text begins. The existing text, pauses, five final cursor flashes and malfunction sequence remain.
- The seamless TLS drone begins on INITIALISE and stops when the MU-TH-UR screen starts collapsing. The newly supplied MU-TH-UR shutdown recording plays once at that point. The collapse lasts approximately 1.556 seconds before the roster appears.
- Gameplay popup closure is silent. Its old shutdown recording, playback key and metadata are removed. The CRT closing animation remains. Startup and continuous drone across linked popups are retained.
- Shared CRT frames are larger. Gameplay messages adapt text/artwork spacing to the available frame height. ACKNOWLEDGE is in a separate footer fixed at the bottom right. The longer field manual has Previous/Next pages instead of one long scrolling window. Choice buttons occupy the same footer area when acknowledgement is not the required action.
- The Dropship hull, engine effects and hull beacon glows draw above fog and hex borders. Player and other board markers draw above the hull. Ground terrain, shadows and hazard sweeps stay beneath fog and borders. Oversized artwork, round-seven sweeps and the launch animation remain.
- Startup paints independently of media preparation. Only intro recordings are prepared initially; gameplay recordings are prepared when Launch Mission is pressed. Failures during silent priming are recorded in diagnostics without advertising an unused effect as a startup failure. Actual playback errors still appear. Intro visuals advance even if audio setup fails. Missing startup scripts show a Retry option, and a service-worker update cannot automatically reload an active session.

## Retained gameplay

All v58–v60 gameplay changes are retained: Company Representative, CMC IDs, APC/Gravity Well/PDT terminology; free inventory use and research; restricted cache/PDT terrain; APC-only egg incineration; role-specific egg messages; two scientists required to launch; Company victory with egg aboard, Crew victory without it, Alien victory when everyone is captured, and mission failure after the ninth round. Standalone roar remains limited to non-capturing Alien Lunge. Discovery and combined capture recordings remain unchanged.

The drone retains v60’s contiguous PCM trim with no fades, crossfade or overlap. Roster music still stops at Launch Mission. No saved-game continuation is added.

## Checks

Run each `verification/*.test.js` with Node. See TEST_RESULTS.md for checks and the device-testing limitation.
