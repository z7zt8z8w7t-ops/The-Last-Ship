# v59 release checks

Passed automated checks:

- Terminal session harness: one startup across redraws and linked report/choice/outcome dialogs; one final power-down; drone cancellation on early close; mute/unmute and visibility handling; red private briefing; continuity during the first-turn handoff gap; stable closing deadline through redraws.
- Gameplay harness: 100 generated boards exclude caches/PDTs from special terrain; one Company Representative; searches retain their discovery flags and gameplay noise; jetpack can be used after the cache search consumes the action; egg destruction requires APC; two scientists required for launch; crew/company outcomes follow egg aboard; combined male/female capture recordings; all-captured Alien victory; standalone roar only for a non-capturing Alien Lunge.
- Every v58 embedded audio entry is unchanged. The three new M4As match the supplied source bytes exactly.
- Artwork, Dropship module, both Dropship assets, planet artwork and media-integrity manifest match v58 byte-for-byte.
- All application JavaScript files and executable inline scripts pass Node syntax checks.
- Offline asset paths resolve and the cache/build markers are v59. ZIP extraction/integrity checked before delivery.

The tests use simulated DOM/audio and game state. This release has not been visually or audibly tested on a physical iPad or in a real browser. In particular, iPad playback permissions and the final CRT appearance need device playtesting.

Run:

```
node verification/terminal-session.test.js
node verification/gameplay.test.js
```
