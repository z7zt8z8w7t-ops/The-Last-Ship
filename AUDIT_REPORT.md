# The Last Ship v89 audit and v90 cleanup

The missing terrain in the screenshots is strongly consistent with failed requests for the new `terrain/*.png` assets. All 13 source images decode locally. The player sprite and yellow light shapes do not use those image requests, which explains why they can remain visible while the terrain, APC and dropship disappear. The live site's HTTP responses and installed service-worker state were not available for verification, so the exact deployment failure is not proved.

## Cleanup completed

- Embedded the current terrain atlases in terrain.js, eliminating terrain-folder requests. The same approved images, source dimensions and crop geometry are retained, compressed to WebP at quality 92. terrain.js is approximately 6.7 MB.
- Removed obsolete embedded terrain from artwork.js. Event popup terrain illustrations now use crops of the current broken bridge, spores and event artwork.
- Removed retired dropship renderer/script and cache dependencies, the empty old dropship canvas, dead flight/contact functions, old tile/case rendering functions, unused old ground/flare exports and unused old player-colour hex animation rules.
- Removed the unused standalone popup snap recording and its registry/manifest entries. All 31 remaining recordings have live playback paths; they have been retained.
- Removed obsolete role-patch, old sentry-part and gun-emplacement file references. REMOVE_OLD_FILES.txt identifies the old files to delete from an existing installation.
- Preserved the current gameplay rules, audio timing/gains and functioning input recovery. Gameplay faults below were documented rather than silently changing their rules during cleanup.

## Problems found

| Priority | Finding | Evidence and status |
|---|---|---|
| High | Missing terrain/APC/dropship in supplied screenshots | Strong match to missing external terrain images. v90 eliminates that separate-folder dependency. Live deployment cause remains unverified. |
| High | Intermittent iPad input freeze remains unresolved | 100 simulated games did not stall, but mocked DOM/timers cannot reproduce Safari hit-testing, compositor behavior, touch timing or memory pressure. This is not a confirmed freeze fix. |
| High | Large startup resource load | Gameplay preload prepares most audio recordings at once. Estimated decoded audio footprint, including roster/drone but excluding native orbital playback, is roughly 153 MB before other browser overhead. Terrain atlases also occupy substantial decoded memory. Compressed download size does not reduce decoded image dimensions. This is a plausible resource-pressure contributor, not a demonstrated cause of the freeze. |
| Medium | Dropship is visibly clipped | Canvas inspection shows its nose/right portion meeting the apron/canvas crop. drawLanding clips the scene to a narrow polygon and the board canvas boundary. Embedding images restores loading but does not correct this drawing geometry. |
| Medium | Terrain animation stops after a hidden-page frame | mount's frame callback returns when document.hidden is true and schedules no successor. No terrain visibility-resume handler restarts it. Reproduced in the audit test. A later game render can restart it. |
| Medium | Facehugger injury permits an extra move on the attack turn | After moving onto the event with one move already taken, runEvent sets remaining moves to min(current, 1), rather than accounting for the move already taken. The player can travel a second hex that turn. Reproduced. Future turns are capped correctly. |
| Medium | Sentry deployment retains the previous site overlay | Terrain becomes open ground with an emplacement, but the tile's cache/PDT site is retained. On a cache tile, foreground still draws flashing blue cache beacons over the emplacement. Reproduced. The underlying emplacement image itself does have rendering priority. |
| Medium | Flare has no visible board marker | In v89, flareIcon returns an empty string. The flare still influences the alien, but no board marker is drawn. The cleanup removes this empty renderer, preserving the existing behavior. |
| Medium | Boarding dialog button layout is inconsistent | The terminal wrapper moves the first closeSearchPopup button into its footer and renames it ACKNOWLEDGE. That button actually means REMAIN ON SURFACE; CONFIRM BOARDING stays in the content. This does not preserve the intended two-choice wording/footer layout. Confirmed by code inspection; physical iPad layout untested. |
| Low | PRIVATE wording remains in Facehugger popup | The player-tab status has been changed, but the event message still begins PRIVATE STATUS: IMPREGNATED. Reproduced. |
| Low | Boarded/captured players still affect alien artwork proximity | alienRevealed counts all players without excluding boarded/captured players. Those removed from surface play can still determine sprite-versus-orb visibility. Confirmed by code inspection. |
| Low | Old ambient alien calls still run | A 35–80-second scheduler still plays alien1/alien2/alien3 during normal play. These are active calls, not unused recordings, so they were retained. If the intended rule is that all alien vocal effects occur only for lunge/capture, this scheduler needs an explicit behavior change. |
| Low | Fixed lights are part of the artwork | Cache/staging images include baked light glow. Painting small dark patches and adding live lights does not completely separate the light artwork from the tile. A truly dark collected-cache state and fully red staging illumination would benefit from separate unlit terrain/light layers. |

The board background is also a greatly enlarged crop of the ground atlas. It is not a separately designed board-scale seamless background. Edge protrusions use clipped fragments of opaque atlas images, so they may show obvious joins/background patches. These are artwork/rendering limitations rather than missing-code dependencies.

## Verification performed

- JavaScript syntax checks passed for all five production JavaScript files and every inline executable script in index.html.
- All 31 remaining embedded audio recordings were base64-validated and successfully inspected with ffprobe.
- All 13 embedded terrain sources decoded and rendered in the canvas check. Retired filename references are absent from production code and the cache manifest.
- 1,000 generated boards passed terrain-count and same-type-adjacency constraints.
- 100 deterministic state-machine playthroughs covered four- and six-player games: 900 accumulated rounds, 7,761 moves, 3,268 reports, 611 captures and two boarding confirmations. Ten games used a simulated failing audio-play method. They reached mission end without a state-machine stall.
- Targeted tests cover mission acknowledgement, turn/private handoffs, player-four item/touch routing, sentry deployment/fire/retreat, capture timing, repeated scientist discovery, permanent equipment loss, nest egg replacement, boarding turn removal, quarantine contamination/purge outcomes, countdown, skips and orbital result timing.
- 14 regression/playthrough scripts passed. A fifteenth audit-findings script also passed by reproducing four known faults; that is evidence of remaining bugs, not evidence that they are fixed.

## Limits

No physical iPad, LG display or Safari/Chromium browser-engine playthrough was performed. The virtual tests mock DOM, audio and clock behavior; canvas rendering is tested separately. Browser layout, real touch interaction, audible mixes, live network requests, real service-worker installation, memory exhaustion and exact deployment completeness remain unverified. The existing installation still supplies its icons, manifest, alien-planet background and other unchanged files.

v90 is a cleanup patch over v89, not a complete standalone game. It removes the terrain-folder dependency and obsolete assets/code, while leaving the documented gameplay and layout faults for a focused repair pass. The ZIP contains only changed/new files. Every included file is below 25 MB individually.
