import React from 'react';
const money=v=>new Intl.NumberFormat('en-US',{style:'currency',currency:'USD',maximumFractionDigits:2}).format(v);
const number=v=>new Intl.NumberFormat('en-US',{maximumFractionDigits:2}).format(v);
export default function RestaurantScenarioCards({rows}){
 const tickets=[...new Set(rows.map(r=>r.input.price))];
 return <div className="restaurant-scenario-groups" aria-label="20 restaurant scenarios grouped by average ticket">
  <p className="restaurant-scenario-context">20 fictional USD cases · 26 open days and $27,000 monthly funding</p>
  {tickets.map(ticket=><section className="restaurant-ticket-group" key={ticket} aria-label={`Average ticket ${money(ticket)}`}>
   <div className="restaurant-ticket-heading"><h3>Average ticket <span>{money(ticket)}</span></h3><span>5 food-cost scenarios</span></div>
   <div className="restaurant-scenario-grid">{rows.filter(r=>r.input.price===ticket).map(r=><article className="restaurant-scenario-card" key={r.id} aria-label={`Scenario ${r.id}`}>
    <header><h4>{r.id}</h4><p>Food / order <strong>{money(r.input.materialCost)}</strong></p></header>
    <dl><div><dt>Contribution / order</dt><dd>{money(r.result.contribution)}</dd></div><div><dt>Exact orders</dt><dd>{number(r.result.jobs)}</dd></div><div className="restaurant-scenario-target"><dt>Whole orders</dt><dd>{r.result.wholeJobs}</dd></div><div className="restaurant-scenario-target"><dt>Orders / day</dt><dd>{r.dailyOrders}</dd></div><div className="restaurant-scenario-sales"><dt>Whole-order sales</dt><dd>{money(r.result.practicalRevenue)}</dd></div></dl>
   </article>)}</div>
  </section>)}
 </div>;
}
