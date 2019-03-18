/* eslint-env jest/globals */

import { webhook } from './handler';

const bodyJSON = `{
  "ref": "refs/heads/master",
  "before": "fea9aff6628301f1e31765626bc919e0879c78cf",
  "after": "9bc2d90c57de6e24791774030dcdfcc54676665b",
  "created": false,
  "deleted": false,
  "forced": false,
  "base_ref": null,
  "compare": "https://github.com/aizatto/gitbook-public/compare/fea9aff66283...9bc2d90c57de",
  "commits": [
    {
      "id": "9bc2d90c57de6e24791774030dcdfcc54676665b",
      "tree_id": "b63758c252c0071fe638ed9661d99741af21dd4a",
      "distinct": true,
      "message": "GitBook: [master] 3 pages modified",
      "timestamp": "2019-03-17T16:09:07Z",
      "url": "https://github.com/aizatto/gitbook-public/commit/9bc2d90c57de6e24791774030dcdfcc54676665b",
      "author": {
        "name": "Aizat Faiz",
        "email": "aizat.faiz@gmail.com",
        "username": "aizatto"
      },
      "committer": {
        "name": "gitbook-bot",
        "email": "ghost@gitbook.com",
        "username": "gitbook-bot"
      },
      "added": [
        "notes/archive/balance/growth-vs-contentment.md"
      ],
      "removed": [

      ],
      "modified": [
        "SUMMARY.md",
        "notes/archive/balance/README.md"
      ]
    }
  ],
  "head_commit": {
    "id": "9bc2d90c57de6e24791774030dcdfcc54676665b",
    "tree_id": "b63758c252c0071fe638ed9661d99741af21dd4a",
    "distinct": true,
    "message": "GitBook: [master] 3 pages modified",
    "timestamp": "2019-03-17T16:09:07Z",
    "url": "https://github.com/aizatto/gitbook-public/commit/9bc2d90c57de6e24791774030dcdfcc54676665b",
    "author": {
      "name": "Aizat Faiz",
      "email": "aizat.faiz@gmail.com",
      "username": "aizatto"
    },
    "committer": {
      "name": "gitbook-bot",
      "email": "ghost@gitbook.com",
      "username": "gitbook-bot"
    },
    "added": [
      "notes/archive/balance/growth-vs-contentment.md"
    ],
    "removed": [

    ],
    "modified": [
      "SUMMARY.md",
      "notes/archive/balance/README.md"
    ]
  },
  "repository": {
    "id": 168064909,
    "node_id": "MDEwOlJlcG9zaXRvcnkxNjgwNjQ5MDk=",
    "name": "gitbook-public",
    "full_name": "aizatto/gitbook-public",
    "private": false,
    "owner": {
      "name": "aizatto",
      "email": "aizat.faiz@gmail.com",
      "login": "aizatto",
      "id": 1182,
      "node_id": "MDQ6VXNlcjExODI=",
      "avatar_url": "https://avatars2.githubusercontent.com/u/1182?v=4",
      "gravatar_id": "",
      "url": "https://api.github.com/users/aizatto",
      "html_url": "https://github.com/aizatto",
      "followers_url": "https://api.github.com/users/aizatto/followers",
      "following_url": "https://api.github.com/users/aizatto/following{/other_user}",
      "gists_url": "https://api.github.com/users/aizatto/gists{/gist_id}",
      "starred_url": "https://api.github.com/users/aizatto/starred{/owner}{/repo}",
      "subscriptions_url": "https://api.github.com/users/aizatto/subscriptions",
      "organizations_url": "https://api.github.com/users/aizatto/orgs",
      "repos_url": "https://api.github.com/users/aizatto/repos",
      "events_url": "https://api.github.com/users/aizatto/events{/privacy}",
      "received_events_url": "https://api.github.com/users/aizatto/received_events",
      "type": "User",
      "site_admin": false
    },
    "html_url": "https://github.com/aizatto/gitbook-public",
    "description": "My public notes",
    "fork": false,
    "url": "https://github.com/aizatto/gitbook-public",
    "forks_url": "https://api.github.com/repos/aizatto/gitbook-public/forks",
    "keys_url": "https://api.github.com/repos/aizatto/gitbook-public/keys{/key_id}",
    "collaborators_url": "https://api.github.com/repos/aizatto/gitbook-public/collaborators{/collaborator}",
    "teams_url": "https://api.github.com/repos/aizatto/gitbook-public/teams",
    "hooks_url": "https://api.github.com/repos/aizatto/gitbook-public/hooks",
    "issue_events_url": "https://api.github.com/repos/aizatto/gitbook-public/issues/events{/number}",
    "events_url": "https://api.github.com/repos/aizatto/gitbook-public/events",
    "assignees_url": "https://api.github.com/repos/aizatto/gitbook-public/assignees{/user}",
    "branches_url": "https://api.github.com/repos/aizatto/gitbook-public/branches{/branch}",
    "tags_url": "https://api.github.com/repos/aizatto/gitbook-public/tags",
    "blobs_url": "https://api.github.com/repos/aizatto/gitbook-public/git/blobs{/sha}",
    "git_tags_url": "https://api.github.com/repos/aizatto/gitbook-public/git/tags{/sha}",
    "git_refs_url": "https://api.github.com/repos/aizatto/gitbook-public/git/refs{/sha}",
    "trees_url": "https://api.github.com/repos/aizatto/gitbook-public/git/trees{/sha}",
    "statuses_url": "https://api.github.com/repos/aizatto/gitbook-public/statuses/{sha}",
    "languages_url": "https://api.github.com/repos/aizatto/gitbook-public/languages",
    "stargazers_url": "https://api.github.com/repos/aizatto/gitbook-public/stargazers",
    "contributors_url": "https://api.github.com/repos/aizatto/gitbook-public/contributors",
    "subscribers_url": "https://api.github.com/repos/aizatto/gitbook-public/subscribers",
    "subscription_url": "https://api.github.com/repos/aizatto/gitbook-public/subscription",
    "commits_url": "https://api.github.com/repos/aizatto/gitbook-public/commits{/sha}",
    "git_commits_url": "https://api.github.com/repos/aizatto/gitbook-public/git/commits{/sha}",
    "comments_url": "https://api.github.com/repos/aizatto/gitbook-public/comments{/number}",
    "issue_comment_url": "https://api.github.com/repos/aizatto/gitbook-public/issues/comments{/number}",
    "contents_url": "https://api.github.com/repos/aizatto/gitbook-public/contents/{+path}",
    "compare_url": "https://api.github.com/repos/aizatto/gitbook-public/compare/{base}...{head}",
    "merges_url": "https://api.github.com/repos/aizatto/gitbook-public/merges",
    "archive_url": "https://api.github.com/repos/aizatto/gitbook-public/{archive_format}{/ref}",
    "downloads_url": "https://api.github.com/repos/aizatto/gitbook-public/downloads",
    "issues_url": "https://api.github.com/repos/aizatto/gitbook-public/issues{/number}",
    "pulls_url": "https://api.github.com/repos/aizatto/gitbook-public/pulls{/number}",
    "milestones_url": "https://api.github.com/repos/aizatto/gitbook-public/milestones{/number}",
    "notifications_url": "https://api.github.com/repos/aizatto/gitbook-public/notifications{?since,all,participating}",
    "labels_url": "https://api.github.com/repos/aizatto/gitbook-public/labels{/name}",
    "releases_url": "https://api.github.com/repos/aizatto/gitbook-public/releases{/id}",
    "deployments_url": "https://api.github.com/repos/aizatto/gitbook-public/deployments",
    "created_at": 1548724058,
    "updated_at": "2019-03-17T14:51:53Z",
    "pushed_at": 1552838953,
    "git_url": "git://github.com/aizatto/gitbook-public.git",
    "ssh_url": "git@github.com:aizatto/gitbook-public.git",
    "clone_url": "https://github.com/aizatto/gitbook-public.git",
    "svn_url": "https://github.com/aizatto/gitbook-public",
    "homepage": "https://www.aizatto.com",
    "size": 376,
    "stargazers_count": 1,
    "watchers_count": 1,
    "language": null,
    "has_issues": false,
    "has_projects": false,
    "has_downloads": true,
    "has_wiki": false,
    "has_pages": false,
    "forks_count": 0,
    "mirror_url": null,
    "archived": false,
    "open_issues_count": 0,
    "license": {
      "key": "other",
      "name": "Other",
      "spdx_id": "NOASSERTION",
      "url": null,
      "node_id": "MDc6TGljZW5zZTA="
    },
    "forks": 0,
    "open_issues": 0,
    "watchers": 1,
    "default_branch": "master",
    "stargazers": 1,
    "master_branch": "master"
  },
  "pusher": {
    "name": "aizatto",
    "email": "aizat.faiz@gmail.com"
  },
  "sender": {
    "login": "aizatto",
    "id": 1182,
    "node_id": "MDQ6VXNlcjExODI=",
    "avatar_url": "https://avatars2.githubusercontent.com/u/1182?v=4",
    "gravatar_id": "",
    "url": "https://api.github.com/users/aizatto",
    "html_url": "https://github.com/aizatto",
    "followers_url": "https://api.github.com/users/aizatto/followers",
    "following_url": "https://api.github.com/users/aizatto/following{/other_user}",
    "gists_url": "https://api.github.com/users/aizatto/gists{/gist_id}",
    "starred_url": "https://api.github.com/users/aizatto/starred{/owner}{/repo}",
    "subscriptions_url": "https://api.github.com/users/aizatto/subscriptions",
    "organizations_url": "https://api.github.com/users/aizatto/orgs",
    "repos_url": "https://api.github.com/users/aizatto/repos",
    "events_url": "https://api.github.com/users/aizatto/events{/privacy}",
    "received_events_url": "https://api.github.com/users/aizatto/received_events",
    "type": "User",
    "site_admin": false
  },
  "installation": {
    "id": 756353,
    "node_id": "MDIzOkludGVncmF0aW9uSW5zdGFsbGF0aW9uNzU2MzUz"
  }
}`;

test('process', async () => {
  const event = {
    headers: {
      'X-GitHub-Event': 'push',
    },
    body: bodyJSON,
  };

  expect.assertions(1);
  try {
    await webhook(event);
  } catch (e) {
    expect(e).toEqual(new Error('Test Environment'));
  }
});
