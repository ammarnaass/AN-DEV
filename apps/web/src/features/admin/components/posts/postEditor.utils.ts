export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function calculateReadingTime(text: string): number {
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  const minutes = Math.ceil(words / 200);
  return Math.max(1, minutes);
}

export function appendMarkdownSyntax(
  currentText: string,
  syntax: string,
  prefix = "",
  suffix = ""
): string {
  return `${currentText}\n${prefix}${syntax}${suffix}\n`;
}
