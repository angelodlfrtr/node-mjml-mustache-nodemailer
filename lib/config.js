var path = require('path');

module.exports = {

  /**
   * Parse user configuration options
   * @param {Object} config User configuration
   * @return {Object} Parsed config
   */
  parse: function(config) {
    config = config || {};
    return Object.assign({}, this.default_options, config);
  },

  /**
   * Get default options
   * @return {Object}
   */
  default_options: {
    // Show https://github.com/nodemailer/nodemailer#send-using-smtp for smtp options
    // Use mailcatcher as default : https://mailcatcher.me/
    smtp: {
      host: '127.0.0.1',
      port: 1025
    },

    // Cache templates content in memory
    cache: process.env.NODE_ENV === 'production' ? true : false,

    // Default mail sender
    default_from: 'no@bo.dy',

    // Mustache partials
    partials: {}
  }
};
