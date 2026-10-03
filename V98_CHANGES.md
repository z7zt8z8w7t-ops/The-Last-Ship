# v98 changes

- TLS EVAC and Rescued runtime gains reduced to 50%.
- Removed the solid flare aura circle, preserving the flare sprite, ember and terrain red glow.
- Green dropship navigation lamp moved from the gun barrel to the wing engine housing.
- Quarantine seat controls are explicit stacked CLEARED and CONTAMINATED choices with selected highlights. Multiple passengers can be contaminated. The main control reports the number selected and asks for named confirmation before ejection. Changing a classification cancels the previous confirmation. A craft still requires at least one cleared Marine to depart.
- All-clear launch remains available without selecting a victim. Multiple ejected players are placed on the staging tile; contamination checks use only remaining passengers.
- Trialled compact encodings for all 32 embedded clips. Retained the original when compression did not save at least 5%. Other clips use 96 kbps encoding with their existing MP3/AAC container. WAV loop clips remain PCM WAV at 22050 Hz to retain gapless decoded-buffer playback. Timing, fades, stereo channels and runtime gains are otherwise unchanged. Encoder padding differences are below 60 milliseconds.
- Field Manual explains the revised quarantine choices and confirmation.
