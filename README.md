# The Last Ship v74 — changed-files update

Extract over existing v73, replacing matching files.

Mission orders and Company Representative briefings now share the turn-popup audio sequence: TLS CRT startup 15%, drone 10% until closure, power-down 20%. Linked messages keep one session without restarting the sounds. Other ordinary popups retain their existing cues.

Turn screens replace Orders Received/Pass to headings with Player Name — a random Marine phrase. Each phrase stays fixed through redraws for that turn; the departure countdown remains below.

After alien movement and acknowledged reports at each round end, an orange-on-black full-screen T MINUS display appears for five seconds. Inner diagonal lines sweep inward into an X and reset while the outer frame remains fixed. Hours show 08:00 after round one, down to 00:00 after round nine. The first five seconds of the supplied countdown video audio play during this interstitial and stop on closure. This is the explicit exception to acknowledgement-only popups. An Alien victory ends immediately without the interstitial.

TLS facehugger.m4a plays once when Facehugger Attack opens, at 100% gain. All new audio is embedded in index.html.
