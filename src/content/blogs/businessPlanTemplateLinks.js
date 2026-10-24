const owners={
 'how-much-does-it-cost-to-start-a-landscaping-business':'landscaping',
 'landscaping-seasonal-break-even':'landscaping',
 'agency-retainer-pricing':'agency',
 'agency-client-profitability':'agency',
 'how-much-does-it-cost-to-start-an-ecommerce-store':'ecommerce',
 'ecommerce-profit-margin':'ecommerce',
};
// Discovery-only addition: do not imply all existing article calculations were reviewed again.
export function connectBusinessPlanTemplate(post){
 const key=owners[post.slug];if(!key)return post;
 return {...post,html:post.html+`<aside class="tool-related"><h2>Put the assumptions into a complete business plan</h2><p>Use the <a href="/resources/${key}-business-plan-template/">editable ${key==='agency'?'marketing agency':key} business plan template</a> for the narrative, completed example and twelve-month Excel capacity and cash schedule. Keep this guide for its specialist decision; opening the resource does not transfer calculator inputs.</p></aside>`};
}
