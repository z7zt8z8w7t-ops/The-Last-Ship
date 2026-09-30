The Last Ship — v24

# The Last Ship — iPad playtest PWA (v18)

A pass-and-play prototype for four to six people sharing one iPad. One player secretly works for the Corporation. The others have nine hours to rescue two scientists and keep the alien egg off the dropship.

## Upload to GitHub Pages

1. Upload the **contents** of this ZIP to the root of your repository. Keep `index.html`, `game.js`, `style.css`, `sw.js`, the icons, background and both MP3 files together.
2. In repository **Settings → Pages**, choose **Deploy from a branch**, **main**, **/(root)**, then save.
3. Open the Pages address in iPad Safari. Use **Share → Add to Home Screen** if you want it as an app.
4. Open once online to cache the package for offline play. The lower-left marker should read **v18** after updating.

The tile and popup artwork is embedded in `game.js`. Old `tile-*.png` files are unused. Existing games in browser storage can be continued from the roster; starting a new game shows the full opening sequence.

## Play

Launch into the MU-TH-UR terminal, tap “MU-TH-UR: PRESS TO BEGIN” to unlock audio and start the wind, then tap the slowly constructed title to enter the flickering **Colonial Marines Crew Roster** for UKSS APATE. The default players are SGT Xenia and PVT Zander, Emma and Jim. On the roster, How to play is at the bottom left and the game controls sit on the same row at the bottom right. Everyone acknowledges the shared order, then sees their private first-turn order during handoff. One player is the saboteur.

Each turn gives two one-hex moves and one action in any order. Tap a neighbouring hex to move. Entering an event hex resolves an event and ends remaining movement. Use the panel for actions and the two inventory slots. Searching a hidden scientist immediately begins escorting them if free; take them to the dropship. Equipment discovery and event reports display green CRT artwork and fade without a button. Decisions that affect an event still ask for a choice.

Unexplored hexes remain dark; entering them reveals terrain. Open terrain is cut from one continuous landscape so neighbouring open hexes line up. Red and blue Gravity Hole pairs transport entrants immediately. Collapsed bridges block both players and alien. Flares have artwork and animated smoke, draw the alien, and burn for two rounds. Alien movement is shown across explored hexes and concealed across unexplored ones; it can stalk before attacking. Contact sends a player to the nest and drops carried equipment, with a special adjacent drop for a Gravity Hole capture. Captives roll an animated green d6 on their next turn: an even roll escapes with two moves and no action.

An **Abort mission** button at the bottom left of the game board returns to the title; the current game remains available through Continue on the roster.

The panel shows inventory, a Corporation personnel card, and a proximity-driven ECG. Its **COLONIAL MARINE** header and SGT/PVT ranks match the roster. Capture reports randomly select from five scenes. The two rescued scientists have separate, consistent artwork. There are six illustrated equipment pickup types and image reports for the eight event types.

Wind audio is optional and starts on the required MU-TH-UR “PRESS TO BEGIN” tap, fading in with the title sequence. Its switch appears on the roster and game board; the game also works offline after initial caching. The recorded sound is adapted from Tvabutzku1234, “Howling wind,” Wikimedia Commons, CC0 1.0: https://commons.wikimedia.org/wiki/File:Howling_wind.ogg

This is a local, shared-screen playtest with browser-storage saves. It has no network multiplayer. Artwork is embedded in the script, and the audio files must remain beside `index.html`.
