export function formatPrice(number: number) {
  return new Intl.NumberFormat('de-DE').format(number)
}

export function formatNumberSold(number: number) {
  return new Intl.NumberFormat('en', {
    notation: 'compact',
    maximumFractionDigits: 1
  })
    .format(number)
    .replace('.', ',')
    .toLowerCase()
}
