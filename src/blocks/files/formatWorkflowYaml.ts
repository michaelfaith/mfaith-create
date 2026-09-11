import { formatYaml } from "./formatYaml.ts";

export function formatWorkflowYaml(value: unknown) {
  const formatted = formatYaml(value)
    // https://github.com/nodeca/js-yaml/pull/515
    .replaceAll(/: "\\n(.+)"/g, ": |\n$1")
    .replaceAll("\\n", "\n")
    .replaceAll("\\t", "  ");
  const jobsHeader = "jobs:\n";
  const jobsIndex = formatted.indexOf(jobsHeader);

  if (jobsIndex === -1) {
    return formatted;
  }

  const jobsEnd = jobsIndex + jobsHeader.length;
  const lines = formatted.slice(jobsEnd).split("\n");
  let hasJob = false;

  const formattedWithJobSpacing =
    formatted.slice(0, jobsEnd) +
    lines
      .flatMap((line) => {
        if (/^ {2}\S/.test(line)) {
          if (hasJob) {
            return ["", line];
          }

          hasJob = true;
        }

        return [line];
      })
      .join("\n");

  return formattedWithJobSpacing;
}
