import {founderCaseRoute,founderCaseMeta} from './founderCaseStudyData.js';
import { authorityPages } from './authorityResources.js';

// Shared by static HTML generation and browser metadata updates.
export const staticPageMeta = {
  "guides/financial-ratios": ["Financial Ratios: Formulas, Types & Examples | MyBreakeven", "Use a printable reference for 19 business financial measures. Review liquidity, profitability, leverage, average balances and a reconciled statement example.", "Financial Ratios: Formulas, Types and Examples"],
  ...authorityPages,
  [founderCaseRoute]: founderCaseMeta,
  "guides/agency-business": ["Agency Business Guides | MyBreakeven", "Review agency retainers, scope changes, staffing and cash dates. Use client records checklists, worked capacity examples and free business planning tools.", "Agency business planning guides"],
  "guides/ecommerce-business": ["E-commerce Business Guides | MyBreakeven", "Review ecommerce order contribution, returns, advertising and inventory cash. Follow records checklists, worked workflows and free business calculators.", "E-commerce business planning guides"],
  "guides/photography-business": ["Photography Business Guides | MyBreakeven", "Review photography assignment hours, packages and mini-session costs. Follow records checklists, worked examples and the free monthly break-even planner.", "Photography business planning guides"],
  "guides/restaurant-business": ["Restaurant Business Guides | MyBreakeven", "Review restaurant recipe costs, inventory food cost and menu contribution. Follow workflows, calculators and editable budget and business-plan templates.", "Restaurant business planning guides"],
  "guides/salon-business": ["Salon Business Planning Guides | MyBreakeven", "Review salon rebooking, no-shows, service costs and memberships. Follow practical workflows, records checklists and free appointment planning calculators.", "Salon business planning guides"],
  "guides/mobile-detailing-business": ["Mobile Detailing Business Guides | MyBreakeven", "Review detailing travel profit, cancellations, chemicals and refill time. Use practical workflows, route records and free business planning calculators.", "Mobile detailing business planning guides"],
  "guides/landscaping-business": ["Landscaping Business Planning Guides | MyBreakeven", "Review landscaping job costs, routes and seasonal capacity. Follow practical workflows, records checklists and free route and break-even calculators.", "Landscaping business planning guides"],
  "guides/cleaning-business": ["Cleaning Business Planning Guides | MyBreakeven", "Review cleaning quotes, callbacks, contract costs and payroll cash. Use practical workflows, job-cost worksheets, monthly budgets and break-even calculators.", "Cleaning business planning guides"],
  tools: ["Free Business Calculators: Profit & Pricing | MyBreakeven", "Explore free business calculators for profit, pricing, service costs, advertising and cash. Use clear formulas and worked guides without signing up.", "Free business calculators"],
  "pro-user-guide": ["MyBreakeven Pro Calculator User Guide", "Step-by-step guide to MyBreakeven Pro: enter costs, read break-even results, use advanced analysis, save scenarios and export reports.", "MyBreakeven Pro calculator user guide"],
  pricing: ["MyBreakeven Pricing: Free & Pro Business Planning", "Compare MyBreakeven Free and Pro plans for industry break-even calculators, saved scenarios, cost-drift analysis, comparisons and reports.", "MyBreakeven Free and Pro pricing"],
  blogs: ["Small Business Break-Even Guides | MyBreakeven", "Read practical break-even guides for cleaning, landscaping, photography, agencies, mobile detailing, e-commerce, restaurants and salons.", "Industry break-even calculator guides"],
  "about-us": ["About MyBreakeven | Formula-Backed Business Planning", "Learn how MyBreakeven turns contribution margin, sales demand and operating capacity into transparent business planning estimates.", "About MyBreakeven"],
  "contact-us": ["Contact MyBreakeven", "Contact MyBreakeven about calculator feedback, industry requests, partnerships or formula-backed business planning tools.", "Contact MyBreakeven"],
  "privacy-policy": ["Privacy Policy | MyBreakeven", "Read how MyBreakeven handles calculator data, website information and messages you send.", "Privacy Policy"],
  "terms-of-service": ["Terms of Service | MyBreakeven", "Read the terms for using MyBreakeven calculators, content and subscription features.", "Terms of Service"],
  "refund-policy": ["Refund Policy | MyBreakeven", "Review the cancellation and refund policy for MyBreakeven paid subscriptions.", "Refund Policy"],
  "cookie-policy": ["Cookie Policy | MyBreakeven", "Learn how MyBreakeven uses essential browser storage and cookies.", "Cookie Policy"],
  login: ["Log in to MyBreakeven", "Access your private MyBreakeven planning workspace.", "Log in to MyBreakeven", true],
  signup: ["Create a MyBreakeven account", "Create an optional account for saved business planning scenarios and reports.", "Create a MyBreakeven account", true],
  "forgot-password": ["Reset your MyBreakeven password", "Request a secure password-reset link for your MyBreakeven account.", "Reset your password", true],
  "reset-password": ["Choose a new MyBreakeven password", "Securely update your MyBreakeven account password.", "Choose a new password", true],
  dashboard: ["Your MyBreakeven dashboard", "Manage your private MyBreakeven account and planning workspace.", "Your private dashboard", true],
};
