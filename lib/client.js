var nodemailer = require('nodemailer');
var Promise    = require('bluebird');
var config     = require('./config');
var Template   = require('./template');

class Client {

  constructor(opts={}) {
    this.config = config.parse(opts);
  }

  /**
   * Set client config
   *
   * @param {Object} opts
   *
   * @return {Object} complete config
   */
  setConfig(opts={}) {
    return this.config = config.parse(opts);
  }

  /**
   * Send an email
   *
   * @param {String} template The template path
   * @param {Object} data The mustache templateh data
   * @param {Object} opts The mail opts
   *
   * @return {Promise}
   */
  sendMail(template, data, opts) {
    var self = this;

    return new Promise(function(resolve, reject) {

      // Compile template
      var t = new Template(template, self.config.cache);

      t.compile(data, self.config.partials).then(function(data) {

        // Parse default mail opts
        opts      = opts || {};
        opts.from = opts.from || self.config.default_from;

        // Set mail content
        opts.html = data.html;

        self.getClient().sendMail(opts, function(err, infos) {
          if (err) { throw err; }
          resolve(infos);
        });
      }).catch(reject);
    });
  }

  /**
   * Get nodemailer smtp client
   *
   * @return {Object} Nodemailer client
   */
  getClient() {
    if (!this.client) {
      this.client = nodemailer.createTransport(this.config.smtp);
    }

    return this.client;
  }
}

module.exports = Client;
