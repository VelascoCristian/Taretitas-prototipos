export function isValidDate(dateString: string): boolean {
  const date: Date = new Date(dateString);
  if (isNaN(date.getTime())) {
    return false;
  }

  const parts: string[] = dateString.split("-");
  if (parts.length !== 3) {
    return false;
  }

  const year: number = parseInt(parts[0], 10);
  const currentYear: number = new Date().getFullYear();

  if (year < currentYear || year > currentYear + 100) {
    return false;
  }

  return true;
}
