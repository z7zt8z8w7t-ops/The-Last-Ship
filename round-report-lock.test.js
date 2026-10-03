const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm'),assert=require('node:assert/strict'),{harness}=require('./audit-harness');
// Exercise the actual renderer branch, not the state-only playthrough renderer.
function paintReport(version){const source=fs.readFileSync(path.join(__dirname,version===93?'fixtures/v93-render-content.js':'../game.js'),'utf8');const end=source.indexOf('function voiceSelect(');const code=source.slice(source.indexOf('function renderContent(){'),end<0?undefined:end);
 const board={insertAdjacentHTML:(_,html)=>app.innerHTML+=html},app={innerHTML:'',querySelector:()=>board,querySelectorAll:()=>[]},noop=()=>{};
 const context={window:{ShipTerrain:{stop:noop}},ShipAudio:{gameLoop:noop,introLoop:noop},audioSafely:fn=>fn(),stopTerminal:noop,scheduleTracker:noop,document:{body:{dataset:{}},getElementById:()=>app},ui:{boot:'game'},s:{phase:'handoff'},handoffBoard:()=>'<main>HANDOFF</main>',popupMarkup:()=>'<div data-popup-report="true">ACKNOWLEDGE</div>',drawTerrain:noop,bind:noop};context.ui.popup={kind:'capture'};
 vm.runInNewContext(code+';renderContent()',context);return app.innerHTML}
// v93 reproduced: a live report on handoff had no acknowledge button at all.
assert.ok(!paintReport(93).includes('ACKNOWLEDGE'));assert.ok(paintReport(94).includes('ACKNOWLEDGE'));
async function flush(){for(let i=0;i<12;i++)await Promise.resolve()}
(async()=>{
 const h=harness({realFinish:true}),t=h.t;
 t.s.phase='alien';t.s.alienMovesLeft=2;t.s.nest='0,0';t.s.alien='1,0';t.s.lure='1,0';t.s.players.forEach((p,i)=>{p.pos=i?'3,0':'0,0';p.captive=false;p.safeNest=false;p.briefed=true});
 t.s.sentries=[{hex:'1,1',armed:true,aim:0}];const round=t.runAlienTurn();let sawReport=false,sawCountdown=false;
 for(let step=0;step<25;step++){await flush();if(t.ui.popup){assert.equal(t.s.phase,'alien','sentry capture report must be acknowledged before countdown/handoff');sawReport=true;t.closePopup()}if(t.s.phase==='countdown')sawCountdown=true;h.advance(1000)}
 await round;assert.ok(sawReport&&sawCountdown);assert.equal(t.s.phase,'handoff');assert.equal(t.ui.sequence,false);assert.equal(t.ui.popup,null);
 t.act('startTurn');h.advance(1500);await flush();if(t.ui.private)t.act('closePrivate');assert.equal(t.s.phase,'play');assert.equal(t.ui.flipping,'');assert.equal(t.ui.sequence,false);
 // Simulate a missed countdown timer callback, then recover on the next interaction.
 h.fresh();const countdown=t.roundCountdown(3);h.timers.clear();h.advance(6000);t.recoverInput();await countdown;assert.equal(t.ui.roundCountdown,null);
 h.fresh();t.s.phase='handoff';t.ui.privateKind='briefing';t.ui.privateResult='stale';t.ui.flipping='out';t.ui.rolling=true;t.startNext(1);assert.equal(t.ui.privateKind,'');assert.equal(t.ui.privateResult,'');assert.equal(t.ui.flipping,'');assert.equal(t.ui.rolling,false);
 console.log('PASS: reproduces v93 invisible report, mounts it on handoff, acknowledges sentry capture before countdown, restores next-turn controls, recovers overdue waits and clears stale turn locks.');
})().catch(error=>{console.error(error);process.exitCode=1});
