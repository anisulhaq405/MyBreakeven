// Present existing worked answers without changing their canonical records or metadata.
const table=(caption,headers,rows)=>`<div class="article-table-scroll" role="region" aria-label="${caption}" tabindex="0"><table class="click-answer-table"><caption>${caption}</caption><thead><tr>${headers.map(x=>`<th scope="col">${x}</th>`).join('')}</tr></thead><tbody>${rows.map(row=>`<tr>${row.map((x,i)=>i===0?`<th scope="row">${x}</th>`:`<td>${x}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`;
export const clickAnswerVersions={
 'target-profit-sales-formula':table('Target profit: required units and sales',['Result','Formula','Fictional monthly example'],[
  ['Required units','(Fixed costs + target operating profit) ÷ contribution per unit','($7,500 + $3,000) ÷ ($240 − $90) = 70 jobs'],
  ['Required sales revenue','(Fixed costs + target operating profit) ÷ contribution margin ratio','$10,500 ÷ 62.5% = $16,800'],
  ['Profit check','Sales − variable costs − fixed costs','$16,800 − $6,300 − $7,500 = $3,000']
 ])+'<p>Contribution margin ratio = ($240 − $90) ÷ $240 = 62.5%. Planned base owner pay is already included in fixed costs: do not add it a second time. Round a fractional unit requirement up to the next whole job; the 70-job example needs no rounding. Match price, costs and profit to the same period, and verify capacity before treating the target as deliverable.</p>',
 'margin-of-safety-business':table('Margin of safety: units, sales and percentage',['Measure','Formula','Fictional forecast example'],[
  ['Sales cushion','Forecast sales − break-even sales','$18,000 − $12,000 = $6,000'],
  ['Percentage cushion','Sales cushion ÷ forecast sales × 100','$6,000 ÷ $18,000 × 100 = 33.33%'],
  ['Unit cushion','Forecast units − break-even units','120 appointments − 80 appointments = 40 appointments']
 ])+'<p>For a completed period, use actual sales in place of forecast sales throughout. The percentage denominator is the same actual or forecast sales, not break-even sales. A $6,000 sales cushion is neither $6,000 profit nor spendable cash. These are operating break-even measures, not a stock-valuation margin of safety.</p>',
 'contribution-margin-vs-profit-margin':table('One sales figure, three different margins',['Measure','Dollar calculation','Margin on $20,000 sales'],[
  ['Contribution','$20,000 sales − $12,000 variable costs = $8,000','40%'],
  ['Operating profit','$8,000 contribution − $5,000 fixed operating expenses = $3,000','15%'],
  ['Net profit','$3,000 operating profit − $400 interest − $600 tax = $2,000','10%']
 ])+'<p>Each margin = its named dollar result ÷ the same $20,000 sales × 100. Contribution deducts variable costs; operating profit also deducts fixed operating expenses; the net result includes the assumed interest and tax. This fictional monthly example shows why contribution margin and profit margin cannot be used interchangeably. None of the three margins measures the bank balance.</p>',
 'retail-break-even-analysis':table('Retail break-even: count customer receipts, not items',['Step','Fictional monthly example'],[
  ['Contribution per receipt','$40 collected sales − $20.20 sale-related costs = $19.80'],
  ['Commitments to cover','$4,200 overhead + $2,800 owner pay = $7,000'],
  ['Whole-receipt requirement','Round $7,000 ÷ $19.80 up to 354 receipts'],
  ['Collected sales at that threshold','354 × $40 = $14,160'],
  ['Rounding check','353 receipts: $10.60 short; 354 receipts: $9.20 left']
 ])+'<p>One receipt means one completed customer purchase, not one item or visitor. This owner-covered threshold includes the stated owner pay once. The $9.20 remainder is before any other excluded items. Check whether traffic and staffing can support 354 purchases, and budget inventory payment dates separately; sales break-even does not establish cash availability.</p>'
};
export function presentClickAnswer(article){
 let html=article.answerHtml;
 const replacement=clickAnswerVersions[article.slug];
 if(!replacement||!html||!article.html?.includes(`id="gsc-next-${article.slug}"`))return html;
 // Replace the existing summary presentation, rather than stacking another box.
 if(article.slug==='margin-of-safety-business')html=html.replace(/<ul>[\s\S]*?<\/ul>/,'');
 if(article.slug==='contribution-margin-vs-profit-margin')html=html.replace(/<div class="article-table-scroll"><table>[\s\S]*?<\/table><\/div>/,'');
 return html.replace(/<p(?:\s[^>]*)?>[\s\S]*?<\/p>/,()=>replacement);
}
