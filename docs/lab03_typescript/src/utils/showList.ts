export function showList<T>(items: T[]): void {
  items.forEach((item, index) => {
    console.log(`${index + 1}. ${JSON.stringify(item)}`);
  });
}
