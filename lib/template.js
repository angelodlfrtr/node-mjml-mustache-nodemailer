var mjml2html = require('mjml');
var mustache  = require('mustache');
var fs        = require('fs');
var cache     = require('./cache');

/**
 * @constructor
 *
 * @param {String} template_path The template path in root_dir
 * @param {Boolean} cache Cache template or not
 */
var Template = function(template_path, cache) {
  this.template_path = template_path;
  this.cache         = cache;
};

module.exports = Template;

/**
 * Compile template
 *
 * @param {Object} data The data to compile with mustache in template
 *
 * @return {Promise}
 */
Template.prototype.compile = function(data, partials) {
  var self = this;
  partials = partials || {};

  return new Promise(function(resolve, reject) {
    self.getTemplate().then(function(template) {
      // Parse mustache template
      var parsed = mustache.render(template, data, partials);

      // Mjml to html
      var result = mjml2html(parsed);

      resolve(result);
    }).catch(reject);
  });
};

/**
 * Get template content
 * @return {Promise}
 */
Template.prototype.getTemplate = function() {
  var self = this;

  return new Promise(function(resolve, reject) {

    if (!self.cache) {
      return self.readTemplateFile().then(function(content) {
        resolve(content);
      }, reject);
    }

    self.getFromCache().then(function(content) {
      if (content) {
        return resolve(content)
      }

      return self.readTemplateFile().then(function(content) {
        if (self.cache) {
          selb.setInCache(content);
        }

        resolve(content);
      });
    }).catch(reject);
  });
};

/**
 * Get template content from file
 *
 * @return {Promise}
 */
Template.prototype.readTemplateFile = function() {
  var self = this;

  return new Promise(function(resolve, reject){
    // Get template content from file
    fs.readFile(self.template_path, function(err, file){
      if(err)
        return reject(err);

      // Get file content as text utf-8 encoded
      var content = file.toString('utf-8');

      resolve(content);
    });
  });
};

/**
 * Get template content from cache
 *
 * @param {String} template The template name
 *
 * @return {Promise}
 */
Template.prototype.getFromCache = function() {
  return cache.get(this.template_path);
};

/**
 * Set template content in cache
 *
 * @param {String} content The template content
 *
 * @return {Promise}
 */
Template.prototype.setInCache = function(content) {
  return cache.set(this.template_path, content);
};
