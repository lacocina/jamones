export function formatNumber(num: number): number {
    return parseFloat(((Math.floor(num * 100) / 100).toFixed(2)))
}
