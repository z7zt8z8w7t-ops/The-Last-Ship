/* Approved concept images are used as source atlases. No UI labels are included in tile crops. */
(()=>{'use strict';
const ROOT='./terrain/',images=new Map();let frame=null,owner=null;
const crops={ground:['ground',115,52,686,780],cover:['cover',115,50,686,780],spores:['spores',115,52,686,780],event:['event',39,23,811,921],nest:['nest',40,23,810,921],lander:['apc',79,10,1095,1218],emplacement:['emplacement',31,12,829,950],cache:['cache',47,12,832,960],pdt:['pdt',48,59,714,834],bridge:['bridge',115,52,686,780],void:['broken',219,12,922,1070],green:['wells',115,52,686,780],blue:['wells',974,52,686,780]};
function image(name,redraw){if(!images.has(name)){const img=new Image();img.onload=()=>redraw?.();img.onerror=()=>console.warn('Terrain unavailable:',name);img.src=ROOT+name+'.png';images.set(name,img)}return images.get(name)}
function polygon(ctx,x,y,r=55){ctx.beginPath();for(let i=0;i<6;i++){const a=(60*i-30)*Math.PI/180;const px=x+r*Math.cos(a),py=y+r*Math.sin(a);i?ctx.lineTo(px,py):ctx.moveTo(px,py)}ctx.closePath()}
function paint(ctx,name,x,y,r=55,redraw){const c=crops[name],img=image(c[0],redraw);if(!img.complete||!img.naturalWidth)return;ctx.drawImage(img,...c.slice(1),x-r*Math.sqrt(3)/2,y-r,r*Math.sqrt(3),r*2)}
function tileName(t){return t.emplacement?'emplacement':t.terrain==='gravity'?t.pair==='red'?'green':'blue':t.site?.kind==='cargo'?'cache':t.site?.kind==='distress'?'pdt':t.terrain==='open'?'ground':t.terrain}
function nestAngle(game,key){const candidates=[0,60,120,180,240,300];const dirs=[[1,-1],[1,0],[0,1],[-1,1],[-1,0],[0,-1]];const [q,r]=key.split(',').map(Number);let best=0,score=-1;for(let n=0;n<6;n++){const a=dirs[n],b=dirs[(n+1)%6],c=dirs[(n+2)%6],v=[a,b,c].filter(([dq,dr])=>game.tiles[`${q+dq},${r+dr}`]).length;if(v>score){score=v;best=candidates[n]}}return best}
function mount(canvas,game,cells,centre,staging,redraw){stop();owner=canvas;const ctx=canvas.getContext('2d');if(!ctx)return;
 let lastPaint=-Infinity;function draw(){if(owner!==canvas||!canvas.isConnected||document.hidden)return;const now=performance.now();if(now-lastPaint<33){frame=requestAnimationFrame(draw);return}lastPaint=now;ctx.clearRect(0,0,820,614);ctx.fillStyle='#101d16';ctx.fillRect(0,0,820,614);
  // A continuous rocky background, with the grid retaining its exact gameplay geometry.
  const bg=image('ground',redraw);if(bg.complete&&bg.naturalWidth)ctx.drawImage(bg,130,210,620,450,0,0,820,614);
  for(const c of cells){const t=game.tiles[c.k],[cx,cy]=centre(c.k),x=cx-20,y=cy-8;ctx.save();polygon(ctx,x,y);ctx.clip();ctx.fillStyle='#13251c';ctx.fillRect(x-50,y-55,100,110);
   if(c.k!==staging){if(t.terrain==='nest'){ctx.translate(x,y);ctx.rotate(nestAngle(game,c.k)*Math.PI/180);paint(ctx,'nest',0,0,55,redraw)}else paint(ctx,tileName(t),x,y,55,redraw)}else{paint(ctx,'ground',x,y,55,redraw);ctx.fillStyle='#414641';ctx.fillRect(x-32,y-32,64,64)}
   if(t.terrain==='gravity'){const name=t.pair==='red'?'green':'blue';ctx.save();ctx.beginPath();ctx.arc(x,y+3,27,0,2*Math.PI);ctx.clip();ctx.translate(x,y+3);ctx.rotate(performance.now()/24000*2*Math.PI);paint(ctx,name,0,-3,55,redraw);ctx.restore()}
   if(t.site?.kind==='cargo'){// Cover the baked beacon glow; a live light is drawn above the tile outline.
    ctx.fillStyle='#252f2a';ctx.beginPath();ctx.arc(x-9,y-40,5,0,Math.PI*2);ctx.fill();ctx.beginPath();ctx.arc(x-32,y-18,4,0,Math.PI*2);ctx.fill()}
   ctx.restore();
  }
  drawLanding(ctx,game,centre(staging),redraw);frame=requestAnimationFrame(draw)
 }draw()
}
function drawLanding(ctx,game,point,redraw){const img=image('landing',redraw);if(!img.complete||!img.naturalWidth)return;const x=point[0]-20,y=point[1]-8,scale=.19;
 ctx.save();ctx.beginPath();polygon(ctx,x,y,55);ctx.clip();ctx.drawImage(img,0,0,img.naturalWidth,img.naturalHeight,x-320*scale,y-665*scale,img.naturalWidth*scale,img.naturalHeight*scale);ctx.restore();
 // Only the external apron above/right of the upper-right staging edge is visible here.
 ctx.save();ctx.beginPath();ctx.moveTo(x,y-55);ctx.lineTo(x+48,y-27.5);ctx.lineTo(x+72,y+5);ctx.lineTo(820,y+5);ctx.lineTo(820,0);ctx.lineTo(x+45,0);ctx.closePath();ctx.clip();ctx.drawImage(img,0,0,img.naturalWidth,img.naturalHeight,x-320*scale,y-665*scale,img.naturalWidth*scale,img.naturalHeight*scale);ctx.restore();
 // Remove fixed yellow pools with a translucent apron shade before animated sweeps.
 ctx.save();ctx.fillStyle=game.round>=8?'#07120e88':'#07120e33';for(const [dx,dy] of [[-16,-43],[-43,7],[0,46]]){ctx.beginPath();ctx.arc(x+dx,y+dy,12,0,2*Math.PI);ctx.fill()}ctx.restore()
}
function sprite(name,x,y,r,id){const c=crops[name];return `<svg x="${x-r*Math.sqrt(3)/2}" y="${y-r}" width="${r*Math.sqrt(3)}" height="${r*2}" viewBox="${c.slice(1).join(' ')}" overflow="hidden"><image href="${ROOT+c[0]}.png" width="${images.get(c[0])?.naturalWidth||(['ground','cover','spores','bridge','wells'].includes(c[0])?1774:c[0]==='apc'?1254:c[0]==='broken'?1358:1536)}" height="${images.get(c[0])?.naturalHeight||(['ground','cover','spores','bridge','wells'].includes(c[0])?887:c[0]==='apc'?1254:c[0]==='broken'?1159:1024)}"/></svg>`}
function foreground(game,cells,centre,staging){let out=[];for(const c of cells){const t=game.tiles[c.k];if(!t.known)continue;const [x,y]=centre(c.k),id=c.k.replace(',','_');
 if(t.site?.kind==='cargo'){const on=t.site.status==='hidden';out.push(`<g class="cache-beacons ${on?'cache-loaded':''}" aria-label="${on?'Equipment available':'Equipment collected'}">${[[-9,-40],[-32,-18]].map(([dx,dy])=>`<circle cx="${x+dx}" cy="${y+dy}" r="3" fill="${on?'#4bcaff':'#24352c'}"/>`).join('')}</g>`)}
 if(['cover','spores'].includes(t.terrain)){// Selective edge protrusions only; preserve all neighbouring gameplay centres.
 for(let i=0;i<6;i++){const a=(i*60)*Math.PI/180,px=x+48*Math.cos(a),py=y+48*Math.sin(a);out.push(`<defs><clipPath id="edge-${id}-${i}"><ellipse cx="${px}" cy="${py}" rx="9" ry="8"/></clipPath></defs><g clip-path="url(#edge-${id}-${i})">${sprite(t.terrain,x,y,59,id)}</g>`)}}
 if(t.terrain==='bridge'||t.terrain==='void'){out.push(`<defs><clipPath id="span-${id}"><path d="M${x-61} ${y+32}L${x+56} ${y-39}L${x+65} ${y-25}L${x-52} ${y+47}Z"/></clipPath></defs><g clip-path="url(#span-${id})" opacity="${t.terrain==='void'?.65:1}">${sprite(t.terrain,x,y,64,id)}</g>`)}
 if(t.terrain==='nest'){const angle=nestAngle(game,c.k);out.push(`<g transform="translate(${x} ${y}) rotate(${angle})" fill="none" stroke="#434939" stroke-width="3.5" stroke-linecap="round">${[-30,0,30].map((dy,i)=>`<path d="M40 ${dy}Q54 ${dy-7} 63 ${dy+i*3}"/>`).join('')}</g>`)}
 }
 const [x,y]=centre(staging),red=game.round>=8,colour=red?'#ff392c':'#ffce35';out.push(`<g class="staging-hazards" aria-label="${red?'Red':'Yellow'} rotating staging lights">${[[-16,-43],[-43,7],[0,46]].map(([dx,dy],i)=>`<g transform="translate(${x+dx} ${y+dy})"><g fill="${colour}" opacity=".48"><path d="M0 0L-12 -62Q10 -68 24 -57Z"/><animateTransform attributeName="transform" type="rotate" from="${i*120}" to="${i*120+360}" dur="3.4s" repeatCount="indefinite"/></g><circle r="2.5" fill="${colour}"/></g>`).join('')}</g>`);game.players?.forEach((p,i)=>{if(!p.boarded)return;const initial=(p.name.trim()[0]||'?').toUpperCase().replace(/[&<>"']/g,'');out.push(`<text class="apc-seat-initial" x="${x+113+(i%2)*10}" y="${y-65+Math.floor(i/2)*10}" text-anchor="middle">${initial}</text>`)});return out.join('')}
function stop(){if(frame!==null)cancelAnimationFrame(frame);frame=null;owner=null}
window.ShipTerrain={mount,stop,foreground,tileName,nestAngle};
})();
