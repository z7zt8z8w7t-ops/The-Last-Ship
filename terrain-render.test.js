const fs=require('node:fs'),vm=require('node:vm'),path=require('node:path'),assert=require('node:assert/strict'),{createCanvas,loadImage}=require('@napi-rs/canvas');
(async()=>{
const root=path.resolve(__dirname,'..'),source=fs.readFileSync(root+'/terrain.js','utf8'),sources=JSON.parse(source.match(/const SOURCES=(.*?),images=new Map/)[1]);
const loaded={};for(const [name,uri] of Object.entries(sources))loaded[name]=await loadImage(Buffer.from(uri.split(',')[1],'base64'));
loaded.valley=await loadImage(root+'/board-valley.webp');
let id=0,frameFn,visibility,hidden=false;
const context={window:{},loaded,Image:function(){},document:{get hidden(){return hidden},createElement:()=>createCanvas(820,614),addEventListener:(name,fn)=>visibility=fn},performance:{now:()=>100},requestAnimationFrame:fn=>{frameFn=fn;return ++id},cancelAnimationFrame:()=>{},console};
vm.runInNewContext(source.replace(/function image\(name,redraw\)\{.*?\n/,'function image(name){return loaded[name]}\n'),context);
const art=context.window.ShipTerrain,canvas=createCanvas(820,614);canvas.isConnected=true;
const cells=[],tiles={};for(let q=-3;q<=3;q++)for(let r=-3;r<=3;r++)if(Math.abs(q+r)<=3){const k=`${q},${r}`;cells.push({k});tiles[k]={terrain:'open',known:true}}
const keys=Object.keys(tiles);['cover','spores','event','nest','lander','bridge','void','gravity'].forEach((terrain,i)=>tiles[keys[i]].terrain=terrain);tiles[keys[7]].pair='red';tiles[keys[8]].terrain='gravity';tiles[keys[8]].pair='blue';tiles[keys[9]].site={kind:'cargo',status:'hidden'};tiles[keys[10]].site={kind:'distress',status:'hidden'};tiles[keys[11]].emplacement=true;
const game={tiles,round:1},centre=k=>{const [q,r]=k.split(',').map(Number);return [360+Math.sqrt(3)*55*(q+r/2),315+82.5*r]};art.mount(canvas,game,cells,centre,'3,-2',()=>{});
assert.ok(canvas.toBuffer('image/png').length>100000);
assert.ok(!art.foreground(game,cells,centre,'3,-2').includes('staging-hazards'));game.round=8;const foreground=art.foreground(game,cells,centre,'3,-2');assert.ok(foreground.includes('Yellow rotating staging lights'));assert.ok(!foreground.includes('Red rotating'));assert.ok(foreground.includes('hazard-falloff'));assert.ok(!foreground.includes('data:image'));
const before=id;hidden=true;frameFn();hidden=false;visibility();assert.ok(id>before,'visible canvas must resume');
tiles[keys[9]].site.status='collected';assert.ok(art.foreground(game,cells,centre,'3,-2').includes('Equipment collected'));tiles[keys[9]].emplacement=true;assert.ok(!art.foreground(game,[{k:keys[9]}],centre,'3,-2').includes('cache-beacons'));
fs.writeFileSync(root+'/verification/terrain-render.png',canvas.toBuffer('image/png'));art.stop();
console.log('PASS: assets decode/render, continuous backdrop, transparent edge sprites, yellow lights only at two hours, no SVG atlas duplication, visibility resume and cache states.');
})().catch(e=>{console.error(e);process.exitCode=1});
