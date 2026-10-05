The Last Ship v139 — overwrite supplied files, retaining other assets.

Discovery audio playback repair: decoded the uploaded discovery recording to stereo PCM WAV, applied 0.7 source gain and a gentle final fade, and preserved its 4.435-second container duration. Removed the 150% discovery gain boost; playback now uses unity gain with the existing limiter retained. Both native fallback and sound-check playback now use the correct WAV MIME type. The repaired clip peaks at 0.692 full scale and ends in silence.

No loud end spike was detected in the source waveform, so the reported iPad glitch is not conclusively reproduced. This change removes AAC decoding from this cue and avoids excessive amplification or an abrupt ending. All trigger points, game.js, tutorial and other audio remain unchanged.

Checks: repaired waveform peak and silent ending; embedded byte comparison; other audio unchanged; gameplay code unchanged; inline JavaScript and game/SW syntax. Physical iPad playback requires retesting.
