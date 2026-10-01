# The Last Ship v30 sound credits

15 MP3 assets are embedded in index.html. Text effects are silent; keyboard and ECG audio have been removed. The wind, CRT, creature calls and human voice recordings, including the user-selected Monster Screech by DRAGON-STUDIO (Pixabay Content License), retain their v28 processing and reverb. Individual sources and edits are listed in audio-manifest.json.

## Selected motion tracker beep

Balcoran — motion tracker beep.wav: https://freesound.org/people/Balcoran/sounds/478186/

Acquired as the edited MT-return.mp3 copy from https://github.com/FrunkQ/dynamic-map-renderer-v2, whose README explicitly credits this file to the selected Freesound recording. It has been quietened and faded for repeated proximity pings.

The uploader and the credited copy label the sound CC0 1.0. The original description says it is from Aliens; whether it is a recreation or a film extract remains unverified. This metadata does not establish permission from a film rights holder.

The other sound sources and their licences are retained in audio-source-notes.json and audio-manifest.json. No RTTY recording is included, following the request to keep MU-TH-UR text silent.

## APC arrival (v31)
“diesel truck jake brake and air brake” by nuncaconoci. User-selected Pixabay recording 63219; downloaded as the same title/author recording from its credited Creazilla mirror, listed CC0 1.0.
Source: https://pixabay.com/sound-effects/city-diesel-truck-jake-brake-and-air-brake-63219/
Downloaded source: https://creazilla.com/media/audio/15481566/diesel-truck-jake-brake-and-air-brake
Excerpt: 00:11 to the end (15.51 seconds of source). Original pitch, 30 ms entry fade, level reduced to 65%, embedded in index.html under `apc`. Wind remains a separate continuous player throughout the arrival.

## v32 additions

- **Horror sting** — SamsterBirdies, [Freesound 522567](https://freesound.org/people/SamsterBirdies/sounds/522567/), CC0 1.0. Used on new tracker contact.
- **Orchestral Horror Swarm — Chaotic String Jumpscare** — **Coghezzi - Freesound.org**, uploaded by TommasoMotteran, [Freesound 854154](https://freesound.org/people/TommasoMotteran/sounds/854154/), [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/). Volume reduced and short fades added; used on marine capture.

Scientist discovery no longer plays a scream; its unused voice recordings are removed.


## v33 title music

**Cinematic horror — rising string ambience** — Tomas_Herudek, [Pixabay 443390](https://pixabay.com/sound-effects/horror-cinematic-horror-rising-string-ambience-443390/), Pixabay Content License. User-provided MP3. Original 00:15 through the end; volume reduced, 6-second fade-in, with no fade-out.

The v40 title cue uses original 00:15 through end; fades in over six seconds and finishes naturally over APC arrival. Original pitch and speed retained.

Version 36: title starts at 2.5× and draws outward for most of its pullback; THE · LAST · SHIP uses centred dots. Title music starts at source 00:15 and ends naturally, overlapping APC arrival and wind (no fade-out). Standard crew orders are skipped after handover; classified orders remain. Private actions use dark red CRT controls. The mission briefing is centred within the board and says “Ensure no alien organism leaves the planet’s surface.”

## v40 MU-TH-UR login

The user-provided 16.74-second MP3 extracted from `RPReplay_Final1790781942.mp4` starts on LOGIN and stops on ACKNOWLEDGE. It is embedded under `muthurLogin` and plays at 0.72. Rights for third-party use of the source recording have not been established.


### v43 capture addition
User supplied pulse rifle recording from RPReplay_Final1790788076.mp4, trimmed to approximately 4.2 seconds with subtle reverb. Embedded for offline playback. Capture sequence layers the existing horror swarm, this pulse rifle, then the existing Launch Mission screech, with the marine voice retained.


### v44 background wind replacement
Active background wind replaced with user supplied RPReplay_Final1790790516.mp4 audio. Leading/trailing silence removed, end and beginning blended with a three-second circular crossfade, volume matched to previous wind. Embedded 122.7-second loop replaces the previous embedded wind recording.


### v45 event and specimen effect
User supplied RPReplay_Final1790791206.mp4 audio, leading and trailing silence trimmed with three-second ending fade. Plays for event reports and specimen/egg recovery; continues after the four-second popup closes.


### v46 crew roster loop
Separate looping edit of user supplied RPReplay_Final1790791206.mp4: silence trimmed and three-second circular crossfade. Plays on crew roster, stops on launch or leaving roster, follows sound toggle. Event/specimen effect keeps its ending fade.


### Startup loop
User supplied TLS loop.m4a, decoded to PCM without fades, crossfades or trimming. Loops from crew roster appearance until LAUNCH MISSION. No event/specimen recording.

### Scientist discovery
TLS event.m4a supplied by user, played once when each scientist is first found. No added fades or edits.

### Player noise
TLS alien roar.m4a supplied by user; played once per noise-producing action.

### Search results
TLS discovery.m4a plays when a cache or false PDT search result opens. Scientist discoveries retain TLS event.m4a. Every search result triggers TLS alien roar.m4a once after closing, automatically or with ACKNOWLEDGE. Other noise timing unchanged.

### v54 capture audio
Female captures play the combined female MP3 once at volume 1, including its popup snap, swarm, rifle, alien screech and female scream. Separate capture sounds are skipped for female players. Male captures retain their sequence with TLS male gunfire.m4a at 500 ms and volume 0.70 in place of the pulse rifle.

### v55 male capture
Gunfire now uses TLS male gunfire 2.m4a at 500 ms. TLS alien roar plays at 5 seconds, including after normal popup dismissal. Existing 1-second alien screech and marine scream remain. Female capture unchanged.

### v56 capture playback
Male and female captures each play their respective combined MP3 once at volume 1. Separate capture layers, delayed roar timer and popup snap are removed from capture playback. Unused individual capture clips are removed from embedded audio and sound-check choices. Shared popup, launch screech and player-noise roar remain for other game actions.

### v60 roar rules (supersedes earlier noise/search rules)
Routine gameplay noise is silent: cache/PDT searches, spores, jetpacks and APC incineration do not play the standalone TLS alien roar. Their gameplay noise still attracts the alien. Alien Lunge plays the roar once as movement begins, unless its destination will capture an eligible player. In that case only the combined capture recording plays. Discovery/scientist-found and male/female capture recordings unchanged.

## v60 seamless drone

TLS CRT drone(1).m4a is decoded to stereo 44.1 kHz PCM and trimmed to matching waveform phases. No fade-in, fade-out, crossfade, overlap or added silence. The loop uses one circular Web Audio buffer. See verification/drone-trim.json for exact source sample boundaries.

## v61 terminal audio

User supplied: TLS CRT on short(1).m4a for gameplay popup opening; TLS CRT drone(1).m4a trimmed to the existing seamless PCM WAV for the terminal drone; TLS muthur pwr dwn .m4a for MU-TH-UR intro shutdown only. Opening and MU-TH-UR shutdown recordings are embedded unchanged. The drone begins when INITIALISE is pressed and stops when the MU-TH-UR screen starts collapsing. Gameplay popups retain their startup and continuous linked-session drone; their final closure is silent. Capture and discovery recordings remain unchanged.

## v63 playback and levels

Embedded recordings are unchanged. Effects are decoded silently and played only on request through Web Audio gain nodes, with a native fallback. TLS CRT opening gain is 0.6; TLS discovery gain is 1.2 with transient peak limiting; terminal drone gain is 0.55. The circular PCM drone and MU-TH-UR shutdown recording are retained. No fade or crossfade is added.

## v63 user-supplied recordings

- TLS Ripley speech.m4a — embedded recording, starts when Launch Mission is pressed, at 50% gain.
- TLS chances.m4a — embedded MU-TH-UR speech; begins with the requested CHANCES line.

Both supplied by the user and embedded without audio editing.

- TLS crt pwr dwn short .m4a — player turn popup closing, once.
