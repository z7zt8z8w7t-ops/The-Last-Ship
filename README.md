# The Last Ship — v27

All 15 audio recordings remain embedded in index.html. Game playback now uses native audio elements, the same playback method as the working sound-check page. No AudioContext or external MP3 requests are used.

The first MU-TH-UR tap unlocks the native players and starts the recorded wind. Each player's first gesture primes reusable effect players, allowing subsequent timed ECG and event sounds. SOUND ON/OFF controls all sounds. A playback rejection identifies the affected sound and offers tap-to-enable.

The rejected Start Game recording has been removed. A replacement composite uses the sharpest roar section from the recorded Dino Hiss Dragon Roar with a lower rasp from Monster roar: pitch change, EQ, compression and short echo produce a sharper creature shriek. No Alien/Aliens movie audio is included.

Playback levels are baked into the embedded MP3s because iPad may ignore JavaScript media-element volume changes. The wind starts at its mastered quiet level; smooth Web Audio fades are no longer used.

Upload all files in this ZIP to the repository root, replacing the previous files. No audio folder is required. Check the build marker reads v27. The existing service worker may reload the app once during the update. Saved games are retained.

Open sound-check.html to audition all embedded audio, including the new start-screech. Sources and edits are listed in SOUND_CREDITS.md.

Browser testing uses WebKit at an iPad-sized touch viewport. Physical iPad playback and resemblance of the new screech to the requested film sound must still be judged on the user's device.
