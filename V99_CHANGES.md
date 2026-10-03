# The Last Ship v99

Apply this changed-files update over the complete v98 installation.

- Dropship navigation lights moved to the approved marked fittings. Translucent amber roof beacon starts after the two-hours-left countdown closes and remains active.
- Bioscanner examines a whole person on the same tile for one action and one shared charge, including empty inventory. Male/female anatomy follows the existing roster voice selection. Reports show two equipment slots and CLEAR or flashing ANOMALY DETECTED with a large central chest mass. Search audio plays on opening; acknowledgement retains CRT power-down audio.
- Passing shows the item name. Taking chooses an inventory slot, with names hidden until the current player scans its holder. Inventory changes expire that knowledge. Free Marines with empty inventory can take equipment.
- Decorative CRT interference and scanline flicker added to terminal reports and quarantine, with reduced-motion support. Overlays do not receive pointer input.
- Field Manual and build/cache version updated. Embedded audio retained unchanged.

Validation: JavaScript syntax, 100 simulated games (899 rounds, 7,501 moves, 3,204 reports), 1,000 board generation/spacing checks, event/tracker/turn/boarding/quarantine regressions, new scan/transfer/acknowledgement/light tests, and decoding/hash checks for all 32 embedded audio clips passed.

Limitations: no physical iPad/Safari play-through or listening test performed. Automated acknowledgement/input checks passed, but an intermittent device-specific freeze is not ruled out by simulation. This package intentionally omits unchanged files and requires the existing complete game installation.
