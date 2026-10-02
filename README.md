# The Last Ship v77 — changed-files update

Extract over existing v76, replacing matching files.

Countdown lines keep both outer endpoints attached to the orange perimeter; only the interior vertices animate. Each digit and colon is centred separately in its box. The display ticks once per second during its five seconds, for example 05:00, 04:59, 04:58, 04:57, 04:56. Tick updates change only the text, preserving animation continuity. Zero stays at 00:00.

The status label reads IMPREGNATED, without PRIVATE. Visibility and infection mechanics are unchanged.

Every enabled Acknowledge press plays TLS crt pwr dwn short at 20% gain, including presses that reveal the rest of a typed message or advance linked reports. Final closure does not duplicate that sound. Linked briefing drone/startup continues through transitions without restarting. Ordinary non-Acknowledge closures retain their existing closing cue.

TLS EVAC.m4a plays once at 100% gain after the two-hour countdown has disappeared and the next handoff screen has rendered. It is embedded unchanged in index.html.

Freeze protection: terminal media errors no longer abort cleanup; expired closing locks can clear even if a timer is delayed. Popup acknowledgement resolves despite a redraw failure, event/message sequence locks clear in finally blocks, and turn-flip completion is scheduled before drawing. A permanent lock from a simulated audio failure was reproduced in v76 and no longer occurs in the same v77 check. The exact cause of the reported iPad freeze remains unconfirmed.
