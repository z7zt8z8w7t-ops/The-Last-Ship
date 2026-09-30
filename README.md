# The Last Ship — v26

All 15 audio files and the audio playback engine are now embedded directly in `index.html`. No separate audio folder or audio.js is required. The recorded sound set, title and gameplay are otherwise retained from v25.

## Update

Upload the ZIP contents to the same GitHub Pages root. Replace index.html, game.js, style.css and sw.js. Keep the supplied icons, background and manifest alongside them. Check the lower-left marker reads **v26**. An installed older version may reload once when the new service worker activates.

The old audio folder and audio.js are unused and may be removed. Saved games retain their storage key. Open the page online once to cache it; audio is now cached together with the page.

Tap MU-TH-UR to unlock audio. SOUND ON/OFF controls all effects. Roster capture-voice selections and scientist artwork/voice matching remain in place.

Open sound-check.html (or index.html?soundcheck=1) to audition all 15 embedded files. SOUND_CREDITS.md lists their creators and licences.

WebKit touch tests check title drawing, audio decoding without any audio-file requests, mute/unmute, roster actions, mission start, ECG, abort and offline reload. Physical iPad speaker playback has not been tested.
