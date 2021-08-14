const Handlebars = require('handlebars')

function selectOption(selection, option) {
  return selection == option ? new Handlebars.SafeString('<option selected>' + option + '</option>') : new Handlebars.SafeString('<option>' + option + '</option>')
}

module.exports = selectOption