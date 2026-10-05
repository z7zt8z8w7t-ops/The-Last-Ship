# The Last Ship v91 sound credits

31 active recordings remain embedded in index.html. The unused standalone popup snap has been removed. The three ambient alien calls remain because the game still plays them; they are not unused recordings.

Source credits, supplied filenames, acquisition details and edits are retained in audio-manifest.json. User-supplied film recordings retain their provenance as supplied. This cleanup does not establish additional rights or change recording content.

Runtime gains are controlled by the audio calls and engine. Active game effects, title and MU-TH-UR recordings, scientist discovery/boarding, capture sequences, countdown, sentry firing, music and orbital audio are retained.

## v91 audio repair

Embedded recordings were restored from intact earlier copies. The orbital recording was re-encoded from the original user upload at the existing stereo AAC 96 kbps setting. No title, speech or terminal gains were changed. The countdown uses a 120 ms gain ramp at its ending, retaining its existing peak gain and five-second display. SHA-256 source hashes and provenance are stored in verification/audio-integrity.json.

## v97 audio update

Spore Burst is an original procedurally synthesized effect, mixed as three overlapping copies at 0, 0.15 and 0.30 seconds and encoded as stereo AAC. There are now 32 embedded recordings. The countdown ending gain ramp described in the historical v91 section has been removed.

## v98 compact embedded audio

All source credits remain. 31 clips were re-encoded compactly; one retained its original bytes because the candidate saving was too small. PCM terminal/roster loops remain WAV at 22050 Hz; other changed clips use 96 kbps in their existing MP3/AAC container. Runtime EVAC and Rescued gains are 50%. Compression trial measurements and updated hashes are stored under verification.

## v100 departure
User-supplied Final battle.m4a, embedded as stereo AAC at 128 kbps without trimming or intentional gain/fade changes. Wind uses the existing loop; delayed thunder uses the existing procedural thunder generator with overlapping storm tails.

## Final battle soundtrack replacement
User-supplied We are leaving.m4a replaces Final battle.m4a, stereo AAC 128 kbps. Duration 50.271202 seconds; animation, gunfire and alien-death timings unchanged.
