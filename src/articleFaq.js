// Keep schema and rendered FAQs on the same content boundary.
const text = html => String(html)
  .replace(/<[^>]*>/g, " ")
  .replace(/&#(x[0-9a-f]+|[0-9]+);/gi, (_, code) => String.fromCodePoint(code[0].toLowerCase() === "x" ? parseInt(code.slice(1), 16) : Number(code)))
  .replace(/&(amp|lt|gt|quot|apos|nbsp);/g, (_, entity) => ({ amp: "&", lt: "<", gt: ">", quot: '"', apos: "'", nbsp: " " })[entity])
  .replace(/\s+/g, " ").trim();

export function articleFaq(article) {
  const html = article.html || "";
  const headings = [...html.matchAll(/<h2\b[^>]*>([\s\S]*?)<\/h2>/gi)];
  const heading = headings.find(item => /^(FAQs?|Frequently asked questions)(?:\b|:)/i.test(text(item[1])));
  if (!heading) return { inline: false, items: article.faq || [] };
  const start = heading.index + heading[0].length;
  const next = headings.find(item => item.index > heading.index);
  const section = html.slice(start, next?.index ?? html.length);
  const questions = [...section.matchAll(/<h3\b[^>]*>([\s\S]*?)<\/h3>/gi)];
  const items = questions.map((question, index) => ({
    q: text(question[1]),
    a: text(section.slice(question.index + question[0].length, questions[index + 1]?.index ?? section.length)),
  })).filter(item => item.q && item.a);
  return items.length ? { inline: true, items } : { inline: false, items: article.faq || [] };
}
