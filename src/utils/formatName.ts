const TITLES = ["Mr.", "Mrs.", "Ms.", "Dr."];
const SUFFIXES = ["Jr.", "Sr.", "II", "III", "IV", "V", "Esq.", "PhD", "MD"];

interface ParsedName {
  title: string;
  first: string;
  last: string;
  suffix: string;
}

function parseName(name: string): ParsedName {
  let fullName = name.trim();

  let title = "";
  for (const t of TITLES) {
    if (fullName.startsWith(t + " ")) {
      title = t;
      fullName = fullName.slice(t.length + 1).trim();
      break;
    }
  }

  let suffix = "";
  for (const s of SUFFIXES) {
    if (fullName.endsWith(" " + s)) {
      suffix = s;
      fullName = fullName.slice(0, fullName.length - s.length - 1).trim();
      break;
    }
  }

  const parts = fullName.split(" ");
  const last = parts[parts.length - 1];
  const first = parts.slice(0, -1).join(" ");

  return { title, first, last, suffix };
}

export function formatName(name: string): string {
  const { title, first, last, suffix } = parseName(name);
  let label = last;
  if (suffix) label += " " + suffix;
  label += ",";
  if (first) label += " " + first;
  if (title) label += " (" + title + ")";
  return label;
}