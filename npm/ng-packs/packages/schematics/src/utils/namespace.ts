import { createTypeParser } from './type';

export function parseNamespace(solution: string, type: string) {
  const parseType = createTypeParser();
  let namespace = parseType(type)[0]
    .split('.')
    .slice(0, -1)
    .join('.');

  solution.split('.').reduceRight((acc, part) => {
    acc = `${part}\\.${acc}`;
    const regex = new RegExp(`^${acc}(Controllers\\.)?`);
    namespace = namespace.replace(regex, '');
    return acc;
  }, '');

  return namespace;
}
