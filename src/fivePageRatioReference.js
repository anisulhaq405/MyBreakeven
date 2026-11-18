// Additional definitions match the existing calculator; no second calculation engine.
export const additionalRatioReference = [
  {
    "group": "Liquidity",
    "name": "Defensive interval (days)",
    "formula": "(cash + liquid investments + receivables) / daily cash expense",
    "unit": "days",
    "explain": "",
    "inputs": [
      "Cash and cash equivalents",
      "Eligible liquid investments",
      "Eligible trade receivables",
      "Average daily cash expenditure"
    ]
  },
  {
    "group": "Profitability",
    "name": "Pretax margin",
    "formula": "Pretax profit / revenue × 100",
    "unit": "%",
    "explain": "",
    "inputs": [
      "Income before tax",
      "Net revenue"
    ]
  },
  {
    "group": "Profitability",
    "name": "EBIT margin",
    "formula": "EBIT / revenue × 100",
    "unit": "%",
    "explain": "",
    "inputs": [
      "EBIT",
      "Net revenue"
    ]
  },
  {
    "group": "Profitability",
    "name": "Operating return on assets",
    "formula": "Operating profit / average assets × 100",
    "unit": "%",
    "explain": "",
    "inputs": [
      "Operating profit",
      "Opening total assets",
      "Total assets"
    ]
  },
  {
    "group": "Profitability",
    "name": "Return on invested capital (after tax)",
    "formula": "EBIT × (1 − tax rate) / average invested capital × 100",
    "unit": "%",
    "explain": "",
    "inputs": [
      "EBIT",
      "Effective tax rate (%)",
      "Opening invested capital",
      "Closing invested capital"
    ]
  },
  {
    "group": "Profitability",
    "name": "Return on common equity",
    "formula": "(Net income − preferred dividends) / common book equity × 100",
    "unit": "%",
    "explain": "",
    "inputs": [
      "Net income",
      "Preferred dividends",
      "Common shareholder book equity"
    ]
  },
  {
    "group": "Leverage",
    "name": "Long-term debt to capitalization",
    "formula": "Long-term debt / (long-term debt + equity) × 100",
    "unit": "%",
    "explain": "",
    "inputs": [
      "Long-term interest-bearing debt",
      "Total equity"
    ]
  },
  {
    "group": "Leverage",
    "name": "Debt to capital",
    "formula": "Interest-bearing debt / (debt + equity) × 100",
    "unit": "%",
    "explain": "",
    "inputs": [
      "Interest-bearing debt",
      "Total equity"
    ]
  },
  {
    "group": "Leverage",
    "name": "Debt to EBITDA",
    "formula": "Interest-bearing debt / period EBITDA",
    "unit": "times",
    "explain": "",
    "inputs": [
      "Interest-bearing debt",
      "EBITDA"
    ]
  },
  {
    "group": "Efficiency & returns",
    "name": "Days inventory outstanding",
    "formula": "Average inventory / period COGS × period days",
    "unit": "days",
    "explain": "",
    "inputs": [
      "Opening inventory",
      "Closing inventory",
      "Cost of goods sold",
      "Period days"
    ]
  },
  {
    "group": "Efficiency & returns",
    "name": "Payables turnover",
    "formula": "Net purchases / average trade payables",
    "unit": "times",
    "explain": "",
    "inputs": [
      "Net inventory purchases",
      "Opening trade payables",
      "Closing trade payables"
    ]
  },
  {
    "group": "Efficiency & returns",
    "name": "Days payables outstanding",
    "formula": "Average trade payables / purchases × period days",
    "unit": "days",
    "explain": "",
    "inputs": [
      "Opening trade payables",
      "Closing trade payables",
      "Net inventory purchases",
      "Period days"
    ]
  },
  {
    "group": "Efficiency & returns",
    "name": "Operating cycle",
    "formula": "DIO + DSO",
    "unit": "days",
    "explain": "",
    "inputs": [
      "Opening inventory",
      "Closing inventory",
      "Cost of goods sold",
      "Opening trade receivables",
      "Eligible trade receivables",
      "Net credit sales",
      "Period days"
    ]
  },
  {
    "group": "Efficiency & returns",
    "name": "Cash conversion cycle",
    "formula": "DIO + DSO − DPO",
    "unit": "days",
    "explain": "",
    "inputs": [
      "Opening inventory",
      "Closing inventory",
      "Cost of goods sold",
      "Opening trade receivables",
      "Eligible trade receivables",
      "Net credit sales",
      "Opening trade payables",
      "Closing trade payables",
      "Net inventory purchases",
      "Period days"
    ]
  },
  {
    "group": "Efficiency & returns",
    "name": "Fixed asset turnover",
    "formula": "Revenue / average net fixed assets",
    "unit": "times",
    "explain": "",
    "inputs": [
      "Net revenue",
      "Opening net fixed assets",
      "Closing net fixed assets"
    ]
  },
  {
    "group": "Efficiency & returns",
    "name": "Working capital turnover",
    "formula": "Revenue / average working capital",
    "unit": "times",
    "explain": "",
    "inputs": [
      "Net revenue",
      "Opening working capital",
      "Current assets",
      "Current liabilities"
    ]
  },
  {
    "group": "Cash flow",
    "name": "Operating cash flow ratio",
    "formula": "Operating cash flow / current liabilities",
    "unit": "times",
    "explain": "",
    "inputs": [
      "Operating cash flow",
      "Current liabilities"
    ]
  },
  {
    "group": "Cash flow",
    "name": "Cash flow margin",
    "formula": "Operating cash flow / revenue × 100",
    "unit": "%",
    "explain": "",
    "inputs": [
      "Operating cash flow",
      "Net revenue"
    ]
  },
  {
    "group": "Cash flow",
    "name": "Free cash flow",
    "formula": "Operating cash flow − capital expenditures",
    "unit": "money",
    "explain": "",
    "inputs": [
      "Operating cash flow",
      "Capital expenditures"
    ]
  },
  {
    "group": "Cash flow",
    "name": "Free cash flow margin",
    "formula": "(Operating cash flow − capex) / revenue × 100",
    "unit": "%",
    "explain": "",
    "inputs": [
      "Operating cash flow",
      "Capital expenditures",
      "Net revenue"
    ]
  },
  {
    "group": "Cash flow",
    "name": "Operating cash flow to debt",
    "formula": "Operating cash flow / interest-bearing debt",
    "unit": "times",
    "explain": "",
    "inputs": [
      "Operating cash flow",
      "Interest-bearing debt for cash coverage"
    ]
  },
  {
    "group": "Cash flow",
    "name": "Cash dividend coverage",
    "formula": "Operating cash flow / cash dividends paid",
    "unit": "times",
    "explain": "",
    "inputs": [
      "Operating cash flow",
      "Cash dividends paid"
    ]
  },
  {
    "group": "Cash flow",
    "name": "Capital expenditure coverage",
    "formula": "Operating cash flow / capital expenditures",
    "unit": "times",
    "explain": "",
    "inputs": [
      "Operating cash flow",
      "Capital expenditures"
    ]
  },
  {
    "group": "Coverage",
    "name": "Debt service coverage (cash-based)",
    "formula": "Operating cash flow / scheduled debt service",
    "unit": "times",
    "explain": "",
    "inputs": [
      "Operating cash flow",
      "Total debt service"
    ]
  },
  {
    "group": "Coverage",
    "name": "Fixed charge coverage",
    "formula": "(EBIT + lease payments) / (interest + lease payments)",
    "unit": "times",
    "explain": "",
    "inputs": [
      "EBIT",
      "Scheduled lease payments",
      "Interest expense"
    ]
  },
  {
    "group": "Coverage",
    "name": "EBITDA interest coverage",
    "formula": "EBITDA / interest expense",
    "unit": "times",
    "explain": "",
    "inputs": [
      "EBITDA",
      "Interest expense"
    ]
  },
  {
    "group": "Market value",
    "name": "Earnings per share",
    "formula": "(Net income − preferred dividends) / weighted-average shares",
    "unit": "money",
    "explain": "",
    "inputs": [
      "Net income",
      "Preferred dividends",
      "Weighted-average common shares"
    ]
  },
  {
    "group": "Market value",
    "name": "Price to earnings",
    "formula": "Share price / positive EPS",
    "unit": "times",
    "explain": "",
    "inputs": [
      "Market share price",
      "Net income",
      "Preferred dividends",
      "Weighted-average common shares"
    ]
  },
  {
    "group": "Market value",
    "name": "Book value per share",
    "formula": "Common book equity / outstanding shares",
    "unit": "money",
    "explain": "",
    "inputs": [
      "Common shareholder book equity",
      "Common shares outstanding"
    ]
  },
  {
    "group": "Market value",
    "name": "Price to book",
    "formula": "Share price / positive book value per share",
    "unit": "times",
    "explain": "",
    "inputs": [
      "Market share price",
      "Common shareholder book equity",
      "Common shares outstanding"
    ]
  },
  {
    "group": "Market value",
    "name": "Dividend yield",
    "formula": "Annual dividend per share / share price × 100",
    "unit": "%",
    "explain": "",
    "inputs": [
      "Annual dividend per common share",
      "Market share price"
    ]
  },
  {
    "group": "Market value",
    "name": "Dividend payout ratio",
    "formula": "Dividend per share × weighted shares / earnings to common × 100",
    "unit": "%",
    "explain": "",
    "inputs": [
      "Annual dividend per common share",
      "Weighted-average common shares",
      "Net income",
      "Preferred dividends"
    ]
  },
  {
    "group": "Market value",
    "name": "Price to sales",
    "formula": "Market capitalization / period revenue",
    "unit": "times",
    "explain": "",
    "inputs": [
      "Equity market capitalization",
      "Net revenue"
    ]
  },
  {
    "group": "Market value",
    "name": "EV to EBITDA",
    "formula": "Enterprise value / period EBITDA",
    "unit": "times",
    "explain": "",
    "inputs": [
      "Enterprise value",
      "EBITDA"
    ]
  },
  {
    "group": "Market value",
    "name": "Free cash flow yield",
    "formula": "(Operating cash flow − capex) / market capitalization × 100",
    "unit": "%",
    "explain": "",
    "inputs": [
      "Operating cash flow",
      "Capital expenditures",
      "Equity market capitalization"
    ]
  },
  {
    "group": "Market value",
    "name": "PEG ratio",
    "formula": "Positive P/E divided by expected EPS growth (%)",
    "unit": "times",
    "explain": "",
    "inputs": [
      "Market share price",
      "Net income",
      "Preferred dividends",
      "Weighted-average common shares",
      "Forecast EPS growth (%)"
    ]
  }
];
