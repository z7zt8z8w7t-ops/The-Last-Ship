# v95 verification

21 JavaScript check scripts passed, plus the audio integrity and syntax checks.

- 100 seeded four/six-player virtual games completed without a stalled state: 879 total rounds, 7,625 moves, 2,957 acknowledged reports and 590 capture reports. These random games reached their mission end; deterministic boarding tests separately cover explicit boarding, cancellation, confirmation and quarantine entry.
- 1,000 generated boards passed terrain counts and spacing checks.
- Actual input-route checks cover taps without compatibility clicks, duplicate-click suppression, movement/item actions, fourth-player flare use, sequence blocking, acknowledgement and transition continuation.
- v95 checks cover arrival without automatic boarding, Board Dropship confirmation, Cancel, independent diagnostics under locked gameplay, error capture, blue lightning/fog boundaries, once-only delayed thunder, muted thunder, ship foreground lights/ramp, and decoded new artwork.
- Native canvas checks cover lighting and an artwork composite using production token dimensions and placement. verification/v95-board.png is this composite; it is not a Safari screenshot and does not validate browser CSS/SMIL animation.
- Earlier mission-popup and round-report freeze reproductions continue to pass their fixes. Active report queues are retained.
- All 31 existing embedded recordings match their source hashes and fully decode. Version changes preserve their combined SHA-256: 48388d44ebdbd56bc51ef9082e939d2d8159f254aeed828863e64f09aaf0e917. Thunder is generated procedurally; no existing recording or volume level was replaced.
- Production JavaScript and inline audio scripts parse. index.html is 24,700,945 bytes, below the user's 25 MB per-file target.

Limitations: no installed Safari/WebKit or Chromium browser is available. Node VM tests use mocked UI/audio clocks; canvas raster tests use native canvas. The latest device-only freeze is unconfirmed; diagnostic evidence from the iPad is still needed. Existing documented Facehugger current-turn movement limitation and cache-site/emplacement state remain outside this update.
