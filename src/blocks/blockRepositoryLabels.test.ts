/* spellchecker:disable */
import { testBlock } from 'bingo-stratum-testers';
import { githubDefaultLabels } from 'github-default-labels';
import { describe, expect, test } from 'vitest';

import { blockRepositoryLabels } from './blockRepositoryLabels.ts';
import { optionsBase } from './options.fakes.ts';
import { repositoryLabels } from './repositoryLabels.ts';

describe('blockRepositoryLabels', () => {
  test('when options.existingLabels is undefined', () => {
    const creation = testBlock(blockRepositoryLabels, {
      options: { ...optionsBase, existingLabels: undefined },
    });

    expect(creation).toMatchInlineSnapshot(`
{
  "requests": [
    {
      "endpoint": "POST /repos/{owner}/{repo}/labels",
      "id": "post label 'area: documentation'",
      "parameters": {
        "color": "0075ca",
        "description": "Improvements or additions to docs 📝",
        "name": "area: documentation",
        "owner": "test-owner",
        "repo": "test-repository",
      },
      "type": "octokit",
    },
    {
      "endpoint": "POST /repos/{owner}/{repo}/labels",
      "id": "post label 'area: testing'",
      "parameters": {
        "color": "1177aa",
        "description": "Improving how the repository's tests are run and/or code is tested 🧪",
        "name": "area: testing",
        "owner": "test-owner",
        "repo": "test-repository",
      },
      "type": "octokit",
    },
    {
      "endpoint": "POST /repos/{owner}/{repo}/labels",
      "id": "post label 'area: tooling'",
      "parameters": {
        "color": "f9d0c4",
        "description": "Managing the repository's maintenance 🛠️",
        "name": "area: tooling",
        "owner": "test-owner",
        "repo": "test-repository",
      },
      "type": "octokit",
    },
    {
      "endpoint": "POST /repos/{owner}/{repo}/labels",
      "id": "post label 'BREAKING CHANGE'",
      "parameters": {
        "color": "af0ddb",
        "description": "Used to label changes that are considered breaking.",
        "name": "BREAKING CHANGE",
        "owner": "test-owner",
        "repo": "test-repository",
      },
      "type": "octokit",
    },
    {
      "endpoint": "POST /repos/{owner}/{repo}/labels",
      "id": "post label 'dependencies'",
      "parameters": {
        "color": "0366d6",
        "description": "Pull requests that update a dependency file",
        "name": "dependencies",
        "owner": "test-owner",
        "repo": "test-repository",
      },
      "type": "octokit",
    },
    {
      "endpoint": "POST /repos/{owner}/{repo}/labels",
      "id": "post label 'good first issue'",
      "parameters": {
        "color": "5319E7",
        "description": "Good for newcomers, please hop on! 🙌",
        "name": "good first issue",
        "owner": "test-owner",
        "repo": "test-repository",
      },
      "type": "octokit",
    },
    {
      "endpoint": "POST /repos/{owner}/{repo}/labels",
      "id": "post label 'status: accepting prs'",
      "parameters": {
        "color": "0E8A16",
        "description": "Please, send a pull request to resolve this! 🙏",
        "name": "status: accepting prs",
        "owner": "test-owner",
        "repo": "test-repository",
      },
      "type": "octokit",
    },
    {
      "endpoint": "POST /repos/{owner}/{repo}/labels",
      "id": "post label 'status: blocked'",
      "parameters": {
        "color": "ddcccc",
        "description": "Waiting for something else to be resolved 🙅",
        "name": "status: blocked",
        "owner": "test-owner",
        "repo": "test-repository",
      },
      "type": "octokit",
    },
    {
      "endpoint": "POST /repos/{owner}/{repo}/labels",
      "id": "post label 'status: in discussion'",
      "parameters": {
        "color": "05104F",
        "description": "Not yet ready for implementation or a pull request",
        "name": "status: in discussion",
        "owner": "test-owner",
        "repo": "test-repository",
      },
      "type": "octokit",
    },
    {
      "endpoint": "POST /repos/{owner}/{repo}/labels",
      "id": "post label 'status: needs investigation'",
      "parameters": {
        "color": "D3F82D",
        "description": "Further research required 🔎",
        "name": "status: needs investigation",
        "owner": "test-owner",
        "repo": "test-repository",
      },
      "type": "octokit",
    },
    {
      "endpoint": "POST /repos/{owner}/{repo}/labels",
      "id": "post label 'status: needs reproduction'",
      "parameters": {
        "color": "635c0c",
        "description": "We've been unable to reproduce the issue and need the issue author to provide one.",
        "name": "status: needs reproduction",
        "owner": "test-owner",
        "repo": "test-repository",
      },
      "type": "octokit",
    },
    {
      "endpoint": "POST /repos/{owner}/{repo}/labels",
      "id": "post label 'status: not enough info'",
      "parameters": {
        "color": "fe4efc",
        "description": "Needs for information before it's actionable.",
        "name": "status: not enough info",
        "owner": "test-owner",
        "repo": "test-repository",
      },
      "type": "octokit",
    },
    {
      "endpoint": "POST /repos/{owner}/{repo}/labels",
      "id": "post label 'status: stale'",
      "parameters": {
        "color": "bfd4f2",
        "description": "Detected as stale and will be automatically closed, if not updated. ⏱️",
        "name": "status: stale",
        "owner": "test-owner",
        "repo": "test-repository",
      },
      "type": "octokit",
    },
    {
      "endpoint": "POST /repos/{owner}/{repo}/labels",
      "id": "post label 'status: tracking'",
      "parameters": {
        "color": "182012",
        "description": "This is just a tracking issue and not something directly actionable.",
        "name": "status: tracking",
        "owner": "test-owner",
        "repo": "test-repository",
      },
      "type": "octokit",
    },
    {
      "endpoint": "POST /repos/{owner}/{repo}/labels",
      "id": "post label 'status: upstream issue'",
      "parameters": {
        "color": "735a11",
        "description": "This is the result of an upstream issue and not immediately actionable until that issue is resolved.",
        "name": "status: upstream issue",
        "owner": "test-owner",
        "repo": "test-repository",
      },
      "type": "octokit",
    },
    {
      "endpoint": "POST /repos/{owner}/{repo}/labels",
      "id": "post label 'status: waiting for author'",
      "parameters": {
        "color": "E4BC82",
        "description": "Needs an action taken by the original poster",
        "name": "status: waiting for author",
        "owner": "test-owner",
        "repo": "test-repository",
      },
      "type": "octokit",
    },
    {
      "endpoint": "POST /repos/{owner}/{repo}/labels",
      "id": "post label 'type: admin'",
      "parameters": {
        "color": "985ef1",
        "description": "Administrative issues. Not (usually) directly actionable. 💼",
        "name": "type: admin",
        "owner": "test-owner",
        "repo": "test-repository",
      },
      "type": "octokit",
    },
    {
      "endpoint": "POST /repos/{owner}/{repo}/labels",
      "id": "post label 'type: bug'",
      "parameters": {
        "color": "d73a4a",
        "description": "Something isn't working 🐛",
        "name": "type: bug",
        "owner": "test-owner",
        "repo": "test-repository",
      },
      "type": "octokit",
    },
    {
      "endpoint": "POST /repos/{owner}/{repo}/labels",
      "id": "post label 'type: cleanup'",
      "parameters": {
        "color": "fde282",
        "description": "Tech debt or other code/repository cleanups 🧹",
        "name": "type: cleanup",
        "owner": "test-owner",
        "repo": "test-repository",
      },
      "type": "octokit",
    },
    {
      "endpoint": "POST /repos/{owner}/{repo}/labels",
      "id": "post label 'type: feature'",
      "parameters": {
        "color": "a2eeef",
        "description": "New enhancement or request 🚀",
        "name": "type: feature",
        "owner": "test-owner",
        "repo": "test-repository",
      },
      "type": "octokit",
    },
    {
      "endpoint": "POST /repos/{owner}/{repo}/labels",
      "id": "post label 'type: question'",
      "parameters": {
        "color": "d876e3",
        "description": "Just asking a question ❓",
        "name": "type: question",
        "owner": "test-owner",
        "repo": "test-repository",
      },
      "type": "octokit",
    },
    {
      "endpoint": "POST /repos/{owner}/{repo}/labels",
      "id": "post label 'type: rfc'",
      "parameters": {
        "color": "fde282",
        "description": "Invite feedback on a significant change to the project.",
        "name": "type: rfc",
        "owner": "test-owner",
        "repo": "test-repository",
      },
      "type": "octokit",
    },
  ],
}
`);
  });

  test('when options.existingLabels contains default entries', () => {
    const creation = testBlock(blockRepositoryLabels, {
      options: { ...optionsBase, existingLabels: githubDefaultLabels },
    });

    expect(creation).toMatchInlineSnapshot(`
{
  "requests": [
    {
      "endpoint": "PATCH /repos/{owner}/{repo}/labels/{name}",
      "id": "patch label 'documentation'",
      "parameters": {
        "color": "0075ca",
        "description": "Improvements or additions to docs 📝",
        "name": "documentation",
        "new_name": "area: documentation",
        "owner": "test-owner",
        "repo": "test-repository",
      },
      "type": "octokit",
    },
    {
      "endpoint": "POST /repos/{owner}/{repo}/labels",
      "id": "post label 'area: testing'",
      "parameters": {
        "color": "1177aa",
        "description": "Improving how the repository's tests are run and/or code is tested 🧪",
        "name": "area: testing",
        "owner": "test-owner",
        "repo": "test-repository",
      },
      "type": "octokit",
    },
    {
      "endpoint": "POST /repos/{owner}/{repo}/labels",
      "id": "post label 'area: tooling'",
      "parameters": {
        "color": "f9d0c4",
        "description": "Managing the repository's maintenance 🛠️",
        "name": "area: tooling",
        "owner": "test-owner",
        "repo": "test-repository",
      },
      "type": "octokit",
    },
    {
      "endpoint": "POST /repos/{owner}/{repo}/labels",
      "id": "post label 'BREAKING CHANGE'",
      "parameters": {
        "color": "af0ddb",
        "description": "Used to label changes that are considered breaking.",
        "name": "BREAKING CHANGE",
        "owner": "test-owner",
        "repo": "test-repository",
      },
      "type": "octokit",
    },
    {
      "endpoint": "POST /repos/{owner}/{repo}/labels",
      "id": "post label 'dependencies'",
      "parameters": {
        "color": "0366d6",
        "description": "Pull requests that update a dependency file",
        "name": "dependencies",
        "owner": "test-owner",
        "repo": "test-repository",
      },
      "type": "octokit",
    },
    {
      "endpoint": "PATCH /repos/{owner}/{repo}/labels/{name}",
      "id": "patch label 'good first issue'",
      "parameters": {
        "color": "5319E7",
        "description": "Good for newcomers, please hop on! 🙌",
        "name": "good first issue",
        "new_name": "good first issue",
        "owner": "test-owner",
        "repo": "test-repository",
      },
      "type": "octokit",
    },
    {
      "endpoint": "PATCH /repos/{owner}/{repo}/labels/{name}",
      "id": "patch label 'help wanted'",
      "parameters": {
        "color": "0E8A16",
        "description": "Please, send a pull request to resolve this! 🙏",
        "name": "help wanted",
        "new_name": "status: accepting prs",
        "owner": "test-owner",
        "repo": "test-repository",
      },
      "type": "octokit",
    },
    {
      "endpoint": "POST /repos/{owner}/{repo}/labels",
      "id": "post label 'status: blocked'",
      "parameters": {
        "color": "ddcccc",
        "description": "Waiting for something else to be resolved 🙅",
        "name": "status: blocked",
        "owner": "test-owner",
        "repo": "test-repository",
      },
      "type": "octokit",
    },
    {
      "endpoint": "POST /repos/{owner}/{repo}/labels",
      "id": "post label 'status: in discussion'",
      "parameters": {
        "color": "05104F",
        "description": "Not yet ready for implementation or a pull request",
        "name": "status: in discussion",
        "owner": "test-owner",
        "repo": "test-repository",
      },
      "type": "octokit",
    },
    {
      "endpoint": "POST /repos/{owner}/{repo}/labels",
      "id": "post label 'status: needs investigation'",
      "parameters": {
        "color": "D3F82D",
        "description": "Further research required 🔎",
        "name": "status: needs investigation",
        "owner": "test-owner",
        "repo": "test-repository",
      },
      "type": "octokit",
    },
    {
      "endpoint": "POST /repos/{owner}/{repo}/labels",
      "id": "post label 'status: needs reproduction'",
      "parameters": {
        "color": "635c0c",
        "description": "We've been unable to reproduce the issue and need the issue author to provide one.",
        "name": "status: needs reproduction",
        "owner": "test-owner",
        "repo": "test-repository",
      },
      "type": "octokit",
    },
    {
      "endpoint": "POST /repos/{owner}/{repo}/labels",
      "id": "post label 'status: not enough info'",
      "parameters": {
        "color": "fe4efc",
        "description": "Needs for information before it's actionable.",
        "name": "status: not enough info",
        "owner": "test-owner",
        "repo": "test-repository",
      },
      "type": "octokit",
    },
    {
      "endpoint": "POST /repos/{owner}/{repo}/labels",
      "id": "post label 'status: stale'",
      "parameters": {
        "color": "bfd4f2",
        "description": "Detected as stale and will be automatically closed, if not updated. ⏱️",
        "name": "status: stale",
        "owner": "test-owner",
        "repo": "test-repository",
      },
      "type": "octokit",
    },
    {
      "endpoint": "POST /repos/{owner}/{repo}/labels",
      "id": "post label 'status: tracking'",
      "parameters": {
        "color": "182012",
        "description": "This is just a tracking issue and not something directly actionable.",
        "name": "status: tracking",
        "owner": "test-owner",
        "repo": "test-repository",
      },
      "type": "octokit",
    },
    {
      "endpoint": "POST /repos/{owner}/{repo}/labels",
      "id": "post label 'status: upstream issue'",
      "parameters": {
        "color": "735a11",
        "description": "This is the result of an upstream issue and not immediately actionable until that issue is resolved.",
        "name": "status: upstream issue",
        "owner": "test-owner",
        "repo": "test-repository",
      },
      "type": "octokit",
    },
    {
      "endpoint": "POST /repos/{owner}/{repo}/labels",
      "id": "post label 'status: waiting for author'",
      "parameters": {
        "color": "E4BC82",
        "description": "Needs an action taken by the original poster",
        "name": "status: waiting for author",
        "owner": "test-owner",
        "repo": "test-repository",
      },
      "type": "octokit",
    },
    {
      "endpoint": "POST /repos/{owner}/{repo}/labels",
      "id": "post label 'type: admin'",
      "parameters": {
        "color": "985ef1",
        "description": "Administrative issues. Not (usually) directly actionable. 💼",
        "name": "type: admin",
        "owner": "test-owner",
        "repo": "test-repository",
      },
      "type": "octokit",
    },
    {
      "endpoint": "PATCH /repos/{owner}/{repo}/labels/{name}",
      "id": "patch label 'bug'",
      "parameters": {
        "color": "d73a4a",
        "description": "Something isn't working 🐛",
        "name": "bug",
        "new_name": "type: bug",
        "owner": "test-owner",
        "repo": "test-repository",
      },
      "type": "octokit",
    },
    {
      "endpoint": "POST /repos/{owner}/{repo}/labels",
      "id": "post label 'type: cleanup'",
      "parameters": {
        "color": "fde282",
        "description": "Tech debt or other code/repository cleanups 🧹",
        "name": "type: cleanup",
        "owner": "test-owner",
        "repo": "test-repository",
      },
      "type": "octokit",
    },
    {
      "endpoint": "PATCH /repos/{owner}/{repo}/labels/{name}",
      "id": "patch label 'enhancement'",
      "parameters": {
        "color": "a2eeef",
        "description": "New enhancement or request 🚀",
        "name": "enhancement",
        "new_name": "type: feature",
        "owner": "test-owner",
        "repo": "test-repository",
      },
      "type": "octokit",
    },
    {
      "endpoint": "PATCH /repos/{owner}/{repo}/labels/{name}",
      "id": "patch label 'question'",
      "parameters": {
        "color": "d876e3",
        "description": "Just asking a question ❓",
        "name": "question",
        "new_name": "type: question",
        "owner": "test-owner",
        "repo": "test-repository",
      },
      "type": "octokit",
    },
    {
      "endpoint": "POST /repos/{owner}/{repo}/labels",
      "id": "post label 'type: rfc'",
      "parameters": {
        "color": "fde282",
        "description": "Invite feedback on a significant change to the project.",
        "name": "type: rfc",
        "owner": "test-owner",
        "repo": "test-repository",
      },
      "type": "octokit",
    },
  ],
}
`);
  });

  test('when options.existingLabels contains duplicate entries', () => {
    const creation = testBlock(blockRepositoryLabels, {
      options: {
        ...optionsBase,
        existingLabels: [
          ...repositoryLabels.filter(
            (label) => !label.name.includes('documentation'),
          ),
          {
            color: '0075ca',
            description: 'Improvements or additions to docs 📝',
            name: 'docs',
          },
          {
            color: '0075ca',
            description: 'Improvements or additions to docs 📝',
            name: 'area: documentation',
          },
        ],
      },
    });

    expect(creation).toMatchInlineSnapshot(`
			{
			  "requests": [
			    {
			      "endpoint": "DELETE /repos/{owner}/{repo}/labels/{name}",
			      "id": "delete label 'docs'",
			      "parameters": {
			        "name": "docs",
			        "owner": "test-owner",
			        "repo": "test-repository",
			      },
			      "type": "octokit",
			    },
			  ],
			}
		`);
  });
});
