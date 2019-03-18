const REGEX = /(\s*)\*\s+\[([^]+)]\(([^)]+)\)/;
const GITHUB_PREFIX = "https://github.com/aizatto/gitbook-public/blob/master/";
const GITBOOK_PREFIX = "https://www.aizatto.com/";

export function detect(line: string) {
  return line.match(REGEX);
}

function printDivider(columnLengths: Map<number, number>) {
  const output = Array.from(columnLengths.values()).map(targetLength => {
    return "-".repeat(targetLength);
  });

  return `|-${output.join(`-|-`)}-|`;
}

function printRow(row: string[], columnLengths: Map<number, number>): string {
  const output = [];

  row.forEach((column, index) => {
    const targetLength = columnLengths.get(index);
    output.push(column.padEnd(targetLength, " "));
  });

  return `| ${output.join(` | `)} |`;
}

function renderTable(rows: any[]) {
  const columnLengths = new Map();

  const headers = [
    'Name',
    'GitHub',
    'GitBook',
    'Page',
  ];

  rows.forEach(row => {
    row.forEach((column, index) => {
      const currentColumnLength = columnLengths.get(index) || 0;
      const length = Math.max(column.length, currentColumnLength);
      columnLengths.set(index, length);
    });
  });

  const lines = [];

  lines.push(printRow(headers, columnLengths));

  lines.push(printDivider(columnLengths));

  rows.forEach(row => {
    lines.push(printRow(row, columnLengths));
  });

  return lines.join("\n");
}

export function convert(input: string): string {
  let page = 0;
  let output = "";
  let pos = 0;
  let endPos = 0;
  const {length} = input;

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
        output += `${renderTable(rows)  }\n`;
        currentDepth = 0;
        depthCounters = new Map();
        rows = [];
      }
      output += line;
      continue;
    }

    const [
      ,
      spaces,
      name,
      link
    ] = match;

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
      `\`${  list.reverse().join('.')  }\` ${  name}`,
      `[GitHub](${GITHUB_PREFIX + link})`,
      `[GitBook](${GITBOOK_PREFIX + link})`,
      `\`${  page  }\``,
    ]);
  }

  return output;
}
