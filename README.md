The Last Ship v142 — overwrite supplied files, retaining other assets.

Final battle: body and tail sprite pixels with alpha above 16 become fully opaque during the existing one-time sprite preparation. Empty pixels remain empty; very soft edge pixels remain antialiased. Existing dark coloration, movement, waves, jump timing and muzzle flashes are unchanged.

Roster: name rows align at the top with compact spacing instead of stretching across the registration area. APATE panel aligns at the top and the schematic height is reduced. The keyboard uses the freed vertical space and taller keys, with shorter-screen adaptations and scrolling for extra name rows. Tutorial button pulses until the first four names are filled; it updates immediately while typing or clearing. Fifth/sixth names do not keep this tutorial prompt flashing. Reduced-motion users see a steady highlighted button.

Verified: opacity processing on actual body/tail sprites using canvas confirms body alpha 255 and unchanged empty pixels; tutorial prompt checks for blank, complete, cleared and extra-player names; JS syntax; embedded audio unchanged. Browser layout check could not run because the browser download failed. Physical iPad layout and visuals remain unverified.
