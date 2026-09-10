import React from "react";

const models = [
  ["Cleaning business", "Estimate jobs, contribution margin, team capacity and cleaning leads required each month."],
  ["Landscaping and lawn care", "Calculate profitable job volume after labor, materials, fuel, equipment and lead costs."],
  ["Photography studio", "Connect session pricing, editing time, direct costs and booking conversion to break-even."],
  ["Agency and freelancer", "Model retainers, contractor costs, delivery hours, client acquisition and capacity."],
  ["Mobile auto detailing", "Calculate appointments needed after supplies, travel, labor and marketing costs."],
  ["E-commerce store", "Include COGS, fulfillment, shipping subsidy, returns, payment fees and customer acquisition cost."],
  ["Restaurant business", "Turn food cost, labor, packaging, delivery commissions and overhead into an order target."],
  ["Salon business", "Estimate appointments required using service price, product usage, stylist labor and utilization."],
];

const faqs = [
  ["What is a break-even point?", "A break-even point is the sales level where total revenue equals total fixed and variable costs. At that point, the business has no operating profit or loss under the assumptions entered."],
  ["How do I calculate break-even revenue?", "MyBreakeven first calculates contribution per sale: average selling price minus direct costs, acquisition cost and payment fees. It then divides monthly fixed costs, owner pay and target profit by that contribution and multiplies the required units by the average price."],
  ["Does the calculator include owner salary and target profit?", "Yes. You can keep either field at zero for a traditional break-even calculation, or include owner pay and a profit goal to calculate a more practical monthly revenue target."],
  ["Why does business capacity matter?", "A financial target is not feasible if your team cannot deliver the required orders, jobs, clients or appointments. The calculator compares required volume with productive team hours."],
  ["Can I use a currency other than US dollars?", "Yes. Select a supported currency before entering your figures. The calculator labels all amounts in that currency; it does not perform exchange-rate conversion."],
  ["Are my financial figures saved?", "No. The free calculator runs in your browser and does not save or send the financial assumptions you enter."],
];

export default function HomeSEO() {
  return (
    <section className="seo-content" aria-labelledby="seo-heading">
      <div className="seo-intro">
        <span>SMALL BUSINESS BREAK-EVEN ANALYSIS</span>
        <h2 id="seo-heading">A free break-even calculator built for real operating decisions</h2>
        <p>
          MyBreakeven helps small business owners calculate exact break-even revenue,
          required sales volume, customer demand and delivery capacity. Unlike a basic
          fixed-cost calculator, it tests whether the target is operationally feasible.
          Results retain fractional precision and also show the minimum practical whole
          orders, jobs, clients or appointments needed.
        </p>
      </div>
      <div className="seo-models" aria-label="Available industry break-even models">
        {models.map(([name, description]) => (
          <article key={name}>
            <h3>{name} break-even calculator</h3>
            <p>{description}</p>
          </article>
        ))}
      </div>
      <div className="seo-method">
        <div>
          <span>HOW THE CALCULATION WORKS</span>
          <h2>From contribution margin to a feasible monthly sales target</h2>
        </div>
        <ol>
          <li><strong>Calculate contribution per sale.</strong> Subtract direct materials, labor, other variable costs, acquisition cost and payment fees from average price.</li>
          <li><strong>Set the monthly amount to cover.</strong> Add operating overhead, owner pay and optional target profit.</li>
          <li><strong>Calculate exact break-even volume.</strong> Divide the monthly amount to cover by contribution per sale without prematurely rounding the result.</li>
          <li><strong>Test feasibility.</strong> Compare required sales with team capacity and translate the sales target into required customer inquiries.</li>
        </ol>
      </div>
      <div className="faq" aria-labelledby="faq-heading">
        <span>FREQUENTLY ASKED QUESTIONS</span>
        <h2 id="faq-heading">Small business break-even calculator FAQs</h2>
        <div>
          {faqs.map(([question, answer]) => (
            <details key={question}>
              <summary>{question}</summary>
              <p>{answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
