/**
 * @fileoverview Module handling the image subcommands.
 * @author alvin@omgimanerd.tech (Alvin Lin)
 */

var Util = require('../lib/Util');

exports.command = 'images';

exports.aliases = ['image'];

exports.description = 'Create, delete, and manage images'.yellow;

exports.builder = (yargs) => {
  yargs.commandDir('images');
  Util.globalConfig(yargs, exports.command, true);
};
