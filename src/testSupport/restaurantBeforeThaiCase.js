// Reverse only the explicitly authorized case-study navigation addition.
// All remaining historical restaurant markup is still hash-compared unchanged.
const exact='<aside class="tool-related" id="thai-foods-case-entry"><h2>Thai Foods: a restaurant planning case study</h2><p>Explore the $99 average table bill, the 1,476-bill monthly target and the manager’s reported daily planning workflow.</p><a href="/resources/thai-foods-restaurant-break-even-case-study/">Read the Jacksonville restaurant case study</a></aside>';
export function restaurantBeforeThaiCase(html){return html.replace(exact,'');}
