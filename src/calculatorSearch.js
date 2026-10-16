// Hyphens and spaces should not hide an existing calculator from a search.
export function matchesCalculatorSearch(tool, query) {
  const normalize = value => String(value).toLowerCase().replace(/[^\p{L}\p{N}]+/gu, '');
  return normalize(`${tool.name} ${tool.category} ${tool.intro}`).includes(normalize(query));
}
