# v40 verification

Title music uses the licensed source from original 00:15 to end, with six-second fade-in and no fade-out. The title starts after five seconds of black, and the flash starts at opening 36.3 seconds. APC starts at 37.75 seconds; music overlaps the beginning of APC. MU-TH-UR, offline media and gameplay assets are inherited from v39.


## v43 changes
- POWER ON label; typing begins 2 seconds after power press while audio still starts on press.
- Final five prompt lines each receive a two-second blinking pause. Screen shutdown waits for typing and recording to finish.
- Automatic popups display for four seconds then fade for 650ms; decision dialogs remain user controlled.
- Capture layering: swarm at 0ms, pulse rifle at 500ms, launch screech and existing marine voice at 1000ms.
- JavaScript syntax and deterministic terminal/capture timing checks passed. iPad audiovisual playback requires device verification.


## v44
Wind trim and circular crossfade validated in PCM; old embedded recording removed; new bytes checked against exported MP3; JavaScript syntax checked. Physical iPad loop playback not verified.


## v46
JavaScript syntax checked. Mock native audio checks confirm roster starts, stays continuous across renders, respects sound toggle and stops on exit. Physical iPad playback not verified.
