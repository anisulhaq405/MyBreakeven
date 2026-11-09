"""Original November 9 teaching cases. Source facts and case assumptions stay separate."""
from pathlib import Path
import json,html
R=Path(__file__).resolve().parents[1]
def p(t):return '<p>'+t+'</p>'
def table(caption,headers,rows):
 return '<div class="article-table-scroll"><table><caption>'+caption+'</caption><thead><tr>'+''.join('<th scope="col">'+str(x)+'</th>' for x in headers)+'</tr></thead><tbody>'+''.join('<tr>'+''.join(('<th scope="row">' if i==0 else '<td>')+str(x)+('</th>' if i==0 else '</td>') for i,x in enumerate(row))+'</tr>' for row in rows)+'</tbody></table></div>'
def link(slug,label):return '<a href="/blogs/'+slug+'/">'+label+'</a>'
SEC='https://www.sec.gov/investor/pubs/begfinstmtguide.htm'
SBA='https://www.sba.gov/counseling/plan-your-business/'
LAUNCH='https://www.sba.gov/counseling/launch-your-business/'
posts=[]
def add(id,slug,title,seo,desc,keyword,boundary,opening,sections,headers,rows,blank,faq,sources,alt):
 intro=p('<strong>'+opening+'</strong>')+p('All amounts and operating results below are original fictional teaching examples in USD. They are not customer results, industry averages or forecasts. Use your own dated records and applicable accounting policies.')
 body=intro+''.join('<h2 id="'+sid+'">'+heading+'</h2>'+content for sid,heading,content in sections)
 body+='<h2 id="worksheet">Download the editable worksheet</h2>'+p('<a href="/downloads/'+slug+'-worksheet.html" download>Download the printable HTML worksheet</a>. It contains the completed case and a separate blank working record. It does not calculate automatically. Edit in your browser, then print or save a completed copy before closing; your edits are not sent to MyBreakeven.')
 body+='<h2 id="sources">Sources and scope</h2>'+p('Primary references below support the stated definitions or framework. The worked case, numbers and decision records are original MyBreakeven material. Reviewed November 9, 2026; no external professional sign-off is claimed.')+'<ul>'+''.join('<li><a href="'+u+'">'+label+'</a></li>' for u,label in sources)+'</ul>'
 post=dict(id=id,slug=slug,title=title,seoTitle=seo,description=desc,metaDescription=desc,primaryKeyword=keyword,scopeBoundary=boundary,opening=opening,tag='Break-Even Concepts',tags=['Business finance','Worked example','Practical worksheet'],cluster='concepts',published='2026-11-09',modified='2026-11-09',editorialStatus='published',image='/images/title-covers/day5-'+slug+'-20261109.webp',alt=alt,imageCaption='AI-created topic illustration. Numerical examples and diagrams are original fictional teaching cases.',html=body,sectionLinks=[[s,h]for s,h,_ in sections]+[['worksheet','Worksheet'],['sources','Sources']],faq=[dict(q=q,a=a)for q,a in faq])
 posts.append(post)
 fields='<div class="fields">'+''.join('<label>'+x+'<input aria-label="'+x+'"></label>' for x in ['Business / preparer','Reporting date or horizon','Currency / accounting basis','Evidence references','Reviewer / next review date'])+'</div>'
 blanktable=table('Your working record — replace each cell',blank,[['Enter record '+str(i)]+['Enter value']*(len(blank)-1)for i in range(1,6)]).replace('<td>','<td contenteditable="true">').replace('<th scope="row">','<th scope="row" contenteditable="true">')
 sheet='<!doctype html><html lang="en"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>'+title+' — Worksheet</title><style>body{font:16px/1.55 system-ui;color:#18233b;max-width:1050px;margin:32px auto;padding:0 20px}h1{font-size:30px;line-height:1.2}h2{margin-top:32px;color:#4935a8}.article-table-scroll{overflow-x:auto}table{border-collapse:collapse;width:100%;min-width:550px}td,th{padding:12px;border:1px solid #aab3c9;text-align:left}caption{text-align:left;font-weight:bold;padding:10px 0}thead{background:#eeeafd}input,textarea{font:inherit;padding:10px;border:1px solid #8490a7;border-radius:4px;box-sizing:border-box;width:100%}label{display:block;margin:12px 0}.fields{display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:14px}button{font:inherit;background:#4935a8;color:white;border:0;padding:12px 18px;border-radius:6px}td:focus,th:focus{outline:3px solid #745bd7}@media print{button{display:none}.article-table-scroll{overflow:visible}table{min-width:0;font-size:10px}tr{break-inside:avoid}body{margin:0;max-width:none}textarea{min-height:70px}}</style><body><p>MYBREAKEVEN • Published November 9, 2026</p><h1>'+title+' — working record</h1><p>Original fictional USD case. This worksheet does not automatically calculate. Edit the blank cells, then print or save your completed copy before closing. Fields are not uploaded or saved by this page.</p><button onclick="window.print()">Print / save PDF</button><h2>Completed teaching case</h2>'+table('Reconciled case from the guide',headers,rows)+'<h2>Your evidence and assumptions</h2>'+fields+blanktable+'<label>Reconciliation / independent calculation<textarea rows="4"></textarea></label><label>Unresolved issue, action owner, deadline and stop / escalation condition<textarea rows="4"></textarea></label><p>Check amounts, dates, scope and source documents independently. Planning education; not accounting, legal, tax or lending advice.</p><a href="https://mybreakeven.com/blogs/'+slug+'/">Read the full method and limitations</a></body></html>'
 (R/'docs/day5-release/downloads'/f'{slug}-worksheet.html').write_text(sheet)


for f in ['accounting-proposals.json','cost-management-proposals.json','decision-costing-proposals.json']:
 for x in json.loads((R/'docs/day5-release/research'/f).read_text()):
  if x['slug']=='other-comprehensive-income': continue
  w=x['worksheet']
  add(x['id'],x['slug'],x['title'],x['seoTitle'],x['description'],x['primaryKeyword'],x['scopeBoundary'],x['opening'],[(a['id'],a['title'],a['html']) for a in x['sections']],w['headers'],w['rows'],w['blankHeaders'],[(a['q'],a['a'])for a in x['faq']],[(a['url'],a['label'])for a in x['sources']],x['title']+' — AI-created business illustration with topic title.')
  posts[-1]['html']=posts[-1]['html'].replace(p('<strong>'+x['opening']+'</strong>'),'',1)
  posts[-1]['answerHtml']=p(x['opening'])
  posts[-1]['answerTitle']='Quick answer'
  posts[-1]['imageCaption']='AI-created topic illustration; worked examples are fictional and independently reconciled.'
(R/'src/content/blogs/twelveDayDay5.js').write_text('export const twelveDayDay5Posts = '+json.dumps(posts,ensure_ascii=False,indent=2)+';\n')
print('Prepared',len(posts),'Day 5 guides and worksheets; N039 unpublished pending specialist review.')
