The Last Ship v145

This release includes the v144 tutorial with 33 screens, a visible version button in the bottom-left corner, and an online version check. The badge reports the version of the running game.js. Tap it to check for updates. An update reloads automatically only before a session starts; during a session, the badge offers UPDATE and asks before ending the session.

index.html remains below 25 MB. GitHub Pages still hosts the game. Connected-phone play is not implemented.

To install changed files, overwrite them at the same repository root as index.html. For a clean deployment, use the files in the clean ZIP at that root; uploading the ZIP itself does not deploy its contents. Existing repository files are not deleted by an overwrite: use the accompanying cleanup report to remove retired assets if desired. Retain the original full ZIP as the archive of old sources and development tests.

On the iPad, fully close and reopen the game after deployment, then check for v145 at the bottom left. A version update cannot affect an already open older build until it is refreshed. Offline use remains supported after the current assets have been cached. No game-in-progress restoration is provided.
