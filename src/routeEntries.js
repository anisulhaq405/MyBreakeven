// Route entry points shared by browser loading and build-time asset preloading.
const clusters = {
  "/guides/agency-business": "src/routes/AgencyRoute.jsx",
  "/guides/ecommerce-business": "src/routes/EcommerceRoute.jsx",
  "/guides/photography-business": "src/routes/PhotographyRoute.jsx",
  "/guides/restaurant-business": "src/routes/RestaurantRoute.jsx",
  "/guides/salon-business": "src/routes/SalonRoute.jsx",
  "/guides/mobile-detailing-business": "src/routes/MobileDetailingRoute.jsx",
  "/guides/landscaping-business": "src/routes/LandscapingRoute.jsx",
  "/guides/cleaning-business": "src/routes/CleaningRoute.jsx"
};
const tools = {
  "/calculators/net-cash-flow-calculator": "src/routes/NetCashFlowToolRoute.jsx",
  "/calculators/operating-profit-margin-calculator": "src/routes/OperatingMarginToolRoute.jsx",
  "/calculators/business-roi-calculator": "src/routes/RoiToolRoute.jsx",
  "/calculators/discount-break-even-calculator": "src/routes/PricingToolRoute.jsx",
  "/calculators/price-increase-calculator": "src/routes/PricingToolRoute.jsx",
  "/calculators/break-even-roas-calculator": "src/routes/BusinessToolRoute.jsx",
  "/calculators/hourly-rate-calculator": "src/routes/BusinessToolRoute.jsx",
  "/calculators/cash-runway-calculator": "src/routes/BusinessToolRoute.jsx",
  "/calculators/cleaning-contract-profit-calculator": "src/routes/BusinessToolRoute.jsx",
  "/calculators/lawn-route-profit-calculator": "src/routes/BusinessToolRoute.jsx",
  "/calculators/detailing-chemical-cost-calculator": "src/routes/BusinessToolRoute.jsx",
  "/calculators/hair-color-product-cost-calculator": "src/routes/BusinessToolRoute.jsx",
  "/calculators/ecommerce-return-cost-calculator": "src/routes/BusinessToolRoute.jsx",
  "/calculators/salon-rebooking-calculator": "src/routes/BusinessToolRoute.jsx",
  "/calculators/salon-no-show-profit-loss-calculator": "src/routes/BusinessToolRoute.jsx",
  "/calculators/mobile-detailing-travel-profit-calculator": "src/routes/BusinessToolRoute.jsx",
  "/calculators/recipe-cost-calculator": "src/routes/FoodToolRoute.jsx",
  "/calculators/food-cost-calculator": "src/routes/FoodToolRoute.jsx",
  "/calculators/menu-pricing-calculator": "src/routes/FoodToolRoute.jsx",
  "/calculators/employee-cost-calculator": "src/routes/PlanningToolRoute.jsx",
  "/calculators/cash-flow-forecast-template": "src/routes/PlanningToolRoute.jsx"
};
const industries = new Set(["/calculators/cleaning-business-break-even-calculator","/calculators/landscaping-break-even-calculator","/calculators/photography-business-break-even-calculator","/calculators/agency-break-even-calculator","/calculators/mobile-detailing-break-even-calculator","/calculators/ecommerce-break-even-calculator","/calculators/restaurant-break-even-calculator","/calculators/salon-break-even-calculator"]);
const authority = new Set(["/resources/budget-vs-actual-template","/calculation-methodology","/editorial-policy","/founder","/resources","/resources/cleaning-business-budget-template","/resources/cleaning-job-cost-worksheet","/calculator-walkthroughs"]);
export function routeEntryForPath(path) {
  path = path.replace(/\/$/, '') || '/';
  if (path === '/resources/daily-outfitter-founder-case-study') return 'src/routes/FounderCaseRoute.jsx';
  if (path === '/') return 'src/main.jsx';
  if (path.startsWith('/blogs/')) return 'src/routes/BlogRoute.jsx';
  if (path === '/blogs' || path === '/blog') return 'src/routes/BlogHubRoute.jsx';
  if (path === '/tools') return 'src/routes/DirectoryRoute.jsx';
  if (industries.has(path)) return 'src/routes/IndustryRoute.jsx';
  if (tools[path]) return tools[path];
  if (clusters[path]) return clusters[path];
  if (authority.has(path)) return 'src/routes/AuthorityRoute.jsx';
  if (path === '/pro-user-guide') return 'src/routes/ProGuideRoute.jsx';
  if (/^\/(login|signup|forgot-password|reset-password|dashboard)$/.test(path)) return 'src/routes/AccountRoute.jsx';
  return 'src/routes/GeneralRoute.jsx';
}
