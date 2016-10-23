const fs = require("fs");
const ncp = require("ncp");
const spawn = require('child_process').spawn;
const spawnSync = require('child_process').spawnSync;
const whichCase = process.argv[2] || "NULL";
const aot = process.argv[3] || true;
const avaliableCases = [
  "control",
  "default-exports",
  "form-control",
  "form-control-error",
  "func-in-providers",
  "func-in-declarations",
  "func-in-routes",
  "private-input",
];

if (whichCase === "total") {
   for (var i = 0; i < avaliableCases.length; i++) {
     console.log("Start", "["+avaliableCases[i]+"]", "case:");
     let testCase = spawnSync('node', ['sandbox-loader.js', avaliableCases[i]]);
     console.log(testCase.stderr.toString('utf8'));
     console.log(testCase.stdout.toString('utf8'));
   }
   process.exit(0);
}

if (avaliableCases.indexOf(whichCase) === -1) {
  console.log("["+whichCase+"]", "case is not avaliable");
  process.exit(1);
}

const clean = spawn('npm', ['run', 'clean']);
clean.on('close', function(code){
  if (code === 0) {
    ncp(whichCase, "sandbox", function(error){
      if (error) {
        console.log(error);
        process.exit(1);
      }
      fs.writeFileSync("./sandbox/tsconfig.json", fs.readFileSync("tsconfig.json"));
      console.log("AoT:", aot);
      console.log("Test case", "["+whichCase+"]", "LOADED");
      let commandOptions =  ['run', 'sandbox']
      if (aot !== true) {
        commandOptions = ['run', 'sandbox:jit']
      }
      console.log("Test case", "["+whichCase+"]", "BUILDING");
      const sandbox = spawn('npm', commandOptions);
      sandbox.stderr.on('data', (data) => {
        console.log(`stderr: ${data}`);
      });
      sandbox.on('close', (code) => {
        if (code === 0) {
          console.log("Test case", "["+whichCase+"]", "PASS");
        } else {
          console.log("Test case", "["+whichCase+"]", "FAILED");
        }
      });
    })
  }
})
