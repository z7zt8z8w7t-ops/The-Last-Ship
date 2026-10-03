const fs=require('node:fs'),vm=require('node:vm'),path=require('node:path'),assert=require('node:assert/strict'),{createCanvas}=require('@napi-rs/canvas');
const source=fs.readFileSync(path.join(__dirname,'../terrain.js'),'utf8').replace('window.ShipTerrain={mount,','window.ShipTerrain={drawWeather,weatherFor,mount,');
const context={window:{},document:{addEventListener(){}},performance:{now:()=>0},console};vm.runInNewContext(source,context);
const api=context.window.ShipTerrain,game={tiles:{'0,0':{known:false}}},before=JSON.stringify(game),weather=api.weatherFor(game);
assert.equal(api.weatherFor(game),weather,'redraw keeps the same weather schedule');
function render(reduced){const canvas=createCanvas(820,614),ctx=canvas.getContext('2d');ctx.fillStyle='#101d16';ctx.fillRect(0,0,820,614);api.drawWeather(ctx,{next:Infinity,strike:0,bolt:[[760,20],[775,60],[750,100],[765,140]]},100,reduced,[{k:'0,0'}],()=>[380,323],[0,0,820,614]);return ctx.getImageData(0,0,820,614).data}
const moving=render(false),still=render(true),pixel=(data,x,y)=>Array.from(data.slice((y*820+x)*4,(y*820+x)*4+4));
assert.deepEqual(pixel(moving,360,315),[16,29,22,255],'unrevealed hex stays untouched by lightning');
assert.deepEqual(pixel(moving,360,315),pixel(still,360,315));
assert.notDeepEqual(pixel(moving,805,400),pixel(still,805,400),'lightning illuminates the surround');
assert.equal(JSON.stringify(game),before,'weather never reveals terrain or changes game state');
assert.ok(weather.next>=12000&&weather.next<=24000);
console.log('PASS: persistent weather schedule, mist and unchanged hexes/game state and reduced-motion lightning suppression.');
