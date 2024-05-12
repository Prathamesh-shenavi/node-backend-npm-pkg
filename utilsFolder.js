const fs = require("fs");
const path = require("path");

// Content of ApiError.js
const apiErrorContent = `
class ApiError extends Error {
  constructor(
    statusCode,
    message = "Something went wrong!!",
    errors = [],
    stack = "",
  ) {
    super(message);
    this.statusCode = statusCode;
    this.data = null;
    this.message = message;
    this.success = false;
    this.errors = errors;
    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

export { ApiError };

`;

// Content of ApiResponse.js
const apiResponseContent = `
class ApiResponse {
  constructor(statusCode, data, message = "success") {
    this.statusCode = statusCode;
    this.data = data;
    this.message = message;
    this.success = statusCode < 400;
  }
}

export { ApiResponse };

`;

// Content of asyncHandler.js
const asyncHandlerContent = `
const asyncHandler = (reqestHandler) => {
  return (req, res, next) => {
    Promise.resolve(reqestHandler(req, res, next)).catch((err) => next(err));
  };
};

export { asyncHandler };
`;

const generateBackendStructure = async () => {
  const structure = {
    controllers: [],
    DataBase: [],
    models: [],
    middleware: [],
    routes: [],
    services: [],
    utils: ["ApiError.js", "ApiResponse.js", "asyncHandler.js"],
  };

  const currentDirectory = process.cwd();
  const srcDirectory = path.join(currentDirectory, "src");

  // Create src directory if it doesn't exist
  if (!fs.existsSync(srcDirectory)) {
    fs.mkdirSync(srcDirectory);
  }
  for (const file of ["constants.js", "index.js", "app.js"]) {
    fs.writeFileSync(path.join(srcDirectory, file), `// ${file}`);
  }
  // Create directories and files inside src directory
  for (const dir of Object.keys(structure)) {
    const dirPath = path.join(srcDirectory, dir);
    fs.mkdirSync(dirPath, {recursive: true});
    // Create files within directories
    for (const file of structure[dir]) {
      if (dir == "utils" && file === "ApiError.js") {
        
        fs.writeFileSync(path.join(dirPath, file), apiErrorContent);
      }
      else if (dir == "utils" && file === "ApiResponse.js") {
        
        fs.writeFileSync(path.join(dirPath, file), apiResponseContent);
      }
      else if (dir == "utils" && file === "asyncHandler.js") {
        fs.writeFileSync(path.join(dirPath, file), asyncHandlerContent);
      } else {
        
        fs.writeFileSync(path.join(dirPath, file), `// ${file}`);
      }
    }
  }

  console.log("Backend structure generated successfully!");
};

module.exports = {
  generateBackendStructure,
};
