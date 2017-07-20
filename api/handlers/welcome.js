module.exports = {
  /**
   * Welcome handler
   * @param data
   */
  handle: function(data) {
    return {
      speech: 'Salut depuis le webhook',
      source: 'dojo-chatbot-webhook'
    }
  }
}