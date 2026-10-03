const {harness}=require('./audit-harness'),assert=require('node:assert/strict');
const h=harness(),t=h.t,p=t.s.players[0];p.pos='0,0';
for(const [pos,period] of [['3,0',1800],['2,0',1100],['1,0',650]]){
 t.s.alien=pos;t.s.tiles[pos].known=false;assert.ok(t.trackerContact());assert.equal(t.trackerInterval(),period);assert.ok(t.trackerMarkup().includes('--ping-period:'+period+'ms'));assert.equal(t.alienIcon(),'','tracker does not reveal alien on an undiscovered tile');
 t.scheduleTracker();const before=h.calls.filter(k=>k==='tracker').length;h.advance(period-1);assert.equal(h.calls.filter(k=>k==='tracker').length,before);h.advance(1);assert.equal(h.calls.filter(k=>k==='tracker').length,before+1);
}
p.pos='-1,0';t.s.alien='3,0';assert.equal(t.trackerContact(),null);assert.equal(t.trackerInterval(),0);t.scheduleTracker();assert.ok(h.calls.includes('stop:tracker'));
p.pos='0,0';t.s.alien='3,0';t.s.tiles['3,0'].known=true;assert.equal(t.alienIcon(),'','three tiles away is tracker-only, even on revealed terrain');
t.ui.popup={kind:'event',title:'Motion echo'};assert.equal(t.trackerInterval(),1800);t.ui.popup={kind:'capture'};assert.equal(t.trackerInterval(),0);t.ui.popup=null;p.captive=true;assert.equal(t.trackerInterval(),0);p.captive=false;h.context.document.hidden=true;assert.equal(t.trackerInterval(),0);
console.log('PASS: tracker contact and ping/pulse at 3/2/1 tiles (1800/1100/650ms), four-tile cutoff, unrevealed terrain and board-icon privacy, reports continue and capture/visibility suppress audio.');
