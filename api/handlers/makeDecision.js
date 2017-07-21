module.exports = {
  /**
   * Make a decision handler
   * @param data
   */
  handle: function(data) {
    const parameters = data.parameters
    const speech = takeDecision(parameters)

    return {
      speech: speech,
      source: 'dojo-chatbot-webhook'
    }
  }
}

function takeDecision(parameters) {
  if (parameters.monster) return 'Je tue le ' + parameters.monster
  if (parameters.princess) return 'Je sauve ' + parameters.princess

  else {
    for (let i = 0; i<3; i++) {
      if (parameters['object' + i] === 'porte ouverte') {
        return'Je vais ' + parameters['direction' + i]
      }
    }
  }
}