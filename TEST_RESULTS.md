# v49 fixes and verification

- Five visible cursor flashes over 2.5 seconds, beginning immediately after the final character.
- Existing 70ms character timing and two-second intermediate line pauses retained.
- Malfunction lasts 900ms; shutdown lasts 750ms, then the existing roster fade runs.
- Explicit glowing raster collapses into a horizontal line, contracts to a point and fades to black.
- Native audio volume now uses the requested 0–1 value directly, including wind.
- Theme start/stop and event continuation logic unchanged; all embedded recordings and artwork preserved.
- JavaScript syntax, animation keyframe count, audio volume behavior and ZIP integrity verified.
- Physical iPad audiovisual playback has not been tested.
