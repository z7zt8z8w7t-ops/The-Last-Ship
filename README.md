The Last Ship v140 — overwrite supplied files, retaining other assets.

Removes the discovery recording and its playback trigger entirely. Scientist discovery/boarding and all other recordings remain unchanged.

Keeps normal board hex lines very faint (14% opacity, 0.65 width). Targeting fills and tutorial guidance remain visible. Final battle still hides its grid completely.

Final battle sentry base now renders without aim rotation; only the upper gun and its light rotate. The fallback drawing follows the same split. Marine aiming, muzzle-flash timing and alien wave timings are unchanged.

Verified: reproduced v139 whole-sentry rotation; drawing transform checks at four aim angles confirm stationary base and rotating top; discovery data/trigger absent; all other embedded audio identical; game, battle, service-worker and inline audio JavaScript syntax passed. Physical iPad visual/playback testing remains unverified.
