'use strict';

// Setting up route
angular.module('apps').filter('ownPrivate', function() {
  return function(input, user) {
    var output;

    output = input.owner === user._id && input.public === false && input.permissions.length === 0;

    return output;

  };
});
