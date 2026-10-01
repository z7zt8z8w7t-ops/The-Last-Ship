const vm=require('node:vm'),fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict');
const html=fs.readFileSync(path.join(__dirname,'../index.html'),'utf8');
const script=[...html.matchAll(/<script([^>]*)>([\s\S]*?)<\/script>/g)].map(m=>m[2]).find(code=>code.includes('window.ShipAudio='));
function harness(webAudio=true){
 const nodes=[],decodes=[],listeners={},nativePlays=[];let context;
 const keys=['introLoop','wristDrone','wind','crt','muthurLogin','tracker','wristOn','muthurOff','discovery','start','titleDrone','femaleCapture','maleCapture','ripley','chances'];
 const embedded=Object.fromEntries(keys.map((key,i)=>[key,Buffer.from([i+1]).toString('base64')]));
 class Context{
  constructor(){context=this;this.state='suspended';this.currentTime=0;this.destination={}}
  decodeAudioData(bytes){return new Promise(resolve=>decodes.push({key:keys[new Uint8Array(bytes)[0]-1],resolve}))}
  resume(){this.state='running';return Promise.resolve()}
  createDynamicsCompressor(){return {threshold:{},knee:{},ratio:{},attack:{},release:{},connect(){},disconnect(){}}}
  createGain(){return {gain:{value:0},connect(){},disconnect(){}}}
  createBufferSource(){const n={starts:0,stops:0,connect(gain){this.gain=gain},disconnect(){},start(){this.starts++},stop(){this.stops++}};nodes.push(n);return n}
 }
 const media=[];
 function element(tag){const e={tag,paused:true,ended:false,readyState:4,currentTime:0,events:{},setAttribute(){},addEventListener(k,f){this.events[k]=f},append(){},play(){this.paused=false;nativePlays.push(this);return Promise.resolve()},pause(){this.paused=true}};if(tag==='audio')media.push(e);return e}
 const status=element('button');
 const document={hidden:false,getElementById:id=>id==='ship-audio-data'?{textContent:JSON.stringify(embedded)}:status,createElement:element,body:{append(){}},addEventListener:(k,fn)=>listeners[k]=fn};
 const sandbox={window:{AudioContext:webAudio?Context:undefined,addEventListener(){}},document,Uint8Array,atob:s=>Buffer.from(s,'base64').toString('binary'),console};
 vm.runInNewContext(script,sandbox);
 function resolveAll(){for(const d of decodes.splice(0))d.resolve({key:d.key,duration:d.key==='wristOn'?.813:d.key==='wristDrone'?1.55569:5})}
 return {api:sandbox.window.ShipAudio,nodes,decodes,listeners,document,media,nativePlays,resolveAll,get context(){return context}};
}
async function tick(){for(let i=0;i<8;i++)await Promise.resolve()}
(async()=>{
 const h=harness();h.api.preload();assert.equal(h.nativePlays.length,0);assert.equal(h.nodes.length,0,'preparation is silent');h.api.unlock();h.api.play('wristDrone');h.api.stopEffect('wristDrone');h.resolveAll();await tick();assert.equal(h.nodes.filter(n=>n.buffer?.key==='wristDrone').length,0,'cancelled decode cannot start');
 h.api.play('wristDrone');await tick();const drone=h.nodes.find(n=>n.buffer.key==='wristDrone');assert.equal(drone.loop,true);assert.equal(drone.loopEnd,drone.buffer.duration);assert.equal(drone.gain.gain.value,.55);h.api.play('wristDrone');await tick();assert.equal(h.nodes.filter(n=>n.buffer.key==='wristDrone').length,1);
 h.context.state='suspended';h.api.play('wristDrone');await tick();assert.equal(h.context.state,'running');
 h.api.preload('game');h.resolveAll();await tick();const before=h.nodes.length;h.api.unlock();await tick();assert.equal(h.nodes.length,before,'unlock must not start prepared effects');assert.equal(h.nativePlays.length,0);
 h.api.play('start',.85);h.api.play('ripley');h.api.play('titleDrone');await tick();const requested=h.nodes.slice(before).map(n=>n.buffer.key);assert.deepEqual(requested.sort(),['ripley','start','titleDrone'],'mission launch requests Ripley, screech and score');
 let ended=0;h.api.onEnded('wristOn',()=>ended++);h.api.play('wristOn');await tick();const startup=h.nodes.find(n=>n.buffer.key==='wristOn');assert.equal(startup.gain.gain.value,.6);startup.onended();assert.equal(ended,1);
 h.api.play('discovery');await tick();assert.equal(h.nodes.find(n=>n.buffer.key==='discovery').gain.gain.value,1.2);
 h.api.play('ripley');await tick();assert.equal(h.nodes.find(n=>n.buffer.key==='ripley').gain.gain.value,.5);h.api.play('chances');await tick();assert.equal(h.nodes.find(n=>n.buffer.key==='chances').gain.gain.value,.5);h.api.wind(.1);assert.equal(h.nodes.find(n=>n.buffer.key==='wind'&&n.stops===0).gain.gain.value,.125);
 h.api.stopEffect('wristDrone');assert.equal(drone.stops,1);h.api.setEnabled(false);assert.ok(h.nodes.filter(n=>n.buffer.key==='titleDrone').every(n=>n.stops===1));h.api.setEnabled(true);await tick();assert.equal(h.nodes.filter(n=>n.buffer.key==='wristDrone').length,1,'unmute cannot revive a cancelled drone');
 h.api.play('wristDrone');await tick();h.document.hidden=true;h.listeners.visibilitychange();h.api.stopEffect('wristDrone');h.document.hidden=false;h.listeners.visibilitychange();await tick();assert.equal(h.nodes.filter(n=>n.buffer.key==='wristDrone').length,2,'visibility cannot restart a cancelled session');
 const f=harness(false);f.api.preload('game');assert.equal(f.nativePlays.length,0);f.api.unlock();await tick();assert.equal(f.nativePlays.length,1,'legacy fallback unlock starts only wind');f.api.play('wristDrone');const wav=f.media.find(e=>e.src?.startsWith('data:audio/wav'));assert.equal(wav.loop,true);assert.equal(wav.paused,false);f.api.stopEffect('wristDrone');assert.equal(wav.paused,true);
 console.log('PASS: silent preload/unlock, launch plays only requested cues, gain levels, natural startup completion, drone resumption, cancellation, mute and legacy fallback.');
})().catch(e=>{console.error(e);process.exitCode=1});
