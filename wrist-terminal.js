/* One terminal session spans linked dialogs and asynchronous follow-up messages. */
(()=>{
'use strict';
const ON_MS=813,OFF_MS=2253;
let session=null,enabled=false;
// Media errors must never interrupt terminal cleanup or leave input locked.
const safeMedia=new Proxy({},{get:(_,method)=>(...args)=>{try{return window.ShipAudio?.[method]?.(...args)}catch(error){console.warn('Terminal audio unavailable',error)}}});
const audio=()=>safeMedia;
const hasTurnAudio=n=>n.classList.contains('handoff-prompt')||n.classList.contains('initial-orders')||n.classList.contains('muthur-mission');
const typingAllowed=x=>!x.typingOnly||x.content.querySelector('[data-terminal]')?.dataset.typing==='active';
function typingChanged(active){const x=session;if(!x?.typingOnly)return;if(!active)audio().stopEffect('wristDrone');else if(enabled&&x.ready&&!x.closing&&!document.hidden)audio().play('wristDrone',.1)}
const selectors=['.mission-overlay .card','.private.executive-order','.event-window','.board-overlay .card','.handoff-prompt','.muthur-mission','.initial-orders','.wrist-dialog','.results-dialog'];
function stopOpening(x){try{x.cancelEnded?.()}catch(error){console.warn('Terminal audio cleanup failed',error)}x.cancelEnded=null;clearTimeout(x.openTimer);audio().stopEffect('wristOn')}
function stopAudio(x){stopOpening(x);audio().stopEffect('wristDrone')}
function cancel(){if(!session)return;const x=session;session=null;clearTimeout(x.closeTimer);stopAudio(x);x.overlay.remove()}
function ready(x){if(session!==x||x.closing||x.ready)return;x.ready=true;clearTimeout(x.openTimer);try{x.cancelEnded?.()}catch(error){console.warn('Terminal audio cleanup failed',error)}x.cancelEnded=null;if(enabled&&x.turnAudio&&typingAllowed(x)&&!document.hidden)audio().play('wristDrone',.1);const jobs=x.jobs.splice(0);jobs.forEach(fn=>{try{fn()}catch(error){console.warn("Terminal follow-up failed",error)}})}
function startAudio(x){
 if(!x.turnAudio&&!x.startupAudio){if(!x.ready)x.openTimer=setTimeout(()=>ready(x),ON_MS);return}
 if(x.ready){if(x.turnAudio&&typingAllowed(x)&&!document.hidden)audio().play('wristDrone',.1);return}
 x.cancelEnded=audio().onEnded('wristOn',()=>ready(x));
 audio().play('wristOn',.15);
 // Visual readiness has a fixed deadline even if audio starts and then stalls.
 x.openTimer=setTimeout(()=>{if(session===x&&!x.ready){audio().stopEffect('wristOn');ready(x)}},ON_MS+250);
}
function create(owner,turnAudio,startupAudio=false){
 const overlay=document.createElement('div');overlay.className='wrist-overlay';overlay.setAttribute('role','dialog');overlay.setAttribute('aria-modal','true');
 const frame=document.createElement('div');frame.className='wrist-frame';
 const screen=document.createElement('div');screen.className='wrist-screen';
 const header=document.createElement('div');header.className='wrist-header';header.innerHTML='<span>CMC · FIELD TERMINAL</span><button data-act="toggleSound" class="wrist-sound">SOUND</button>';
 const imagePanel=document.createElement('div');imagePanel.className='wrist-image-panel';imagePanel.hidden=true;
 const content=document.createElement('div');content.className='wrist-content';
 const footer=document.createElement('div');footer.className='wrist-footer';
 screen.append(header,imagePanel,content,footer);frame.append(screen);overlay.append(frame);
 const x={owner,turnAudio,startupAudio,overlay,frame,screen,content,imagePanel,footer,header,opened:performance.now(),ready:false,closing:false,jobs:[]};session=x;
 if(enabled)startAudio(x);else x.openTimer=setTimeout(()=>ready(x),ON_MS);
 return x;
}
function endTurnAudio(x){if(!x.turnAudio)return;stopAudio(x);x.turnAudio=false}
function close(x){
 if(x.closing)return;x.closing=true;x.overlay.style.pointerEvents='none';x.closedAt=performance.now();x.jobs=[];if(x.turnAudio)endTurnAudio(x);else stopAudio(x);if(!x.ackPlayed&&enabled&&!document.hidden)audio().play('turnOff',.2);
 x.content.inert=true;x.footer.inert=true;x.frame.classList.add('wrist-off');x.frame.style.setProperty('--wrist-delay','0ms');
 x.closeTimer=setTimeout(()=>{if(session!==x)return;x.overlay.remove();session=null},OFF_MS);
}
function sync(ui,game,soundOn){
 const root=document.getElementById('app');
 if(!root)return;
 if(ui.rules){cancel();return}
 const allowed=(ui.boot==='game'&&!ui.cinematic&&!ui.boardArrival)||ui.boot==='roster';
 if(!allowed||['countdown','quarantine','departing','orbital'].includes(game?.phase)){cancel();return}
 if(session&&session.owner!==game)cancel();
 if(enabled!==soundOn){enabled=soundOn;if(session){stopAudio(session);if(enabled&&!session.closing)startAudio(session);else if(!session.closing&&!session.ready)session.openTimer=setTimeout(()=>ready(session),ON_MS)}}
 const candidate=selectors.map(sel=>root.querySelector(sel)).find(Boolean);
 const held=!!(ui.sequence||ui.messages?.length||game?.pendingEvent||ui.terminalHold);
 if(!candidate&&!session)return;
 let x=session;
 if(candidate&&x?.closing){cancel();x=null}
 if(candidate&&!x)x=create(game,hasTurnAudio(candidate));
 if(candidate&&x){const turnAudio=hasTurnAudio(candidate),startupAudio=false;if(x.turnAudio!==turnAudio||x.startupAudio!==startupAudio){if(x.turnAudio)endTurnAudio(x);else stopAudio(x);x.turnAudio=turnAudio;x.startupAudio=startupAudio;if(turnAudio||startupAudio)x.ready=false;if(enabled)startAudio(x)}}
 if(!candidate&&!held&&x?.turnAudio)endTurnAudio(x);
 const host=root.querySelector('.board')||root;
 if(candidate){
  x.typingOnly=candidate.classList.contains('muthur-mission')||candidate.classList.contains('initial-orders');if(x.typingOnly&&!typingAllowed(x))audio().stopEffect('wristDrone');
  const red=candidate.classList.contains('classified-order');x.frame.classList.toggle('wrist-red',red);x.frame.classList.toggle('bioscan-terminal',candidate.classList.contains('bioscan-window'));const heading=x.header?.querySelector('span');if(heading)heading.textContent=candidate.classList.contains('bioscan-window')?'CMC · BIOSCANNER':'CMC · FIELD TERMINAL';
  const wrapper=candidate.parentElement,fresh=wrapper!==x.content;
  x.content.replaceChildren(candidate);x.content.inert=false;x.footer.inert=false;if(fresh){x.ackPlayed=false;x.footer.replaceChildren();x.imagePanel.replaceChildren();
  const art=candidate.querySelector('.capture-art,.equipment-art,.event-art');
  x.imagePanel.hidden=!art;if(art)x.imagePanel.append(art);
  const ack=candidate.querySelector('[data-act="closeSearchPopup"],[data-act="ackMission"],[data-act="reveal"],[data-act="startTurn"],[data-act="closePrivate"],[data-act="closeRules"],[data-act="ackResults"]');
  if(ack){ack.textContent=ack.dataset.terminalLabel||'ACKNOWLEDGE';x.footer.append(ack)}else{const choices=candidate.querySelector('.row');if(choices)x.footer.append(choices)}
  if(candidate.classList.contains('rules-window'))paginateRules(x,candidate);}
  candidate.classList.add('wrist-dialog');
  if(wrapper!==root&&wrapper!==host&&wrapper.matches('.overlay,.event-overlay,.board-overlay'))wrapper.remove();
  root.querySelectorAll('.handoff-prompt').forEach(node=>{if(node!==candidate)node.remove()});
  x.overlay.setAttribute('aria-label',candidate.querySelector('h1,h2')?.textContent||'Field terminal');
 }else if(held&&!x.closing){x.content.inert=true;x.footer.inert=true}
 x.overlay.style.pointerEvents=candidate&&!x.closing?'auto':'none';
 x.overlay.hidden=!candidate&&held;
 host.append(x.overlay);
 x.overlay.classList.toggle('wrist-on-board',host!==root);
 x.header.querySelector('button').textContent=enabled?'SOUND ON':'SOUND OFF';
 x.frame.style.setProperty('--wrist-delay',`${-Math.min(x.closing?OFF_MS:ON_MS,performance.now()-(x.closing?x.closedAt:x.opened))}ms`);
 if(!candidate&&!held)close(x);
 if(candidate&&typeof requestAnimationFrame==='function')requestAnimationFrame(()=>fit(x));
}
function fit(x){
 if(session!==x||!x.content.clientHeight)return;
 const dialog=x.content.firstElementChild,host=x.overlay.parentElement;
 if(!dialog||!host)return;
 x.content.style.setProperty('--wrist-type-scale','1');
 x.frame.style.height='440px';
 const maxHeight=Math.max(240,host.clientHeight*.96);
 const padding=typeof getComputedStyle==='function'?parseFloat(getComputedStyle(x.content).paddingTop)+parseFloat(getComputedStyle(x.content).paddingBottom):32;
 const chrome=x.frame.offsetHeight-x.content.clientHeight;
 const needed=Math.max(280,Math.ceil(chrome+dialog.scrollHeight+padding+4));
 x.frame.style.height=`${Math.min(maxHeight,needed)}px`;
 let scale=1;
 while(x.content.scrollHeight>x.content.clientHeight+1&&scale>.72){scale-=.04;x.content.style.setProperty('--wrist-type-scale',scale.toFixed(2))}
}
window.addEventListener?.('resize',()=>{if(session)fit(session)});

function paginateRules(x,dialog){
 const sections=[...dialog.querySelectorAll('.rules-scroll>section')];if(!sections.length)return;
 x.rulesPage=Math.min(x.rulesPage||0,sections.length-1);
 const nav=document.createElement('div');nav.className='wrist-pages';
 const previous=document.createElement('button'),next=document.createElement('button'),label=document.createElement('span');
 previous.textContent='PREVIOUS';next.textContent='NEXT';
 function paint(){sections.forEach((section,i)=>section.hidden=i!==x.rulesPage);label.textContent=`${x.rulesPage+1} / ${sections.length}`;previous.disabled=x.rulesPage===0;next.disabled=x.rulesPage===sections.length-1;fit(x)}
 previous.addEventListener('click',()=>{if(x.rulesPage>0){x.rulesPage--;paint()}});next.addEventListener('click',()=>{if(x.rulesPage<sections.length-1){x.rulesPage++;paint()}});
 nav.append(previous,label,next);x.footer.prepend(nav);paint();
}
function afterOpen(fn){if(!session||session.ready)fn();else if(!session.closing)session.jobs.push(fn)}
document.addEventListener('visibilitychange',()=>{if(!session)return;const x=session;if(document.hidden){stopOpening(x);audio().stopEffect('wristDrone')}else if(enabled&&!x.closing){if(!x.ready){x.ready=true;x.jobs.splice(0).forEach(fn=>fn())}if(x.turnAudio&&typingAllowed(x))audio().play('wristDrone',.1)}});
function acknowledge(){if(session?.closing)return;if(session)session.ackPlayed=true;if(enabled&&!document.hidden)audio().play('turnOff',.2)}
function isClosing(){if(session?.closing&&performance.now()-session.closedAt>=OFF_MS){const x=session;session=null;clearTimeout(x.closeTimer);x.overlay.remove()}return !!session?.closing}
function releaseOrphan(ui,game){if(!session||ui.sequence||ui.messages?.length||game?.pendingEvent||ui.terminalHold)return;const root=document.getElementById('app');if(!selectors.some(selector=>root.querySelector(selector)))cancel()}
window.WristTerminal={typingChanged,releaseOrphan,sync,afterOpen,cancel,acknowledge,isClosing};
})();
