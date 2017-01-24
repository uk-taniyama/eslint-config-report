import _ from 'lodash';
import promisify from 'promisify-node';
import childProcess from 'child_process';

const fs = promisify('fs');

const TEMPLATE_PATH = `${__dirname}/../template/report.txt`;

function eslintPrintConfig(js) {
  return new Promise((resolve, reject) => {
    const eslint = childProcess.fork(
      `${__dirname}/child.js`, [
        '--print-config',
        js,
      ], {
        silent: true,
      });
    const stdout = [];
    const stderr = [];
    eslint.stdout.on('data', (data) => {
      stdout.push(data.toString());
    });
    eslint.stderr.on('data', (data) => {
      stderr.push(data.toString());
    });
    eslint.on('error', (err) => {
      reject(err);
    });
    eslint.on('close', (code, signal) => {
      resolve({
        code,
        signal,
        stdout: stdout.join(),
        stderr: stderr.join(),
      });
    });
  });
}


export default function (options, pkg) {
  const templatePath = TEMPLATE_PATH;
  return eslintPrintConfig()
    .then(result => JSON.parse(result.stdout))
    .then((json) => {
      fs.readFile(templatePath, 'utf-8').then((templateText) => {
        const template = _.template(templateText);
        const text = template(json);
        console.log(text);
      });
    });
}
