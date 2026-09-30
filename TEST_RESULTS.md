# v36 validation

- Full touch-enabled WebKit opening: music starts on Start Game from original 00:16, five seconds of black, A-centred title pullback with letter reveal, crescendo flash at opening 34.3s, black/APC over wind with the title music ending naturally during APC arrival, board fade and mission briefing.
- Title starts at 2.5x zoom; camera, glow and audio freeze during backgrounding and resume. Glow follows A during pullback. Reduced motion omits camera motion/glow/flash while retaining sound timing.
- Roster and rules tested at 1536x1067, 768x1024 and 390x844. Matching CRT buttons, player-name retention after rules, six-player limit and disabled add button verified.
- Field manual contains 11 sections covering implemented terrain, all items and specimen outcomes, all eight events, alien/capture/escape, scanning/transfers, Corporation actions, tracker and launch conditions.
- Rules content scrolls inside the window with acknowledgement visible. Board and action panel remain inside viewport. Outer page cannot scroll; touchmove outside permitted scroll areas is cancelled.
- Legacy mission state removed on load. Mission state is neither loaded nor saved, no continuation control/handler remains, and reload returns to setup. Sound preference still persists.
- Offline reload, native audio recovery, board-centred mission briefing, standard crew handover skipping repeated orders, classified orders and red Private actions and tracker range checks pass; ECG/text/scientist discovery remain silent.
- All 27 artwork payloads retain clean bytes and decode fully; all 17 audio hashes and FFmpeg decodes pass.
- Game and inline JavaScript syntax pass; no browser exceptions.

Physical iPad gesture/listening validation has not been performed here.

- Mission briefing centred within the board and limited to 680 px, tested in landscape and portrait. Updated organism wording verified. Private actions tested with glowing valid lettering and dim disabled controls.
- Title uses centred separators and delayed outer strokes, completing around title time 28.2 seconds while the camera pulls back over 26 seconds.
