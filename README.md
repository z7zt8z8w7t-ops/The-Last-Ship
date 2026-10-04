# The Last Ship — v123 testing update

Extract and overwrite the matching files in your existing game folder. Retain all other assets. Includes previous v119–v122 updates.

Changes:
- Temporary small TEST buttons across the top: Intro, Crew, Title, Board, Pass iPad, male/female Capture, Countdown, Quarantine, Battle, Failed Battle, Orbit and Failed Result.
- Each jump replaces the current session with a fresh sample mission. Use these while testing, not during a game you want to continue. Test controls are isolated behind TEST_NAVIGATION in game.js for removal after testing.
- At the final countdown, an incomplete rescue still plays the final battle and orbital transition. The results popup reports MISSION FAILED when fewer than two scientists were aboard, or no crew escaped.
- Quarantine buttons for available status choices, purge confirmation and launch pulse like Launch Mission. Disabled and already-selected actions stay steady.
- Hex and target outlines are hidden during the final battle, making the terrain read as one continuous area. Normal play retains the grid.

Verification:
- JavaScript syntax checks passed.
- All 13 test-jump branches exercised with isolated state and mocked rendering.
- Final countdown with 0/1 scientists routes to battle; 2 scientists with crew routes to quarantine.
- Departure sequences tested for 0/1/2 scientists and zero/two crew: battle, orbit, correct result. Successful crew/company outcomes retained.
- Final-battle class and grid suppression, quarantine pulse selectors checked.
- Full iPad playback and visual layout have not been tested.
