import sharp from 'sharp';
import {operationalTools} from '../src/operationalTools.js';
import {toolThemes} from '../src/toolThemes.js';
import {calculateOperationalTool} from '../src/operationalToolEngine.js';
for(const [slug,t] of Object.entries(operationalTools)){
const c=toolThemes[slug],r=calculateOperationalTool(t.defaults,t.mode),title=t.name.replace(' Calculator','');
const esc=s=>String(s).replaceAll('&','&amp;').replaceAll('<','&lt;');
const rows=r.metrics.slice(0,3).map(([label,value,type],i)=>`<text x="650" y="${340+i*70}" font-size="19" fill="${c['--tool-dark']}">${esc(label)}</text><text x="650" y="${370+i*70}" font-size="25" font-weight="700" fill="${c['--tool-accent']}">${type==='money'?'USD ':''}${value.toFixed(2)}${type==='percent'?'%':''}</text>`).join('');
const words=title.split(' '),mid=Math.ceil(words.length/2);
const svg=`<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="675"><rect width="1200" height="675" fill="${c['--tool-soft']}"/><rect width="16" height="675" fill="${c['--tool-accent']}"/><g font-family="Arial,sans-serif"><text x="60" y="85" font-size="23" font-weight="700" fill="${c['--tool-accent']}">MYBREAKEVEN · FREE BUSINESS TOOL</text><text x="60" y="225" font-size="42" font-weight="700" fill="${c['--tool-dark']}">${esc(words.slice(0,mid).join(' '))}</text><text x="60" y="280" font-size="42" font-weight="700" fill="${c['--tool-dark']}">${esc(words.slice(mid).join(' '))}</text><text x="60" y="350" font-size="25" fill="${c['--tool-accent']}">Your costs → A checked decision</text><text x="60" y="430" font-size="21" fill="${c['--tool-dark']}">Transparent formula · No signup</text><text x="60" y="615" font-size="19" fill="${c['--tool-dark']}">Illustrative default scenario. Replace with your own records.</text><rect x="615" y="150" width="525" height="405" rx="20" fill="white"/><text x="650" y="210" font-size="19" fill="${c['--tool-dark']}">${esc(t.resultLabel)}</text><text x="650" y="280" font-size="49" font-weight="700" fill="${c['--tool-accent']}">USD ${r.main.toFixed(2)}</text>${rows}</g></svg>`;
await sharp(Buffer.from(svg)).webp({quality:86}).toFile(`public/images/tools/${slug}.webp`);
}
