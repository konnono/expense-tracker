function printIcon(category, categories) {
  const icon = (categories.filter(ctg => ctg.name === category))[0].icon
  return icon
}

module.exports = printIcon