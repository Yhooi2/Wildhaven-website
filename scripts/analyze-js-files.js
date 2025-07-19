const fs = require("fs");
const path = require("path");

// Directories to analyze
const APP_DIR = "./app";

// Files that should stay .js (utilities, configs, etc.)
const KEEP_JS_PATTERNS = [
  /\/_api\//, // API services
  /\/utils\//, // utility functions
  /\/hooks\/.*\.js$/, // React hooks (can be .js or .jsx)
  /\/index\.js$/, // index export files
  /\.styles\.js$/, // style files
  /page\.js$/, // Next.js pages (can stay .js)
  /layout\.js$/, // Next.js layouts (can stay .js)
  /loading\.js$/, // Next.js loading (can stay .js)
  /error\.js$/, // Next.js error (can stay .js)
  /not-found\.js$/, // Next.js not-found (can stay .js)
];

// Function to check if file contains React component
function isReactComponent(filePath) {
  try {
    const content = fs.readFileSync(filePath, "utf8");

    // Check for React component patterns
    const hasJSX =
      /<[A-Z]/.test(content) || // Component tags like <Header>
      /<[a-z]/.test(content) || // HTML tags like <div>
      /className=/.test(content) || // JSX className
      /\s+</.test(content); // Any JSX tag with whitespace

    const hasExportDefaultFunction = /export\s+default\s+function/.test(
      content
    );
    const hasExportDefault = /export\s+default/.test(content);
    const hasFunctionDeclaration = /function\s+[A-Z]/.test(content); // Component-like function name
    const hasReactImport = /import.*from.*['"](react|@heroicons)/.test(content);

    // If it's clearly a utility function file, keep as .js
    const isUtilityFile =
      /export\s+function/.test(content) &&
      !hasJSX &&
      !hasExportDefaultFunction &&
      !hasFunctionDeclaration;

    if (isUtilityFile) return false;

    // If it has JSX or exports a function that looks like a component
    return (
      hasJSX ||
      (hasExportDefaultFunction && (hasJSX || hasReactImport)) ||
      (hasExportDefault && hasFunctionDeclaration)
    );
  } catch (error) {
    console.error(`Error reading file ${filePath}:`, error.message);
    return false;
  }
}

// Function to find all .js files recursively
function findJSFiles(dir) {
  const files = [];

  function walkDir(currentDir) {
    const items = fs.readdirSync(currentDir);

    for (const item of items) {
      const fullPath = path.join(currentDir, item);
      const stat = fs.statSync(fullPath);

      if (stat.isDirectory()) {
        walkDir(fullPath);
      } else if (item.endsWith(".js")) {
        files.push(fullPath);
      }
    }
  }

  walkDir(dir);
  return files;
}

// Main analysis function
function analyzeFiles() {
  console.log("🔍 Analyzing .js files in the project...\n");

  const allJSFiles = findJSFiles(APP_DIR);

  const reactComponents = [];
  const keepAsJS = [];

  for (const file of allJSFiles) {
    const relativePath = path.relative(".", file);

    // Check if file should stay .js based on patterns
    const shouldKeepJS = KEEP_JS_PATTERNS.some((pattern) =>
      pattern.test(relativePath)
    );

    if (shouldKeepJS) {
      keepAsJS.push(relativePath);
    } else {
      // Check if it's a React component
      if (isReactComponent(file)) {
        reactComponents.push(relativePath);
      } else {
        keepAsJS.push(relativePath);
      }
    }
  }

  // Output results
  console.log("📋 ANALYSIS RESULTS:");
  console.log("==================\n");

  console.log(
    `✅ React Components to rename to .jsx (${reactComponents.length} files):`
  );
  reactComponents.forEach((file) => console.log(`   ${file}`));

  console.log(`\n⏸️  Files to keep as .js (${keepAsJS.length} files):`);
  keepAsJS.forEach((file) => console.log(`   ${file}`));

  console.log(`\n📊 Summary:`);
  console.log(`   - Total .js files: ${allJSFiles.length}`);
  console.log(`   - To rename to .jsx: ${reactComponents.length}`);
  console.log(`   - Keep as .js: ${keepAsJS.length}`);

  // Save results to file for later use
  const results = {
    toRename: reactComponents,
    keepAsJS: keepAsJS,
    totalFiles: allJSFiles.length,
  };

  fs.writeFileSync(
    "./scripts/jsx-conversion-plan.json",
    JSON.stringify(results, null, 2)
  );
  console.log("\n💾 Results saved to scripts/jsx-conversion-plan.json");

  return results;
}

// Run analysis
if (require.main === module) {
  analyzeFiles();
}

module.exports = { analyzeFiles, isReactComponent };
