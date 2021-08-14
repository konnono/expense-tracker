function setDateRange(yearFilter, monthFilter) {
  let startDate
  let endDate

  if (yearFilter && monthFilter) {
    startDate = new Date(yearFilter, monthFilter - 1, 1)
    const lastDay = new Date(yearFilter, monthFilter, 0).getDate()
    endDate = new Date(yearFilter, monthFilter - 1, lastDay, 23, 59, 59)
    return { date: { $gte: startDate, $lte: endDate } }
  }

  if (yearFilter && !monthFilter) {
    startDate = new Date(yearFilter, 0, 1)
    endDate = new Date(yearFilter, 11, 31, 23, 59, 59)
    return { date: { $gte: startDate, $lte: endDate } }
  }

  return {}
}

module.exports = setDateRange