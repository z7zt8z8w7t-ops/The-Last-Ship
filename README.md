# Last Shuttle — iPad playtest PWA

A pass-and-play prototype for 4–6 people sharing one iPad. One player is secretly the saboteur. The crew rescues two scientists while trying to keep an alien egg off the shuttle.

## Upload to GitHub Pages

1. Create a GitHub repository (for example `last-shuttle`).
2. Upload the **contents** of this ZIP to the repository root. `index.html` must be at the top level.
3. In **Settings → Pages**, select **Deploy from a branch**, branch **main**, folder **/(root)**, then save.
4. Open the Pages URL in Safari on the iPad. Use **Share → Add to Home Screen** to install it.
5. Open it once while online to cache the files for later offline play.

The current game is saved on that iPad in browser storage. This version starts a new saved game because the turn and capture rules changed.

## Core turn

Each player has **two one-hex moves and one action**, in any order. Tap a neighbouring hex to move. Landing on an event tile for the first time resolves an event and ends movement for that turn; the action remains available. Matching revealed tunnel ends connect for one move.

There are 12 open, 4 bridge, 4 tunnel, 3 cover, 3 spore, and 8 event hexes, plus the lander, shuttle, and alien nest. Cover hides from the alien's nearest-target selection unless the player made noise. Spores draw the alien. A bridge can be collapsed with an action when empty. An event tile becomes open ground after use.

The alien moves two hexes at the end of each round towards a beacon, recent noise, or the nearest visible player. Contact captures a player and sends them to the nest. A scientist drops where they were caught, and one random cargo token drops at the nest. The captive uses their action to escape, then can move twice; an ally next to the nest can use an action to free them.

The action menu includes scanning, searching, escorting, equipment, collapsing bridges, planting a false distress beacon, redirecting the alien, and diverting scan power to repel it. Players discuss who boards; the app records the selection but does not enforce a secret ballot. There are no AI players or network multiplayer.
