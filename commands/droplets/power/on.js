/**
 * @fileoverview Module handling the droplet power on command.
 * @author alvin@omgimanerd.tech (Alvin Lin)
 */

var Display = require('../../../lib/Display');
var Util = require('../../../lib/Util');

exports.command = 'on <droplet id>';

exports.description = 'Power on a droplet'.yellow;

exports.builder = function(yargs) {
  Util.globalConfig(yargs, 3, exports.command);
};

exports.handler = function(argv) {
  var client = Util.getClient();
  client.droplets.powerOn(argv.dropletid, function(error, action) {
    Util.handleError(error);
    Display.displayActionID(action, 'Powering on droplet...');
  });
};
