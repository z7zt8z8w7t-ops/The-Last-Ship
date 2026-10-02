const fs=require('node:fs'),vm=require('node:vm'),path=require('node:path'),assert=require('node:assert/strict'),{createCanvas,Image,loadImage}=require('@napi-rs/canvas');
const root=path.resolve(__dirname,'..');let renders=0,id=0,cancelled=[];
(async()=>{const names=['ground','cover','spores','event','nest','apc','bridge','broken','wells','cache','pdt','emplacement','landing'],loaded=await Promise.all(names.map(n=>loadImage(root+'/terrain/'+n+'.png')));let at=0;
function AssetImage(){const img=loaded[at++];Object.defineProperty(img,'src',{set(){},get(){return ''}});return img}
const context={window:{},Image:AssetImage,document:{hidden:false},performance:{now:()=>0},requestAnimationFrame:()=>++id,cancelAnimationFrame:n=>cancelled.push(n),console};
vm.runInNewContext(fs.readFileSync(root+'/terrain.js','utf8'),context);const art=context.window.ShipTerrain,canvas=createCanvas(820,614);canvas.isConnected=true;
const cells=[],tiles={};for(let q=-3;q<=3;q++)for(let r=-3;r<=3;r++)if(Math.abs(q+r)<=3){const k=`${q},${r}`;cells.push({k});tiles[k]={terrain:'open',known:true}}
const keys=Object.keys(tiles);['cover','spores','event','nest','lander','bridge','void','gravity'].forEach((terrain,i)=>tiles[keys[i]].terrain=terrain);tiles[keys[7]].pair='red';tiles[keys[8]].terrain='gravity';tiles[keys[8]].pair='blue';tiles[keys[9]].site={kind:'cargo',status:'hidden'};tiles[keys[10]].site={kind:'distress',status:'hidden'};tiles[keys[11]].emplacement=true;
const game={tiles,round:1},centre=k=>{const [q,r]=k.split(',').map(Number);return [360+Math.sqrt(3)*55*(q+r/2),315+82.5*r]};art.mount(canvas,game,cells,centre,'3,-2',()=>renders++);
assert.ok(canvas.toBuffer('image/png').length>100000);assert.ok(art.foreground(game,cells,centre,'3,-2').includes('Yellow rotating staging lights'));game.round=8;assert.ok(art.foreground(game,cells,centre,'3,-2').includes('Red rotating staging lights'));tiles[keys[9]].site.status='collected';assert.ok(art.foreground(game,cells,centre,'3,-2').includes('Equipment collected'));art.stop();assert.ok(cancelled.length);console.log('PASS: all terrain source images decode and render, staging yellow/red threshold, cache light state and animation cancellation.');

})().catch(e=>{console.error(e);process.exitCode=1});
