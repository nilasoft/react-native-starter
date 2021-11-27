#!/bin/node
const fs = require('fs');
const path = require('path');
const { argv } = require('yargs');

const { env } = argv;

// Accepted environment params, they are directly related to the name of the folders created before.
const acceptedEnvs = ['dev', 'staging', 'prod'];

// Function that writes on the file.
function writeFile(file, string) {
  if (fs.existsSync(file)) {
    fs.writeFileSync(file, string);
    return true;
  }

  console.log(`File "${file}" not found.`);
  process.exit(1);
}

// Function that validate if the param passed to the script is a valid environment.
function validateParams() {
  console.log('\x1b[33m','Validating params...');
  if (!env) {
    console.log(
      '\x1b[31m',
      `Error.  Please inform a valid environment: ${acceptedEnvs.join(', ')}.`
    );
    process.exit(1);
  }

  if (!acceptedEnvs.includes(env)) {
    console.log(
      '\x1b[31m',
      `Error. Wrong environment, choose one of those: ${acceptedEnvs.join(
        ', '
      )}.`
    );
    process.exit(1);
  }
}

// Function that replaces the file content with the right content.
function setEnvironment() {
  console.log('\x1b[36m%s\x1b[0m',`Setting environmet to ${env}...`);

  // String that will override the current export string
  const importerString = `export { env } from './${env}'\n`;

  // Env index file location that will be overridden
  const envIndexFileLocation = path.resolve(
    __dirname,
    '..',
    'src',
    'env',
    'index.js'
  );

  // Writes right content inside the environment file
  writeFile(envIndexFileLocation, importerString);
  console.log('\x1b[32m',`Environment successfully setted to ${env}.`);
  process.exit(0);
}

// Script initialization
validateParams();
setEnvironment();
