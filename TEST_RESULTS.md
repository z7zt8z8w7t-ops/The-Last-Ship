# v70 verification

All six automated suites pass: gameplay, revised events, drone/audio playback, terminal sessions, cinematic cues and dropship layers. Syntax checks pass for game.js, artwork.js and sw.js.

The event tests cover seven unique events and deck refill; persistent event terrain; non-stopping events versus Spore Burst; Earthquake revealing an unknown collapsed bridge; private infection without public log disclosure; persistent impregnation after medkit/capture; one-move injured turns and restored mobility; infected extraction causing Company victory versus staying behind allowing crew victory; PDT Locator with no scan charge; five-second Motion Echo without terrain reveal; and Chemical Research using vial artwork.

Audio: all 25 embedded payloads decode as valid Base64. The new Ripley clip matches the uploaded file byte for byte; the other 24 payloads are unchanged. Playback mocks verify Ripley at 50%, discovery at 130%, silent preload/unlock and the isolated Launch Mission cues. All embedded artwork images decode successfully; the reagent-vial image was visually inspected.

ZIP integrity and changed-file patch reconstruction are verified against v69. These are automated checks and artwork inspection; physical iPad playback and multiplayer playtesting remain to be done.
