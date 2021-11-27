const inquirer = require('inquirer');
const semver = require('semver');
const fse = require('fs-extra');
const yargs = require('yargs');
const path = require('path');

const args = yargs
  .option('release', {
    alias: 'r',
    type: 'string',
    choices: ['patch', 'minor', 'major'],
    default: 'patch'
  })
  .alias('h', 'help')
  .help()
  .parse();

const file = path.resolve('main.config.ts');

const regex = new RegExp(/[0-9]+\.[0-9]+\.[0-9]+/);

async function increment() {
  let input = await fse.readFile(file, 'utf-8');
  let [previous] = regex.exec(input);
  console.log('previous version:', previous);
  let {next} = await inquirer.prompt([
    {
      type: 'input',
      name: 'next',
      message: 'next version:',
      default: semver.inc(previous, args.release),
      validate: regex.test.bind(regex)
    }
  ]);
  let output = input.replace(regex, next);
  await fse.writeFile(file, output);
}

(async () => await increment())();
