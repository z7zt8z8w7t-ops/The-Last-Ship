const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm'),assert=require('node:assert/strict');
const source=fs.readFileSync(path.join(__dirname,'../game.js'),'utf8');
const terminalFn=source.slice(source.indexOf('function mountTerminal('),source.indexOf('function revealTerminal('));
const stageFn=source.slice(source.indexOf('function cinemaStage('),source.indexOf("document.addEventListener('visibilitychange'"));
const waits=[],calls=[],contextTitle={ui:{},matchMedia:()=>({matches:false}),render(){},startTitleGlow(){},cinemaWait:(ms,fn)=>waits.push({ms,fn}),ShipAudio:{play:k=>calls.push(k)}};
vm.runInNewContext(stageFn+';this.stage=cinemaStage',contextTitle);contextTitle.stage('title');assert.equal(waits[0].ms,31300);assert.deepEqual(calls,[]);
const lines=['NEW CO-ORDINATES RECEIVED.','SPECIAL ORDER 937 ACTIVATED.','ALL OTHER CONSIDERATIONS SECONDARY.','ACKNOWLEDGE','','','','','I CAN’T LIE TO YOU ABOUT YOUR CHANCES, BUT…','YOU HAVE MY SYMPATHIES'];
const nodes=lines.map((line,i)=>({textContent:line,dataset:{prefix:i?'\u003e ':'MU-TH-UR >:'},classList:{add(){}},getAttribute(){return null},setAttribute(){},append(){}}));
const cursor={},region={dataset:{terminal:'boot'},isConnected:true,classList:{add(){},remove(){}},querySelectorAll:()=>nodes,querySelector:()=>cursor,offsetWidth:1};
const pending=[],played=[];
const context={document:{querySelector:()=>region,createElement:()=>({className:'',setAttribute(){},append(){},textContent:''}),hidden:false},ui:{introTypingAt:0},terminalRun:null,terminalSessions:new Map(),soundOn:true,ShipAudio:{play:k=>played.push(k)},performance:{now:()=>0},matchMedia:()=>({matches:false}),setTimeout:(fn,ms)=>{pending.push(fn);return pending.length},clearTimeout:()=>{},stopTerminal(){context.terminalRun=null}};
vm.runInNewContext(terminalFn+';this.mount=mountTerminal',context);
context.mount(false);const boundary=lines.slice(0,8).reduce((sum,line)=>sum+Math.max(1,line.length),0);
for(let i=0;i<boundary;i++){const next=pending.shift();assert.ok(next);next()}
assert.deepEqual(played,[],'cue waits until the requested line starts');
while(!played.length){const next=pending.shift();assert.ok(next);next()}
assert.deepEqual(played,['chances']);assert.equal(context.terminalSessions.get('boot').count,boundary+1);
console.log('PASS: title retains its blue-flash timing without a speech cue; MU-TH-UR clip fires on first character of the requested line.');
const apcTimers=[];Object.assign(contextTitle,{s:{},soundOn:true,fadeWind(){},performance:{now:()=>0},document:{hidden:false},setTimeout:(fn,ms)=>apcTimers.push({fn,ms})});calls.length=0;contextTitle.stage('apc');assert.deepEqual(calls,[]);assert.equal(apcTimers[0].ms,1000);apcTimers[0].fn();assert.deepEqual(calls,['apc']);
