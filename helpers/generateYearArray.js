function generateYearArray(records) {
  const years = []
  const endYear = records[0].date.getFullYear()
  const startYear = records[records.length - 1].date.getFullYear()

  for (let i = startYear; i <= endYear; i++) {
    years.push(i)
  }
  return years
}

module.exports = generateYearArray