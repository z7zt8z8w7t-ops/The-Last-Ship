# The Last Ship — v33

Upload all extracted files to the repository root, replacing the previous files. Keep artwork.js with index.html. Open the hosted site online once to install the new offline cache. Confirm the corner marker reads v33.

Opening: LOGIN → silent MU-TH-UR messages → ACKNOWLEDGE → crew roster → Start Game → three-second black hold → title → black-screen APC arrival → board fade → shared mission briefing → player orders.

The title draws from the A outward over 26 seconds, holds for five seconds, then fades to black over three seconds. During black, the selected APC driving/stopping recording plays from original 00:11 to the end over continuous wind (about 15.5 seconds). The board fades in over four seconds. No tap is required during the mission opening. Abort Mission still returns to a tappable title. Reduced motion shows a static title for five seconds with brief transitions; APC duration is retained.

Order handoff uses green CRT styling, a remaining-time countdown and ACKNOWLEDGE. Crew orders omit the duplicate heading. Classified Special Order 937 uses red CRT styling and the requested priority text. Acknowledgements sit bottom right. Usable action-panel button lettering glows; disabled lettering remains dim.

All 17 recordings are embedded in index.html; no external audio downloads are needed during play. ECG and text typing remain silent. Artwork is unchanged from the clean v30 file. Avoid global release-number replacement in any embedded-media file. media-integrity.json provides artwork and recording hashes.

## v33 changes

Initial MU-TH-UR transmission types at 80 ms per character with 1.2 seconds between lines. Text remains silent.
Tracker contact within two hexes plays SamsterBirdies’ Horror sting once per new contact. Normal tracker pings continue. Modal windows, private orders, mute/unmute and visibility pauses do not create fresh contact.
Marine capture plays the orchestral horror swarm with the character’s human scream as the capture popup appears. Finding scientists is silent apart from the popup CRT effect.
All 17 active recordings are embedded for offline playback; the two unused scientist screams have been replaced with the sting and swarm.

## v33 title music

The selected Tomas_Herudek rising string ambience starts immediately when Start Game is pressed, using original 00:20 through the end at the original pitch and speed. The roster fades for 0.9 seconds, followed by three seconds of black before the title reveal. Music fades in over six seconds and fades out at the end of the recording as the title fades. At the following black-screen arrival, wind and APC continue. The music is embedded for offline use. Backgrounding pauses the cue and resumes from its saved position. Metallic percussion remains unselected.
