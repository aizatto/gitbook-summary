const REGEX = /(\s*)\*\s+\[([^]+)]\(([^)]+)\)/;
const GITHUB_PREFIX = "https://github.com/aizatto/gitbook-public/blob/master/";
const GITBOOK_PREFIX = "https://www.aizatto.com/";

export function detect(line: string) {
  return line.match(REGEX);
}

function printRow(row: string[]): string {
  return `| ${row.join(` | `)} |`;
}

function printDivider(columns: number) {
  const output = new Array(columns).fill(":---", 0, columns);
  return printRow(output);
}

function renderTable(rows: any[]) {
  const headers = ["Name", "GitHub", "GitBook", "Page"];

  const lines = [];

  lines.push(printRow(headers));

  lines.push(printDivider(headers.length));

  rows.forEach(row => {
    lines.push(printRow(row));
  });

  return lines.join("\n");
}

export function convert(input: string): string {
  let page = 0;
  let output = "";
  let pos = 0;
  let endPos = 0;
  const { length } = input;

  let currentDepth = 0;
  let depthCounters = new Map();

  let rows = [];

  while (pos < length) {
    pos = endPos;
    endPos = input.indexOf("\n", pos);
    endPos = endPos !== -1 ? endPos + 1 : length;
    const line = input.slice(pos, endPos);

    const match = line.match(REGEX);
    if (match === null) {
      if (rows.length) {
        output += `${renderTable(rows)}\n`;
        currentDepth = 0;
        depthCounters = new Map();
        rows = [];
      }
      output += line;
      continue;
    }

    const [, spaces, name, link] = match;

    const depth = spaces.length / 2;

    if (depth > currentDepth) {
      depthCounters.set(depth, 0);
    }

    if (depth !== currentDepth) {
      currentDepth = depth;
    }

    if (!depthCounters.has(depth)) {
      depthCounters.set(depth, 0);
    }

    const counter = depthCounters.get(depth) + 1;
    depthCounters.set(depth, counter);

    const list = [];
    for (let i = depth; i >= 0; i--) {
      const depthCurrentValue = depthCounters.get(i);
      list.push(depthCurrentValue);
    }

    page += 1;

    rows.push([
      `\`${list.reverse().join(".")}\` ${name}`,
      `[GitHub](${GITHUB_PREFIX + link})`,
      `[GitBook](${GITBOOK_PREFIX + link})`,
      `\`${page}\``
    ]);
  }

  return output;
}
