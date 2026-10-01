# The Last Ship — v62

Replace the existing game files with this ZIP’s contents. Keep them together. Open the hosted game online once to refresh its offline cache and confirm the v62 marker.

## Changes in v62

- Audio preparation no longer plays or pauses recordings. Gameplay effects are decoded silently while on the roster, then start only when requested. Web Audio handles effects and background wind, with native playback as a fallback when Web Audio is unavailable. Launch Mission requests only its screech and mission score; ongoing wind remains underneath.
- TLS CRT popup startup uses 60% of its previous gain (40% reduction). TLS discovery is boosted 20%, with peak limiting for its loudest transients. Drone gain increases from 0.28 to 0.55, and playback explicitly resumes the audio context before starting. The seamless drone recording is unchanged.
- Timed discovery, equipment, scientist, event and capture popups close after five seconds instead of four; Acknowledge can still close them early. Button-driven dialogs still wait for input.
- Confirming a creature redirect clears its selected target immediately while preserving the hidden queued destination. Decoy confirmation and turn handover also clear target selection. Yellow chosen-target styling only appears while actively targeting.
- CRT artwork occupies a dedicated panel above the message, scaled to contain the whole image without stretching or cropping. The frame is narrower and starts compact, then fits the message height to available board space. Artwork and text have separate layout areas. Acknowledge remains in the footer at bottom right. Long field-manual sections retain page navigation.

All v61 MU-TH-UR animations and audio timing, silent popup closures, enlarged Dropship layering, ground sweeps and launch animation are retained. All audio recordings remain embedded in index.html; no audio payload was changed in this release.

## Retained gameplay

All v58–v60 gameplay changes are retained: Company Representative, CMC IDs, APC/Gravity Well/PDT terminology; free inventory use and research; restricted cache/PDT terrain; APC-only egg incineration; role-specific egg messages; two scientists required to launch; Company victory with egg aboard, Crew victory without it, Alien victory when everyone is captured, and mission failure after the ninth round. Standalone roar remains limited to non-capturing Alien Lunge. Discovery and combined capture recordings remain unchanged.

The drone retains v60’s contiguous PCM trim with no fades, crossfade or overlap. Roster music still stops at Launch Mission. No saved-game continuation is added.

## Checks

Run each `verification/*.test.js` with Node. See TEST_RESULTS.md for checks and the device-testing limitation.
