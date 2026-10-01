(()=>{'use strict';
const ship=new Image(),terrain=new Image();ship.src='dropship-ship.webp';terrain.src='dropship-terrain.webp';
const beacons=[{x:584,y:558,r:410,p:0},{x:1108,y:494,r:425,p:1.9},{x:1143,y:882,r:450,p:3.8}];
const engines=[{x:443,y:515,bx:453,by:610},{x:1072,y:400,bx:1093,by:475}];
const clamp=x=>Math.max(0,Math.min(1,x)),ease=x=>x*x*(3-2*x);
const reduced=()=>matchMedia('(prefers-reduced-motion: reduce)').matches;
let run=null;
const beam=document.createElement('canvas');beam.width=beam.height=256;const bc=beam.getContext('2d'),pixels=bc.createImageData(256,256);
for(let y=0;y<256;y++)for(let x=0;x<256;x++){const dx=(x-128)/128,dy=(y-128)/128,r=Math.hypot(dx,dy),angle=Math.atan2(dy,dx),a=Math.exp(-Math.pow(angle/.34,2)),radial=r<1?Math.pow(1-r,1.35)*Math.min(1,r*9):0,i=(y*256+x)*4;pixels.data[i]=255;pixels.data[i+1]=184;pixels.data[i+2]=30;pixels.data[i+3]=Math.round(255*Math.min(.98,a*radial*1.9))}bc.putImageData(pixels,0,0);
function stop(){if(run){cancelAnimationFrame(run.frame);run=null}}
function ready(){return ship.complete&&ship.naturalWidth&&terrain.complete&&terrain.naturalWidth}
function drawGround(ctx,x,y,S){if(terrain.complete&&terrain.naturalWidth)ctx.drawImage(terrain,terrain.naturalWidth*208/1448,terrain.naturalHeight*30/1086,terrain.naturalWidth*1030/1448,terrain.naturalHeight*1040/1086,x-Math.sqrt(3)*S/2,y-S,Math.sqrt(3)*S,2*S)}
function glow(ctx,x,y,r,amount,blue=false){const g=ctx.createRadialGradient(x,y,0,x,y,r);g.addColorStop(0,blue?`rgba(245,253,255,${amount})`:`rgba(255,222,110,${amount})`);g.addColorStop(.28,blue?`rgba(95,185,255,${amount*.7})`:`rgba(255,177,25,${amount*.65})`);g.addColorStop(1,blue?'rgba(40,120,255,0)':'rgba(255,160,0,0)');ctx.fillStyle=g;ctx.beginPath();ctx.arc(x,y,r,0,Math.PI*2);ctx.fill()}
function state(game,now){const departing=game.phase==='departing',t=departing?(now-game.departure.started)/1000:0;return{departing,t,ignition:ease(clamp((t-.6)/1.5)),lift:ease(clamp((t-2.1)/1.3)),flight:clamp((t-3.4)/2.8)}}
function mount(canvas,game,pos,refresh,hullCanvas){stop();if(!canvas)return;const base=document.createElement('canvas');base.width=680;base.height=614;base.getContext('2d').drawImage(canvas,0,0);let flightX=790,flightY=270;
 if(hullCanvas&&game.phase==='departing'){
  const board=hullCanvas.closest?.('.board'),layout=board?.closest('.layout'),side=layout?.querySelector('.side');
  if(board&&layout&&side){const b=board.getBoundingClientRect(),s=side.getBoundingClientRect(),l=layout.getBoundingClientRect(),right=s.left>=b.right-8;
   const w=right?Math.max(b.width,l.right-b.left):b.width,h=right?b.height:Math.max(b.height,s.bottom-b.top);
   hullCanvas.width=Math.ceil(680*w/b.width);hullCanvas.height=Math.ceil(614*h/b.height);
   hullCanvas.style.width=w+'px';hullCanvas.style.height=h+'px';
   flightX=right?680-pos.x+120:0;flightY=right?60:614-pos.y+110;
  }
 }
 run={canvas,hullCanvas,game,pos,base,refresh,frame:0,last:-Infinity};const local=run;
function frame(now){if(run!==local||!canvas.isConnected)return;local.frame=requestAnimationFrame(frame);if(now-local.last<33)return;local.last=now;let ctx=canvas.getContext('2d');if(hullCanvas)hullCanvas.getContext('2d').clearRect(0,0,hullCanvas.width,hullCanvas.height);ctx.clearRect(0,0,680,614);ctx.drawImage(base,0,0);if(!ready())return;
 const st=state(game,now),scale=110/980,travel=st.flight*st.flight,quiet=reduced(),fade=st.departing?1-st.lift:1;
 // All ground lighting sits under the SVG fog, player pieces and hull.
 if(game.round>=7&&game.phase!=='over'&&fade>0){ctx.save();ctx.globalCompositeOperation='screen';ctx.globalAlpha=fade;for(const b of beacons){ctx.save();ctx.translate(pos.x+(b.x-724)*scale,pos.y+(b.y+34-590)*scale);ctx.rotate(.18);ctx.scale(1,.46);ctx.rotate((quiet?0:now/2800*Math.PI*2)+b.p);ctx.drawImage(beam,-b.r*scale,-b.r*scale,2*b.r*scale,2*b.r*scale);ctx.restore()}ctx.restore()}
 ctx.save();ctx.translate(pos.x,pos.y+2);ctx.scale(scale*(1-st.lift*.1),scale*(1-st.lift*.1));ctx.globalAlpha=(1-st.lift*.9)*.28;ctx.filter='brightness(0) blur(2px)';ctx.drawImage(ship,-724,-590,1448,1086);ctx.restore();
 if(st.departing&&st.t>=6.2)return;
 if(hullCanvas)ctx=hullCanvas.getContext('2d');
 ctx.save();ctx.translate(pos.x+travel*flightX,pos.y-st.lift*14+travel*flightY);ctx.scale(scale*(1+st.lift*.045),scale*(1+st.lift*.045));ctx.rotate(quiet?0:-travel*.055);
 for(const e of engines){if(!st.ignition)continue;ctx.save();ctx.translate(e.bx-724,e.by-590);ctx.rotate(-.15+st.flight*1.6);const len=55+st.ignition*100,g=ctx.createLinearGradient(0,0,0,len);g.addColorStop(0,`rgba(235,253,255,${st.ignition})`);g.addColorStop(.3,`rgba(96,195,255,${st.ignition*.8})`);g.addColorStop(1,'rgba(40,110,255,0)');ctx.fillStyle=g;ctx.beginPath();ctx.moveTo(-18,0);ctx.quadraticCurveTo(-30,len*.4,0,len);ctx.quadraticCurveTo(30,len*.4,18,0);ctx.fill();ctx.restore()}
 ctx.drawImage(ship,-724,-590,1448,1086);ctx.save();ctx.globalCompositeOperation='screen';for(const e of engines){ctx.save();ctx.translate(e.x-724,e.y-590);ctx.scale(.65,1);glow(ctx,0,0,49,st.ignition*.9,true);glow(ctx,0,0,18,st.ignition,true);ctx.restore()}if(game.round>=7&&fade>0)for(const b of beacons){const angle=(quiet?0:now/2800*Math.PI*2)+b.p,shine=.2+.8*Math.pow(Math.max(0,Math.cos(angle-.7)),8);glow(ctx,b.x-724,b.y-590,11,shine*fade)}ctx.restore();ctx.restore();
 if((game.round<7||quiet)&&!st.departing){cancelAnimationFrame(local.frame);local.frame=0}
}
local.frame=requestAnimationFrame(frame)}
for(const img of [ship,terrain])img.addEventListener('load',()=>{if(run?.canvas.isConnected)run.refresh?.()});
window.ShipDropship={drawGround,mount,stop,state,ready};
})();
