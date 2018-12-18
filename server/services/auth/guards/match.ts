export default function match(targetPath: string, paths: string[]): boolean {
  return paths.some(path => new RegExp(path).test(targetPath));
}
