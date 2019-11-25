'use strict'

const date = new Date()
const vat = 0.2
const price = 122000
const currencyFormatArgs = ['fr', {minimumFractionDigits: 2}]

module.exports = function createData ({ qty }) {
  const taxeFreeSum = qty * price
  const vatAmount = taxeFreeSum * vat
  const sum = ((taxeFreeSum + vatAmount) / 100).toLocaleString(...currencyFormatArgs)

  return {
    id: date.getTime(),
    date: date.toLocaleDateString('fr'),
    sum,
    price: (price / 100).toLocaleString(...currencyFormatArgs),
    taxeFreeSum: (taxeFreeSum / 100).toLocaleString(...currencyFormatArgs),
    vat: (vatAmount / 100).toLocaleString(...currencyFormatArgs)
  }
}
