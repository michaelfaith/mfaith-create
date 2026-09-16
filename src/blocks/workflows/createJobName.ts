export function createJobName(label: string): string {
  return label.replaceAll(/[?()]/g, '').replaceAll(' ', '_').toLowerCase();
}
