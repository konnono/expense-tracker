const Handlebars = require('handlebars')

function selectOption(selection, option, extraText) {
  selection = selection ? selection.toString() : selection
  option = option ? option.toString() : option

  return selection === option ? new Handlebars.SafeString('<option value="' + option + '" selected>' + option + extraText + '</option>') : new Handlebars.SafeString('<option value="' + option + '">' + option + extraText + '</option > ')
}

module.exports = selectOption