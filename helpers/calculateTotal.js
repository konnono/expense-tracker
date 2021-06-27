function calculateTotal(records) {
  let sum = 0
  records.forEach(record => {
    sum += record.amount
  })
  return sum
}

module.exports = calculateTotal