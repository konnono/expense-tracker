const Handlebars = require('handlebars')

function selectOption(category, option) {
  return category === option ? new Handlebars.SafeString('<option selected>' + option + '</option>') : new Handlebars.SafeString('<option>' + option + '</option>')
}

module.exports = selectOption