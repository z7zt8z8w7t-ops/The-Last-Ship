# Last Shuttle — iPad playtest PWA

A pass-and-play prototype for 4–6 people sharing one iPad. One player is secretly the saboteur. The crew rescues two scientists while trying to keep an alien egg off the shuttle.

## Upload to GitHub Pages

1. Create a GitHub repository (for example `last-shuttle`).
2. Upload the **contents** of this ZIP to the repository root. `index.html` must be at the top level.
3. In **Settings → Pages**, select **Deploy from a branch**, branch **main**, folder **/(root)**, then save.
4. Open the Pages URL in Safari on the iPad. Use **Share → Add to Home Screen** to install it.
5. Open it once while online to cache the files for later offline play.

Upload all `tile-*.png` files alongside `index.html` at the repository root. If a tile image is missing, the board cannot show its illustrated terrain.

The current game is saved on that iPad in browser storage. This artwork repair keeps games started with the previous illustrated-board build. Updating from an older rules build starts a new game.

## Core turn

The default players are Xenia, Zander, Emma, and Jim; you can edit their names before starting. Each player has **two one-hex moves and one action**, in any order. Tap a neighbouring hex to move. Landing on an event tile for the first time resolves an event and ends movement for that turn; the action remains available. Entering a Gravity Hole immediately transports you to its matching pair for that move, revealing the destination. You must move off the arrival hex before you can enter it again to transport back. The handoff prompt is centred on the board. Ending a turn flips the player panel over before the prompt appears; starting the next turn flips it back. Roles are briefed only before a player's first move.

There are 12 open, 4 bridge, 4 Gravity Hole, 3 cover, 3 spore, and 8 event hexes, plus the lander, shuttle, and alien nest. Only the lander and shuttle are visible at setup. Green mist drifts gently over every other tile until entered, then fades and stays clear. Reduced-motion settings keep the mist still. A Gravity Hole reveals its matching destination when entered. The nest is revealed by the first capture. The Gravity Hole pairs are red and blue, with no letter markers. Cover hides from the alien's nearest-target selection unless the player made noise. Spores draw the alien. A bridge can be collapsed with an action when empty; the broken hex is impassable to players and alien. An event tile becomes open ground after use.

The alien moves two hexes at the end of each round towards a flare, recent noise, or the nearest visible player. Contact captures a player and sends them to the nest. A scientist and all cargo drop where caught. If caught on a Gravity Hole, all cargo drops together on an adjacent non-Gravity-Hole, passable hex. A captive rolls an alien-green d6 on their next turn: even escapes with two moves but no action; odd stays captive and ends the turn. They may retry next turn. An ally next to the nest can still use an action to free them.

Use item is in **Actions**. Choose an item, tap a glowing target hex, then confirm. A flare can target a hex up to three spaces away and lures the alien at round end; a jetpack flies one to three spaces and transports through a Gravity Hole if it lands there. View cargo shows your inventory without use controls. The saboteur's disable scan, false distress signal, and creature redirect choices are in Private actions, available only during their own turn. Their effects resolve without naming the saboteur. The compact player panel matches the current player's helmet piece, shows their scientist escort status, and their hex glows. Player pieces show initials. Cargo appears as an amber canister; distress signals animate outward; the alien appears as a pulsing green contact. Round, scientist, and scan counters form a compact vertical stack at the top right of the board. The hex grid fills the remaining board area with minimal edge padding. Players discuss who boards; the app records the selection but does not enforce a secret ballot. There are no AI players or network multiplayer.

The small `v9` marker at the lower-left of the screen identifies this build after the iPad refreshes its cached files.

The player panel has a biosuit ECG display. It speeds up as the alien approaches in hex distance; the distance and direction remain hidden. Captured players show a critical pulse. Reduced-motion settings hold the trace still.
