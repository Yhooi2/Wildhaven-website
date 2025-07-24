const { execSync } = require("child_process");

// Quick test function - just the essentials
function quickTest(stepName = "Quick Test") {
  console.log(`\n🧪 ${stepName} - Quick Validation`);
  console.log("=".repeat(40));

  try {
    // Test 1: Lint check
    console.log("1️⃣  Checking ESLint...");
    execSync("npm run lint", { stdio: "pipe" });
    console.log("✅ ESLint: PASSED");

    // Test 2: Build check
    console.log("2️⃣  Testing build...");
    const buildOutput = execSync("npm run build", {
      stdio: "pipe",
      encoding: "utf8",
      timeout: 60000,
    });

    if (buildOutput.includes("✓ Compiled successfully")) {
      console.log("✅ Build: PASSED");
    } else {
      console.log("❌ Build: FAILED");
      return false;
    }

    console.log("\n✅ QUICK TEST PASSED");
    return true;
  } catch (error) {
    console.log("❌ QUICK TEST FAILED");
    const output =
      error.stdout?.toString() || error.stderr?.toString() || error.message;
    console.log(output);
    return false;
  }
}

// CLI usage
if (require.main === module) {
  const stepName = process.argv[2] || "Manual Quick Test";
  const success = quickTest(stepName);
  process.exit(success ? 0 : 1);
}

module.exports = { quickTest };
