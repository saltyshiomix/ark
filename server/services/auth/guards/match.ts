export default function match(targetPath: string, paths: RegExp[]): boolean {
  return paths.some(exp => exp.test(targetPath));
}
