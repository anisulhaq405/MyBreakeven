import React from 'react';

const notes = {
  "landscaping": {
    "title": "Choose the landscaping planning step",
    "paragraphs": [
      "Use the break-even guide for required service volume and capacity. Use job costing to compare estimated and actual crew-hours, materials and overhead recovery. Keep startup purchases on a separate cash schedule."
    ],
    "links": [
      [
        "Run the landscaping break-even calculator",
        "/calculators/landscaping-break-even-calculator/"
      ],
      [
        "Follow the landscaping break-even formula and worked example",
        "/blogs/landscaping-break-even/"
      ],
      [
        "Review estimate versus actual job costs",
        "/blogs/landscaping-job-costing-estimate-vs-actual/"
      ]
    ]
  },
  "ecommerce": {
    "title": "Connect the ecommerce budget and cash plan",
    "paragraphs": [
      "Use the shipping guide to define delivery costs and customer shipping receipts. Carry inventory purchase dates and processor payouts into the cash forecast; accounting contribution alone does not show when cash is available."
    ],
    "links": [
      [
        "Review shipping costs",
        "/blogs/ecommerce-shipping-costs/"
      ],
      [
        "Build a dated cash forecast",
        "/calculators/cash-flow-forecast-template/"
      ]
    ]
  },
  "detailing": {
    "title": "Choose a detailing profit or startup calculation",
    "paragraphs": [
      "Use the profitability guide for job contribution, route time and monthly commitments. Use the startup-cost guide for vehicle and equipment funding. State the included costs before comparing a gross-margin percentage with take-home income."
    ],
    "links": [
      [
        "Review detailing profitability",
        "/blogs/is-mobile-detailing-profitable/"
      ],
      [
        "Plan startup cash",
        "/blogs/mobile-detailing-business-startup-cost/"
      ]
    ]
  }
};
export default function KeywordPlanningNotes({industry}) {
  const n=notes[industry]; if(!n)return null;
  return <section className="industry-copy" aria-labelledby={'budget-notes-'+industry}><h2 id={'budget-notes-'+industry}>{n.title}</h2>{n.paragraphs.map(p=><p key={p}>{p}</p>)}<ul>{n.links.map(([label,href])=><li key={href}><a href={href}>{label}</a></li>)}</ul></section>;
}
