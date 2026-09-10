import { describe, expect, it } from "vitest";

import { formatWorkflowYaml } from "./formatWorkflowYaml.js";
import { formatYaml } from "./formatYaml.js";

describe(formatWorkflowYaml, () => {
  it("should format a workflow without jobs like regular YAML", () => {
    const value = {
      name: "Reusable workflow",
      on: {
        workflow_call: null,
      },
    };

    expect(formatWorkflowYaml(value)).toBe(formatYaml(value));
  });

  it("should not add spacing inside a single job", () => {
    const result = formatWorkflowYaml({
      jobs: {
        build: {
          name: "Build",
          "runs-on": "ubuntu-latest",
          steps: [{ uses: "actions/checkout@v4" }, { run: "pnpm build" }],
        },
      },
    });

    expect(result).toBe(
      [
        "jobs:",
        "  build:",
        "    name: Build",
        "    runs-on: ubuntu-latest",
        "    steps:",
        "      - uses: actions/checkout@v4",
        "      - run: pnpm build",
        "",
      ].join("\n"),
    );
  });

  it("should add an empty line between multiple jobs", () => {
    const result = formatWorkflowYaml({
      jobs: {
        build: {
          name: "Build",
          steps: [{ run: "pnpm build" }],
        },
        test: {
          name: "Test",
          needs: "build",
          steps: [{ run: "pnpm test" }],
        },
      },
    });

    expect(result).toBe(
      [
        "jobs:",
        "  build:",
        "    name: Build",
        "    steps:",
        "      - run: pnpm build",
        "",
        "  test:",
        "    name: Test",
        "    needs: build",
        "    steps:",
        "      - run: pnpm test",
        "",
      ].join("\n"),
    );
  });

  it("should not add empty lines between fields or steps", () => {
    const result = formatWorkflowYaml({
      jobs: {
        build: {
          env: {
            NODE_ENV: "test",
          },
          steps: [
            {
              env: { CI: "true" },
              run: "pnpm test",
              with: { coverage: true },
            },
            {
              if: "always()",
              run: "pnpm report",
            },
          ],
        },
      },
    });

    expect(result).not.toMatch(/\n\n {4}\S/);
    expect(result).not.toMatch(/\n\n {6}- /);
    expect(result.match(/\n\n/g)).toBeNull();
  });

  it("should preserve non-job workflow sections", () => {
    const result = formatWorkflowYaml({
      name: "CI",
      on: {
        pull_request: null,
        push: {
          branches: ["main"],
        },
      },
      concurrency: {
        group: "${{ github.workflow }}",
      },
      jobs: {
        build: {
          steps: [{ run: "pnpm build" }],
        },
        test: {
          steps: [{ run: "pnpm test" }],
        },
      },
    });

    expect(result).toContain(
      [
        "name: CI",
        "",
        "on:",
        "  pull_request: ~",
        "  push:",
        "    branches:",
        "      - main",
        "",
        "concurrency:",
        "  group: ${{ github.workflow }}",
        "",
        "jobs:",
        "  build:",
      ].join("\n"),
    );
    expect(result).toContain(
      ["      - run: pnpm build", "", "  test:"].join("\n"),
    );
  });

  it("should not treat a nested jobs property as the workflow jobs section", () => {
    const result = formatWorkflowYaml({
      metadata: {
        jobs: {
          first: { enabled: true },
          second: { enabled: true },
        },
      },
    });

    expect(result).toBe(
      [
        "metadata:",
        "  jobs:",
        "    first:",
        "      enabled: true",
        "    second:",
        "      enabled: true",
        "",
      ].join("\n"),
    );
  });
});
