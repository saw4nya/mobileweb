export function showList(items) {
    items.forEach((item, index) => {
        console.log(`${index + 1}. ${JSON.stringify(item)}`);
    });
}
