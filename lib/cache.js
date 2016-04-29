var Promise      = require('bluebird');
var cache_object = {};

/**
 * @todo cache adapaters ex: redis, ...
 */

module.exports = {

  /**
   * Save a key in cache
   * @param {String} key
   * @param {String} value
   * @return {Promise}
   */
  set: function(key, value){
    return new Promise(function(resolve, reject){
      cache_object[key] = value;
      resolve();
    });
  },

  /**
   * Get value from key
   * @param {String} key
   */
  get: function(key){
    return new Promise(function(resolve, reject){
      resolve(cache_object[key]);
    });
  }
};
