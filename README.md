# The Last Ship v90 — audit cleanup

This is a changed-files patch over v89, not a complete standalone installation. Replace the matching files in your existing game. The visible version becomes v90.

New terrain images are embedded in terrain.js (about 6.7 MB), so there is no terrain folder to upload. All changed files are below 25 MB individually. Existing icons, manifest and alien-planet background are still required from your installed game.

Use REMOVE_OLD_FILES.txt to remove the specifically listed retired files from the existing installation. A ZIP cannot delete existing files automatically. Do not remove other files.

Read AUDIT_REPORT.md for confirmed remaining faults and test limitations. This patch cleans dependencies and unused code; it does not claim to fix the intermittent iPad freeze or every reported gameplay/layout fault.
