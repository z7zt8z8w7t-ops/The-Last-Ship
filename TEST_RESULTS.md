# v34 validation

- Approved preview timing: Start Game launches music from original 00:15 immediately; five seconds of black, then 30.3 seconds of title reveal/hold. Blue flash hits at opening 00:35.3, fades to black by 00:36, and APC begins at 00:36.75 after music fade-out.
- WebKit verifies glow position at the A centre, progressive brightness, flash and black transition, and title audio stopping before APC starts.
- Backgrounding freezes music position, glow animation and cinematic clock; all resume without restarting.
- Reduced-motion mode retains sound timing and replaces glow/flash with static title and gentle fade.
- Complete touch-enabled WebKit opening, mission and player briefings, native audio recovery, portrait, tracker range and offline reload checked.
- All 27 artwork images retain clean bytes and fully decode. All 17 embedded recordings match integrity hashes and fully decode with FFmpeg.
- Game and inline JavaScript syntax passed; no browser exceptions.

Physical iPad listening has not been performed here.
