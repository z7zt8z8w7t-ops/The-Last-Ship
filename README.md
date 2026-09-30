# The Last Ship — v25

Pass-and-play PWA for four to six players sharing an iPad.

## Install / update

Upload the **contents** of this ZIP into your existing GitHub Pages root, including the complete `audio` folder. Keep the directory structure intact. Old game-v24.js, style-v24.css and the two old wind MP3 files are unused and can be removed.

Open the site online once. The lower-left marker must read **v25**. An existing installed copy may reload once when the new service worker takes control. Close and reopen the installed app if it still displays an older build. Existing saved games use the same storage key.

## Sound

Tap anywhere on MU-TH-UR to unlock audio and start the wind. Tap the title screen to enter the roster. Sound playback uses decoded local MP3 files with Web Audio gain controls, including on iPad. SOUND ON/OFF controls all effects. Audio file failures show a tap-to-retry message. Enable your device volume to hear playback.

Select each marine's capture voice on the roster. Default profiles are female for Xenia/Emma and male for Zander/Jim; these can be changed. There are two recordings per profile, chosen randomly. Scientist voices correspond to the female and male artwork and use separate recordings.

The ECG uses one sample at the displayed 62/78/104/132 BPM. Three ambient creature calls rotate without consecutive repetition. Start Game has its own stronger screech. All files are available offline after the initial cache completes.

See SOUND_CREDITS.md for every source, licence and edit. Open sound-check.html to hear individual assets.

## Repairs

- Title strokes now use valid animation delays and finish drawing after approximately 13 seconds; atmosphere settles after 17 seconds.
- The entire boot and title screen responds to native taps, mouse clicks or Enter/Space.
- Input listeners bind once. Touch scrolling does not trigger actions on touchstart.
- Roster names, added players and voice choices survive sound toggles.
- Synthetic wind, ECG, CRT, creature and scream routines have been removed.
- Mute stops playing sources and timers; unmute restarts the soundscape.
- Versioned code assets use network-first updates with offline fallback. Other app caches are not blanket-deleted.

## Verification

Tested with Playwright WebKit at an iPad-sized touch viewport: boot text visibility, full-screen taps, finished title strokes, 15 MP3 decodes, audio-context activation, mute/unmute, add player, retained roster values, Start Game, mission briefing, handoff, ECG playback, abort, and offline reload. This is browser-engine testing, not a physical iPad speaker/listening test.
