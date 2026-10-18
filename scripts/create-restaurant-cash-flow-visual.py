from PIL import Image,ImageDraw,ImageFont
import json,re
from pathlib import Path
root=Path(__file__).resolve().parents[1]
post=json.loads((root/'src/content/blogs/october18Restaurant.js').read_text().split('=',1)[1].strip().removesuffix(';'))[0]
body=re.search(r'<tbody>(.*?)</tbody>',post['html'],re.S)[1]
keys=['week','opening','receipts','suppliers','payroll','other','closing','headroom']
rows=[dict(zip(keys,[int(re.sub(r'[$,]','',v)) for v in re.findall(r'<(?:td|th)[^>]*>(.*?)</(?:td|th)>',row)])) for row in re.findall(r'<tr>(.*?)</tr>',body)]
im=Image.new('RGB',(1200,675),'#102c3a');d=ImageDraw.Draw(im)
font='/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf';bold='/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf'
f=lambda n,b=False:ImageFont.truetype(bold if b else font,n)
d.text((55,28),'MYBREAKEVEN  /  RESTAURANT CASH PLANNING',font=f(15,True),fill='#83d4c2');d.text((55,64),'Cash timing changes the decision',font=f(38,True),fill='white');d.text((55,119),'13 fictional weeks  ·  USD  ·  Weekly closing balances before financing',font=f(19),fill='#c3d4de')
left,top,right,bottom=100,210,1115,510
xx=lambda w:left+(w-1)*(right-left)/12; yy=lambda v:bottom-(v+10000)/60000*(bottom-top)
for v in [-10000,0,10000,30000,50000]:
 y=yy(v);d.line((left,y,right,y),fill='#35505c',width=1);d.text((18,y-10),('-'if v<0 else '')+str(abs(v)//1000)+'k',font=f(16),fill='#b4c7d2')
y=yy(8000)
for x in range(left,right,16):d.line((x,y,x+7,y),fill='#ebbc66',width=2)
d.text((right-198,y-25),'$8,000 chosen floor',font=f(15),fill='#ebbc66')
base=[(xx(r['week']),yy(r['closing']))for r in rows];stress=[(xx(r['week']),yy(r['closing']-(6000 if r['week']==4 else 0)))for r in rows]
d.line(stress,fill='#f19c8b',width=4);d.line(base,fill='#7be0c2',width=4)
for w,v,c in [(4,3500,'#7be0c2'),(4,-2500,'#f19c8b')]:
 x,y=xx(w),yy(v);d.ellipse((x-6,y-6,x+6,y+6),fill=c)
for w in [1,4,8,13]:d.text((xx(w)-16,bottom+17),'W'+str(w),font=f(16),fill='#c3d4de')
d.rounded_rectangle((55,562,568,641),radius=12,fill='#1c4550');d.text((75,575),'BASE CASE LOW: $3,500',font=f(21,True),fill='#7be0c2');d.text((75,607),'Week 4 is $4,500 below the chosen floor.',font=f(16),fill='#d3e3e8')
d.rounded_rectangle((585,562,1145,641),radius=12,fill='#493f43');d.text((605,575),'DELAYED PAYOUT LOW: -$2,500',font=f(21,True),fill='#f9baa8');d.text((605,607),'Move $6,000 of receipts from week 4 to week 5.',font=f(16),fill='#e5dce0')
out=root/'public/images/blog/restaurant-cash-flow-forecast.webp';im.save(out,quality=88);print(out.stat().st_size)
