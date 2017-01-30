var mustache   = require('mustache');
var mjml       = require('mjml');
var nodemailer = require('nodemailer');
var Promise    = require('bluebird');
var config     = require('./config');
var Template   = require('./template');

/**
 * @constructor Create new mail client
 *
 * @param {Object} opts configuration options
 */
var Client = function(opts) {
  this.config = config.parse(opts);
  return this;
};

module.exports = Client;

/**
 * Set client config
 *
 * @param {Object} opts
 *
 * @return {Object} complete config
 */
Client.prototype.setConfig = function(opts) {
  return this.config = config.parse(opts);
};

/**
 * Send an email
 *
 * @param {String} template The template path
 * @param {Object} data The mustache templateh data
 * @param {Object} opts The mail opts
 *
 * @return {Promise}
 */
Client.prototype.sendMail = function(template, data, opts) {
  var self = this;

  return new Promise(function(resolve, reject) {

    // Compile template
    var t = new Template(template, self.config.cache);

    t.compile(data).then(function(html) {

      // Parse default mail opts
      opts      = opts || {};
      opts.from = opts.from || self.config.default_from;

      // Set mail content
      opts.html = html;

      self.getClient().sendMail(opts, function(err, infos) {
        if (err)
          return reject(err);

        resolve(infos);
      });
    }, reject);
  });
};

/**
 * Get nodemailer smtp client
 * @return {Object} Nodemailer client
 */
Client.prototype.getClient = function() {
  if (!this.client)
    this.client = nodemailer.createTransport(this.config.smtp);

  return this.client;
};
