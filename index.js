var angular = require('angular'),
  cookie = require('cookie');

var defaultOptions = {};

angular.module('ngCookie', [])
  .provider('cookies', function() {
    this.$get = /* @ngInject */ function($document) {
      var lastCookieString,
        cookies;

      return {
        get: function(name) {
          if ($document.cookie !== lastCookieString) {
            lastCookieString = $document.cookie;
            cookies = cookie.parse(lastCookieString, defaultOptions);
          }

          return cookies[name];
        },

        set: function(name, value, options) {
          options = angular.extend(angular.extend({}, defaultOptions), options || {});

          $document.cookie = cookie.serialize(name, value, options);
        }
      };
    };

    this.useDefaults = function(defaults) {
      angular.extend(defaultOptions, defaults);
    };
  })
  ;

module.exports = angular.module('ngCookie');
