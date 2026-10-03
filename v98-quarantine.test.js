const {harness}=require('./audit-harness'),assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path');
for(const count of [4,6])for(let mask=0;mask<(1<<count)-1;mask++){
 const h=harness(),t=h.t;t.newGame(Array.from({length:count},(_,i)=>String.fromCharCode(65+i)));t.ui.cinematic=false;t.s.phase='play';t.s.delivered=2;t.s.players.forEach(p=>{p.pos=t.DROPSHIP;p.boarded=true;p.captive=false;p.cargo=[];p.impregnated=false});t.launch();
 for(let i=0;i<count;i++)if(mask&(1<<i))t.selectPurge(i);else t.grantClearance(i);
 const selected=Array.from({length:count},(_,i)=>i).filter(i=>mask&(1<<i));
 const markup=t.quarantineMarkup();assert.equal((markup.match(/>CONTAMINATED<\/button>/g)||[]).length,count);assert.equal((markup.match(/>CLEARED<\/button>/g)||[]).length,count);assert.ok(!markup.includes('seat-select'));
 if(selected.length){t.finishLaunch(true);assert.equal(t.s.phase,'quarantine');assert.ok(t.quarantineMarkup().includes('CONFIRM AIRLOCK EJECTION:'));t.finishLaunch(true)}else t.finishLaunch(false);
 assert.equal(t.s.phase,'departing');assert.deepEqual(Array.from(t.s.departure.ejected),selected);assert.equal(t.s.departure.people.length,count-selected.length);for(const i of selected){assert.equal(t.s.players[i].boarded,false);assert.equal(t.s.players[i].pos,t.DROPSHIP)}
}
const h=harness(),t=h.t;t.s.delivered=2;t.s.players.forEach(p=>{p.pos=t.DROPSHIP;p.boarded=true;p.cargo=[]});t.launch();t.selectPurge(1);t.selectPurge(2);t.grantClearance(0);t.grantClearance(3);t.finishLaunch(true);assert.equal(t.s.quarantine.confirmPurge,true);t.grantClearance(2);assert.equal(t.s.quarantine.confirmPurge,false);assert.deepEqual(Array.from(t.s.quarantine.contaminated),[1]);t.selectPurge(0);assert.ok(!t.s.quarantine.cleared.includes(0));assert.equal(t.s.phase,'quarantine');
assert.ok(!t.flareIcon({hex:t.HOME}).includes('flare-aura'));assert.ok(t.flareIcon({hex:t.HOME}).includes('flare-overhead.webp'));
const terrain=fs.readFileSync(path.join(__dirname,'../terrain.js'),'utf8');assert.ok(terrain.includes("[849,688,'#3dff8b'"));assert.ok(terrain.includes('255,25,33'),'soft flare lighting retained');
console.log('PASS: every four/six-person purge combination, confirmation and selection changes, survivor manifests, stacked statuses, flare artwork without hard circle and revised green lamp.');
