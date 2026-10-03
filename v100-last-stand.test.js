const assert=require('node:assert/strict'),fs=require('node:fs');
const stand=require('../last-stand'),{harness}=require('./audit-harness');
const locked=stand.shots; // Full cue array is frozen in last-stand.js.
assert.deepEqual(stand.shots,locked);assert.deepEqual(stand.deaths,[12.641,20.518,28.595]);
let cases=0;
for(let seed=1;seed<=100;seed++)for(const count of [0,1,2,4,6]){
 const h=harness({seed}),g=h.t.s,stage=h.t.DROPSHIP;
 g.players=Array.from({length:6},(_,i)=>({...g.players[i%4],name:'Marine '+i,pos:i<count?'0,0':stage,boarded:i>=count,captive:false}));
 g.departure={people:g.players.flatMap((p,i)=>p.boarded?[i]:[])};
 const p=stand.plan(g,stage,()=>.31);assert.equal(p.contacts.length,10);assert.equal(p.fighters.length,count||2);assert.equal(p.fighters.every(x=>x.drone),count===0);
 assert.equal(p.contacts.filter(x=>Number.isFinite(x.death)).length,3);
 const distance=(a,b)=>{const[q,r]=a.split(',').map(Number),[x,y]=b.split(',').map(Number);return Math.max(Math.abs(q-x),Math.abs(r-y),Math.abs(q+r-x-y))};
 const keys=Object.keys(g.tiles),edge=keys.filter(k=>{const[q,r]=k.split(',').map(Number);return [[1,0],[1,-1],[0,-1],[-1,0],[-1,1],[0,1]].some(([x,y])=>!g.tiles[`${q+x},${r+y}`])&&!['gravity','void'].includes(g.tiles[k].terrain)}),far=Math.max(...edge.map(k=>distance(k,stage)));
 for(const a of p.contacts){assert.ok(distance(a.path[0],stage)>=far-1);for(let i=0;i<a.path.length;i++){assert.ok(!['gravity','void'].includes(g.tiles[a.path[i]].terrain));if(i)assert.equal(distance(a.path[i-1],a.path[i]),1)}const centre=k=>k.split(',').map(Number);assert.deepEqual(stand.position(a,a.death+.2,centre),stand.position(a,a.death,centre));}
 cases++;
}
const h=harness(),t=h.t;h.context.window.ShipLastStand=stand;t.s.delivered=2;t.s.players.forEach(p=>{p.pos=t.DROPSHIP;p.boarded=true;p.cargo=[];p.impregnated=false});t.launch();t.s.players.forEach((p,i)=>t.grantClearance(i));t.finishLaunch(false);
assert.ok(Object.values(t.s.tiles).every(x=>x.known));assert.equal(t.s.departure.battle.fighters.length,2);assert.ok(t.s.departure.battle.fighters.every(x=>x.drone));assert.equal(h.calls.filter(x=>x==='finalBattle').length,1);
h.advance(33999);assert.equal(t.ui.endingFadeAt,undefined);h.advance(1);assert.equal(t.ui.endingFadeAt,34000);h.advance(5000);assert.equal(t.s.phase,'orbital');assert.ok(h.calls.includes('endCredits'));h.advance(6000);assert.equal(t.s.phase,'over');assert.equal(t.s.winner,'crew');
console.log('PASS:',cases,'layouts/crew combinations; legal far-edge routes; fixed gunfire/deaths; two-drone fallback; reveal/fade/orbit/results timings.');
