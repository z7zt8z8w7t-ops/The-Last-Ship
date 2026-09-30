# The Last Ship v28 — sound assets

All 19 included audio assets are embedded as MP3 data inside `index.html`. Original recordings and keyboard keys are CC0; the selected Start Game screech is under the Pixabay Content License. The source links identify the creators. Downloaded HQ preview encodings were edited into game-ready samples. No film soundtrack or Alien/Aliens movie audio is used. No oscillators or random-noise generators remain in the game.

| File | Use | Original source / creator | Preparation |
| --- | --- | --- | --- |
| `wind-low.mp3` | Low wind ambience | [Low wind in a desert canyon 2 by fran_marenco](https://freesound.org/people/fran_marenco/sounds/852881/) | 60-second excerpt; high-pass 35 Hz, low-pass 350 Hz, crossfaded loop, loudness adjusted. |
| `crt-startup.mp3` | MU-TH-UR power-up | [CRT computer monitor startup by corkob](https://freesound.org/people/corkob/sounds/415594/) | First four seconds; trimmed and loudness adjusted. |
| `crt-transition.mp3` | Roster transition | [CRT computer monitor startup by corkob](https://freesound.org/people/corkob/sounds/415594/) | Short excerpt of the same recorded CRT. |
| `popup-snap.mp3` | Popup electrical snap | [CRT computer monitor startup by corkob](https://freesound.org/people/corkob/sounds/415594/) | 220 ms excerpt of CRT switch/static. |
| `ecg-beep.mp3` | ECG single beep | [Heart Monitor Beep by samfk360](https://freesound.org/people/samfk360/sounds/148897/) | One beep cut from the supplied monitor sound effect. Played every 60,000/BPM milliseconds; no flatline. |
| `alien-call-1.mp3` | Creature call 1 | [Monster roar by colorsCrimsonTears](https://freesound.org/people/colorsCrimsonTears/sounds/537883/) | Trimmed and loudness adjusted. |
| `alien-call-2.mp3` | Creature call 2 | [Monster Roar 02 by zerokingfull](https://freesound.org/people/zerokingfull/sounds/347410/) | Creator processed a recorded human scream into a creature roar; trimmed. |
| `alien-call-3.mp3` | Creature call 3 | [Dino Hiss Dragon Roar by 999999990](https://freesound.org/people/999999990/sounds/320345/) | Trimmed hiss/roar effect. |
| `start-screech.mp3` | Start Game only | [Monster Screech by DRAGON-STUDIO](https://pixabay.com/sound-effects/film-special-effects-monster-screech-368677/) · [Pixabay Content License](https://pixabay.com/service/license-summary/) | Exact user-selected/uploaded asset; pitch preserved; 1.35-second damped stereo reverb tail. Rejected v27 composite removed. |
| `marine-male-1.mp3` | Male marine capture 1 | [Male Scream by aldenroth2](https://freesound.org/people/aldenroth2/sounds/272023/) | Trimmed and loudness adjusted. |
| `marine-male-2.mp3` | Male marine capture 2 | [human male scream 2 by JohnsonBrandEditing](https://freesound.org/people/JohnsonBrandEditing/sounds/243376/) | Trimmed and loudness adjusted. |
| `marine-female-1.mp3` | Female marine capture 1 | [Female scream 01 by missozzy](https://freesound.org/people/missozzy/sounds/169810/) | Trimmed and loudness adjusted. |
| `marine-female-2.mp3` | Female marine capture 2 | [Female scream 02 by missozzy](https://freesound.org/people/missozzy/sounds/169811/) | Trimmed and loudness adjusted. |
| `scientist-female.mp3` | Scientist 0 / female artwork | [Female Scream by DigestContent](https://freesound.org/people/DigestContent/sounds/449702/) | Separate human voice recording. |
| `scientist-male.mp3` | Scientist 1 / male artwork | [SCREAM.wav by vmgraw](https://freesound.org/people/vmgraw/sounds/257691/) | Separate human voice recording. |

The ECG source is a pre-existing monitor sound-effect sample; its creator describes it as a beep like a hospital monitor. It is not documented as a recording of a clinical device. Creature sounds are creator-produced vocal/processed effects; professional studio provenance has not been verified.

Open `sound-check.html` to audition the exact packaged files individually.

In v28 all playback levels are mastered into the embedded files. Native audio players replace Web Audio so game playback uses the same media channel as the sound checker. No sound is generated at runtime.


## v28 audio processing

Wind: subtle 1.1-second reverb, circularly wrapped for a seamless loop, wind loudness retained.
Alien calls: 1.15-second damped outdoor reverberation.
Marine and scientist screams: 1-second damped outdoor reverberation.
ECG: dry level reduced to 45% of v27, with light 160 ms reverb; 430 ms total sample fits the fastest 132 BPM interval.
All processing is baked into the embedded MP3s; native playback remains in use.

Keyboard keys 1–4: [Keyboard Soundpack #1 by unicaegames](https://opengameart.org/content/keyboard-soundpack-1-typing-and-single-keystrokes), CC0. Files `Single Keys/keypress-001.wav` through `keypress-004.wav` are actual Cherry KC 1000 keystrokes recorded using a Shure SM7B. They are trimmed to 65 ms with a short fade and mastered quietly. The pack's generated-typing files are not used.
