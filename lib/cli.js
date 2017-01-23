#!/usr/bin/env node
import optionator from 'optionator';
import main from './';
import pkg from '../package.json';

const def = {
  prepend: `Usage: ${pkg.name} [options]`,
  append: `Version ${pkg.version}`,
  options: [
    {
      option: 'help',
      alias: 'h',
      type: 'Boolean',
      description: 'Show help',
    }, {
      option: 'version',
      alias: 'v',
      type: 'Boolean',
      description: 'Output the version number',
    },
  ],
};

const cli = optionator(def);
try {
  const options = cli.parseArgv(process.argv);
  if (options.version) {
    console.log(pkg.version);
  } else if (options.help) {
    console.log(cli.generateHelp());
  } else {
    try {
      main(options, pkg);
    } catch (err) {
      console.error(`Error: ${err.stack || err.message || err}`);
      process.exit(1);
    }
  }
} catch (err) {
  if (err) {
    console.error(`Error: ${err.message}`);
  }
  console.log(cli.generateHelp());
  process.exit(1);
}
