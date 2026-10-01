const vm=require('node:vm'),fs=require('node:fs'),assert=require('node:assert/strict'),path=require('node:path');
class Element{
 constructor(tag='div'){this.tagName=tag;this.children=[];this.className='';this.style={setProperty:(k,v)=>{this.style[k]=v}};this.attributes={};this.textContent='';this.classList={contains:c=>this.className.split(' ').includes(c),add:c=>{if(!this.classList.contains(c))this.className+=' '+c},toggle:(c,on)=>{this.className=this.className.split(' ').filter(x=>x!==c).join(' ');if(on)this.className+=' '+c}}}
 append(...nodes){nodes.forEach(n=>{n.remove();n.parentElement=this;this.children.push(n)})}
 replaceChildren(...nodes){this.children.forEach(n=>n.parentElement=null);this.children=[];this.append(...nodes)}
 remove(){if(this.parentElement){this.parentElement.children=this.parentElement.children.filter(n=>n!==this);this.parentElement=null}}
 setAttribute(k,v){this.attributes[k]=v}
 set innerHTML(s){this.replaceChildren();if(s.includes('<button')){this.append(new Element('span'),new Element('button'))}}
 matches(selector){return selector.split(',').some(sel=>{const parts=sel.trim().split(/\s+/);const simple=(n,s)=>{const [tag,...cls]=s.split('.');return (!tag||n.tagName===tag)&&cls.every(c=>n.classList.contains(c))};if(!simple(this,parts.pop()))return false;let p=this.parentElement;while(parts.length){const part=parts.pop();while(p&&!simple(p,part))p=p.parentElement;if(!p)return false;p=p.parentElement}return true})}
 querySelectorAll(sel){let out=[];for(const child of this.children){if(child.matches(sel))out.push(child);out.push(...child.querySelectorAll(sel))}return out}
 querySelector(sel){return this.querySelectorAll(sel)[0]||null}
}
function harness(){
 let now=0,id=0,timers=new Map(),ended=new Map(),calls=[];const root=new Element(),listeners={};
 const audio={play:k=>calls.push(k),stopEffect:k=>calls.push('stop:'+k),position:()=>.5,onEnded:(k,fn)=>{ended.set(k,fn);return()=>ended.delete(k)}};
 const document={hidden:false,getElementById:()=>root,createElement:t=>new Element(t),addEventListener:(k,fn)=>listeners[k]=fn};
 const ctx={window:{ShipAudio:audio},document,performance:{now:()=>now},setTimeout:(fn,ms)=>{timers.set(++id,{fn,at:now+ms});return id},clearTimeout:i=>timers.delete(i)};
 vm.runInNewContext(fs.readFileSync(path.join(__dirname,'../wrist-terminal.js'),'utf8'),ctx);
 const api=ctx.window.WristTerminal,game={},ui={boot:'game'};
 function advance(ms){const end=now+ms;for(;;){let next=[...timers].filter(([,t])=>t.at<=end).sort((a,b)=>a[1].at-b[1].at)[0];if(!next)break;now=next[1].at;timers.delete(next[0]);next[1].fn()}now=end}
 function draw(kind='event',red=false){root.replaceChildren();const board=new Element();board.className='board';root.append(board);if(kind){const wrap=new Element(),dialog=new Element();wrap.className=kind==='event'?'event-overlay':kind==='choice'?'board-overlay':'overlay';dialog.className=kind==='event'?'event-window':kind==='choice'?'card':'private executive-order';if(red)dialog.classList.add('classified-order');const heading=new Element('h2');heading.textContent=kind;dialog.append(heading);board.append(wrap);wrap.append(dialog)}api.sync(ui,game,true)}
 return {api,root,ui,game,calls,advance,draw,ended,document,listeners};
}
{
 const h=harness();h.draw();h.draw();assert.equal(h.calls.filter(x=>x==='wristOn').length,1);let extra=0;h.api.afterOpen(()=>extra++);assert.equal(extra,0);h.ended.get('wristOn')();assert.equal(extra,1);assert.equal(h.calls.filter(x=>x==='wristDrone').length,1);
 h.ui.sequence=true;h.draw(null);assert.equal(h.calls.filter(x=>x==='wristOff').length,0);
 h.game.pendingEvent='Risky salvage';h.ui.sequence=false;h.draw('choice');h.game.pendingEvent=null;h.ui.sequence=true;h.draw('event');h.draw('private',true);
 assert.equal(h.root.querySelector('.wrist-frame').classList.contains('wrist-red'),true);assert.equal(h.calls.filter(x=>x==='wristOn').length,1);
 h.ui.sequence=false;h.draw(null);assert.equal(h.api.isClosing(),true);assert.equal(h.calls.filter(x=>x==='wristOff').length,1);h.advance(1000);h.draw(null);assert.equal(h.calls.filter(x=>x==='wristOff').length,1);assert.equal(h.root.querySelector('.wrist-frame').style['--wrist-delay'],'-1000ms');h.advance(1253);assert.equal(h.root.querySelector('.wrist-overlay'),null);assert.equal(h.api.isClosing(),false);
}
{
 const h=harness();h.draw();const stale=h.ended.get('wristOn');h.draw(null);stale();assert.equal(h.calls.filter(x=>x==='wristDrone').length,0);h.advance(2253);assert.equal(h.calls.filter(x=>x==='wristOff').length,1);
}
{
 const h=harness();h.draw();h.ended.get('wristOn')();h.api.sync(h.ui,h.game,false);h.api.sync(h.ui,h.game,true);assert.equal(h.calls.filter(x=>x==='wristOn').length,1);assert.equal(h.calls.filter(x=>x==='wristDrone').length,2);
 h.document.hidden=true;h.listeners.visibilitychange();h.document.hidden=false;h.listeners.visibilitychange();assert.equal(h.calls.filter(x=>x==='wristDrone').length,3);h.api.sync({boot:'title'},null,true);assert.equal(h.root.querySelector('.wrist-overlay'),null);
}
{
 const h=harness();h.draw();h.ui.terminalHold=true;h.draw(null);h.advance(1000);h.ui.terminalHold=false;h.draw('private',true);assert.equal(h.calls.filter(x=>x==='wristOn').length,1);assert.equal(h.calls.filter(x=>x==='wristOff').length,0);h.api.cancel();
}
console.log('PASS: continuous linked sessions, final close, early close, mute, visibility, red briefing, no redraw restart.');
