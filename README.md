# The Last Ship — v28

Upload the contents of this ZIP into the repository root, replacing the previous files. Confirm the game shows v28. Saved games are retained. All 19 audio recordings are embedded in index.html; no separate audio folder is needed.

Changes:
- Start Game: exact selected Monster Screech by DRAGON-STUDIO, with a damped outdoor reverb tail. Original pitch preserved; rejected screech removed.
- Reverb added to wind, alien calls and marine/scientist screams.
- ECG dry level about 7 dB quieter, with subtle short reverb, still matched to BPM.
- Mission and private-order transmissions use the opening MU-TH-UR font, green colour and glow, typed character by character with a blinking cursor.
- Real keyboard keystrokes are synchronized to appearing non-space characters on both the opening and mission screens.
- Tap a transmission to reveal all text and stop typing audio. Acknowledge/Begin turn also reveals remaining text on the first tap, then proceeds on the next tap.

On iPad, a user gesture is required to enable audio. The first MU-TH-UR tap activates the recorded sound and replays the opening text with audible keystrokes; it then proceeds to the title. Tap again during that sequence to skip ahead. Reduced-motion preference shows text immediately. SOUND ON/OFF includes keyboard sounds.

The sound-check.html page auditions the exact embedded assets, including all keyboard variants. Sources, licences and processing are documented in SOUND_CREDITS.md and audio-manifest.json.

Validation uses WebKit with a touch/iPad viewport, native media playback, sound toggle, mission typing/skip, saved-game flow, and offline reload. Physical iPad playback should still be verified on the user's device.
