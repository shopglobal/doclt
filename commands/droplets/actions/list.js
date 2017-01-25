/**
 * @fileoverview Module handling the droplet action listing command.
 * @author alvin@omgimanerd.tech (Alvin Lin)
 */

var Util = require('../../../lib/Util');

exports.command = 'list <droplet id>';

exports.aliases = ['ls'];

exports.description = 'List all actions performed on a droplet'.yellow;

exports.builder = (yargs) => {
  yargs.option('limit', {
    alias: 'number',
    description: 'The maximum number of actions to fetch',
    number: true
  });
  Util.globalConfig(yargs, exports.command);
};

exports.handler = (argv) => {
  var client = Util.getClient();

  client.droplets.listActions(argv.dropletid, (error, actions) => {
    Util.handleError(error, argv.json);
    if (argv.json) {
      console.log(actions);
    } else {
      var Table = require('cli-table2');
      var table = new Table({
        head: ['ID', 'Status', 'Type', 'Completed']
      });
      if (typeof(argv.limit) === 'number') {
        actions = actions.slice(0, argv.limit);
      }
      table.push.apply(table, actions.map((action) => {
        return [
          Util.colorID(action.id),
          Util.colorActionStatus(action.status),
          action.type,
          new Date(action.completed_at).toLocaleString()
        ];
      }));
      console.log(table.toString());
    }
  });
};
