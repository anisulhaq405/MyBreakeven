import Decimal from 'decimal.js';

export const ebayRates = {
  most: { label: 'Most categories (check your listing)', rate: 13.6 },
  media: { label: 'Qualifying books, movies and music', rate: 15.3 },
  coins: { label: 'Coins & paper money (excluding bullion)', rate: 13.25 },
};

export const marketplaceDefaults = {
  etsy: { price: 40, shipping: 5, tax: 8, itemCost: 12, postage: 6, supplies: 2, allowance: 1, goal: 20, listings: 1, offsite: 15 },
  ebay: { price: 100, shipping: 8, tax: 6, itemCost: 48, postage: 10, supplies: 2, allowance: 3, goal: 25, category: 'most', insertion: 0, promoted: 4, customRate: 13.6 },
};

export const digitalMarketplaceDefaults = {
  etsy: { ...marketplaceDefaults.etsy, productType: 'digital', price: 12, shipping: 0, itemCost: 2, postage: 0, supplies: 0, allowance: 0.5, goal: 8, offsite: 0 },
  ebay: { ...marketplaceDefaults.ebay, productType: 'digital', price: 15, shipping: 0, itemCost: 3, postage: 0, supplies: 0, allowance: 0.5, goal: 8, customRate: '', digitalOrderFee: '', promoted: 0 },
};

const decimal = value => new Decimal(value);
const cents = value => decimal(value).toDecimalPlaces(2).toNumber();
const percent = value => decimal(value).div(100);

export function calculateMarketplace(platform, input) {
  const etsy = platform === 'etsy';
  const digital = input.productType === 'digital';
  const physicalCosts = digital ? [] : ['postage', 'supplies'];
  const fields = ['price', 'tax', 'itemCost', 'allowance', 'goal', ...physicalCosts, ...(digital ? [] : ['shipping']),
    ...(etsy ? ['listings', 'offsite'] : ['insertion', 'promoted', ...(digital ? ['customRate', 'digitalOrderFee'] : input.category === 'custom' ? ['customRate'] : [])])];
  if (!etsy && digital && (input.customRate === '' || input.digitalOrderFee === '')) {
    return { error: 'Enter your verified percentage fee and fixed fee per order. Enter zero for any fee that does not apply.' };
  }
  if (fields.some(key => input[key] === '' || !Number.isFinite(Number(input[key])) || Number(input[key]) < 0 || Number(input[key]) > 1e7)) {
    return { error: 'Enter a number from 0 to 10,000,000 in each field.' };
  }
  if (Number(input.tax) > 100 || (etsy && ![0, 12, 15].includes(Number(input.offsite))) ||
      (etsy && !Number.isInteger(Number(input.listings)))) {
    return { error: 'Use a tax rate from 0% to 100% and whole listing charges where applicable.' };
  }
  const custom = digital || input.category === 'custom';
  const rate = etsy ? 0 : custom ? Number(input.customRate) : ebayRates[input.category]?.rate;
  if (!etsy && (!Number.isFinite(rate) || rate + Number(input.promoted) >= 50)) {
    return { error: 'Choose a supported category, with combined custom and promoted fee rates below 50%.' };
  }
  const costs = ['itemCost', 'allowance', ...physicalCosts].reduce((sum, key) => sum.plus(input[key]), decimal(0));
  const taxRate = percent(input.tax);
  const shipping = decimal(digital ? 0 : input.shipping);
  const quote = (price, orderFeeOverride) => {
    const revenue = price.plus(shipping);
    const buyerTax = revenue.mul(taxRate).toDecimalPlaces(2);
    const buyerTotal = revenue.plus(buyerTax);
    let lines;
    if (etsy) {
      lines = [
        ['Listing fees allocated to this order', decimal(input.listings).mul('0.20')],
        ['Transaction fee', revenue.mul('0.065')],
        ['Etsy Payments processing fee', buyerTotal.mul('0.03').plus('0.25')],
        ['Offsite Ads fee', Decimal.min(revenue.mul(percent(input.offsite)), 100)],
      ];
    } else {
      const percentageFee = custom ? buyerTotal.mul(percent(rate))
        : Decimal.min(buyerTotal, 7500).mul(percent(rate)).plus(Decimal.max(buyerTotal.minus(7500), 0).mul('0.0235'));
      const orderFee = digital ? input.digitalOrderFee : orderFeeOverride ?? (buyerTotal.lte(10) ? '0.30' : '0.40');
      lines = [
        [digital ? 'Entered percentage fee' : 'Final value percentage fee', percentageFee],
        [digital ? 'Entered fixed fee per order' : 'Final value per-order charge', decimal(orderFee)],
        ['Insertion fee allocated to this order', decimal(input.insertion)],
        ['Attributed ad fee', buyerTotal.mul(percent(input.promoted))],
      ];
    }
    const feeTotal = lines.reduce((sum, [, fee]) => sum.plus(fee), decimal(0));
    const payout = revenue.minus(feeTotal);
    return { revenue, buyerTax, buyerTotal, lines, feeTotal, payout, profit: payout.minus(costs) };
  };

  // Each fee band has a positive profit slope. Solve inside both eBay order-fee
  // intervals because switching from $0.30 to $0.40 can temporarily reduce profit.
  function priceFor(target) {
    const priceAt = minor => decimal(minor).div(100);
    let minimumHighFee = 0;
    if (!etsy && !digital) {
      let lo = 0;
      let hi = 1001;
      while (lo < hi) {
        const mid = Math.floor((lo + hi) / 2);
        if (quote(priceAt(mid)).buyerTotal.gt(10)) hi = mid;
        else lo = mid + 1;
      }
      minimumHighFee = lo;
    }
    function solve(low, high, orderFee) {
      if (low > high || quote(priceAt(high), orderFee).profit.lt(target)) return null;
      while (low < high) {
        const mid = Math.floor((low + high) / 2);
        if (quote(priceAt(mid), orderFee).profit.gte(target)) high = mid;
        else low = mid + 1;
      }
      return low / 100;
    }
    return etsy || digital ? solve(0, 1000000000)
      : solve(0, minimumHighFee - 1, '0.30') ?? solve(minimumHighFee, 1000000000, '0.40');
  }

  const result = quote(decimal(input.price));
  return {
    lines: result.lines.map(([label, amount]) => [label, cents(amount)]),
    revenue: cents(result.revenue),
    tax: cents(result.buyerTax),
    feeBase: cents(result.buyerTotal),
    fees: cents(result.feeTotal),
    payout: cents(result.payout),
    costs: cents(costs),
    profit: cents(result.profit),
    margin: result.revenue.gt(0) ? result.profit.div(result.revenue).mul(100).toDecimalPlaces(2).toNumber() : null,
    breakEven: priceFor(0),
    targetPrice: priceFor(input.goal),
    adsImpact: cents(result.lines[3][1]),
  };
}
