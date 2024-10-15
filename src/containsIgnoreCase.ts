export function containsIgnoreCase(str: string, searchTerm: string): boolean {
  const lowerStr: string = str.toLowerCase();
  const lowerSearchTerm: string = searchTerm.toLowerCase();
  for (let i: number = 0; i <= lowerStr.length - lowerSearchTerm.length; i++) {
    let found = true;
    for (let j: number = 0; j < lowerSearchTerm.length; j++) {
      if (lowerStr[i + j] !== lowerSearchTerm[j]) {
        found = false;
        break;
      }
    }
    if (found) {
      return true;
    }
  }
  return false;
}
