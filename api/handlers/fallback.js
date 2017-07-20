module.exports = {
  /**
   * Welcome handler
   * @param data
   */
  handle: function(data) {
    return {
      speech: 'Déso, pas compris',
      source: 'dojo-chatbot-webhook'
    }
  }
}