# The Last Ship v105

Apply over v104. Changed files only.

The APC arrival blank screen now shows a centred green MU-TH-UR deployment transmission. Cursor appears three seconds after the APC audio starts. Every line begins with a 0.9-second blink pause, followed by fast 20ms-per-character typing.

Location - LV423
Colonial Marines Deployment 1015A-2
LOE - Rescue and Evac

The message completes at 7.14 seconds. TLS drone (existing wristDrone at 10% gain) plays during typing and stops during cursor pauses and after the message is complete. The completed text remains readable until 10.987 seconds; the existing CRT collapse and power-off sound run for 1.556 seconds before the board fade starts at 12.543 seconds. Normal title flow retains its existing one-second APC pre-roll. Title Skip starts the APC sound immediately and uses the same audio-relative text timing.

Transmission timing pauses when hidden and resumes; reduced-motion mode uses a text fade instead of collapse. No new audio assets or gameplay changes.
