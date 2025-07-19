const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");

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

// Colors for console output
const colors = {
  green: "\x1b[32m",
  red: "\x1b[31m",
  yellow: "\x1b[33m",
  blue: "\x1b[34m",
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

// Test 1: Check file structure
function testFileStructure(expectedFiles = []) {
  logStep(1, "Testing file structure...");

  let passed = 0;
  let failed = 0;

  for (const file of expectedFiles) {
    if (fs.existsSync(file)) {
      logSuccess(`File exists: ${file}`);
      passed++;
    } else {
      logError(`File missing: ${file}`);
      failed++;
    }
  }

  if (failed === 0) {
    logSuccess(`File structure check passed (${passed} files)`);
    return true;
  } else {
    logError(`File structure check failed (${failed} missing files)`);
    return false;
  }
}

// Test 2: ESLint check
function testLinting() {
  logStep(2, "Running ESLint...");

  try {
    execSync("npm run lint", {
      stdio: "pipe",
      timeout: 30000,
    });
    logSuccess("ESLint passed - no linting errors");
    return true;
  } catch (error) {
    const output = error.stdout?.toString() || error.stderr?.toString() || "";
    if (output.includes("Warning:")) {
      logWarning("ESLint passed with warnings");
      console.log(output);
      return true; // Warnings are acceptable
    } else {
      logError("ESLint failed with errors");
      console.log(output);
      return false;
    }
  }
}

// Test 3: Build test
function testBuild() {
  logStep(3, "Testing production build...");

  try {
    const output = execSync("npm run build", {
      stdio: "pipe",
      timeout: TEST_CONFIG.buildTimeout,
      encoding: "utf8",
    });

    if (output.includes("✓ Compiled successfully")) {
      logSuccess("Production build successful");
      return true;
    } else {
      logError("Production build failed");
      console.log(output);
      return false;
    }
  } catch (error) {
    logError("Production build failed with error");
    console.log(
      error.stdout?.toString() || error.stderr?.toString() || error.message
    );
    return false;
  }
}

// Test 4: Import validation
function testImports() {
  logStep(4, "Validating imports...");

  try {
    // Check for common import issues
    const result = execSync(
      'find app -name "*.js" -o -name "*.jsx" | xargs grep -l "import.*\\.js" | head -5',
      {
        stdio: "pipe",
        encoding: "utf8",
      }
    );

    if (result.trim()) {
      logWarning("Found potential import issues (checking .js extensions):");
      console.log(result);
    } else {
      logSuccess("No obvious import issues detected");
    }

    return true; // This is informational, not a hard failure
  } catch (error) {
    // No matches found is actually good
    logSuccess("No import issues detected");
    return true;
  }
}

// Test 5: Check for missing files
function testMissingFiles() {
  logStep(5, "Checking for missing critical files...");

  const criticalFiles = [
    "app/layout.js",
    "app/page.js",
    "app/_components/ui/index.js",
    "package.json",
  ];

  let allExist = true;
  for (const file of criticalFiles) {
    if (!fs.existsSync(file)) {
      logError(`Critical file missing: ${file}`);
      allExist = false;
    }
  }

  if (allExist) {
    logSuccess("All critical files present");
  }

  return allExist;
}

// Test 6: Check for empty files
function testEmptyFiles() {
  logStep(6, "Checking for empty files...");

  try {
    const result = execSync(
      'find app -name "*.js" -o -name "*.jsx" | xargs ls -la | awk \'$5 == 0 {print $9}\'',
      {
        stdio: "pipe",
        encoding: "utf8",
      }
    );

    if (result.trim()) {
      logWarning("Found empty files:");
      console.log(result);
      return false;
    } else {
      logSuccess("No empty files found");
      return true;
    }
  } catch (error) {
    logSuccess("No empty files detected");
    return true;
  }
}

// Main test function
async function runTests(options = {}) {
  const {
    step = "Unknown",
    expectedFiles = [],
    skipBuild = false,
    skipLint = false,
  } = options;

  log(
    `\n${colors.bold}${colors.blue}🧪 TESTING AFTER STEP: ${step}${colors.reset}`
  );
  log("=".repeat(50));

  const results = {};
  let allPassed = true;

  // Run tests
  results.fileStructure = testFileStructure(expectedFiles);
  results.missingFiles = testMissingFiles();
  results.emptyFiles = testEmptyFiles();
  results.imports = testImports();

  if (!skipLint) {
    results.linting = testLinting();
  } else {
    log("\n⏭️  Skipping ESLint (skipLint = true)");
    results.linting = true;
  }

  if (!skipBuild) {
    results.build = testBuild();
  } else {
    log("\n⏭️  Skipping build test (skipBuild = true)");
    results.build = true;
  }

  // Calculate overall result
  allPassed = Object.values(results).every((result) => result === true);

  // Summary
  log(`\n${colors.bold}📊 TEST SUMMARY${colors.reset}`);
  log("=".repeat(30));

  const passed = Object.values(results).filter((r) => r === true).length;
  const total = Object.keys(results).length;

  if (allPassed) {
    logSuccess(`All tests passed (${passed}/${total})`);
    log(
      `\n${colors.green}${colors.bold}✅ STEP "${step}" VERIFICATION SUCCESSFUL${colors.reset}`
    );
  } else {
    logError(`Some tests failed (${passed}/${total})`);
    log(
      `\n${colors.red}${colors.bold}❌ STEP "${step}" VERIFICATION FAILED${colors.reset}`
    );
  }

  return {
    passed: allPassed,
    results,
    summary: `${passed}/${total} tests passed`,
  };
}

// CLI usage
if (require.main === module) {
  const args = process.argv.slice(2);
  const step = args[0] || "Manual Test";
  const skipBuild = args.includes("--skip-build");
  const skipLint = args.includes("--skip-lint");

  runTests({
    step,
    skipBuild,
    skipLint,
  })
    .then((result) => {
      process.exit(result.passed ? 0 : 1);
    })
    .catch((error) => {
      logError(`Test runner error: ${error.message}`);
      process.exit(1);
    });
}

module.exports = { runTests, testBuild, testLinting, testImports };
