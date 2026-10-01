# Verification

All agreed rules/naming changes applied. Sites and false PDTs exclude Gravity Wells, nest, APC and Dropship. Inventory use/research costs no action; other activities keep their costs. Scanning reveals but leaves the egg with the holder; only APC incineration destroys it. Egg recovery popup uses role-specific instructions and red CRT for Company Man, green for crew. Capture popup retained; redundant handover/log report removed. CMC IDs. Noise roar coalesces repeated synchronous noise in one action. Roster appearance starts startup loop, launch stops it.

Verified JavaScript syntax, randomized placement, free-item behavior and UI gating, egg scan/incineration, role popup style, decoy validation, noise deduplication, roster loop routing, embedded media and ZIP integrity. Physical iPad playback requires device verification.

## v53
Search metadata selects discovery/scientist sounds on opening and delays roar until result close. Search noise is recorded immediately for alien behavior, without immediate roar. Manual and automatic close share one guarded fade/finish path; stale timers and repeated presses cannot double-play. Search popups have ACKNOWLEDGE; other popups retain automatic closure. Tests cover cache/egg/false PDT/scientist searches, sound mute, game replacement, auto/manual close and repeated presses. Existing v52 checks retained. Existing rules passed again, including 1,000 randomized maps. All executable inline scripts pass syntax checks. Existing embedded audio and artwork remain byte-identical to v52; discovery audio matches the supplied M4A. Physical iPad playback not tested.

## v54
Verified female combined capture plays alone, with separate popup snap and all capture layers skipped. Verified male gunfire replacement at 500 ms; swarm and 1-second screech/voice retained. Search lifecycle tests and 1,000-map rules regression passed. Existing media unchanged; new embedded clips match their source files. Inline JavaScript syntax checks and ZIP integrity passed. Physical iPad playback not tested.

## v55
Verified new male gunfire embedded byte-for-byte, roar once at 5 seconds after popup closes, cancellation on mute/game replacement/hidden document. Female capture and search audio lifecycle regressions passed. Existing media/artwork unchanged apart from male gunfire. JavaScript syntax and ZIP integrity passed. Physical iPad playback not tested.

## v56
Male/female/default-voice captures play only one combined clip, with no popup snap or delayed separate effects. Mute and search audio lifecycle checks passed. Combined male MP3 matches preview byte-for-byte; female clip and remaining media/artwork unchanged. Removed unused separate capture recordings. Inline JS syntax and ZIP integrity passed. Physical iPad playback not tested.
