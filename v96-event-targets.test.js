const {harness}=require('./audit-harness'),assert=require('node:assert/strict');
const settle=async()=>{for(let i=0;i<20;i++)await Promise.resolve()};
async function finishReport(h){const t=h.t;for(let i=0;i<30;i++){await settle();if(t.ui.popup){assert.ok(t.popupMarkup().includes('ACKNOWLEDGE'));assert.ok(t.ui.popup.title);t.closePopup()}if(!t.ui.sequence&&!t.ui.popup)return;h.advance(1000)}throw Error('Report or sequence did not finish')}
(async()=>{
 const h=harness({realFinish:true}),t=h.t,seen=[];h.context.window.ShipTerrain={foreground:()=>''};
 assert.equal(t.EVENTS.length,7);assert.ok(Object.isFrozen(t.EVENTS));assert.notEqual(t.s.events,t.EVENTS);
 // Four complete decks: render and acknowledge every real event, including refill.
 for(let i=0;i<28;i++){
  t.s.alien=t.s.nest;t.s.phase='play';t.s.players.forEach(p=>{p.captive=false;p.pos=t.HOME});t.s.moves=2;t.s.ap=1;
  t.triggerEvent(t.HOME);await settle();assert.ok(t.ui.popup);seen.push(t.ui.popup.title);assert.ok(t.popupMarkup().includes(t.ui.popup.title));await finishReport(h);
  if(t.s.pendingEvent){t.act('eventNo');await finishReport(h)}
  assert.equal(t.ui.popup,null);assert.equal(t.ui.sequence,false);assert.equal(t.EVENTS.length,7);
 }
 for(let i=0;i<4;i++)assert.deepEqual([...seen.slice(i*7,i*7+7)].sort(),[...t.EVENTS].sort());
 h.fresh();assert.equal(t.s.events.length,7);assert.equal(t.EVENTS.length,7);t.s.players[0].pos=t.HOME;
 const destination=t.adjacent(t.HOME).find(k=>!['event','gravity','nest'].includes(t.s.tiles[k].terrain));t.move(destination);assert.equal(t.s.players[0].pos,destination);assert.equal(t.s.moves,1);t.act('end');h.advance(1000);assert.equal(t.s.phase,'handoff');t.act('startTurn');assert.equal(t.s.phase,'play');h.advance(1000);
 // Missing-title reports can still be rendered and acknowledged, not left as invisible blockers.
 const missing=t.showPopup({kind:'event',text:'Transmission received.'});await settle();assert.equal(t.ui.popup.title,'FIELD REPORT');assert.ok(t.popupMarkup().includes('FIELD REPORT'));t.closePopup();await missing;
 t.ui.popup={kind:'event',text:'Legacy malformed report'};assert.doesNotThrow(()=>t.popupMarkup());t.ui.popup=null;
 // Event-opening cues retain the dedicated scientist, attack and lunge recordings.
 for(const [event,expected] of [['Adrenaline surge','discovery'],['Motion echo','discovery'],['Seismic Shift','discovery'],['PDT Locator','scientistFound'],['Alien lunge','noiseRoar'],['Facehugger attack','facehugger']]){
  h.fresh();h.calls.length=0;t.s.events=[event];t.triggerEvent(t.HOME);await settle();assert.ok(h.calls.includes(expected),event+' opening sound');assert.ok(!h.calls.includes('wristOn')&&!h.calls.includes('wristDrone'));await finishReport(h);
  if(t.s.pendingEvent){t.act('eventNo');await finishReport(h)}
 }
 // Every eligible tile gets one whole-tile overlay; selection changes style, cancel removes all.
 for(const item of ['flare','jetpack','scanner']){
  h.fresh();t.s.players[0].cargo=[item];t.beginItem(0);
  const eligible=Object.keys(t.s.tiles).filter(k=>t.targetValid(k));assert.ok(eligible.length);let markup=t.board();assert.equal((markup.match(/class="tile-target-fill /g)||[]).length,eligible.length);
  t.ui.targetHex=eligible[0];assert.ok(t.board().includes('tile-target-selected'));t.act('cancelTarget');assert.ok(!t.board().includes('tile-target-fill'));
 }
 for(const mode of ['decoy','redirect']){h.fresh();t.s.players[0].role='companyRepresentative';t.act(mode);const eligible=Object.keys(t.s.tiles).filter(k=>t.targetValid(k));assert.equal((t.board().match(/class="tile-target-fill /g)||[]).length,eligible.length);t.act('cancelTarget');assert.ok(!t.board().includes('tile-target-fill'))}
 h.fresh();t.s.players[0].cargo=['flare'];t.beginItem(0);t.ui.targetHex=t.HOME;t.act('confirmTarget');assert.equal(t.s.flares.length,1);assert.ok(!t.board().includes('tile-target-fill'));
 console.log('PASS: 28 events across four full decks with real popup markup, restart/movement/turn handover, missing-title ACK, six opening sound routes, all eligible target overlays and confirm/cancel cleanup.');
})().catch(error=>{console.error(error);process.exitCode=1});
