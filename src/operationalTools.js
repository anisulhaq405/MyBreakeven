export const operationalTools = {
  "cleaning-contract-profit-calculator": {
    "mode": "cleaningContract",
    "name": "Cleaning Contract Profit Calculator",
    "category": "Cleaning contracts",
    "resultLabel": "Modeled monthly contract profit",
    "title": "Cleaning Contract Profit Calculator | MyBreakeven",
    "description": "Commercial cleaning contract profit after labor and overhead. Calculate with your own costs, view a checked example and use the result in your business break-even plan.",
    "intro": "Commercial cleaning contract profit after labor and overhead. Enter your own figures to see the cost drivers before changing your quote or budget.",
    "defaults": {
      "price": 2400,
      "visits": 3,
      "hours": 4,
      "wage": 24,
      "supplies": 12,
      "travel": 8,
      "overhead": 200,
      "target": 25
    },
    "fields": [
      [
        "price",
        "Monthly contract fee",
        "Net fee before sales tax."
      ],
      [
        "visits",
        "Visits per week",
        "Annual average uses 52 weeks \u00f7 12 months."
      ],
      [
        "hours",
        "Person-hours per visit",
        "Two cleaners working two hours equal four person-hours. Include paid travel time."
      ],
      [
        "wage",
        "Loaded cost per person-hour",
        "Wage plus employer payroll costs; include an owner labor allowance."
      ],
      [
        "supplies",
        "Supplies per visit",
        "Materials and equipment allowance, excluding labor."
      ],
      [
        "travel",
        "Vehicle cost per visit",
        "Fuel and vehicle allowance; travel labor belongs in person-hours."
      ],
      [
        "overhead",
        "Allocated overhead per month",
        "Only this contract\u2019s share of insurance, admin and other fixed costs."
      ],
      [
        "target",
        "Target profit margin (%)",
        "Profit divided by contract revenue, not markup."
      ]
    ],
    "quick": "At $2,400 a month, three weekly visits average 13 visits per month. Four person-hours at $24 plus $20 supplies and vehicle cost make each visit cost $116. With $200 overhead, monthly cost is $1,708 and modeled profit is $692 (28.83%). A 25% margin requires a $2,277.34 quote rounded upward.",
    "features": [
      "Instant calculations with clear validation and no signup.",
      "Searchable global currencies; labels change without exchange-rate conversion.",
      "Transparent formulas, checked examples and practical input guidance.",
      "Inputs remain in this browser tab; reset restores the illustrative example.",
      "Commercial cleaning contract profit after labor and overhead."
    ],
    "guide": "/blogs/cleaning-business-break-even/",
    "guideLabel": "Cleaning Contract Profit business break-even guide",
    "image": "/images/tools/cleaning-contract-profit-calculator.webp",
    "alt": "Commercial cleaning contract profit after labor and overhead illustrated with inputs and a checked result.",
    "caption": "Illustrative planning inputs, not industry benchmarks. At $2,400 a month, three weekly visits average 13 visits per month. Four person-hours at $24 plus $20 supplies and vehicle cost make each visit cost $116. With $200 overhead, monthly cost is $1,708 and modeled profit is $692 (28.83%). A 25% margin requires a $2,277.34 quote rounded upward.",
    "assumptions": "Annual-average visit counts can be fractional. Actual calendar-month invoices and payroll can differ. The fee and loaded labor rate are constant. Only entered overhead is allocated. Tax, unentered owner pay and financing costs are excluded.",
    "sections": [
      {
        "id": "how-to-use",
        "title": "How to use the cleaning contract profit calculator",
        "paragraphs": [
          "Start with one consistent service, route, product recipe or order cohort. Use invoice costs and measured operating records rather than a generic industry rate. The reset figures are a fictional example for checking the method."
        ],
        "steps": [
          "Record actual person-hours for a representative week before quoting.",
          "Add the costs of extra keys, parking, restocking or access delays to the relevant allowance.",
          "Compare profit with your target margin, then confirm the written visit scope.",
          "Recheck the contract when staffing time or visit frequency changes."
        ]
      },
      {
        "id": "formula",
        "title": "Commercial cleaning contract profit after labor and overhead: formula",
        "paragraphs": [
          "Monthly visits = weekly visits \u00d7 52 \u00f7 12. Monthly cost = visits \u00d7 (person-hours \u00d7 loaded hourly cost + supplies + vehicle cost) + allocated overhead. Profit = monthly fee \u2212 cost. Margin = profit \u00f7 fee. Target fee = cost \u00f7 (1 \u2212 target margin), rounded upward to the next cent.",
          "Calculations retain decimal precision. Displayed money rounds to two decimals. A rounded display is not a supplier price, recommended rate or forecast."
        ]
      },
      {
        "id": "worked-examples",
        "title": "Worked example using the default inputs",
        "paragraphs": [
          "At $2,400 a month, three weekly visits average 13 visits per month. Four person-hours at $24 plus $20 supplies and vehicle cost make each visit cost $116. With $200 overhead, monthly cost is $1,708 and modeled profit is $692 (28.83%). A 25% margin requires a $2,277.34 quote rounded upward.",
          "If person-hours rise from four to five per visit, labor increases $24 per visit or $312 across 13 visits. Monthly profit falls from $692 to $380, or 15.83% of the unchanged $2,400 fee. This is why a profitable quote can deteriorate when scope expands."
        ]
      },
      {
        "id": "interpret-results",
        "title": "Use the result in your next business decision",
        "paragraphs": [
          "Annual-average visit counts can be fractional. Actual calendar-month invoices and payroll can differ. The fee and loaded labor rate are constant. Only entered overhead is allocated. Tax, unentered owner pay and financing costs are excluded.",
          "Change one input at a time and compare the result with the original example. Check the largest cost driver against actual records before changing pricing. Carry the relevant cost or contribution into the linked industry break-even calculator; it adds the broader monthly business target."
        ]
      },
      {
        "id": "mistakes",
        "title": "Avoid double counting and misleading averages",
        "steps": [
          "Compare profit with your target margin, then confirm the written visit scope.",
          "Recheck the contract when staffing time or visit frequency changes.",
          "Keep quantities and reporting periods consistent.",
          "Include a cost in only one field. Use a separate scenario when the cost mix changes."
        ]
      }
    ],
    "faq": [
      [
        "Does three visits per week mean twelve visits each month?",
        "Not in an annual average. Three \u00d7 52 \u00f7 12 equals 13 monthly visits. For an exact calendar month, calculate the actual visit count separately."
      ],
      [
        "Are the example values industry averages?",
        "No. They are fictional inputs chosen to demonstrate and check the formula. Replace them with your records."
      ],
      [
        "Does this include all business expenses?",
        "Annual-average visit counts can be fractional. Actual calendar-month invoices and payroll can differ. The fee and loaded labor rate are constant. Only entered overhead is allocated. Tax, unentered owner pay and financing costs are excluded."
      ],
      [
        "Can I change the currency?",
        "Yes. Search the currency selector by currency code, name or country. It changes display labels; enter all amounts in the same currency."
      ],
      [
        "How should I use this with break-even planning?",
        "Carry the relevant per-service cost or contribution into the linked industry calculator and add monthly overhead and owner pay there. Avoid counting the same allowance twice."
      ]
    ],
    "sources": [
      [
        "Operational method reference",
        "https://www.getjobber.com/academy/cleaning/how-to-price-commercial-cleaning-jobs/"
      ]
    ],
    "related": [
      [
        "Use the cleaning business break even calculator",
        "/calculators/cleaning-business-break-even-calculator/"
      ],
      [
        "Review pricing and contribution",
        "/calculators/price-increase-calculator/"
      ]
    ]
  },
  "lawn-route-profit-calculator": {
    "mode": "lawnRoute",
    "name": "Lawn Route Profit Calculator",
    "category": "Lawn routes",
    "resultLabel": "Modeled profit per route",
    "title": "Lawn Route Profit Calculator | MyBreakeven",
    "description": "Lawn care route profit per hour after crew and driving costs. Calculate with your own costs, view a checked example and use the result in your business break-even plan.",
    "intro": "Lawn care route profit per hour after crew and driving costs. Enter your own figures to see the cost drivers before changing your quote or budget.",
    "defaults": {
      "stops": 12,
      "price": 55,
      "service": 20,
      "drive": 60,
      "crew": 2,
      "wage": 22,
      "vehicle": 30,
      "materials": 3,
      "overhead": 40
    },
    "fields": [
      [
        "stops",
        "Completed stops per route",
        "Whole customer stops completed during this route.",
        "1"
      ],
      [
        "price",
        "Average fee per stop",
        "Net mowing or maintenance fee before sales tax."
      ],
      [
        "service",
        "Service minutes per stop",
        "Elapsed time for the whole crew, not summed person-minutes."
      ],
      [
        "drive",
        "Total driving minutes",
        "Include the route\u2019s travel and loading time once."
      ],
      [
        "crew",
        "Paid crew members",
        "Whole people paid for the entire route.",
        "1"
      ],
      [
        "wage",
        "Loaded hourly cost per person",
        "Include employer costs and a cost allowance for owner labor."
      ],
      [
        "vehicle",
        "Vehicle cost per route",
        "Fuel and vehicle allowance; excludes labor."
      ],
      [
        "materials",
        "Materials / equipment cost per stop",
        "Consumables and equipment allowance, excluding vehicle costs."
      ],
      [
        "overhead",
        "Allocated overhead per route",
        "This route\u2019s share of admin and fixed operating costs."
      ]
    ],
    "quick": "Twelve $55 stops produce $660 revenue. At 20 minutes per stop plus 60 minutes driving, the route lasts five hours. Two crew members at $22 cost $220. Add $30 vehicle cost, $36 materials and $40 overhead: modeled route profit is $334, or $66.80 per elapsed route hour.",
    "features": [
      "Instant calculations with clear validation and no signup.",
      "Searchable global currencies; labels change without exchange-rate conversion.",
      "Transparent formulas, checked examples and practical input guidance.",
      "Inputs remain in this browser tab; reset restores the illustrative example.",
      "Lawn care route profit per hour after crew and driving costs."
    ],
    "guide": "/blogs/landscaping-break-even/",
    "guideLabel": "Lawn Route Profit business break-even guide",
    "image": "/images/tools/lawn-route-profit-calculator.webp",
    "alt": "Lawn care route profit per hour after crew and driving costs illustrated with inputs and a checked result.",
    "caption": "Illustrative planning inputs, not industry benchmarks. Twelve $55 stops produce $660 revenue. At 20 minutes per stop plus 60 minutes driving, the route lasts five hours. Two crew members at $22 cost $220. Add $30 vehicle cost, $36 materials and $40 overhead: modeled route profit is $334, or $66.80 per elapsed route hour.",
    "assumptions": "One complete route with a constant crew and average stop price. Route hours are elapsed hours, not person-hours. No map, route optimization, weather forecast or demand prediction is provided. Profit is before tax and unentered costs.",
    "sections": [
      {
        "id": "how-to-use",
        "title": "How to use the lawn route profit calculator",
        "paragraphs": [
          "Start with one consistent service, route, product recipe or order cohort. Use invoice costs and measured operating records rather than a generic industry rate. The reset figures are a fictional example for checking the method."
        ],
        "steps": [
          "Measure one complete route including loading, driving and cleanup.",
          "Use elapsed service time and let crew count calculate paid person-hours.",
          "Compare profit per route hour before adding a distant stop.",
          "Run a separate scenario for different route days or seasonal workloads."
        ]
      },
      {
        "id": "formula",
        "title": "Lawn care route profit per hour after crew and driving costs: formula",
        "paragraphs": [
          "Route hours = (stops \u00d7 service minutes + total driving minutes) \u00f7 60. Labor = route hours \u00d7 crew \u00d7 loaded hourly cost. Total cost = labor + vehicle + stops \u00d7 material allowance + allocated overhead. Profit = route revenue \u2212 total cost. Profit per hour uses elapsed route hours; labor uses crew person-hours.",
          "Calculations retain decimal precision. Displayed money rounds to two decimals. A rounded display is not a supplier price, recommended rate or forecast."
        ]
      },
      {
        "id": "worked-examples",
        "title": "Worked example using the default inputs",
        "paragraphs": [
          "Twelve $55 stops produce $660 revenue. At 20 minutes per stop plus 60 minutes driving, the route lasts five hours. Two crew members at $22 cost $220. Add $30 vehicle cost, $36 materials and $40 overhead: modeled route profit is $334, or $66.80 per elapsed route hour.",
          "If driving rises from 60 to 120 minutes while stops stay unchanged, elapsed route time increases to six hours and crew labor increases by $44. Profit falls to $290, or $48.33 per route hour. This comparison holds vehicle cost constant; update it if the extra distance raises fuel or maintenance."
        ]
      },
      {
        "id": "interpret-results",
        "title": "Use the result in your next business decision",
        "paragraphs": [
          "One complete route with a constant crew and average stop price. Route hours are elapsed hours, not person-hours. No map, route optimization, weather forecast or demand prediction is provided. Profit is before tax and unentered costs.",
          "Change one input at a time and compare the result with the original example. Check the largest cost driver against actual records before changing pricing. Carry the relevant cost or contribution into the linked industry break-even calculator; it adds the broader monthly business target."
        ]
      },
      {
        "id": "mistakes",
        "title": "Avoid double counting and misleading averages",
        "steps": [
          "Compare profit per route hour before adding a distant stop.",
          "Run a separate scenario for different route days or seasonal workloads.",
          "Keep quantities and reporting periods consistent.",
          "Include a cost in only one field. Use a separate scenario when the cost mix changes."
        ]
      }
    ],
    "faq": [
      [
        "Is route revenue per hour the same as profit per hour?",
        "No. This calculator deducts entered crew, vehicle, materials and overhead before dividing by elapsed route hours. Crew count increases person-hours but does not multiply elapsed route time."
      ],
      [
        "Are the example values industry averages?",
        "No. They are fictional inputs chosen to demonstrate and check the formula. Replace them with your records."
      ],
      [
        "Does this include all business expenses?",
        "One complete route with a constant crew and average stop price. Route hours are elapsed hours, not person-hours. No map, route optimization, weather forecast or demand prediction is provided. Profit is before tax and unentered costs."
      ],
      [
        "Can I change the currency?",
        "Yes. Search the currency selector by currency code, name or country. It changes display labels; enter all amounts in the same currency."
      ],
      [
        "How should I use this with break-even planning?",
        "Carry the relevant per-service cost or contribution into the linked industry calculator and add monthly overhead and owner pay there. Avoid counting the same allowance twice."
      ]
    ],
    "sources": [
      [
        "Operational method reference",
        "https://www.getjobber.com/academy/what-is-job-costing/"
      ]
    ],
    "related": [
      [
        "Use the landscaping break even calculator",
        "/calculators/landscaping-break-even-calculator/"
      ],
      [
        "Review pricing and contribution",
        "/calculators/price-increase-calculator/"
      ]
    ]
  },
  "detailing-chemical-cost-calculator": {
    "mode": "chemical",
    "name": "Detailing Chemical Cost Calculator",
    "category": "Detailing supplies",
    "resultLabel": "Chemical cost per car",
    "title": "Detailing Chemical Cost Calculator | MyBreakeven",
    "description": "Detailing chemical cost per car with dilution and waste. Calculate with your own costs, view a checked example and use the result in your business break-even plan.",
    "intro": "Detailing chemical cost per car with dilution and waste. Enter your own figures to see the cost drivers before changing your quote or budget.",
    "defaults": {
      "price": 40,
      "size": 1000,
      "water": 9,
      "use": 500,
      "waste": 10
    },
    "fields": [
      [
        "price",
        "Concentrate bottle price",
        "Purchase cost excluding recoverable sales tax."
      ],
      [
        "size",
        "Concentrate bottle volume (mL)",
        "Convert liters to mL by multiplying by 1,000."
      ],
      [
        "water",
        "Water parts per 1 part concentrate",
        "9 means 9:1 water-to-concentrate; zero means neat. Follow the product label."
      ],
      [
        "use",
        "Ready-to-use volume applied per car (mL)",
        "Final diluted liquid used on one car, excluding discarded liquid."
      ],
      [
        "waste",
        "Prepared liquid wasted (%)",
        "Share of prepared liquid lost before application. Must be below 100%."
      ]
    ],
    "quick": "A $40, 1,000 mL concentrate bottle mixed at 9:1 yields 10,000 mL of prepared solution. Applying 500 mL per car with 10% prepared-liquid waste consumes 555.56 mL and costs $2.22 per car. Usable yield is 18 cars per bottle.",
    "features": [
      "Instant calculations with clear validation and no signup.",
      "Searchable global currencies; labels change without exchange-rate conversion.",
      "Transparent formulas, checked examples and practical input guidance.",
      "Inputs remain in this browser tab; reset restores the illustrative example.",
      "Detailing chemical cost per car with dilution and waste."
    ],
    "guide": "/blogs/mobile-detailing-break-even/",
    "guideLabel": "Detailing Chemical Cost business break-even guide",
    "image": "/images/tools/detailing-chemical-cost-calculator.webp",
    "alt": "Detailing chemical cost per car with dilution and waste illustrated with inputs and a checked result.",
    "caption": "Illustrative planning inputs, not industry benchmarks. A $40, 1,000 mL concentrate bottle mixed at 9:1 yields 10,000 mL of prepared solution. Applying 500 mL per car with 10% prepared-liquid waste consumes 555.56 mL and costs $2.22 per car. Usable yield is 18 cars per bottle.",
    "assumptions": "All liquid volumes are in mL. Dilution is water-to-concentrate. Waste is a share of prepared volume, not an uplift on application volume. Water, bottles, labor and other chemicals are excluded. This is a cost calculation, not mixing or safety advice; follow the label.",
    "sections": [
      {
        "id": "how-to-use",
        "title": "How to use the detailing chemical cost calculator",
        "paragraphs": [
          "Start with one consistent service, route, product recipe or order cohort. Use invoice costs and measured operating records rather than a generic industry rate. The reset figures are a fictional example for checking the method."
        ],
        "steps": [
          "Enter the actual concentrate invoice cost and bottle size in mL.",
          "Read dilution as water parts to one concentrate part; manufacturer conventions can differ.",
          "Measure final mixed solution applied to a typical car.",
          "Use observed discarded solution as the waste share; repeat for each product and add costs."
        ]
      },
      {
        "id": "formula",
        "title": "Detailing chemical cost per car with dilution and waste: formula",
        "paragraphs": [
          "Prepared volume = concentrate volume \u00d7 (water parts + 1). Usable volume = prepared volume \u00d7 (1 \u2212 waste rate). Cost per car = bottle price \u00d7 applied volume \u00f7 usable volume. Cars per bottle = usable volume \u00f7 applied volume. Water cost is excluded unless included in bottle cost allowance.",
          "Calculations retain decimal precision. Displayed money rounds to two decimals. A rounded display is not a supplier price, recommended rate or forecast."
        ]
      },
      {
        "id": "worked-examples",
        "title": "Worked example using the default inputs",
        "paragraphs": [
          "A $40, 1,000 mL concentrate bottle mixed at 9:1 yields 10,000 mL of prepared solution. Applying 500 mL per car with 10% prepared-liquid waste consumes 555.56 mL and costs $2.22 per car. Usable yield is 18 cars per bottle.",
          "At the same 9:1 dilution, removing the 10% waste assumption reduces cost from $2.22 to $2.00 per car. A 4:1 mix instead yields 5,000 mL prepared and 4,500 mL usable at 10% waste, costing $4.44 per car. Compare only dilutions allowed by the manufacturer."
        ]
      },
      {
        "id": "interpret-results",
        "title": "Use the result in your next business decision",
        "paragraphs": [
          "All liquid volumes are in mL. Dilution is water-to-concentrate. Waste is a share of prepared volume, not an uplift on application volume. Water, bottles, labor and other chemicals are excluded. This is a cost calculation, not mixing or safety advice; follow the label.",
          "Change one input at a time and compare the result with the original example. Check the largest cost driver against actual records before changing pricing. Carry the relevant cost or contribution into the linked industry break-even calculator; it adds the broader monthly business target."
        ]
      },
      {
        "id": "mistakes",
        "title": "Avoid double counting and misleading averages",
        "steps": [
          "Measure final mixed solution applied to a typical car.",
          "Use observed discarded solution as the waste share; repeat for each product and add costs.",
          "Keep quantities and reporting periods consistent.",
          "Include a cost in only one field. Use a separate scenario when the cost mix changes."
        ]
      }
    ],
    "faq": [
      [
        "Does 9:1 mean nine total parts?",
        "Here it means nine parts water plus one part concentrate: ten total parts. Check the product label because some suppliers describe dilution differently."
      ],
      [
        "Are the example values industry averages?",
        "No. They are fictional inputs chosen to demonstrate and check the formula. Replace them with your records."
      ],
      [
        "Does this include all business expenses?",
        "All liquid volumes are in mL. Dilution is water-to-concentrate. Waste is a share of prepared volume, not an uplift on application volume. Water, bottles, labor and other chemicals are excluded. This is a cost calculation, not mixing or safety advice; follow the label."
      ],
      [
        "Can I change the currency?",
        "Yes. Search the currency selector by currency code, name or country. It changes display labels; enter all amounts in the same currency."
      ],
      [
        "How should I use this with break-even planning?",
        "Carry the relevant per-service cost or contribution into the linked industry calculator and add monthly overhead and owner pay there. Avoid counting the same allowance twice."
      ]
    ],
    "sources": [
      [
        "Operational method reference",
        "https://www.meguiars.com/professional/products"
      ]
    ],
    "related": [
      [
        "Use the mobile detailing break even calculator",
        "/calculators/mobile-detailing-break-even-calculator/"
      ],
      [
        "Review pricing and contribution",
        "/calculators/price-increase-calculator/"
      ]
    ]
  },
  "hair-color-product-cost-calculator": {
    "mode": "hairColor",
    "name": "Hair Color Product Cost Calculator",
    "category": "Salon color costs",
    "resultLabel": "Product cost per color service",
    "title": "Hair Color Product Cost Calculator | MyBreakeven",
    "description": "Hair color product cost per service and mixed-product waste. Calculate with your own costs, view a checked example and use the result in your business break-even plan.",
    "intro": "Hair color product cost per service and mixed-product waste. Enter your own figures to see the cost drivers before changing your quote or budget.",
    "defaults": {
      "colorPrice": 12,
      "colorSize": 60,
      "colorUse": 30,
      "developerPrice": 18,
      "developerSize": 1000,
      "developerUse": 60,
      "waste": 15,
      "services": 80
    },
    "fields": [
      [
        "colorPrice",
        "Color pack price",
        "Actual purchase cost of the color tube or pack."
      ],
      [
        "colorSize",
        "Color pack quantity",
        "Use one unit consistently for the color pack and color used, such as grams."
      ],
      [
        "colorUse",
        "Color mixed per service",
        "Quantity removed from stock, including any mixture later discarded."
      ],
      [
        "developerPrice",
        "Developer bottle price",
        "Actual cost of the developer bottle."
      ],
      [
        "developerSize",
        "Developer bottle quantity",
        "Use one unit consistently for developer size and usage, such as mL."
      ],
      [
        "developerUse",
        "Developer mixed per service",
        "Do not convert grams into mL without a measured density."
      ],
      [
        "waste",
        "Mixed product discarded (%)",
        "Share of the already mixed product left unused. Does not add cost a second time."
      ],
      [
        "services",
        "Color services per month",
        "Whole services using this same recipe.",
        "1"
      ]
    ],
    "quick": "A $12, 60 g color tube contributes $6 when 30 g is mixed. A $18, 1,000 mL developer bottle contributes $1.08 for 60 mL. Product cost is $7.08 per service. Discarding 15% wastes $1.06 of that cost; it is already included, not an extra charge. Eighty services cost $566.40.",
    "features": [
      "Instant calculations with clear validation and no signup.",
      "Searchable global currencies; labels change without exchange-rate conversion.",
      "Transparent formulas, checked examples and practical input guidance.",
      "Inputs remain in this browser tab; reset restores the illustrative example.",
      "Hair color product cost per service and mixed-product waste."
    ],
    "guide": "/blogs/salon-break-even/",
    "guideLabel": "Hair Color Product Cost business break-even guide",
    "image": "/images/tools/hair-color-product-cost-calculator.webp",
    "alt": "Hair color product cost per service and mixed-product waste illustrated with inputs and a checked result.",
    "caption": "Illustrative planning inputs, not industry benchmarks. A $12, 60 g color tube contributes $6 when 30 g is mixed. A $18, 1,000 mL developer bottle contributes $1.08 for 60 mL. Product cost is $7.08 per service. Discarding 15% wastes $1.06 of that cost; it is already included, not an extra charge. Eighty services cost $566.40.",
    "assumptions": "Each product has its own consistent quantity unit. Grams and mL are never converted between products. Mixed usage includes waste. The discarded share applies proportionally to a uniform mixture. Labor, foil, toner, rent and other service costs are excluded.",
    "sections": [
      {
        "id": "how-to-use",
        "title": "How to use the hair color product cost calculator",
        "paragraphs": [
          "Start with one consistent service, route, product recipe or order cohort. Use invoice costs and measured operating records rather than a generic industry rate. The reset figures are a fictional example for checking the method."
        ],
        "steps": [
          "Take pack prices from current supplier invoices.",
          "Measure each product as removed from stock using consistent units for that product.",
          "Use the same discarded proportion for both products only when the mixture is uniform.",
          "Run separate recipes for toner, bleach or additional bowls and sum their service costs."
        ]
      },
      {
        "id": "formula",
        "title": "Hair color product cost per service and mixed-product waste: formula",
        "paragraphs": [
          "Color cost = pack price \u00d7 color mixed \u00f7 pack quantity. Developer cost = bottle price \u00d7 developer mixed \u00f7 bottle quantity. Service product cost = color cost + developer cost. Waste cost = service product cost \u00d7 discarded share. Monthly cost = service product cost \u00d7 services. Waste is allocated within purchased product usage, not added twice.",
          "Calculations retain decimal precision. Displayed money rounds to two decimals. A rounded display is not a supplier price, recommended rate or forecast."
        ]
      },
      {
        "id": "worked-examples",
        "title": "Worked example using the default inputs",
        "paragraphs": [
          "A $12, 60 g color tube contributes $6 when 30 g is mixed. A $18, 1,000 mL developer bottle contributes $1.08 for 60 mL. Product cost is $7.08 per service. Discarding 15% wastes $1.06 of that cost; it is already included, not an extra charge. Eighty services cost $566.40.",
          "Reducing mixed-product waste from 15% to 5% with unchanged mixed quantities lowers the identified wasted value from $1.062 to $0.354 per service. Total product cost remains $7.08 until you actually mix less. To model a 10% smaller bowl at the same recipe ratio, reduce color to 27 g and developer to 54 mL; product cost becomes $6.372 per service."
        ]
      },
      {
        "id": "interpret-results",
        "title": "Use the result in your next business decision",
        "paragraphs": [
          "Each product has its own consistent quantity unit. Grams and mL are never converted between products. Mixed usage includes waste. The discarded share applies proportionally to a uniform mixture. Labor, foil, toner, rent and other service costs are excluded.",
          "Change one input at a time and compare the result with the original example. Check the largest cost driver against actual records before changing pricing. Carry the relevant cost or contribution into the linked industry break-even calculator; it adds the broader monthly business target."
        ]
      },
      {
        "id": "mistakes",
        "title": "Avoid double counting and misleading averages",
        "steps": [
          "Use the same discarded proportion for both products only when the mixture is uniform.",
          "Run separate recipes for toner, bleach or additional bowls and sum their service costs.",
          "Keep quantities and reporting periods consistent.",
          "Include a cost in only one field. Use a separate scenario when the cost mix changes."
        ]
      }
    ],
    "faq": [
      [
        "Why does changing waste not change product cost?",
        "The quantities entered are already removed from stock. Discarding some identifies waste within that cost. To model a smaller bowl, reduce the mixed quantities themselves. Adding waste again would double count it."
      ],
      [
        "Are the example values industry averages?",
        "No. They are fictional inputs chosen to demonstrate and check the formula. Replace them with your records."
      ],
      [
        "Does this include all business expenses?",
        "Each product has its own consistent quantity unit. Grams and mL are never converted between products. Mixed usage includes waste. The discarded share applies proportionally to a uniform mixture. Labor, foil, toner, rent and other service costs are excluded."
      ],
      [
        "Can I change the currency?",
        "Yes. Search the currency selector by currency code, name or country. It changes display labels; enter all amounts in the same currency."
      ],
      [
        "How should I use this with break-even planning?",
        "Carry the relevant per-service cost or contribution into the linked industry calculator and add monthly overhead and owner pay there. Avoid counting the same allowance twice."
      ]
    ],
    "sources": [
      [
        "Operational method reference",
        "https://getvish.com/blog/2023/02/17/reports-to-measure-salon-success/"
      ]
    ],
    "related": [
      [
        "Use the salon break even calculator",
        "/calculators/salon-break-even-calculator/"
      ],
      [
        "Review pricing and contribution",
        "/calculators/price-increase-calculator/"
      ]
    ]
  },
  "ecommerce-return-cost-calculator": {
    "mode": "returns",
    "name": "Ecommerce Return Cost Calculator",
    "category": "Ecommerce returns",
    "resultLabel": "Return cost allowance per fulfilled order",
    "title": "Ecommerce Return Cost Calculator | MyBreakeven",
    "description": "Ecommerce return allowance per order with inventory recovery. Calculate with your own costs, view a checked example and use the result in your business break-even plan.",
    "intro": "Ecommerce return allowance per order with inventory recovery. Enter your own figures to see the cost drivers before changing your quote or budget.",
    "defaults": {
      "orders": 1000,
      "rate": 10,
      "product": 30,
      "recovery": 80,
      "outbound": 6,
      "reverse": 8,
      "handling": 4,
      "fees": 2
    },
    "fields": [
      [
        "orders",
        "Fulfilled orders per month",
        "Whole orders in a comparable cohort.",
        "1"
      ],
      [
        "rate",
        "Expected full-return rate (%)",
        "Share of orders fully refunded and returned; use cohort-based data."
      ],
      [
        "product",
        "Product cost per returned order",
        "Inventory acquisition cost, not selling price."
      ],
      [
        "recovery",
        "Recoverable inventory cost (%)",
        "Share of product cost retained as usable inventory after return."
      ],
      [
        "outbound",
        "Unrecovered outbound shipping per return",
        "Only the net shipping expense you cannot recover."
      ],
      [
        "reverse",
        "Return shipping per return",
        "Net return label cost paid by your business."
      ],
      [
        "handling",
        "Processing cost per return",
        "Labor, packaging and restocking costs not entered elsewhere."
      ],
      [
        "fees",
        "Nonrefunded fees per return",
        "Only payment or platform fees retained after refund."
      ]
    ],
    "quick": "For 1,000 orders at a 10% return rate, expect 100 returns. A $30 product with 80% inventory recovery loses $6 inventory cost. Add $6 outbound shipping, $8 return shipping, $4 handling and $2 retained fees: cost is $26 per return, $2,600 monthly, or a $2.60 allowance per fulfilled order. Refunded revenue and lost sales contribution are separate.",
    "features": [
      "Instant calculations with clear validation and no signup.",
      "Searchable global currencies; labels change without exchange-rate conversion.",
      "Transparent formulas, checked examples and practical input guidance.",
      "Inputs remain in this browser tab; reset restores the illustrative example.",
      "Ecommerce return allowance per order with inventory recovery."
    ],
    "guide": "/blogs/ecommerce-break-even/",
    "guideLabel": "Ecommerce Return Cost business break-even guide",
    "image": "/images/tools/ecommerce-return-cost-calculator.webp",
    "alt": "Ecommerce return allowance per order with inventory recovery illustrated with inputs and a checked result.",
    "caption": "Illustrative planning inputs, not industry benchmarks. For 1,000 orders at a 10% return rate, expect 100 returns. A $30 product with 80% inventory recovery loses $6 inventory cost. Add $6 outbound shipping, $8 return shipping, $4 handling and $2 retained fees: cost is $26 per return, $2,600 monthly, or a $2.60 allowance per fulfilled order. Refunded revenue and lost sales contribution are separate.",
    "assumptions": "Full-order returns and refunds only. This is an operating-cost allowance, not total profit loss, lost contribution, cash-flow timing or an accounting journal. Refunds reduce revenue separately. Recovered inventory is valued at retained acquisition cost. Resale revenue is excluded. No monthly overhead or advertising is counted.",
    "sections": [
      {
        "id": "how-to-use",
        "title": "How to use the ecommerce return cost calculator",
        "paragraphs": [
          "Start with one consistent service, route, product recipe or order cohort. Use invoice costs and measured operating records rather than a generic industry rate. The reset figures are a fictional example for checking the method."
        ],
        "steps": [
          "Match fulfilled orders and returns from the same cohort; recent orders may not yet have completed the return window.",
          "Value recovered stock at retained cost after write-downs, not expected resale revenue.",
          "Enter only net unrecovered shipping and fee amounts.",
          "Use the allowance once in planning; do not add outbound costs again if already embedded in the same allowance."
        ]
      },
      {
        "id": "formula",
        "title": "Ecommerce return allowance per order with inventory recovery: formula",
        "paragraphs": [
          "Expected returns = orders \u00d7 return rate. Inventory loss = product cost \u00d7 (1 \u2212 recoverable cost share). Cost per return = inventory loss + unrecovered outbound shipping + return shipping + processing + retained fees. Monthly burden = expected returns \u00d7 cost per return. Allowance per fulfilled order = return rate \u00d7 cost per return.",
          "Calculations retain decimal precision. Displayed money rounds to two decimals. A rounded display is not a supplier price, recommended rate or forecast."
        ]
      },
      {
        "id": "worked-examples",
        "title": "Worked example using the default inputs",
        "paragraphs": [
          "For 1,000 orders at a 10% return rate, expect 100 returns. A $30 product with 80% inventory recovery loses $6 inventory cost. Add $6 outbound shipping, $8 return shipping, $4 handling and $2 retained fees: cost is $26 per return, $2,600 monthly, or a $2.60 allowance per fulfilled order. Refunded revenue and lost sales contribution are separate.",
          "At an 8% return rate with all per-return costs unchanged, monthly burden falls from $2,600 to $2,080, saving $520 in modeled operating costs. At 100% inventory-cost recovery and a 10% return rate, cost per return falls from $26 to $20 and monthly burden becomes $2,000. Refunds still reduce revenue separately."
        ]
      },
      {
        "id": "interpret-results",
        "title": "Use the result in your next business decision",
        "paragraphs": [
          "Full-order returns and refunds only. This is an operating-cost allowance, not total profit loss, lost contribution, cash-flow timing or an accounting journal. Refunds reduce revenue separately. Recovered inventory is valued at retained acquisition cost. Resale revenue is excluded. No monthly overhead or advertising is counted.",
          "Change one input at a time and compare the result with the original example. Check the largest cost driver against actual records before changing pricing. Carry the relevant cost or contribution into the linked industry break-even calculator; it adds the broader monthly business target."
        ]
      },
      {
        "id": "mistakes",
        "title": "Avoid double counting and misleading averages",
        "steps": [
          "Enter only net unrecovered shipping and fee amounts.",
          "Use the allowance once in planning; do not add outbound costs again if already embedded in the same allowance.",
          "Keep quantities and reporting periods consistent.",
          "Include a cost in only one field. Use a separate scenario when the cost mix changes."
        ]
      }
    ],
    "faq": [
      [
        "Does this measure the total profit lost from a return?",
        "No. It measures the operating cost burden of fully returned orders. Revenue refunds and the original sale contribution are separate. If revenue is already net of refunds, do not subtract those refunds again."
      ],
      [
        "Are the example values industry averages?",
        "No. They are fictional inputs chosen to demonstrate and check the formula. Replace them with your records."
      ],
      [
        "Does this include all business expenses?",
        "Full-order returns and refunds only. This is an operating-cost allowance, not total profit loss, lost contribution, cash-flow timing or an accounting journal. Refunds reduce revenue separately. Recovered inventory is valued at retained acquisition cost. Resale revenue is excluded. No monthly overhead or advertising is counted."
      ],
      [
        "Can I change the currency?",
        "Yes. Search the currency selector by currency code, name or country. It changes display labels; enter all amounts in the same currency."
      ],
      [
        "How should I use this with break-even planning?",
        "Carry the relevant per-service cost or contribution into the linked industry calculator and add monthly overhead and owner pay there. Avoid counting the same allowance twice."
      ]
    ],
    "sources": [
      [
        "Operational method reference",
        "https://www.shopify.com/blog/returns-management"
      ]
    ],
    "related": [
      [
        "Use the ecommerce break even calculator",
        "/calculators/ecommerce-break-even-calculator/"
      ],
      [
        "Review pricing and contribution",
        "/calculators/price-increase-calculator/"
      ]
    ]
  }
};
