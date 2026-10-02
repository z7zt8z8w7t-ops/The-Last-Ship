# The Last Ship v91 — audio repair

Apply this changed-files patch over v90. Replace matching files, then reload the game. The visible version becomes v91. No audio file upload or separate sounds folder is required.

All 31 embedded recordings have been restored to intact copies. Most come from the earlier unchanged v80/v81 recordings; the orbital ending was rebuilt from the original uploaded End credits.m4a as stereo AAC at 96 kbps.

The corruption came from replacing version text throughout index.html, which changed matching characters in base64 audio. Future build-label updates must use verification/set-build-version.py and pass verification/audio-integrity.test.py before packaging.

The countdown cue has a 120 ms ending ramp to remove its hard cutoff. Its five-second screen duration, the title timings, player-turn audio settings and other gains are preserved.

Every included file is below 25 MB individually. Existing v90 terrain and gameplay cleanup are retained. This patch addresses audio corruption; the previously documented gameplay/layout issues remain listed in AUDIT_REPORT.md.


See V92_CHANGES.md for the v92 update, validation and device-test limitations.
