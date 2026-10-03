from pathlib import Path
import base64,hashlib,json,re,subprocess,tempfile,array,math
root=Path(__file__).resolve().parent.parent
html=(root/'index.html').read_text();data=json.loads(re.search(r'<script id="ship-audio-data"[^>]*>(.*?)</script>',html,re.S)[1]);expected=json.loads((root/'verification/audio-integrity.json').read_text());report=json.loads((root/'verification/v98-audio-compression.json').read_text())
assert len(data)==32 and set(data)==set(expected)
with tempfile.TemporaryDirectory() as tmp:
 for key,value in data.items():
  raw=base64.b64decode(value,validate=True);assert hashlib.sha256(raw).hexdigest()==expected[key]['sha256']
  p=Path(tmp)/key;p.write_bytes(raw)
  o=subprocess.run(['ffmpeg','-v','error','-xerror','-i',str(p),'-map','0:a:0','-vn','-f','f32le','-ac','1','-ar','11025','pipe:1'],capture_output=True);assert o.returncode==0 and not o.stderr,(key,o.stderr)
  pcm=array.array('f');pcm.frombytes(o.stdout);assert pcm and all(math.isfinite(v) for v in pcm);assert max(abs(v) for v in pcm)<2
for item in report:assert item['after']<=item['before'];assert abs(item['encoded_seconds']-item['original_seconds'])<.06
assert 'rescued:.5' in html and 'evac:.5' in html
assert 'fade=Math.min(.12' not in html
print('PASS: all 32 compressed/retained embedded clips match hashes and decode; bounded encoder padding, gains, and no countdown end fade.')
