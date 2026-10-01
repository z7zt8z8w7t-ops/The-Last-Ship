# v66 checks

Passed existing gameplay, cinematic, audio, terminal and dropship tests. New assertions verify Ripley gain 0.5, turn startup gain 0.3, turn drone gain 0.275, one power-down cue on turn-popup closure, and no power-down cue for ordinary event popups.

New embedded recordings match the supplied files byte for byte; other embedded recordings match v65. JavaScript syntax and offline asset paths pass. ZIP contains exactly the files differing from v65 and passes ZIP integrity checks.

Tests simulate DOM/audio/canvas. No physical iPad playback or real-browser visual verification was available.
