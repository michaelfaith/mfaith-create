import type { OutcomeLabel } from "set-github-repository-labels";

/* spellchecker:disable */
export const repositoryLabels: OutcomeLabel[] = [
  {
    name: "area: documentation",
    aliases: ["docs"],
    description: "Improvements or additions to docs 📝",
    color: "0075ca",
  },
  {
    name: "area: testing",
    description:
      "Improving how the repository's tests are run and/or code is tested 🧪",
    color: "1177aa",
  },
  {
    name: "area: tooling",
    description: "Managing the repository's maintenance 🛠️",
    color: "f9d0c4",
  },
  {
    name: "BREAKING CHANGE",
    description: "Used to label changes that are considered breaking.",
    color: "af0ddb",
  },
  {
    name: "dependencies",
    description: "Pull requests that update a dependency file",
    color: "0366d6",
  },
  {
    name: "good first issue",
    description: "Good for newcomers, please hop on! 🙌",
    color: "5319E7",
  },
  {
    name: "status: accepting prs",
    aliases: ["help wanted"],
    description: "Please, send a pull request to resolve this! 🙏",
    color: "0E8A16",
  },
  {
    name: "status: blocked",
    description: "Waiting for something else to be resolved 🙅",
    color: "ddcccc",
  },
  {
    name: "status: in discussion",
    description: "Not yet ready for implementation or a pull request",
    color: "05104F",
  },
  {
    name: "status: needs investigation",
    description: "Further research required 🔎",
    color: "D3F82D",
  },
  {
    name: "status: needs reproduction",
    description:
      "We've been unable to reproduce the issue and need the issue author to provide one.",
    color: "635c0c",
  },
  {
    name: "status: not enough info",
    description: "Needs for information before it's actionable.",
    color: "fe4efc",
  },
  {
    name: "status: stale",
    description:
      "Detected as stale and will be automatically closed, if not updated. ⏱️",
    color: "bfd4f2",
  },
  {
    name: "status: tracking",
    description:
      "This is just a tracking issue and not something directly actionable.",
    color: "182012",
  },
  {
    name: "status: upstream issue",
    description:
      "This is the result of an upstream issue and not immediately actionable until that issue is resolved.",
    color: "735a11",
  },
  {
    name: "status: waiting for author",
    description: "Needs an action taken by the original poster",
    color: "E4BC82",
  },
  {
    name: "type: admin",
    description: "Administrative issues. Not (usually) directly actionable. 💼",
    color: "985ef1",
  },
  {
    name: "type: bug",
    description: "Something isn't working 🐛",
    color: "d73a4a",
  },
  {
    name: "type: cleanup",
    description: "Tech debt or other code/repository cleanups 🧹",
    color: "fde282",
  },
  {
    name: "type: feature",
    aliases: ["enhancement"],
    description: "New enhancement or request 🚀",
    color: "a2eeef",
  },
  {
    name: "type: question",
    description: "Just asking a question ❓",
    color: "d876e3",
  },
  {
    name: "type: rfc",
    description: "Invite feedback on a significant change to the project.",
    color: "fde282",
  },
];
