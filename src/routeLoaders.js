import { routeEntryForPath } from './routeEntries.js';
const loaders = {
  "src/routes/FinanceToolRoute.jsx": () => import("./routes/FinanceToolRoute.jsx"),
  "src/routes/StartupCostToolRoute.jsx": () => import("./routes/StartupCostToolRoute.jsx"),
  "src/routes/NetCashFlowToolRoute.jsx": () => import("./routes/NetCashFlowToolRoute.jsx"),
  "src/routes/OperatingMarginToolRoute.jsx": () => import("./routes/OperatingMarginToolRoute.jsx"),
  'src/routes/RoiToolRoute.jsx': () => import('./routes/RoiToolRoute.jsx'),
  'src/routes/FounderCaseRoute.jsx': () => import('./routes/FounderCaseRoute.jsx'),
  'src/routes/AccountRoute.jsx': () => import('./routes/AccountRoute.jsx'),
  'src/routes/AgencyRoute.jsx': () => import('./routes/AgencyRoute.jsx'),
  'src/routes/AuthorityRoute.jsx': () => import('./routes/AuthorityRoute.jsx'),
  'src/routes/BlogHubRoute.jsx': () => import('./routes/BlogHubRoute.jsx'),
  'src/routes/BlogRoute.jsx': () => import('./routes/BlogRoute.jsx'),
  'src/routes/BusinessToolRoute.jsx': () => import('./routes/BusinessToolRoute.jsx'),
  'src/routes/CleaningRoute.jsx': () => import('./routes/CleaningRoute.jsx'),
  'src/routes/DirectoryRoute.jsx': () => import('./routes/DirectoryRoute.jsx'),
  'src/routes/EcommerceRoute.jsx': () => import('./routes/EcommerceRoute.jsx'),
  'src/routes/FoodToolRoute.jsx': () => import('./routes/FoodToolRoute.jsx'),
  'src/routes/GeneralRoute.jsx': () => import('./routes/GeneralRoute.jsx'),
  'src/routes/IndustryRoute.jsx': () => import('./routes/IndustryRoute.jsx'),
  'src/routes/LandscapingRoute.jsx': () => import('./routes/LandscapingRoute.jsx'),
  'src/routes/MobileDetailingRoute.jsx': () => import('./routes/MobileDetailingRoute.jsx'),
  'src/routes/PhotographyRoute.jsx': () => import('./routes/PhotographyRoute.jsx'),
  'src/routes/PlanningToolRoute.jsx': () => import('./routes/PlanningToolRoute.jsx'),
  'src/routes/PricingToolRoute.jsx': () => import('./routes/PricingToolRoute.jsx'),
  'src/routes/ProGuideRoute.jsx': () => import('./routes/ProGuideRoute.jsx'),
  'src/routes/RestaurantRoute.jsx': () => import('./routes/RestaurantRoute.jsx'),
  'src/routes/SalonRoute.jsx': () => import('./routes/SalonRoute.jsx'),
};
export function loadSecondaryRoute(path) { return loaders[routeEntryForPath(path)](); }

export async function loadSecondaryRouteData(path) {
  if (!/(?:Finance|Business|Food|Planning|Pricing|Roi|OperatingMargin|NetCashFlow|StartupCost)ToolRoute\.jsx$/.test(routeEntryForPath(path))) return null;
  const { loadTool } = await import('./toolContentLoader.js');
  return loadTool(path.split('/')[2]);
}
