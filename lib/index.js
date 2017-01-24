import _ from 'lodash';
import promisify from 'promisify-node';

const fs = promisify('fs');

const TEMPLATE_PATH = `${__dirname}/../template/report.txt`;

export default function (options, pkg) {
  const templatePath = TEMPLATE_PATH;
  const json = {
    aaa: 'xxx',
  };
  return fs.readFile(templatePath, 'utf-8').then((templateText) => {
    const template = _.template(templateText);
    const text = template(json);
    console.log('RESULT', text);
  });
}
