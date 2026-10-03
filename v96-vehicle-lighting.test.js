const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm'),assert=require('node:assert/strict'),{createCanvas}=require('@napi-rs/canvas');
const source=fs.readFileSync(path.join(__dirname,'../terrain.js'),'utf8').replace('window.ShipTerrain={mount,','window.ShipTerrain={drawLighting,mount,');
const c={window:{},document:{createElement:()=>createCanvas(820,614),addEventListener(){}},console};vm.runInNewContext(source,c);const api=c.window.ShipTerrain;
const centre=k=>k==='stage'?[500,300]:k==='0,0'?[200,300]:k==='front'?[200,217.5]:k==='rear'?[200,382.5]:[622,218];
function paint(game,cells){const canvas=createCanvas(820,614),ctx=canvas.getContext('2d');ctx.fillStyle='#646464';ctx.fillRect(0,0,820,614);api.drawLighting(ctx,game,cells,centre,'stage',100,true,820,614,1,0,0);return ctx}
const pix=(ctx,x,y)=>Array.from(ctx.getImageData(x,y,1,1).data);
// Former top edge of the rectangular ship mask must now have a continuous falloff.
const soft=paint({tiles:{},players:[],flares:[]},[]);assert.ok(pix(soft,602,167)[0]>30);assert.ok(Math.abs(pix(soft,602,167)[0]-pix(soft,602,169)[0])<4);
// Ship pools and nose beam cannot lift darkness in unexplored tiles.
const hidden=paint({tiles:{hidden:{known:false}},players:[],flares:[]},[{k:'hidden'}]);assert.ok(pix(hidden,602,210)[0]<30);
// APC beams brighten the terrain ahead; two rear lamps add red, while fog is preserved.
const game={tiles:{'0,0':{known:true},front:{known:true},rear:{known:true}},players:[],flares:[]},cells=Object.keys(game.tiles).map(k=>({k}));const lit=paint(game,cells);assert.ok(pix(lit,164,229)[0]>pix(lit,260,229)[0]+30);const red=pix(lit,164,330);assert.ok(red[0]>red[1]);game.tiles.front.known=false;const fog=paint(game,cells);assert.ok(pix(fog,164,229)[0]<30);
const fg=api.foreground(game,cells,centre,'stage');assert.ok(fg.includes('APC headlights and rear lights'));assert.ok(fg.includes('Starboard green navigation light'));
console.log('PASS: feathered ship light boundary, no unknown-tile illumination, APC forward beam and rear red glow, persistent lamp markers.');
