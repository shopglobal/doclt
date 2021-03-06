/**
 * @fileoverview Module handling the droplet creation command.
 * @author alvin@omgimanerd.tech (Alvin Lin)
 */

var prompt = require('prompt');

var Display = require('../../lib/Display');
var Util = require('../../lib/Util');

exports.command = 'add';

exports.aliases = ['create'];

exports.description = 'Create a new droplet'.yellow;

exports.builder = function(yargs) {
  yargs.option('name', {
    description: 'Set the droplet name'.yellow
  }).option('region', {
    description: 'Set the droplet region ID'.yellow
  }).option('size', {
    description: 'Set the droplet size slug'.yellow
  }).option('image', {
    description: 'Set the droplet base image ID or slug identifier'.yellow
  }).option('ssh_keys', {
    alias: ['ssh'],
    description: 'Set the droplet SSH keys (space separated)'.yellow,
    array: true
  }).option('backups', {
    description: 'Enable backups'.yellow,
    boolean: true
  }).option('ipv6', {
    description: 'Enable IPv6'.yellow,
    boolean: true
  }).option('private_networking', {
    description: 'Enable private networking'.yellow,
    boolean: true
  }).option('monitoring', {
    description: 'Enable monitoring'.yellow,
    boolean: true
  }).option('user_data', {
    description: 'Custom user data'.yellow
  }).option('volume', {
    description: 'Volume IDs to attach (space separated)'.yellow,
    array: true
  }).option('tags', {
    description: 'Tags (comma separated)'.yellow,
    array: true
  }).group([
    'name', 'region', 'size', 'image', 'ssh_keys', 'backups', 'ipv6',
    'private_networking', 'monitoring', 'user_data', 'volume', 'tags'
  ], 'Droplet Attributes:');
  Util.globalConfig(yargs, 2, exports.command);
};

exports.handler = function(argv) {
  var client = Util.getClient();
  prompt.message = '';
  prompt.override = argv;
  prompt.start();
  prompt.get({
    properties: {
      name: {
        description: 'Droplet name'.yellow,
        required: true
      },
      region: {
        description: 'Region ID ("doclt regions" to list regions)',
        required: true,
      },
      size: {
        description: 'Size slug ("doclt sizes" to list sizes)',
        required: true
      },
      image: {
        description: 'Base image ID or slug identifier'.yellow,
        required: true
      },
      ssh_keys: {
        description: 'SSH Key IDs (comma separated) (optional)',
        before: Util.csvToArray
      },
      backups: {
        description: 'Enable backups? (true/false)',
        required: true,
        type: 'boolean'
      },
      ipv6: {
        description: 'Enable IPv6? (true/false)',
        required: true,
        type: 'boolean'
      },
      private_networking: {
        description: 'Enable private networking? (true/false)',
        required: true,
        type: 'boolean'
      },
      monitoring: {
        description: 'Enable monitoring? (true/false)',
        required: true,
        type: 'boolean'
      },
      user_data: {
        description: 'Desired user data (optional)'
      },
      volume: {
        description: 'Volume IDs to attach (comma separated) (optional)',
        before: Util.csvToArray,
      },
      tags: {
        description: 'Tags (comma separated) (optional)',
        before: Util.csvToArray
      }
    }
  }, function(error, result) {
    Util.handleError(error);
    client.droplets.create(result, function(error, droplet) {
      Util.handleError(error);
      Display.displayDroplet(droplet, 'Droplet created.');
    });
  });
};
