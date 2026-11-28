import Decimal from 'decimal.js';

export const paypalRates = {
  checkout: {label: 'PayPal Checkout', rate: '3.49', fixed: '0.49'},
  goods: {label: 'Send/Receive Money for Goods and Services', rate: '2.99', fixed: '0'},
  qr: {label: 'PayPal QR code transaction', rate: '2.29', fixed: '0.09'},
};

function read(value, places = 2) {
  const text = String(value).trim();
  if (!/^(?:\d+(?:\.\d*)?|\.\d+)$/.test(text)) return null;
  const number = new Decimal(text);
  return number.decimalPlaces() <= places && number.lte(1e9) ? number : null;
}

export function paypalEstimate({amount, rate, fixed, reverse}) {
  const a = read(amount), r = read(rate, 4), f = read(fixed);
  if (!a || !r || !f || a.lte(0) || r.gte(100)) return {error: 'Enter a positive amount and a fee rate below 100%. Use up to two decimal places for money.'};
  const fraction = r.div(100);
  const feeAt = gross => gross.times(fraction).plus(f).toDecimalPlaces(2, Decimal.ROUND_HALF_UP);
  let gross = a;
  if (reverse) {
    // Net proceeds are monotone in gross cents when the percentage is below 100%.
    let low = 1;
    let high = a.plus(f).div(new Decimal(1).minus(fraction)).times(100).ceil().toNumber();
    if (!Number.isSafeInteger(high) || high > 1e11) return {error: 'The required charge exceeds the supported USD 1 billion limit.'};
    while (low < high) {
      const mid = Math.floor((low + high) / 2);
      const candidate = new Decimal(mid).div(100);
      if (candidate.minus(feeAt(candidate)).gte(a)) high = mid;
      else low = mid + 1;
    }
    gross = new Decimal(low).div(100);
  }
  const fee = feeAt(gross);
  return {
    gross: gross.toNumber(), fee: fee.toNumber(), net: gross.minus(fee).toNumber(),
    percentageFee: fee.minus(f).toNumber(), fixedFee: f.toNumber(),
    effectiveRate: fee.div(gross).times(100).toNumber(),
  };
}

export function depreciationSchedule({cost, residual, life, method}) {
  const original = read(cost), floor = read(residual), years = read(life, 0);
  if (!original || !floor || !years || floor.gt(original) || years.lt(1) || years.gt(100) ||
      !['straight-line', 'double-declining'].includes(method)) {
    return {error: 'Enter cost and residual value to the cent, with residual no higher than cost, and a whole useful life of 1 to 100 years.'};
  }
  const depreciable = original.minus(floor);
  const rows = [];
  let opening = original;
  for (let year = 1; year <= years.toNumber(); year++) {
    const remaining = opening.minus(floor);
    const base = method === 'straight-line' ? depreciable.div(years) : opening.times(2).div(years);
    const expense = year === years.toNumber() ? remaining : Decimal.min(remaining, base.toDecimalPlaces(2, Decimal.ROUND_HALF_UP));
    const closing = opening.minus(expense);
    rows.push({year, opening: opening.toNumber(), expense: expense.toNumber(), accumulated: original.minus(closing).toNumber(), closing: closing.toNumber()});
    opening = closing;
  }
  return {rows, total: depreciable.toNumber(), closing: opening.toNumber()};
}
