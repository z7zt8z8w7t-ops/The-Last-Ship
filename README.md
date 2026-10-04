The Last Ship v131 — overwrite supplied files, retaining other assets.

Audio repair: eleven damaged AAC recordings re-encoded from recoverable audio into clean AAC containers; original track durations retained with timeline gaps padded where damaged packets could not decode. All 33 embedded recordings now decode without errors. Terminal ambience impulse cleanup reduces the reported spike; no de-click filtering applied to gunfire.

Board music now predecoded during gameplay preparation, resumes a paused audio context, clears stale failure notices on successful startup, and falls back to native playback on decoding failure. Board test shortcuts enable music; title and ending previews do not run board music.

Checks: all embedded audio decode cleanly; original durations retained; JavaScript syntax; mocked music resume/fallback/duplicate-start checks. Actual iPad playback remains unverified. Previously damaged samples cannot be perfectly reconstructed from this copy.
