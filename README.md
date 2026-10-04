# The Last Ship — v122 update

Overwrite matching files in your existing game folder; retain all other assets. Includes all v119–v121 changes.

Alien Lunge and Spore Burst now show their event report first. The alien stays still until acknowledgement and completion of the terminal closing animation. The clear board is allowed to paint before the normal alien movement begins. If a Marine is reached, the existing capture animation/audio and capture report follow. Sentry interception remains in the normal movement path.

Validation: JavaScript syntax passed. Isolated asynchronous checks passed for both events: no movement before acknowledgement, no movement while the terminal closes, movement followed by capture/reports, Spore Burst movement restriction retained, reset during closure cancels the old mission's movement. Full iPad playback has not been tested.
