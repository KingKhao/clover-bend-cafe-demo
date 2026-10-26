from pathlib import Path
from zipfile import ZipFile, ZIP_DEFLATED
import json

root=Path(__file__).resolve().parent
code_files=['index.html','styles.css','polish.css','menu-data.js','app.js','assets/clover.svg']
document=['# Clover Bend Café — complete source code\n\nThe source below is complete. The accompanying ZIP also includes the local photographs, fonts and license notices. Open index.html after extracting the ZIP. No build step, API or package installation is needed.\n']
for name in code_files:
    language={'html':'html','css':'css','js':'javascript','svg':'xml'}[name.rsplit('.',1)[1]]
    document.append(f'\n## {name}\n\n```{language}\n{(root/name).read_text(encoding="utf-8-sig")}\n```\n')
(root/'FULL-CODE.md').write_text('\n'.join(document),encoding='utf-8')
names=code_files[:-1]+['README.md','RESEARCH.md','DESIGN-REVIEW.md','FULL-CODE.md','qa.cjs','final-check.cjs','qa-results.txt','qa-final-results.txt']
names+= [str(p.relative_to(root)) for p in (root/'assets').iterdir() if p.is_file()]
out=root.parent/'outputs'/'clover-bend-cafe-demo.zip'
out.parent.mkdir(exist_ok=True)
with ZipFile(out,'w',ZIP_DEFLATED) as archive:
    for name in names:
        archive.write(root/name,arcname='clover-bend-cafe-demo/'+name.replace('\\','/'))
print(json.dumps({'zip':str(out),'bytes':out.stat().st_size,'files':len(names)}))
