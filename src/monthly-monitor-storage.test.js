import { describe, expect, it } from "vitest";
import { deleteMonthlyRecord, monthlyMonitorKey, readMonthlyRecords, upsertMonthlyRecord } from "./monthlyMonitorStorage";

const fakeStorage = () => {
  const values = new Map();
  return { getItem: key => values.get(key) || null, setItem: (key, value) => values.set(key, value) };
};
const row = (month, revenue) => ({ actual: { month, revenue }, plan: { targetRevenue: 100 } });

describe("private monthly monitor storage", () => {
  it("separates accounts, industries and currencies and updates one month without duplication", () => {
    const storage = fakeStorage();
    const key = monthlyMonitorKey("user-a", "cleaning", "USD");
    let records = upsertMonthlyRecord(storage, key, [], row("2026-08", 100));
    records = upsertMonthlyRecord(storage, key, records, row("2026-09", 120));
    records = upsertMonthlyRecord(storage, key, records, row("2026-08", 150));
    expect(readMonthlyRecords(storage, key).map(x => x.actual.revenue)).toEqual([120, 150]);
    expect(readMonthlyRecords(storage, monthlyMonitorKey("user-b", "cleaning", "USD"))).toEqual([]);
    expect(readMonthlyRecords(storage, monthlyMonitorKey("user-a", "salon", "USD"))).toEqual([]);
    expect(readMonthlyRecords(storage, monthlyMonitorKey("user-a", "cleaning", "GBP"))).toEqual([]);
    deleteMonthlyRecord(storage, key, records, "2026-08");
    expect(readMonthlyRecords(storage, key)).toHaveLength(1);
  });

  it("enforces the 24-month cap and leaves storage unchanged on failed writes", () => {
    const storage = fakeStorage();
    const key = monthlyMonitorKey("user-a", "cleaning", "USD");
    const records = Array.from({ length: 24 }, (_, i) => row(`${2024 + Math.floor(i / 12)}-${String(i % 12 + 1).padStart(2, "0")}`, 100));
    expect(() => upsertMonthlyRecord(storage, key, records, row("2026-01", 100))).toThrow("MONTH_LIMIT_REACHED");
    expect(() => upsertMonthlyRecord(storage, key, [], row("2026-13", 100))).toThrow("INVALID_MONTH");
    expect(readMonthlyRecords(storage, key)).toEqual([]);
  });
});
