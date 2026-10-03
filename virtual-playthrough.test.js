// State-machine playthroughs: actual alien movement, events and popup promises;
// mocked DOM/audio/timers. This does not emulate iPad Safari or visual layout.
const {harness}=require('./audit-harness'),assert=require('node:assert/strict');
(async()=>{
let games=0,rounds=0,moves=0,reports=0,captures=0,boardings=0;
for(let game=0;game<100;game++){
 const h=harness({seed:game+1,failAudio:game%10===0,realFinish:true}),t=h.t;t.newGame(Array.from({length:game%2?6:4},(_,i)=>'Marine '+i));t.ui.boot='game';t.ui.cinematic=false;t.s.phase='briefing';t.s.players.forEach(p=>{p.briefed=true;p.role='crew'});
 let stopped=false;
 for(let tick=0;tick<2500;tick++){
  for(let n=0;n<4;n++)await Promise.resolve();
  if(t.ui.popup){reports++;if(t.ui.popup.kind==='capture')captures++;if(t.ui.popup.kind==='boarding'&&t.s.delivered===2){t.act('confirmBoarding');boardings++}else t.closePopup()}
  else if(!t.ui.sequence&&!t.ui.flipping&&!t.ui.rolling){
   if(t.s.phase==='briefing')t.act('ackMission');
   else if(t.s.phase==='handoff')t.act('startTurn');
   else if(t.ui.private)t.act('closePrivate');
   else if(t.s.phase==='readyLaunch'){stopped=true;break}
   else if(t.s.phase==='over'){stopped=true;break}
   else if(t.s.phase==='play'){
    const p=t.s.players[t.s.turn],tile=t.s.tiles[p.pos];
    if(t.s.pendingEvent)t.act('eventNo');
    else if(p.captive&&p.rolledRound!==t.s.round)t.act('escape');
    else if(p.captive)t.act('end');
    else if(tile.site?.status==='hidden'&&t.s.ap>0&&(tile.site.kind!=='cargo'||p.cargo.length<2))t.act('search');
    else if(p.scientist&&p.pos===t.DROPSHIP&&t.s.ap>0)t.act('deliver');
    else if(t.s.moves>0){const options=t.adjacent(p.pos);const next=options[(game+tick)%options.length];t.move(next);moves++}
    else t.act('end');
   }
  }
  h.advance(1000);
  assert.ok(t.s.players.every(p=>t.s.tiles[p.pos]),'player position must be a valid hex');
  assert.ok(t.s.moves>=0&&t.s.ap>=0,'budgets must remain nonnegative');
  assert.ok(t.s.players.every(p=>p.cargo.length<=2),'inventory limit');
 }
 assert.ok(stopped,'playthrough must reach mission end or launch-ready without a stalled state');rounds+=t.s.round;games++;
}
console.log(JSON.stringify({games,rounds,moves,reports,captures,boardings}));
})().catch(e=>{console.error(e);process.exitCode=1});
