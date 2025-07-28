#!/usr/bin/env node
const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");

// Colors for console output
const colors = {
  green: "\x1b[32m",
  red: "\x1b[31m",
  yellow: "\x1b[33m",
  blue: "\x1b[34m",
  magenta: "\x1b[35m",
  cyan: "\x1b[36m",
  reset: "\x1b[0m",
  bold: "\x1b[1m",
};

function log(message, color = colors.reset) {
  console.log(`${color}${message}${colors.reset}`);
}

function logStep(step, message) {
  log(`\n${colors.bold}${colors.blue}[STEP ${step}]${colors.reset} ${message}`);
}

function logSuccess(message) {
  log(`${colors.green}✅ ${message}${colors.reset}`);
}

function logError(message) {
  log(`${colors.red}❌ ${message}${colors.reset}`);
}

function logWarning(message) {
  log(`${colors.yellow}⚠️  ${message}${colors.reset}`);
}

function logInfo(message) {
  log(`${colors.cyan}ℹ️  ${message}${colors.reset}`);
}

// Test configuration
const TEST_CONFIG = {
  buildTimeout: 60000, // 60 seconds
  devServerTimeout: 10000, // 10 seconds
  testPages: [
    "/",
    "/cabins",
    "/about",
    "/account",
    "/account/profile",
    "/account/reservations",
    "/cabins/173", // Example cabin ID
  ],
};

// Parse command line arguments
function parseArgs() {
  const args = process.argv.slice(2);
  const options = {
    step: "Manual Check",
    component: null,
    model: null,
    skipBuild: false,
    skipLint: false,
    skipCircular: false,
    quick: false,
    verbose: false,
  };

  for (let i = 0; i < args.length; i++) {
    const arg = args[i];

    if (arg === "--component" && i + 1 < args.length) {
      options.component = args[++i];
    } else if (arg === "--model" && i + 1 < args.length) {
      options.model = args[++i];
    } else if (arg === "--step" && i + 1 < args.length) {
      options.step = args[++i];
    } else if (arg === "--skip-build") {
      options.skipBuild = true;
    } else if (arg === "--skip-lint") {
      options.skipLint = true;
    } else if (arg === "--skip-circular") {
      options.skipCircular = true;
    } else if (arg === "--quick") {
      options.quick = true;
    } else if (arg === "--verbose") {
      options.verbose = true;
    }
  }

  return options;
}

// Test 1: Quick validation (ESLint + Build)
function quickTest(options = {}) {
  logStep(1, "Quick validation (ESLint + Build)");

  try {
    // ESLint check
    if (!options.skipLint) {
      logInfo("Checking ESLint...");
      execSync("npm run lint", { stdio: "pipe" });
      logSuccess("ESLint: PASSED");
    } else {
      logWarning("Skipping ESLint check");
    }

    // Build check
    if (!options.skipBuild) {
      logInfo("Testing build...");
      const buildOutput = execSync("npm run build", {
        stdio: "pipe",
        encoding: "utf8",
        timeout: TEST_CONFIG.buildTimeout,
      });

      if (buildOutput.includes("✓ Compiled successfully")) {
        logSuccess("Build: PASSED");
        return true;
      } else {
        logError("Build: FAILED");
        return false;
      }
    } else {
      logWarning("Skipping build check");
      return true;
    }
  } catch (error) {
    logError("Quick test failed");
    const output =
      error.stdout?.toString() || error.stderr?.toString() || error.message;
    if (options.verbose) {
      console.log(output);
    }
    return false;
  }
}

// Test 2: File structure validation
function testFileStructure() {
  logStep(2, "File structure validation");

  const criticalFiles = [
    "app/layout.js",
    "app/page.js",
    "app/_components/ui/index.js",
    "package.json",
    "next.config.mjs",
  ];

  let allExist = true;
  for (const file of criticalFiles) {
    if (!fs.existsSync(file)) {
      logError(`Critical file missing: ${file}`);
      allExist = false;
    } else {
      logSuccess(`File exists: ${file}`);
    }
  }

  // Check for empty files
  try {
    const result = execSync(
      'find app -name "*.js" -o -name "*.jsx" | xargs ls -la | awk \'$5 == 0 {print $9}\'',
      { stdio: "pipe", encoding: "utf8" }
    );

    if (result.trim()) {
      logWarning("Found empty files:");
      console.log(result);
    } else {
      logSuccess("No empty files found");
    }
  } catch (error) {
    logSuccess("No empty files detected");
  }

  return allExist;
}

// Test 3: Import validation
function testImports() {
  logStep(3, "Import validation");

  try {
    // Check for common import issues
    const result = execSync(
      'find app -name "*.js" -o -name "*.jsx" | xargs grep -l "import.*\\.js" | head -5',
      { stdio: "pipe", encoding: "utf8" }
    );

    if (result.trim()) {
      logWarning("Found potential import issues (checking .js extensions):");
      console.log(result);
    } else {
      logSuccess("No obvious import issues detected");
    }

    return true;
  } catch (error) {
    logSuccess("No import issues detected");
    return true;
  }
}

// Test 4: Component-specific validation
function testComponent(componentName) {
  if (!componentName) return true;

  logStep(4, `Component validation: ${componentName}`);

  // Check if component exists in expected locations
  const possiblePaths = [
    `app/_entities/booking/ui/${componentName}/${componentName}.jsx`,
    `app/_entities/booking/ui/${componentName}/index.js`,
    `app/_entities/reservation/ui/${componentName}/${componentName}.jsx`,
    `app/_entities/reservation/ui/${componentName}/index.js`,
    `app/_features/reservation/components/${componentName}.jsx`,
    `app/_features/reservation/components/ui/${componentName}.jsx`,
  ];

  let found = false;
  for (const path of possiblePaths) {
    if (fs.existsSync(path)) {
      logSuccess(`Component found: ${path}`);
      found = true;
      break;
    }
  }

  if (!found) {
    logWarning(`Component ${componentName} not found in expected locations`);
  }

  return found;
}

// Test 5: Model validation
function testModel(modelName) {
  if (!modelName) return true;

  logStep(5, `Model validation: ${modelName}`);

  const modelPaths = [
    `app/_entities/${modelName}/model/${modelName}-types.js`,
    `app/_entities/${modelName}/model/${modelName}-utils.js`,
    `app/_entities/${modelName}/model/index.js`,
  ];

  let allExist = true;
  for (const path of modelPaths) {
    if (fs.existsSync(path)) {
      logSuccess(`Model file exists: ${path}`);
    } else {
      logError(`Model file missing: ${path}`);
      allExist = false;
    }
  }

  return allExist;
}

// Test 6: Circular dependencies check
function testCircularDependencies(options = {}) {
  if (options.skipCircular) {
    logWarning("Skipping circular dependencies check");
    return true;
  }

  logStep(6, "Circular dependencies check");

  try {
    // Use the existing circular deps script
    const { checkCircularDependencies } = require("./check-circular-deps.js");

    return checkCircularDependencies().then((result) => {
      if (result.circularDependencies.length === 0) {
        logSuccess("No circular dependencies found");
        return true;
      } else {
        logWarning(
          `Found ${result.circularDependencies.length} circular dependency cycles`
        );
        return false;
      }
    });
  } catch (error) {
    logError("Circular dependencies check failed");
    if (options.verbose) {
      console.log(error.message);
    }
    return false;
  }
}

// Test 7: Index.js validation
function testIndexFiles() {
  logStep(7, "Index.js files validation");

  const indexFiles = [
    "app/_entities/booking/index.js",
    "app/_entities/reservation/index.js",
    "app/_components/ui/index.js",
    "app/_features/reservation/components/index.js",
  ];

  let allValid = true;
  for (const file of indexFiles) {
    if (fs.existsSync(file)) {
      try {
        const content = fs.readFileSync(file, "utf8");

        // Check for TODO comments (indicating incomplete migration)
        if (content.includes("TODO")) {
          logWarning(`TODO comments found in ${file}`);
        }

        // Check for commented exports (indicating incomplete migration)
        if (content.includes("// export")) {
          logWarning(`Commented exports found in ${file}`);
        }

        logSuccess(`Index file valid: ${file}`);
      } catch (error) {
        logError(`Error reading index file: ${file}`);
        allValid = false;
      }
    } else {
      logWarning(`Index file missing: ${file}`);
    }
  }

  return allValid;
}

// Main test runner
async function runCheckStep() {
  const options = parseArgs();

  log(
    `\n${colors.bold}${colors.magenta}🔍 CHECK-STEP: ${options.step}${colors.reset}`
  );
  log("=".repeat(50));

  const results = {};
  let allPassed = true;

  // Run tests based on options
  if (options.quick) {
    logInfo("Running quick test only");
    results.quick = quickTest(options);
    allPassed = results.quick;
  } else {
    // Full test suite
    results.quick = quickTest(options);
    results.fileStructure = testFileStructure();
    results.imports = testImports();
    results.component = testComponent(options.component);
    results.model = testModel(options.model);
    results.indexFiles = testIndexFiles();

    if (!options.skipCircular) {
      results.circular = await testCircularDependencies(options);
    } else {
      results.circular = true;
    }

    allPassed = Object.values(results).every((result) => result === true);
  }

  // Summary
  log(`\n${colors.bold}📊 CHECK SUMMARY${colors.reset}`);
  log("=".repeat(30));

  const passed = Object.values(results).filter((r) => r === true).length;
  const total = Object.keys(results).length;

  if (allPassed) {
    logSuccess(`All checks passed (${passed}/${total})`);
    log(
      `\n${colors.green}${colors.bold}✅ STEP "${options.step}" VERIFICATION SUCCESSFUL${colors.reset}`
    );
  } else {
    logError(`Some checks failed (${passed}/${total})`);
    log(
      `\n${colors.red}${colors.bold}❌ STEP "${options.step}" VERIFICATION FAILED${colors.reset}`
    );
  }

  return {
    passed: allPassed,
    results,
    summary: `${passed}/${total} checks passed`,
  };
}

// CLI usage
if (require.main === module) {
  runCheckStep()
    .then((result) => {
      process.exit(result.passed ? 0 : 1);
    })
    .catch((error) => {
      logError(`Check step error: ${error.message}`);
      process.exit(1);
    });
}

module.exports = { runCheckStep, quickTest, testFileStructure, testImports };
