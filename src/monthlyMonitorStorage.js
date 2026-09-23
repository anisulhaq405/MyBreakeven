const validMonth = value => /^\d{4}-(0[1-9]|1[0-2])$/.test(value || "");

export const monthlyMonitorKey = (userId, industryKey, currency) =>
  `mybreakeven:monthly-monitor:v1:${userId}:${industryKey}:${currency}`;

export function readMonthlyRecords(storage, key) {
  const parsed = JSON.parse(storage.getItem(key) || "[]");
  return Array.isArray(parsed)
    ? parsed.filter(row => row?.actual && row?.plan && validMonth(row.actual.month)).slice(0, 24)
    : [];
}

export function upsertMonthlyRecord(storage, key, records, record) {
  if (!validMonth(record?.actual?.month)) throw new Error("INVALID_MONTH");
  if (!records.some(row => row.actual.month === record.actual.month) && records.length >= 24) throw new Error("MONTH_LIMIT_REACHED");
  const next = [...records.filter(row => row.actual.month !== record.actual.month), record]
    .sort((a, b) => b.actual.month.localeCompare(a.actual.month));
  storage.setItem(key, JSON.stringify(next));
  return next;
}

export function deleteMonthlyRecord(storage, key, records, month) {
  const next = records.filter(row => row.actual.month !== month);
  storage.setItem(key, JSON.stringify(next));
  return next;
}
