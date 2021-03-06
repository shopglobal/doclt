/**
 * @fileoverview Module handling the droplet reboot command.
 * @author alvin@omgimanerd.tech (Alvin Lin)
 */

var Display = require('../../../lib/Display');
var Util = require('../../../lib/Util');

exports.command = 'reboot <droplet id>';

exports.aliases = ['restart'];

exports.description = 'Gracefully reboot a droplet'.yellow;

exports.builder = function(yargs) {
  Util.globalConfig(yargs, 3, exports.command);
};

exports.handler = function(argv) {
  var client = Util.getClient();
  client.droplets.reboot(argv.dropletid, function(error, action) {
    Util.handleError(error);
    Display.displayActionID(action, 'Rebooting droplet...');
  });
};
