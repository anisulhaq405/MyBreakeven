export function articleGuideType(article) {
  const slug = article?.slug || "";
  if (/pricing|price-|minimum-spend/.test(slug)) return "PRICING GUIDE";
  if (/how-many|covers-per-night|clients-per-day/.test(slug) || article?.cluster === "volume-to-income") return "VOLUME PLANNING GUIDE";
  if (/startup|cost-to-open|cost-to-start/.test(slug) || article?.cluster?.startsWith("startup")) return "STARTUP COST GUIDE";
  if (/profit|margin|break-even/.test(slug) && article?.cluster !== "concepts") return "PROFITABILITY GUIDE";
  if (article?.cluster === "concepts") return "PRACTICAL GUIDE";
  if (/capacity|utilization|route/.test(slug) || article?.cluster === "delivery capacity") return "CAPACITY PLANNING GUIDE";
  return "BUSINESS PLANNING GUIDE";
}
