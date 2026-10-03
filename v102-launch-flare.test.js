const assert=require('node:assert/strict'),{harness}=require('./audit-harness'),stand=require('../last-stand');
(async()=>{
let h=harness(),t=h.t;t.s.delivered=2;t.s.players[1].boarded=true;t.s.players[0].pos=t.DROPSHIP;t.launch();assert.equal(t.s.phase,'quarantine');assert.ok(t.s.players[0].boarded);assert.deepEqual(Array.from(t.s.quarantine.eligible),[0,1]);
h=harness();t=h.t;t.s.delivered=2;t.s.players[0].pos=t.DROPSHIP;assert.ok(t.canLaunch());t.launch();assert.deepEqual(Array.from(t.s.quarantine.eligible),[0]);
t.s.players[2].captive=true;t.s.players[2].pos=t.s.nest;h.context.window.ShipLastStand=stand;t.grantClearance(0);t.finishLaunch(false);assert.equal(t.s.phase,'departing');for(let i=1;i<4;i++){assert.equal(t.s.players[i].pos,t.DROPSHIP);assert.equal(t.s.players[i].captive,false)}assert.equal(t.s.departure.battle.fighters.length,3);assert.ok(t.s.departure.battle.fighters.every(f=>f.hex===t.DROPSHIP));
for(const delivered of [1,2])for(const aboard of [false,true]){
 h=harness();t=h.t;t.s.round=9;t.s.delivered=delivered;t.s.players[0].boarded=aboard;t.s.phase='alien';t.s.alienMovesLeft=0;const done=t.runAlienTurn();for(let n=0;n<20;n++){await new Promise(r=>setImmediate(r));h.advance(1000)}await done;
 assert.equal(t.s.phase,delivered===2&&aboard?'quarantine':'over');if(t.s.phase==='quarantine'){assert.equal(t.s.round,10);assert.equal(t.ui.sequence,false);assert.deepEqual(Array.from(t.s.quarantine.eligible),[0])}else assert.equal(t.s.winner,'failed');
}
h=harness();t=h.t;const target=t.adjacent(t.HOME).find(k=>t.s.tiles[k].terrain!=='void');t.s.tiles[target].known=false;t.s.players[0].cargo=['flare'];t.beginItem(0);t.ui.targetHex=target;t.useItem();assert.equal(t.s.tiles[target].known,true);assert.ok(t.s.flares.some(f=>f.hex===target));t.s.flares=[];assert.equal(t.s.tiles[target].known,true);
console.log('PASS: caller boarding, sole launcher, all left-behind Marines staged including captives, zero-hour eligibility/failure paths, unlocked quarantine and permanent flare reveal.');
})().catch(e=>{console.error(e);process.exitCode=1});
