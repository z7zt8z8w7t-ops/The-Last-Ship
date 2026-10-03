const fs=require('node:fs'),vm=require('node:vm'),path=require('node:path'),assert=require('node:assert/strict'),{createCanvas}=require('@napi-rs/canvas'),{harness}=require('./audit-harness');
const source=fs.readFileSync(path.join(__dirname,'../terrain.js'),'utf8').replace('window.ShipTerrain={mount,','window.ShipTerrain={drawLighting,mount,');
const context={window:{},document:{createElement:()=>createCanvas(820,614),addEventListener(){}},console};vm.runInNewContext(source,context);const api=context.window.ShipTerrain;
const centre=k=>k==='0,0'?[60,60]:k==='3,-2'?[760,60]:k==='1,0'?[410,310]:[505,310];
const game={tiles:{'1,0':{known:true},'2,0':{known:false}},players:[],flares:[]},cells=[{k:'1,0'},{k:'2,0'}];
function paint(angle=0){const canvas=createCanvas(820,614),ctx=canvas.getContext('2d');ctx.fillStyle='#646464';ctx.fillRect(0,0,820,614);api.drawLighting(ctx,game,cells,centre,'3,-2',100,true,820,614,1,0,0,()=>({angle,guard:false}));return ctx.getImageData(0,0,820,614).data}
const pixel=(data,x,y)=>Array.from(data.slice((y*820+x)*4,(y*820+x)*4+4)),base=paint();game.players=[{pos:'1,0'}];const lit=paint(),back=paint(180);
assert.ok(pixel(lit,390,302)[0]>pixel(base,390,302)[0]+40,'torch restores marine hex visibility');assert.deepEqual(pixel(lit,485,302),pixel(base,485,302),'torch cannot reveal a hidden hex');
assert.ok(pixel(lit,390,253)[0]>pixel(back,390,253)[0],'beam follows facing');
game.players[0].captive=true;assert.deepEqual(pixel(paint(),390,302),pixel(base,390,302));game.players[0].captive=false;game.players[0].boarded=true;assert.deepEqual(pixel(paint(),390,302),pixel(base,390,302));
game.players=[];game.flares=[{hex:'1,0'}];const flare=paint();assert.ok(pixel(flare,390,302)[0]>pixel(base,390,302)[0]+40);assert.deepEqual(pixel(flare,485,302),pixel(base,485,302));
const h=harness(),t=h.t;h.context.window.ShipTerrain={foreground:()=>''};t.s.turn=3;t.s.players[3].cargo=['flare'];t.beginItem(0);t.ui.targetHex='1,0';const known=t.s.tiles['1,0'].known;t.useItem();assert.equal(t.s.tiles['1,0'].known,known);assert.ok(t.board().includes('Active flare'));assert.ok(t.board().includes('flare-marker'));assert.equal(t.s.flares[0].untilRound,t.s.round+1);
console.log('PASS: dark terrain, lit marine hex, directional beam, no hidden-hex illumination, captive/boarded torch removal, visible warm flare and unchanged flare duration/discovery.');
