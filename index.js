#!/usr/bin/env node

const {generateBackendStructure} = require("./utilsFolder");

// Call the function when the script is executed directly
const mainModule = async () => {
  await generateBackendStructure();
};
if (require.main === module) {
  mainModule();
}
module.exports = {mainModule};
