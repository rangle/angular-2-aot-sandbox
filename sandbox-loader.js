const fs = require("fs");
const ncp = require("ncp");
const whichCase = process.argv[2] || "NULL";
const aot = process.argv[3] || true;
const avaliableCases = [
  "control",
  "default-exports"
];

if (avaliableCases.indexOf(whichCase) === -1) {
  console.log("This case is not avaliable:", whichCase);
  process.exit(1);
}

ncp(whichCase, "sandbox", function(error){
  if (error) {
    console.log(error);
    process.exit(1);
  }
  console.log("AoT:", aot);
  console.log("Test case", "["+whichCase+"]", "LOADED");
  if (aot === true) {
    console.log("Test case", "["+whichCase+"]", "BUILDING");
    const spawn = require('child_process').spawn;
    const sandbox = spawn('npm', ['run', 'sandbox']);
    sandbox.stderr.on('data', (data) => {
      console.log(`stderr: ${data}`);
    });

    sandbox.on('close', (code) => {
      if (code === 0) {
        console.log("Test case", "["+whichCase+"]", "PASS");
      }
    });
  }
})
