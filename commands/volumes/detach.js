/**
 * @fileoverview Module handling the volume detach command.
 * @author alvin@omgimanerd.tech (Alvin Lin)
 */

var util = require('../../lib/util');

exports.command = 'detach <volume id>';

exports.description = 'Detach a volume'.yellow;

exports.builder = (yargs) => {
  util.globalConfig(yargs, exports.command);
};

exports.handler = (argv) => {
  var client = util.getClient();

  client.volumes.detach(argv.volumeid, (error) => {
    util.handleError(error);
    console.log('Volume detached.'.red);
  });
};
