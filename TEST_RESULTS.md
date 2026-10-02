# v84 verification

Eight automated test scripts pass. New quarantine tests cover the scientist launch gate, irreversible board lock, eight-seat layout, clearance selection and revocation, purge eligibility, all-clear departure, retained ejected position, contamination outcomes, repeat/stop audio lifecycle, 28 launch contacts and staged launch/fade/orbital/results timing. Existing spacing, inventory, input, terminal recovery, skip and audio checks pass. Countdown rays touch the timer corners and avoid the text interior. Upper sentry transforms contain no perspective scaling. JavaScript syntax and changed-file ZIP reconstruction are checked.

Tests use source and simulated timers/DOM; the new interface and animations have not been tested in an iPad browser. Earlier intermittent mid-game freeze reports remain unconfirmed; the v82 mission-dialog fix is retained.

## v85 verification
All nine Node verification scripts pass, including new orbital audio lifecycle checks: no playback before orbit, no restart on redraw/results, visibility and mute pause/resume, natural completion without replay, and fresh-game reset. Game and inline JavaScript syntax checks pass. Extracted embedded credits stream is stereo AAC, 146.214 seconds, 1,780,976 bytes; index.html is 24,706,754 bytes. iPad playback has not been tested.

## v86 verification
Nine Node verification scripts pass. Sentry tests verify smooth sweep while armed, direct firing aim, red light off on firing, muzzle flash present only during firing, and no perspective scale or old normalization rotation. A static SVG render was visually inspected for pivot alignment and barrel-tip flash position. iPad animation playback has not been tested.

## v87
v87: all ten Node verification scripts pass. New board-token tests cover distances zero/one/two/three, nearest player beyond current player, fog handling, animated range transition, four role crops, active-turn and scientist/captive markers. A static SVG render was inspected for marine and alien silhouette readability. JavaScript syntax checked. iPad gameplay/animation has not been tested.
