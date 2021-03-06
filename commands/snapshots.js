/**
 * @fileoverview Module handling the snapshot subcommands.
 * @author alvin@omgimanerd.tech (Alvin Lin)
 */

var Util = require('../lib/Util');

exports.command = 'snapshots';

exports.aliases = ['snapshot'];

exports.description = 'Create, delete, and manage snapshots'.yellow;

exports.builder = function(yargs) {
  yargs.commandDir('snapshots');
  Util.globalConfig(yargs, 1, exports.command, true);
};
