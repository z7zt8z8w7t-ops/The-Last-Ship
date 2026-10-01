const vm=require('node:vm'),fs=require('node:fs'),assert=require('node:assert/strict'),path=require('node:path');
class Element{
 constructor(tag='div'){this.tagName=tag;this.children=[];this.className='';this.style={setProperty:(k,v)=>{this.style[k]=v}};this.attributes={};this.textContent='';this.classList={contains:c=>this.className.split(' ').includes(c),add:c=>{if(!this.classList.contains(c))this.className+=' '+c},toggle:(c,on)=>{this.className=this.className.split(' ').filter(x=>x!==c).join(' ');if(on)this.className+=' '+c}}}
 append(...nodes){nodes.forEach(n=>{n.remove();n.parentElement=this;this.children.push(n)})}
 replaceChildren(...nodes){this.children.forEach(n=>n.parentElement=null);this.children=[];this.append(...nodes)}
 remove(){if(this.parentElement){this.parentElement.children=this.parentElement.children.filter(n=>n!==this);this.parentElement=null}}
 addEventListener(k,fn){(this.events??={})[k]=fn}
 prepend(...nodes){nodes.reverse().forEach(n=>{n.remove();n.parentElement=this;this.children.unshift(n)})}
 setAttribute(k,v){this.attributes[k]=v}
 set innerHTML(s){this.replaceChildren();if(s.includes('<button')){this.append(new Element('span'),new Element('button'))}}
 matches(selector){return selector.split(',').some(sel=>{const parts=sel.trim().replace(/>/g,' ').split(/\s+/);const simple=(n,s)=>{const attrs=[...s.matchAll(/\[([^=]+)="([^"]+)"\]/g)];if(!attrs.every(([,k,v])=>n.attributes[k]===v))return false;s=s.replace(/\[[^\]]+\]/g,'');const [tag,...cls]=s.split('.');return (!tag||n.tagName===tag)&&cls.every(c=>n.classList.contains(c))};if(!simple(this,parts.pop()))return false;let p=this.parentElement;while(parts.length){const part=parts.pop();while(p&&!simple(p,part))p=p.parentElement;if(!p)return false;p=p.parentElement}return true})}
 querySelectorAll(sel){let out=[];for(const child of this.children){if(child.matches(sel))out.push(child);out.push(...child.querySelectorAll(sel))}return out}
 querySelector(sel){return this.querySelectorAll(sel)[0]||null}
}
function harness(){
 let now=0,id=0,timers=new Map(),ended=new Map(),calls=[],levels=[];const root=new Element(),listeners={};
 const audio={play:(k,v)=>{calls.push(k);levels.push([k,v])},stopEffect:k=>calls.push('stop:'+k),position:()=>.5,onEnded:(k,fn)=>{ended.set(k,fn);return()=>ended.delete(k)}};
 const document={hidden:false,getElementById:()=>root,createElement:t=>new Element(t),addEventListener:(k,fn)=>listeners[k]=fn};
 const ctx={window:{ShipAudio:audio},document,performance:{now:()=>now},setTimeout:(fn,ms)=>{timers.set(++id,{fn,at:now+ms});return id},clearTimeout:i=>timers.delete(i)};
 vm.runInNewContext(fs.readFileSync(path.join(__dirname,'../wrist-terminal.js'),'utf8'),ctx);
 const api=ctx.window.WristTerminal,game={},ui={boot:'game'};
 function advance(ms){const end=now+ms;for(;;){let next=[...timers].filter(([,t])=>t.at<=end).sort((a,b)=>a[1].at-b[1].at)[0];if(!next)break;now=next[1].at;timers.delete(next[0]);next[1].fn()}now=end}
 function draw(kind='turn',red=false){root.replaceChildren();const board=new Element();board.className='board';root.append(board);if(kind){const wrap=new Element(),dialog=new Element();wrap.className=kind==='event'?'event-overlay':kind==='choice'?'board-overlay':'overlay';dialog.className=kind==='turn'?'handoff-prompt':kind==='event'?'event-window':kind==='choice'?'card':'private executive-order';if(red)dialog.classList.add('classified-order');if(kind==='orders')dialog.classList.add('initial-orders');const heading=new Element('h2');heading.textContent=kind;dialog.append(heading);board.append(wrap);wrap.append(dialog)}api.sync(ui,game,true)}
 return {api,root,ui,game,calls,levels,advance,draw,ended,document,listeners};
}
{
 const h=harness();h.draw();h.draw();assert.equal(h.calls.filter(x=>x==='wristOn').length,1);let extra=0;h.api.afterOpen(()=>extra++);assert.equal(extra,0);h.ended.get('wristOn')();assert.equal(extra,1);assert.equal(h.calls.filter(x=>x==='wristDrone').length,1);
 h.ui.sequence=true;h.draw(null);assert.ok(h.calls.filter(x=>!x.startsWith('stop:')).every(x=>['wristOn','wristDrone','turnOff'].includes(x)));
 h.game.pendingEvent='PDT Locator';h.ui.sequence=false;h.draw('choice');h.game.pendingEvent=null;h.ui.sequence=true;h.draw('event');h.draw('private',true);
 assert.equal(h.root.querySelector('.wrist-frame').classList.contains('wrist-red'),true);assert.equal(h.calls.filter(x=>x==='wristOn').length,1);
 h.ui.sequence=false;h.draw(null);assert.equal(h.api.isClosing(),true);assert.ok(h.calls.filter(x=>!x.startsWith('stop:')).every(x=>['wristOn','wristDrone','turnOff'].includes(x)));h.advance(1000);h.draw(null);assert.ok(h.calls.filter(x=>!x.startsWith('stop:')).every(x=>['wristOn','wristDrone','turnOff'].includes(x)));assert.equal(h.root.querySelector('.wrist-frame').style['--wrist-delay'],'-1000ms');h.advance(1253);assert.equal(h.root.querySelector('.wrist-overlay'),null);assert.equal(h.api.isClosing(),false);
}
{
 const h=harness();h.draw();const stale=h.ended.get('wristOn');h.draw(null);stale();assert.equal(h.calls.filter(x=>x==='wristDrone').length,0);h.advance(2253);assert.ok(h.calls.filter(x=>!x.startsWith('stop:')).every(x=>['wristOn','wristDrone','turnOff'].includes(x)));
}
{
 const h=harness();h.draw();h.ended.get('wristOn')();h.api.sync(h.ui,h.game,false);h.api.sync(h.ui,h.game,true);assert.equal(h.calls.filter(x=>x==='wristOn').length,1);assert.equal(h.calls.filter(x=>x==='wristDrone').length,2);
 h.document.hidden=true;h.listeners.visibilitychange();h.document.hidden=false;h.listeners.visibilitychange();assert.equal(h.calls.filter(x=>x==='wristDrone').length,3);h.api.sync({boot:'title'},null,true);assert.equal(h.root.querySelector('.wrist-overlay'),null);
}
{
 const h=harness();h.draw();h.ui.terminalHold=true;h.draw(null);h.advance(1000);h.ui.terminalHold=false;h.draw('private',true);assert.equal(h.calls.filter(x=>x==='wristOn').length,1);assert.ok(h.calls.filter(x=>!x.startsWith('stop:')).every(x=>['wristOn','wristDrone','turnOff'].includes(x)));h.api.cancel();
}
{
 const h=harness();h.draw('event');const dialog=h.root.querySelector('.event-window'),ack=new Element('button');ack.setAttribute('data-act','closeSearchPopup');dialog.append(ack);h.api.sync(h.ui,h.game,true); // same dialog, now add a fresh test render
 h.root.replaceChildren();const board=new Element();board.className='board';const wrap=new Element();wrap.className='event-overlay';const payload=new Element();payload.className='event-window';payload.append(ack);wrap.append(payload);board.append(wrap);h.root.append(board);h.api.sync(h.ui,h.game,true);
 assert.equal(ack.parentElement.className,'wrist-footer');assert.equal(ack.textContent,'ACKNOWLEDGE');assert.equal(h.root.querySelector('.wrist-content').querySelector('button'),null);h.api.sync(h.ui,h.game,false);assert.equal(ack.parentElement.className,'wrist-footer');
}
{
 const h=harness();h.root.replaceChildren();const board=new Element();board.className='board';const wrap=new Element();wrap.className='event-overlay';const dialog=new Element();dialog.className='event-window';const art=new Element();art.className='equipment-art';const img=new Element('img');art.append(img);dialog.append(art);wrap.append(dialog);board.append(wrap);h.root.append(board);h.api.sync(h.ui,h.game,true);
 assert.equal(art.parentElement.className,'wrist-image-panel');assert.equal(h.root.querySelector('.wrist-content').querySelector('img'),null);assert.equal(h.root.querySelector('.wrist-image-panel').hidden,false);
}
{const h=harness();h.draw('event');h.advance(813);h.draw('choice');h.draw('private');assert.equal(h.calls.filter(x=>['wristOn','wristDrone','turnOff'].includes(x)).length,0);h.document.hidden=true;h.listeners.visibilitychange();h.document.hidden=false;h.listeners.visibilitychange();assert.equal(h.calls.filter(x=>['wristOn','wristDrone','turnOff'].includes(x)).length,0);h.draw('turn');assert.equal(h.calls.filter(x=>x==='wristOn').length,1);h.ended.get('wristOn')();h.draw('event');const drones=h.calls.filter(x=>x==='wristDrone').length;h.document.hidden=true;h.listeners.visibilitychange();h.document.hidden=false;h.listeners.visibilitychange();assert.equal(h.calls.filter(x=>x==='wristDrone').length,drones)}
{const h=harness();h.draw('turn');assert.deepEqual(h.levels[0],['wristOn',.15]);h.ended.get('wristOn')();assert.deepEqual(h.levels[1],['wristDrone',.1]);h.draw(null);h.draw(null);assert.equal(h.calls.filter(x=>x==='turnOff').length,1);assert.deepEqual(h.levels.find(x=>x[0]==='turnOff'),['turnOff',.2]);h.advance(2253);assert.equal(h.calls.filter(x=>x==='turnOff').length,1)}
{const h=harness();h.draw('event');h.advance(813);h.draw(null);h.draw(null);assert.equal(h.calls.filter(x=>x==='turnOff').length,1);assert.deepEqual(h.levels.find(x=>x[0]==='turnOff'),['turnOff',.2])}
console.log('PASS: turn-only startup/drone gains, all-popup power-down once at 20%, early close, mute, visibility, red briefing, no redraw restart.');

for(const kind of ['choice','private']){const h=harness();h.draw(kind);h.advance(813);h.draw(null);h.draw(null);assert.equal(h.calls.filter(x=>x==='turnOff').length,1);assert.deepEqual(h.levels.find(x=>x[0]==='turnOff'),['turnOff',.2])}
{const h=harness();h.draw('event');h.ui.sequence=true;h.draw(null);assert.equal(h.calls.filter(x=>x==='turnOff').length,0);h.draw('private');h.ui.sequence=false;h.draw(null);assert.equal(h.calls.filter(x=>x==='turnOff').length,1)}

{const h=harness();h.draw('orders');assert.deepEqual(h.levels.at(-1),['wristOn',.15]);h.ended.get('wristOn')();assert.equal(h.calls.filter(x=>x==='wristDrone').length,0)}

{const h=harness();h.draw('turn');h.ended.get('wristOn')();h.draw('orders');assert.equal(h.calls.filter(x=>x==='wristOn').length,2);const drones=h.calls.filter(x=>x==='wristDrone').length;h.ended.get('wristOn')();assert.equal(h.calls.filter(x=>x==='wristDrone').length,drones)}
