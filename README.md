The Last Ship v136 — overwrite supplied files, retaining other assets.

Fixes tutorial lesson 16 (Board the dropship) getting stuck on the next player handover. Completed tutorial checkpoints now advance from game state while the CRT closing animation finishes. Pending reports and active sequences still hold advancement. The normal controls retain their CRT closing guard.

Verified with the actual boarding/message/turn functions: reproduced v135 failure; v136 reaches Prepare for launch without handing over to the medic; pending reports require acknowledgement; cancelled boarding cannot advance. JavaScript syntax checks passed. Embedded audio is unchanged. Physical iPad interaction remains unverified.
