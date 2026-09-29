# The Last Ship — iPad playtest PWA

A pass-and-play prototype for 4–6 people sharing one iPad. One player is secretly the saboteur. The crew rescues two scientists while trying to keep an alien egg off the dropship.

## Upload to GitHub Pages

1. Create a GitHub repository (for example `the-last-ship`).
2. Upload the **contents** of this ZIP to the repository root. `index.html` must be at the top level.
3. In **Settings → Pages**, select **Deploy from a branch**, branch **main**, folder **/(root)**, then save.
4. Open the Pages URL in Safari on the iPad. Use **Share → Add to Home Screen** to install it.
5. Open it once while online to cache the files for later offline play.

Terrain artwork is embedded in `game.js`. No `tile-*.png` files need to be uploaded. Older tile image files in the repository are unused and may be removed after verifying v15 on the iPad.

The current game is saved on that iPad in browser storage. This artwork repair keeps games started with the previous illustrated-board build. Updating from an older rules build starts a new game.

## Core turn

The default players are Xenia, Zander, Emma, and Jim; you can edit their names before starting. Each player has **two one-hex moves and one action**, in any order. Tap a neighbouring hex to move. Landing on an event tile for the first time resolves an event and ends movement for that turn; the action remains available. Entering a Gravity Hole immediately transports you to its matching pair for that move, revealing the destination. You must move off the arrival hex before you can enter it again to transport back. The handoff prompt is centred on the board. Ending a turn flips the player panel over before the prompt appears; starting the next turn flips it back. Roles are briefed only before a player's first move.

There are 12 open, 4 bridge, 4 Gravity Hole, 3 cover, 3 spore, and 8 event hexes, plus the lander, dropship, and alien nest. Only the lander and dropship are visible at setup. Green mist drifts gently over every other tile until entered, then fades and stays clear. Reduced-motion settings keep the mist still. A Gravity Hole reveals its matching destination when entered. The nest is revealed by the first capture. The Gravity Hole pairs are red and blue, with no letter markers. Cover hides from the alien's nearest-target selection unless the player made noise. Spores draw the alien. A bridge can be collapsed with an action when empty; the broken hex is impassable to players and alien. An event tile becomes open ground after use.

The alien moves two hexes at the end of each round towards a flare, recent noise, or the nearest visible player. Contact captures a player and sends them to the nest. A scientist and any inventory items drop where caught. Dropped items become equipment on the board. If caught on a Gravity Hole, they drop together on an adjacent non-Gravity-Hole, passable hex. A captive rolls an alien-green d6 on their next turn: even escapes with two moves but no action; odd stays captive and ends the turn. They may retry next turn. An ally next to the nest can still use an action to free them.

Equipment caches and dropped equipment become inventory when picked up. Every marine has exactly two inventory slots. The active player's panel shows both slots and gives usable items a direct Use control. Flares can target a hex within three spaces and burn through the current and following round, drawing the alien at each round end. An older smoke plume remains visible if a newer flare takes priority. Jetpacks fly one to three spaces and enter a Gravity Hole if they land on one. Scanners recharge a scan charge; medkits return the user to the lander. Scanning is labelled **Scan inventory** and targets one inventory slot on a player sharing the hex. The egg has no use action.

Researching a specimen uses one action and consumes it. The result is private: 35% chance of three moves next free turn, 35% chance of two actions next free turn, 20% chance of one move next free turn, or 10% chance of no actions for the next two free turns. Captive turns do not consume the pending effect. All other actions still cost one action, including during a bonus-action turn.

The default Royal Space Marines recon team is SGT Xenia with MARINE Zander, Emma, and Jim; names can be changed and up to two more Marines added. The panel shows a personnel card with a unique Corporation number and barcode above an alien-proximity ECG. It also has angular action buttons, a prominent move counter, and an action status card. The panel flips over during handoff. The saboteur's disable scan, false distress signal, and creature redirect options remain private to the saboteur. Player pieces show initials. Equipment appears as an amber canister; distress signals animate outward; the alien appears as a pulsing green contact. Round, scientist, and scan counters form a compact vertical stack at the top right of the board. The hex grid fills the remaining board area with minimal edge padding. Players discuss who boards; the app records the selection but does not enforce a secret ballot. There are no AI players or network multiplayer.

The small `v15` marker at the lower-left of the screen identifies this build after the iPad refreshes its cached files.

The player panel has a biosuit ECG display. It speeds up as the alien approaches in hex distance; the distance and direction remain hidden. Captured players show a critical pulse. Reduced-motion settings hold the trace still.

Each player sees a private, alien-green “Corporation Executive Order” with their role and mission only before their first move.

The ECG trace keeps a complete baseline across its window, with the main spike centred and a moving scan light.

## v15

Green CRT crew roster and shared Order 1592-B lead into one-time private orders. Dark hexes illuminate on entry. Hours left counts down from nine. Escape dice tumble before revealing the result; the centred ECG pulses with proximity. APC and dropship artwork is embedded. Start a new game to see the opening sequence; existing saves retain their progress.

Artwork: built-in image generation created the APC and dropship, then made each a point-up hex tile with the complete vehicle inside the border, emerald alien terrain and transparent exterior. Both are embedded in game.js.

## v15

All eight terrain events show a green CRT field report for 6–12 seconds and fade automatically. Risk decisions retain choice buttons, followed by an automatic outcome report. Capture reports show the alien artwork, captured Marine identity, dropped inventory/scientist details and the requested quote. The artwork is embedded; no extra upload is needed.

Alien movement animates one hex per second and is visible only on explored hexes. It prefers dark stalking positions, spends a stalking turn before a normal two-step attack, and withdraws after capture. Noise, flares and redirects override stalking. Routes respect collapsed hexes. With no dark hexes remaining, the alien remains visible. Controls pause during movement and reports; the last player panel stays concealed throughout the alien turn. An interrupted alien turn resumes its remaining moves after reload.

Validation: JavaScript syntax, deterministic tests of event reports, captures, stalking/attack/withdrawal, hidden-route visibility, blocked paths, two-step turns and reload recovery; embedded artwork and ZIP integrity. Actual iPad animation testing remains to be performed.
