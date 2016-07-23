'use strict';

angular.module('lanceSolidario.version', [
  'lanceSolidario.version.interpolate-filter',
  'lanceSolidario.version.version-directive'
])

.value('version', '0.1');
