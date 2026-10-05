The Last Ship v141 — overwrite supplied files, retaining other assets.

Restores the discovery sound using the repaired v139 PCM recording, with reduced gain and a smooth ending. Restores its prior popup triggers.

Replaces the existing TLS event (scientistFound) recording with the uploaded TLS event(1).m4a without re-encoding. It still plays after the terminal opens for scientist discoveries and PDT Locator. Scientist boarding sound and other audio remain unchanged.

Retains very faint normal board hex lines, hidden final-battle grid and stationary sentry base with rotating upper gun.

Verified: new event clip decodes cleanly; embedded event bytes exactly match upload; discovery bytes exactly match repaired v139; other audio, grid CSS and final battle code unchanged; inline/game/SW JavaScript syntax passed. Physical iPad playback remains unverified.
