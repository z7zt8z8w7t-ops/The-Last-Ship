/* One terminal session spans linked dialogs and asynchronous follow-up messages. */
(()=>{
'use strict';
const ON_MS=813,OFF_MS=2253;
let session=null,enabled=false;
const audio=()=>window.ShipAudio;
const selectors=['.rules-window','.mission-overlay .card','.private.executive-order','.event-window','.board-overlay .card','.handoff-prompt'];
function stopOpening(x){x.cancelEnded?.();x.cancelEnded=null;clearTimeout(x.openTimer);audio().stopEffect('wristOn')}
function stopAudio(x){stopOpening(x);audio().stopEffect('wristDrone');audio().stopEffect('wristOff')}
function cancel(){if(!session)return;const x=session;session=null;clearTimeout(x.closeTimer);stopAudio(x);x.overlay.remove()}
function ready(x){if(session!==x||x.closing||x.ready)return;x.ready=true;clearTimeout(x.openTimer);x.cancelEnded?.();x.cancelEnded=null;if(enabled&&!document.hidden)audio().play('wristDrone');const jobs=x.jobs.splice(0);jobs.forEach(fn=>fn())}
function startAudio(x){
 if(x.ready){if(!document.hidden)audio().play('wristDrone');return}
 x.cancelEnded=audio().onEnded('wristOn',()=>ready(x));
 audio().play('wristOn');
 // Only use the fallback if playback never started (muted/blocked browser).
 x.openTimer=setTimeout(()=>{if(session===x&&!x.ready&&(!enabled||document.hidden||!audio().position('wristOn')))ready(x)},ON_MS+250);
}
function create(owner){
 const overlay=document.createElement('div');overlay.className='wrist-overlay';overlay.setAttribute('role','dialog');overlay.setAttribute('aria-modal','true');
 const frame=document.createElement('div');frame.className='wrist-frame';
 const screen=document.createElement('div');screen.className='wrist-screen';
 const header=document.createElement('div');header.className='wrist-header';header.innerHTML='<span>CMC · FIELD TERMINAL</span><button data-act="toggleSound" class="wrist-sound">SOUND</button>';
 const content=document.createElement('div');content.className='wrist-content';
 screen.append(header,content);frame.append(screen);overlay.append(frame);
 const x={owner,overlay,frame,screen,content,header,opened:performance.now(),ready:false,closing:false,jobs:[]};session=x;
 if(enabled)startAudio(x);else x.openTimer=setTimeout(()=>ready(x),ON_MS);
 return x;
}
function close(x){
 if(x.closing)return;x.closing=true;x.closedAt=performance.now();x.jobs=[];stopOpening(x);audio().stopEffect('wristDrone');
 x.content.inert=true;x.frame.classList.add('wrist-off');x.frame.style.setProperty('--wrist-delay','0ms');
 if(enabled&&!document.hidden)audio().play('wristOff');
 x.closeTimer=setTimeout(()=>{if(session!==x)return;x.overlay.remove();session=null;audio().stopEffect('wristOff')},OFF_MS);
}
function sync(ui,game,soundOn){
 const root=document.getElementById('app');
 if(!root)return;
 const allowed=(ui.boot==='game'&&!ui.cinematic&&!ui.boardArrival)||ui.boot==='roster';
 if(!allowed){cancel();return}
 if(session&&session.owner!==game)cancel();
 if(enabled!==soundOn){enabled=soundOn;if(session){stopAudio(session);if(enabled&&!session.closing)startAudio(session);else if(!session.closing&&!session.ready)session.openTimer=setTimeout(()=>ready(session),ON_MS)}}
 const candidate=selectors.map(sel=>root.querySelector(sel)).find(Boolean);
 const held=!!(ui.sequence||ui.messages?.length||game?.pendingEvent||ui.terminalHold);
 if(!candidate&&!session)return;
 let x=session;
 if(candidate&&x?.closing){cancel();x=null}
 if(candidate&&!x)x=create(game);
 const host=root.querySelector('.board')||root;
 if(candidate){
  const red=candidate.classList.contains('classified-order');x.frame.classList.toggle('wrist-red',red);
  const wrapper=candidate.parentElement;
  x.content.replaceChildren(candidate);x.content.inert=false;
  candidate.classList.add('wrist-dialog');
  if(wrapper!==root&&wrapper!==host&&wrapper.matches('.overlay,.event-overlay,.board-overlay'))wrapper.remove();
  root.querySelectorAll('.handoff-prompt').forEach(node=>{if(node!==candidate)node.remove()});
  x.overlay.setAttribute('aria-label',candidate.querySelector('h1,h2')?.textContent||'Field terminal');
 }else if(held&&!x.closing){x.content.inert=true}
 host.append(x.overlay);
 x.overlay.classList.toggle('wrist-on-board',host!==root);
 x.header.querySelector('button').textContent=enabled?'SOUND ON':'SOUND OFF';
 x.frame.style.setProperty('--wrist-delay',`${-Math.min(x.closing?OFF_MS:ON_MS,performance.now()-(x.closing?x.closedAt:x.opened))}ms`);
 if(!candidate&&!held)close(x);
}
function afterOpen(fn){if(!session||session.ready)fn();else if(!session.closing)session.jobs.push(fn)}
document.addEventListener('visibilitychange',()=>{if(!session)return;const x=session;if(document.hidden){stopOpening(x);audio().stopEffect('wristDrone');audio().stopEffect('wristOff')}else if(enabled&&!x.closing){if(!x.ready){x.ready=true;x.jobs.splice(0).forEach(fn=>fn())}audio().play('wristDrone')}});
window.WristTerminal={sync,afterOpen,cancel,isClosing:()=>!!session?.closing};
})();
