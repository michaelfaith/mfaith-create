export const makeRelativePath = (inputPath: string): string => {
  return inputPath.startsWith('.') ? inputPath : `./${inputPath}`;
};
