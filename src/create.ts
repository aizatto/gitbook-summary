const REGEX = /(\s*)\*\s+\[([^]+)]\(([^)]+)\)/;
const GITHUB_PREFIX = "https://github.com/aizatto/gitbook-public/blob/master/";
const AIZATTO_DOT_COM_PREFIX = "https://www.aizatto.com/";
const GITBOOK_PREFIX = "https://app.gitbook.com/@aizatto/s/public/";

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
  const headers = ["Name", "aizatto.com", "GitHub", "GitBook", "Page"];

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

    const [, spaces, name, filename] = match;

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
    for (let i = depth; i >= 0; i -= 1) {
      const depthCurrentValue = depthCounters.get(i);
      list.push(depthCurrentValue);
    }

    page += 1;

    let gitbookPath = filename;
    if (gitbookPath.substr(-9) === "README.md") {
      gitbookPath = gitbookPath.substr(0, gitbookPath.length - 9);
    } else {
      // trim out file extension
      gitbookPath = gitbookPath.substr(0, gitbookPath.length - 3);
    }

    rows.push([
      `\`${list.reverse().join(".")}\` ${name}`,
      `[aizatto.com](${AIZATTO_DOT_COM_PREFIX + gitbookPath})`,
      `[GitHub](${GITHUB_PREFIX + filename})`,
      `[GitBook](${GITBOOK_PREFIX + gitbookPath})`,
      `\`${page}\``
    ]);
  }

  return output;
}
