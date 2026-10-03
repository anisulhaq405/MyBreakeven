import Decimal from "decimal.js";

// Amounts belong to ONE sale. Profiles supply labels, never industry cost estimates.
export const costProfiles = {
  cleaning: { unit: "job", services: ["Recurring clean", "One-off / deep clean"], materials: ["Cleaning supplies", "Disposable supplies"], other: ["Travel / fuel", "Equipment use", "Other job expense"], roles: ["Cleaning", "Preparation / travel"], context: "Use the property size and condition to estimate supplies and total crew-hours. Two cleaners working 2 hours each use 4 crew-hours." },
  landscaping: { unit: "job", services: ["Maintenance visit", "Installation job"], materials: ["Plants / turf / mulch", "Other materials", "Material waste allowance"], other: ["Travel / fuel", "Equipment use", "Waste removal"], roles: ["On-site work", "Preparation / travel"], context: "Use the actual area, material quantities and total crew-hours for one job. Seasonal workload belongs in your monthly volume and utilization." },
  photography: { unit: "session", services: ["Portrait / product session", "Event session"], materials: ["Prints / albums / deliverables", "Other session materials"], other: ["Travel / location", "Gallery / delivery fees", "Other session expense"], roles: ["Shoot / preparation", "Editing", "Second shooter / assistant", "Travel"], context: "Include shooting and editing for the selected package. Add a second shooter's hours and pay once; fixed studio rent stays in monthly overhead." },
  detailing: { unit: "job", services: ["Maintenance detail", "Full detail / correction"], materials: ["Chemicals / products", "Disposable supplies"], other: ["Travel / fuel", "Water / equipment use", "Other job expense"], roles: ["Preparation / detailing", "Finishing / travel"], context: "Use vehicle size and condition to estimate product use and technician-hours. This checks team hours; bay limits need a separate operational check." },
  salon: { unit: "appointment", services: ["Cut / styling", "Color / treatment"], materials: ["Service products", "Additional treatment products"], other: ["Laundry", "Disposables", "Other appointment expense"], roles: ["Stylist service", "Preparation / assistant"], context: "Use hands-on staff hours, not unattended processing time. Allow for no-shows in planned appointments and productive utilization; chair availability is a separate limit." },
  restaurant: { unit: "order", services: ["Dine-in order", "Takeaway / delivery order"], materials: ["Ingredients per served order", "Food waste allowance"], other: ["Packaging / disposables", "Other order expense"], deliveryOther: ["Packaging", "Delivery commission per order", "Other order expense"], roles: ["Kitchen preparation", "Service / packing"], context: "Divide recipe cost by usable portions before entering ingredient cost. Add waste only if it is not already included in that cost. Enter a delivery commission here OR in platform fees, once." },
  ecommerce: { unit: "order", services: ["Single-product order", "Bundle order"], materials: ["Product / SKU cost", "Additional bundle products", "Packaging materials"], other: ["Shipping paid by your store", "Expected returns cost per order", "Other order expense"], roles: ["Picking / packing", "Customer service / returns"], context: "For returns, use the expected unrecovered cost averaged across all orders. For example: 10% returns × $20 lost per return = $2 per order. Include net shipping you pay after customer shipping charges." },
  agency: { unit: "client-month", services: ["Monthly retainer", "Monthly project work"], materials: ["Client assets / licenses", "Other purchased deliverables"], other: ["Client-specific software", "Non-labor delivery expense", "Other client expense"], roles: ["Delivery work", "Contractor work", "Account management / revisions"], context: "Enter one month's revenue, costs and hours per active client. Put contractor pay in labor once; fixed subscriptions and salaried payroll belong in overhead if already budgeted there." },
};

export const builtFields = ["materialCost", "laborCost", "otherVariableCost", "hoursPerJob"];
export const otherLabels = (profile, service) => service === 1 && profile.deliveryOther ? profile.deliveryOther : profile.other;
const numeric = value => ["number", "string"].includes(typeof value) && String(value).trim() !== "" && Number.isFinite(Number(value)) && Number(value) >= 0;
const sum = values => values.reduce((total, value) => total.plus(value), new Decimal(0));

export function seedCostDraft(industryKey, input, service = 0) {
  const profile = costProfiles[industryKey];
  const seed = (labels, amount) => labels.map((_, index) => index ? 0 : amount);
  return { service, materials: seed(profile.materials, input.materialCost), other: seed(otherLabels(profile, service), input.otherVariableCost), laborMode: "total", laborTotal: input.laborCost, deliveryHours: input.hoursPerJob, roles: profile.roles.map((_, index) => ({ hours: index ? 0 : input.hoursPerJob, rate: 0 })) };
}

export function calculateBuiltCosts(industryKey, draft) {
  const profile = costProfiles[industryKey];
  if (!profile || !draft || !Number.isInteger(draft.service) || !profile.services[draft.service]
    || !["total", "hourly"].includes(draft.laborMode)
    || !Array.isArray(draft.materials) || draft.materials.length !== profile.materials.length
    || !Array.isArray(draft.other) || draft.other.length !== otherLabels(profile, draft.service).length
    || !Array.isArray(draft.roles) || draft.roles.length !== profile.roles.length
    || draft.roles.some(role => !role || typeof role !== "object" || role.hours === undefined || role.rate === undefined)) return { valid: false, message: "Choose a service and enter its cost details." };
  const laborValues = draft.laborMode === "hourly" ? draft.roles.flatMap(role => [role?.hours, role?.rate]) : [draft.laborTotal, draft.deliveryHours];
  if (![...draft.materials, ...draft.other, ...laborValues].every(numeric)) return { valid: false, message: "Fill every visible amount with a non-negative number. Use 0 for an expense you do not have." };
  const material = sum(draft.materials), other = sum(draft.other);
  const labor = draft.laborMode === "hourly" ? sum(draft.roles.map(role => new Decimal(role.hours).mul(role.rate))) : new Decimal(draft.laborTotal);
  const hours = draft.laborMode === "hourly" ? sum(draft.roles.map(role => role.hours)) : new Decimal(draft.deliveryHours);
  if (!hours.gt(0)) return { valid: false, message: "Total delivery hours must be above zero. Include all team members' working time." };
  const patch = { materialCost: material.toNumber(), laborCost: labor.toNumber(), otherVariableCost: other.toNumber(), hoursPerJob: hours.toNumber() };
  if (![...Object.values(patch), material.plus(labor).plus(other).toNumber()].every(Number.isFinite)) return { valid: false, message: "These totals are too large. Check the amounts and hours." };
  return { valid: true, patch, total: material.plus(labor).plus(other).toNumber() };
}

export function appliedCostRows(input) {
  const saved = input.costBuilder;
  const result = saved && calculateBuiltCosts(saved.industryKey, saved.draft);
  // Stale component detail must not describe manually edited or stress-test totals.
  if (!result?.valid || !builtFields.every(key => numeric(input[key]) && new Decimal(input[key]).eq(result.patch[key]))) return [];
  const profile = costProfiles[saved.industryKey], draft = saved.draft;
  return [
    ["Cost builder service", profile.services[draft.service]],
    ["Cost basis", `One ${profile.unit}; already included in calculator totals`],
    ...profile.materials.map((label, index) => [label, Number(draft.materials[index])]),
    ...(draft.laborMode === "hourly" ? profile.roles.flatMap((role, index) => [[`${role}: total team-hours`, Number(draft.roles[index].hours)], [`${role}: pay per hour`, Number(draft.roles[index].rate)]]) : [["Direct pay total", result.patch.laborCost]]),
    ...otherLabels(profile, draft.service).map((label, index) => [label, Number(draft.other[index])]),
    ["Built material cost", result.patch.materialCost], ["Built direct labor", result.patch.laborCost],
    ["Built other variable cost", result.patch.otherVariableCost], ["Built delivery team-hours", result.patch.hoursPerJob],
    ["Built cost subtotal (before acquisition and percentage fees)", result.total],
  ];
}
