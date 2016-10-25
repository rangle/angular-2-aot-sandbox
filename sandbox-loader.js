'use strict';

const fs = require('fs');
const ncp = require('ncp');
const spawn = require('child_process').spawn;
const spawnSync = require('child_process').spawnSync;
const whichCase = process.argv[2] || 'NULL';
const aot = process.argv[3] || true;
const path = require('path');
const availableCases = getAvailableCases(path.resolve(__dirname, 'tests'));

if (whichCase === 'total') {
  for (let i = 0; i < availableCases.length; i++) {
    console.log('Start', '[' + availableCases[i] + ']', 'case:');
    let testCase = spawnSync('node', ['sandbox-loader.js', availableCases[i]]);
    console.log(testCase.stderr.toString('utf8'));
    console.log(testCase.stdout.toString('utf8'));
  }
  process.exit(0);
}

if (availableCases.indexOf(whichCase) === -1) {
  console.log('[' + whichCase + ']', 'case is not available');
  process.exit(1);
}

const clean = spawn('npm', ['run', 'clean']);
clean.on('close', function (code) {
  if (code === 0) {
    ncp(path.resolve(__dirname, 'tests', whichCase), 'sandbox', function (error) {
      if (error) {
        console.log(error);
        process.exit(1);
      }
      fs.writeFileSync('./sandbox/tsconfig.json', fs.readFileSync('tsconfig.json'));
      console.log('AoT:', aot);
      console.log('Test case', '[' + whichCase + ']', 'LOADED');
      let commandOptions = ['run', 'sandbox'];
      if (aot !== true) {
        commandOptions = ['run', 'sandbox:jit']
      }
      console.log('Test case', '[' + whichCase + ']', 'BUILDING');
      const sandbox = spawn('npm', commandOptions);
      sandbox.stderr.on('data', (data) => {
        console.log(`stderr: ${data}`);
      });
      sandbox.on('close', (code) => {
        if (code === 0) {
          console.log('Test case', '[' + whichCase + ']', 'PASS');
        } else {
          console.log('Test case', '[' + whichCase + ']', 'FAILED');
        }
      });
    })
  }
});

function getAvailableCases(testsPath) {
  const files = fs.readdirSync(testsPath, {});
  const isDirectory = function(testPath) {
    const filePath = path.resolve(testsPath, testPath);
    const fileStat = fs.lstatSync(filePath);
    return fileStat.isDirectory();
  };
  return files.filter(isDirectory);
}
