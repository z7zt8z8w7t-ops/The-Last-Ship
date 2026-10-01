# The Last Ship — v63

Replace the existing game files with this ZIP’s contents. Keep them together. Open the hosted game online once to refresh its offline cache and confirm the v63 marker.

## Changes in v63

- The user-supplied TLS speech plays once as the A in LAST begins to draw in the title cinematic. The user-supplied TLS sympathies recording plays once as “I CAN’T LIE TO YOU ABOUT YOUR CHANCES” starts typing on MU-TH-UR. Both recordings are embedded in index.html and respect the game sound switch.
- During launch, the Dropship hull canvas extends beyond the board and flies across its edge. The player panel is layered in front of the ship and masks its exit. A portrait layout routes the ship downward behind the panel.

The v62 audio engine, five-second popup timer, compact CRT image panel and cleared targeting highlight remain in place.

## Retained gameplay

All v58–v60 gameplay changes are retained: Company Representative, CMC IDs, APC/Gravity Well/PDT terminology; free inventory use and research; restricted cache/PDT terrain; APC-only egg incineration; role-specific egg messages; two scientists required to launch; Company victory with egg aboard, Crew victory without it, Alien victory when everyone is captured, and mission failure after the ninth round. Standalone roar remains limited to non-capturing Alien Lunge. Discovery and combined capture recordings remain unchanged.

The drone retains v60’s contiguous PCM trim with no fades, crossfade or overlap. Roster music still stops at Launch Mission. No saved-game continuation is added.

## Checks

Run each `verification/*.test.js` with Node. See TEST_RESULTS.md for checks and the device-testing limitation.
