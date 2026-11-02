# Gera o site estático do Vercel a partir da versão publicada da página no Claude.
# Uso: python3 -I build_site.py <pasta com index.html e fotos do artifact> <pasta do repositório>
import re,json,io,os,sys,hashlib
from PIL import Image, ImageOps
A,R=sys.argv[1],sys.argv[2]
h=open(os.path.join(A,'index.html')).read()
state=json.loads(re.search(r'<script type="application/json" id="state">(.*?)</script>',h,re.S).group(1))
files={f.split('.')[0]:os.path.join(A,f) for f in os.listdir(A) if f!='index.html'}
os.makedirs(os.path.join(R,'fotos'),exist_ok=True)
paths={}; seen={}
ids=[f['foto'] for f in state['fundadoras'] if f['foto']]+[g['foto'] for g in state['galeria']]
for i in ids:
    if i in paths: continue
    if i not in files: print('FALTA',i); continue
    im=ImageOps.exif_transpose(Image.open(files[i])).convert('RGB'); im.thumbnail((1600,1600))
    b=io.BytesIO(); im.save(b,'JPEG',quality=82,optimize=True,progressive=True)
    open(os.path.join(R,'fotos',i+'.jpg'),'wb').write(b.getvalue())
    paths[i]='fotos/'+i+'.jpg'
    d=hashlib.sha1(open(files[i],'rb').read()).hexdigest(); seen.setdefault(d,[]).append(i)
# remove fotos que não estão mais na página
for f in os.listdir(os.path.join(R,'fotos')):
    if f[:-4] not in paths: os.remove(os.path.join(R,'fotos',f))
t=open(os.path.join(os.path.dirname(os.path.abspath(__file__)),'template.html')).read()
t=t.replace('const blob = (id) => "/_blob/" + encodeURIComponent(id);','const PHOTOS = __PHOTOS__;\n  const blob = (id) => PHOTOS[id] || "";')
t=t.replace('  if (window.claude && window.claude.use) {','  if (false) {')
t=t.replace('__PHOTOS__',json.dumps(paths))
body=t.replace('__STATE__',json.dumps(state,ensure_ascii=False).replace('<','\\u003c'))
html='<!doctype html>\n<html lang="pt-BR">\n<head>\n<meta charset="utf-8">\n<meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">\n<meta name="description" content="Women\'s Wine: confraria de mulheres de Óleo, Gás e Energia no Rio de Janeiro.">\n</head>\n<body style="margin:0">\n'+body+'\n</body>\n</html>\n'
open(os.path.join(R,'index.html'),'w').write(html)
print('fotos',len(paths),'galeria',len(state['galeria']),'html KB',len(html)//1024)
print('duplicadas',[v for v in seen.values() if len(v)>1])
