"""Real payload/decoder checks, plus a deliberate reproduction of the old corruption."""
import base64,hashlib,json,re,subprocess,tempfile,shutil,importlib.util,array,math
from pathlib import Path
root=Path(__file__).resolve().parent.parent
html=(root/'index.html').read_text();data=json.loads(re.search(r'<script id="ship-audio-data"[^>]*>(.*?)</script>',html,re.S)[1]);expected=json.loads((root/'verification/audio-integrity.json').read_text())
assert set(data)==set(expected)
with tempfile.TemporaryDirectory() as temp:
 for key,value in data.items():
  raw=base64.b64decode(value,validate=True);assert hashlib.sha256(raw).hexdigest()==expected[key]['sha256'],key+' embedded recording changed'
  path=Path(temp)/key;path.write_bytes(raw)
  result=subprocess.run(['ffmpeg','-v','error','-xerror','-i',str(path),'-map','0:a:0','-vn','-f','f32le','-ac','1','-ar','11025','pipe:1'],capture_output=True)
  assert result.returncode==0 and not result.stderr,key+': '+result.stderr.decode()
  samples=array.array('f');samples.frombytes(result.stdout);assert samples and all(math.isfinite(v) for v in samples),key+' invalid PCM';assert max(abs(v) for v in samples)<2,key+' extreme decoded spikes'
 # Reproduce the unsafe replacement on intact data: a version-like substring is media, not a label.
 candidates=[(key,value) for key,value in data.items() if 'v80' in value]
 assert candidates,'fixture must include a matching version-like substring'
 key,value=candidates[0];assert base64.b64decode(value)!=base64.b64decode(value.replace('v80','v81'))
 spec=importlib.util.spec_from_file_location('set_build',root/'verification/set-build-version.py');module=importlib.util.module_from_spec(spec);spec.loader.exec_module(module)
 fixture=Path(temp)/'build';fixture.mkdir()
 for name in ['index.html','game.js','sw.js']:shutil.copyfile(root/name,fixture/name)
 module.update_build(fixture,92)
 after=json.loads(re.search(r'<script id="ship-audio-data"[^>]*>(.*?)</script>',(fixture/'index.html').read_text(),re.S)[1]);assert after==data
 assert "ShipBuild='v92'" in (fixture/'game.js').read_text()
 assert 'the-last-ship-v92' in (fixture/'sw.js').read_text()
print('PASS: all '+str(len(data))+' recordings match source hashes and fully decode without errors or extreme spikes; unsafe replacement reproduced; safe version bump preserves all media.')
