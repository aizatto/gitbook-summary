// https://developer.github.com/v3/repos/contents/#get-contents

import fetch from "node-fetch";
import * as atob from "atob";
import * as btoa from "btoa";
import { SSM } from "aws-sdk";
import { convert } from "./create";

let GITHUB_ACCESS_TOKEN = null;

interface GitHubPath {
  owner: string;
  repo: string;
  path: string;
}

async function getGitHubAccessToken(): Promise<string> {
  const response = await new SSM({
    region: "ap-southeast-1"
  })
    .getParameter({
      Name: "GITHUB_ACCESS_TOKEN"
    })
    .promise();

  const accessToken = response.Parameter.Value;
  return accessToken;
}

function getApiGitHubURL(githubPath: GitHubPath): string {
  const { owner, repo, path } = githubPath;
  const url = `https://api.github.com/repos/${owner}/${repo}/contents/${path}`;
  return url;
}

function getRawGitHubURL(githubPath: GitHubPath): string {
  const { owner, repo, path } = githubPath;
  const url = `https://raw.githubusercontent.com/${owner}/${repo}/master/${path}`;
  return url;
}

async function fetchFromGitHub(url: string, opts = {}): Promise<string | null> {
  const response = await fetch(url, {
    ...opts,
    headers: {
      Authorization: `token ${GITHUB_ACCESS_TOKEN}`
    }
  });

  if (!response.ok) {
    return null;
  }

  return response.text();
}

function replace(summary, toc) {
  const summaryAfter = convert(summary);

  if (summaryAfter === toc) {
    return summaryAfter;
  }

  const pos = toc.indexOf("## Table of contents");
  if (pos === -1) {
    return summaryAfter;
  }

  return `${toc.slice(0, pos)}#${summaryAfter}`;
}

async function updateTOC(event): Promise<string> {
  if (event.headers["X-GitHub-Event"] !== "push") {
    throw new Error("Not GitHub push event");
  }

  const body = JSON.parse(event.body);
  const owner = body.repository.owner.name;
  const repo = body.repository.name;

  const modified = body.commits.some(commit =>
    commit.modified.includes("SUMMARY.md")
  );

  if (!modified) {
    throw new Error("SUMMARY.md is not modified");
  }

  return update({ owner, repo});
}

export async function update(
  {owner, repo}: { owner: string, repo: string}
): Promise<string> {
  // TODO what is the best way to cache/memoize this
  GITHUB_ACCESS_TOKEN = await getGitHubAccessToken();

  const [summaryContent, tocResponse] = await Promise.all([
    fetchFromGitHub(getRawGitHubURL({ owner, repo, path: "SUMMARY.md" })),
    fetchFromGitHub(
      getApiGitHubURL({ owner, repo, path: "table-of-contents.md" })
    )
  ]);

  if (!summaryContent) {
    throw new Error("Cannot download SUMMARY.md");
  }

  const { sha: tocSHA, content: tocBase64Content } = JSON.parse(tocResponse);

  const tocContent = atob(tocBase64Content);

  const updatedTocContent = replace(summaryContent, tocContent);
  if (updatedTocContent === tocContent) {
    throw new Error("No changes in TOC");
  }

  if (process.env.NODE_ENV === "test") {
    throw new Error("Test Environment");
  }

  const url = getApiGitHubURL({ owner, repo, path: "table-of-contents.md" });

  const response = await fetchFromGitHub(url, {
    method: "put",
    "Content-Type": "application/json",
    body: JSON.stringify({
      message: "docs: table-of-contents.md",
      content: btoa(updatedTocContent),
      sha: tocSHA
    })
  });

  return response;
}

export async function webhook(event) {
  try {
    const result = await updateTOC(event);
    return {
      statusCode: 200,
      body: JSON.stringify(result)
    };
  } catch (error) {
    if (process.env.NODE_ENV === "test") {
      throw error;
    }

    console.error(error);
    return {
      statusCode: 200,
      body: error.message
    };
  }
}
