const fs=require('node:fs'),vm=require('node:vm'),path=require('node:path'),assert=require('node:assert/strict');
function harness({failAudio=false}={}){
 let now=0,id=0;const timers=new Map(),calls=[],renders=[],digits=Array.from({length:5},()=>({textContent:''}));
 const screen={setAttribute(k,v){this[k]=v},querySelectorAll:()=>digits};const noop=()=>{};
 const audio=new Proxy({play:key=>{calls.push(key);if(failAudio)throw Error('Media failed')},stopEffect:key=>calls.push('stop:'+key)},{get:(o,k)=>o[k]||noop});
 const context={window:{ShipArtwork:{CAPTURE_ARTS:['a'],SCIENTIST_ARTS:['s'],ITEM_ARTS:{},SENTRY_ART:{},EMBEDDED_TILE_ART:{}}},ShipAudio:audio,WristTerminal:{afterOpen:fn=>fn(),isClosing:()=>false},ShipDropship:{stop:noop},document:{hidden:false,querySelector:s=>s==='.round-countdown'?screen:{textContent:''},querySelectorAll:()=>[],getElementById:()=>({}),addEventListener:noop,body:{dataset:{},classList:{toggle:noop}}},localStorage:{removeItem:noop,getItem:()=>null,setItem:noop},location:{search:''},URLSearchParams,Date:class extends Date{static now(){return now}},performance:{now:()=>now},matchMedia:()=>({matches:false}),requestAnimationFrame:noop,setTimeout:(fn,ms)=>{timers.set(++id,{fn,at:now+ms});return id},clearTimeout:n=>timers.delete(n),setInterval:(fn,ms)=>{timers.set(++id,{fn,at:now+ms,repeat:ms});return id},clearInterval:n=>timers.delete(n),console:{...console,warn:noop},renders,failNextRender:false};
 let source=fs.readFileSync(path.join(__dirname,'../game.js'),'utf8');source=source.replace(/ render\(\);window.ShipReady=true;\s*\n\}\)\(\);\s*$/,`render=()=>{if(failNextRender){failNextRender=false;throw Error('Render failed')}renders.push(s?.phase)};finish=()=>render();cinemaStage=()=>{};alienStep=async()=>{s.alienMovesLeft=0};window.test={newGame,runEvent,runMessages,showPopup,closePopup,roundCountdown,countdownValue,countdownMarkup,runAlienTurn,move,act,get s(){return s},get ui(){return ui}};})();`);
 vm.runInNewContext(source,context);const t=context.window.test;
 function fresh(){t.newGame(['A','B','C','D']);t.ui.boot='game';t.ui.cinematic=false;t.s.phase='play';t.s.players[0].role='crew';t.s.players[0].briefed=true;calls.length=0;renders.length=0;timers.clear()}
 function advance(ms){const end=now+ms;for(;;){const next=[...timers].filter(([,v])=>v.at<=end).sort((a,b)=>a[1].at-b[1].at)[0];if(!next)break;const [n,timer]=next;now=timer.at;if(timer.repeat)timer.at+=timer.repeat;else timers.delete(n);timer.fn()}now=end}
 fresh();return {t,context,calls,renders,digits,screen,advance,fresh};
}
const settle=async()=>{for(let i=0;i<5;i++)await Promise.resolve()};
(async()=>{
 const h=harness(),t=h.t;
 for(const hour of [8,5,2,1,0]){h.fresh();const done=t.roundCountdown(hour);const base=String(hour).padStart(2,'0')+':00';assert.equal(t.countdownValue(),base);const drawCount=h.renders.length;
  for(let second=1;second<=4;second++){h.advance(1000);const remaining=Math.max(0,hour*60-second),expected=String(Math.floor(remaining/60)).padStart(2,'0')+':'+String(remaining%60).padStart(2,'0');assert.equal(t.countdownValue(),expected);assert.equal(h.digits.map(d=>d.textContent).join(''),expected);assert.equal(h.renders.length,drawCount,'digit ticks must not restart the animation')}
  h.advance(1000);await done;assert.equal(t.ui.roundCountdown,null);assert.equal(h.calls.at(-1),'stop:roundCountdown');
 }
 h.fresh();t.ui.roundCountdown={hours:5,started:0};const markup=t.countdownMarkup();
 const animations=[...markup.matchAll(/<animate attributeName="d" values="([^"]+)"/g)];assert.equal(animations.length,4);
 const anchors=[[[280,45],[920,45]],[[280,855],[920,855]],[[45,280],[45,620]],[[1155,280],[1155,620]]];
 animations.forEach((match,i)=>match[1].split(';').forEach(shape=>{const xy=shape.match(/-?\d+(?:\.\d+)?/g).map(Number);assert.deepEqual(xy.slice(0,2),anchors[i][0]);assert.deepEqual(xy.slice(-2),anchors[i][1])}));
 const cells=[...markup.matchAll(/class="countdown-digits" x="([^"]+)" y="455" text-anchor="middle" dominant-baseline="central"/g)];assert.equal(cells.length,5);assert.deepEqual(cells.map(m=>Number(m[1])),[81.5,154.5,227.5,300.5,373.5]);
 // A captured player's reports and other events still require acknowledgement.
 const failed=harness({failAudio:true});const event=failed.t.runEvent('Alien lunge','0,0');assert.equal(failed.t.ui.popup.title,'Alien lunge');failed.t.closePopup();await event;assert.equal(failed.t.ui.sequence,false);
 failed.t.s.moves=2;failed.t.s.players[0].pos='0,0';failed.t.s.alien=failed.t.s.nest;failed.t.s.tiles['1,0'].terrain='open';failed.t.s.tiles['1,0'].site=null;failed.t.move('1,0');assert.equal(failed.t.s.players[0].pos,'1,0');
 // Even a render failure during closure resolves the acknowledgement promise.
 h.fresh();h.t.ui.messages=[{kind:'event',title:'Report',text:'Test'}];const reports=h.t.runMessages();h.context.failNextRender=true;assert.throws(()=>h.t.closePopup(),/Render failed/);await reports;assert.equal(h.t.ui.sequence,false);assert.equal(h.t.ui.popup,null);
 // Flip completion remains scheduled if the first redraw fails.
 h.fresh();h.t.s.phase='handoff';h.context.failNextRender=true;assert.throws(()=>h.t.act('startTurn'),/Render failed/);h.advance(1000);assert.equal(h.t.ui.flipping,'');assert.equal(h.t.s.phase,'play');
 // The evacuation cue follows screen removal, only at the two-hour boundary.
 for(const round of [6,7,8]){h.fresh();t.s.round=round;t.s.phase='alien';t.s.alienMovesLeft=0;const done=t.runAlienTurn();await settle();assert.equal(t.s.phase,'countdown');assert.ok(!h.calls.includes('evac'));h.advance(5000);await done;assert.equal(t.s.phase,'handoff');assert.equal(h.renders.at(-1),'handoff');assert.equal(h.calls.filter(k=>k==='evac').length,round===7?1:0)}
 // Reprocessing that boundary must not replay the evacuation message.
 h.fresh();t.s.round=7;t.s.evacPlayed=true;t.s.phase='alien';t.s.alienMovesLeft=0;const repeated=t.runAlienTurn();await settle();h.advance(5000);await repeated;assert.ok(!h.calls.includes('evac'));
 const source=fs.readFileSync(path.join(__dirname,'../game.js'),'utf8');assert.ok(source.includes('<strong>IMPREGNATED</strong>'));assert.ok(!source.includes('PRIVATE · IMPREGNATED'));
 console.log('PASS: one-second countdown, stable perimeter anchors, centred glyphs, media/render lock recovery, flip cleanup, and one EVAC cue after the two-hour screen closes.');
})().catch(error=>{console.error(error);process.exitCode=1});
