/**
 * @fileoverview Module handling the floating-ips get command.
 * @author alvin@omgimanerd.tech (Alvin Lin)
 */

var Display = require('../../lib/Display');
var Util = require('../../lib/Util');

exports.command = 'get <floating ip>';

exports.aliases = ['i', 'info'];

exports.description = 'Info about a floating IP'.yellow;

exports.builder = function(yargs) {
  Util.globalConfig(yargs, 2, exports.command);
};

exports.handler = function(argv) {
  var client = Util.getClient();
  client.floatingIps.get(argv.floatingip, function(error, ip) {
    Util.handleError(error);
    Display.displayFloatingIp(ip);
  });
};
