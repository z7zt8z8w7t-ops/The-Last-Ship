# The Last Ship — v29

Upload the contents of this ZIP into the repository root, replacing the previous files. Confirm v29 on the crew roster. Saved games are retained. All 15 sound assets are embedded in index.html; no audio folder is required.

- Blank black opening with LOGIN in the bottom right. LOGIN enables audio and triggers a CRT flicker and recorded CRT sound.
- Each MU-TH-UR prefix appears immediately; the four messages type sequentially with a blinking square cursor. Text effects are silent.
- ACKNOWLEDGE appears after the final message and takes you directly to the crew roster. The opening no longer repeats or advances automatically.
- Initial mission and private crew briefings use smaller MU-TH-UR lettering and a much faster typing effect. Tap to reveal the remaining text.
- ECG audio removed entirely. ECG visuals remain. The selected tracker beep is a separate proximity sound: the bottom-right tracker shows a blip only within two hexes of the current player. Pings start at two hexes (1.1-second interval) and accelerate to a 0.65-second interval within one hex. Outside this range, the blip and tracker audio stop. It pauses outside active play and during private briefings/popups.
- The title draws from the A in LAST outwards in both directions, finishing in approximately 26 seconds. The earlier ACKNOWLEDGE-to-roster flow is retained; the title remains the abort-mission destination.
- Wind, creature calls, capture/scientist screams and the selected Start Game screech retain their v28 reverb.
- Native media pause/resume handling and audio priming on the next user gesture improve recovery after app suspension. Retry does not replay all the screams.

Open sound-check.html to preview the exact 15 embedded assets. Tracker source and provenance are documented in SOUND_CREDITS.md and audio-manifest.json.

Validated in WebKit with touch, landscape and portrait viewports, reduced motion, native media recovery, and offline loading. Physical iPad suspension/interruption behaviour still requires checking on your device.
