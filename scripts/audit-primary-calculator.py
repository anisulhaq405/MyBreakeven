from fractions import Fraction as F
from pathlib import Path
import json,random,subprocess,tempfile,os
root=Path(__file__).resolve().parents[1]
def node(code):
 return subprocess.check_output(["node","--input-type=module","-e",code],cwd=root,text=True)
rnd=random.Random(20261019);models=json.loads(node("import {industries} from './src/industries.js';console.log(JSON.stringify(Object.fromEntries(Object.entries(industries).map(([k,v])=>[k,v.values]))));"));cases=[]
for key,base in models.items():
 for t in range(100):
  x=dict(base)
  if t:
   x.update(price=str(rnd.randrange(500,1000000)/100),materialCost=str(rnd.randrange(0,2000)/100),laborCost=str(rnd.randrange(0,2000)/100),otherVariableCost=str(rnd.randrange(0,1500)/100),acquisitionCost=str(rnd.randrange(0,1000)/100),paymentFeePct=str(rnd.randrange(0,500)/100),fixedCosts=str(rnd.randrange(0,2000000)/100),ownerPay=str(rnd.randrange(0,1000000)/100),targetProfit=str(rnd.randrange(0,1000000)/100),workers=rnd.randrange(1,25),hoursPerWorker=rnd.randrange(0,80),hoursPerJob=str(rnd.randrange(1,500)/100),utilizationPct=rnd.randrange(0,101),conversionPct=str(rnd.randrange(1,10001)/100))
  v={k:F(str(w)) for k,w in x.items()};fee=v['price']*v['paymentFeePct']/100;con=v['price']-sum(v[k] for k in ['materialCost','laborCost','otherVariableCost','acquisitionCost'])-fee
  if con<=0:continue
  funding=sum(v[k] for k in ['fixedCosts','ownerPay','targetProfit']);jobs=funding/con;ceil=lambda q:-(-q.numerator//q.denominator);cap=v['workers']*v['hoursPerWorker']*F(52,12)*v['utilizationPct']/100/v['hoursPerJob'];whole=ceil(jobs)
  cases.append({'industry':key,'input':x,'expected':{'contribution':float(con),'fixedNeed':float(funding),'jobs':float(jobs),'wholeJobs':whole,'revenue':float(jobs*v['price']),'practicalRevenue':float(whole*v['price']),'capacity':float(cap),'wholeCapacity':cap.numerator//cap.denominator,'practicalLeads':ceil(F(whole)*100/v['conversionPct']),'practicalProfit':float(whole*con-v['fixedCosts']-v['ownerPay'])}})
with tempfile.TemporaryDirectory(prefix='primary-calculator-audit-') as temp:
 path=Path(temp)/'cases.json';path.write_text(json.dumps(cases))
 result=node("import fs from 'node:fs';import{calculate}from'./src/engine.js';const cases=JSON.parse(fs.readFileSync("+json.dumps(str(path))+"));console.log(JSON.stringify(cases.map(c=>calculate(c.input))));")
 observed=json.loads(result);checks=0
 for case,got in zip(cases,observed):
  assert got['valid'],case['industry']
  for key,expected in case['expected'].items():
   if key in ['wholeJobs','wholeCapacity','practicalLeads']:assert got[key]==expected,(case['industry'],key,got[key],expected)
   else:assert abs(got[key]-expected)<=max(1e-8,abs(expected)*1e-12),(case['industry'],key,got[key],expected)
   checks+=1
 print(json.dumps({'industries':len(models),'cases':len(cases),'numeric_checks':checks,'failures':0,'oracle':'Python Fraction exact rational arithmetic; independent of Decimal engine'}))
