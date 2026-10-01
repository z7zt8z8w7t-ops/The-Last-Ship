# v61 release checks

Passed:

- Terminal session harness: one startup across linked dialogs; silent final close; drone cancellation on early close; mute/unmute and visibility handling; red briefing; continuity through handoff; unchanged closing deadline; ACKNOWLEDGE moved outside message content into the footer and retained through a sync.
- Gameplay/intro harness: terrain placement across 100 generated boards; free inventory use; search cue flags; APC egg incineration; crew/company/alien victory rules; combined captures; lunge-only standalone roar; power-on flags and drone on Initialise; one intro shutdown sound; roster transition after the collapse; visual startup timer still advances when audio setup throws; marker SVG follows the hull canvas.
- Audio-engine harness: circular PCM drone retained; no linked-message source restart; cancelled decode cannot restart audio; immediate mute/close; visibility cancellation; WAV fallback; only intro media loaded during cold preparation; silent priming failures remain diagnostic and do not become playback error warnings; gameplay media load at launch.
- Dropship drawing harness: upper hull canvas contains the ship; ground canvas retains only its shadow and ground lighting; three round-seven ground sweeps; launch frame; absent hull after completed departure.
- Original artwork, terrain and ship image assets are unchanged. Every previous audio payload except the removed popup shutdown recording is unchanged. The new MU-TH-UR shutdown payload matches the supplied file bytes. Seamless drone WAV is unchanged.
- Application and inline JavaScript syntax; offline asset paths and v61 cache marker; ZIP integrity.

These checks use simulated DOM, canvas, audio and timers. No real-browser rendering or physical iPad playback test was available. Responsive text fitting, footer appearance, foreground/background recovery and the reported first-load issue still require an iPad playtest. The first-load work prevents known audio/setup failures from blocking the visual sequence; the screenshot alone does not establish the original device-specific cause.

Run:

```
node verification/terminal-session.test.js
node verification/gameplay.test.js
node verification/drone-playback.test.js
node verification/dropship-layers.test.js
```
