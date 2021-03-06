/**
 * @fileoverview Module handling the domain record getting command.
 * @author alvin@omgimanerd.tech (Alvin Lin)
 */

var Display = require('../../../lib/Display');
var Util = require('../../../lib/Util');

exports.command = 'get <domain> <record id>';

exports.aliases = ['i', 'info'];

exports.description = 'Info about a domain record'.yellow;

exports.builder = function(yargs) {
  Util.globalConfig(yargs, 3, exports.command);
};

exports.handler = function(argv) {
  var client = Util.getClient();
  var domain = argv.domain;
  var recordid = argv.recordid;
  client.domains.getRecord(domain, recordid, function(error, record) {
    Util.handleError(error);
    Display.displayDomainRecord(record);
  });
};
