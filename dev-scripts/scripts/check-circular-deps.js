const fs = require("fs");
const path = require("path");
const madge = require("madge");

// Directories to analyze
const APP_DIR = "./app";

// Function to analyze circular dependencies in detail
async function checkCircularDependencies() {
  console.log("🔄 Checking for circular dependencies...\n");

  try {
    // Generate dependency tree using madge
    const result = await madge(APP_DIR, {
      fileExtensions: ["js", "jsx"],
      excludeRegExp: [/node_modules/, /\.next/, /\.git/],
    });

    const circularDependencies = result.circular();
    const dependencyTree = result.obj();

    if (circularDependencies.length === 0) {
      console.log("✅ No circular dependencies found!");
      return { circularDependencies: [], analysis: {} };
    }

    console.log(
      `⚠️  Found ${circularDependencies.length} circular dependency cycles:\n`
    );

    // Analyze each circular dependency
    const circularAnalysis = circularDependencies.map((cycle, index) => {
      console.log(`🔄 Cycle ${index + 1}:`);
      console.log(`   ${cycle.join(" → ")} → ${cycle[0]}`);
      console.log(`   Length: ${cycle.length} modules`);
      console.log();

      // Analyze the cycle in detail
      const cycleAnalysis = {
        cycle: cycle,
        length: cycle.length,
        modules: cycle,
        severity:
          cycle.length <= 2 ? "low" : cycle.length <= 4 ? "medium" : "high",
        suggestions: generateSuggestions(cycle, dependencyTree),
      };

      return cycleAnalysis;
    });

    // Generate summary statistics
    const totalCircularModules = new Set(circularDependencies.flat()).size;
    const avgCycleLength =
      circularDependencies.reduce((sum, cycle) => sum + cycle.length, 0) /
      circularDependencies.length;
    const maxCycleLength = Math.max(
      ...circularDependencies.map((cycle) => cycle.length)
    );
    const minCycleLength = Math.min(
      ...circularDependencies.map((cycle) => cycle.length)
    );

    console.log("📊 CIRCULAR DEPENDENCY STATISTICS:");
    console.log("==================================\n");

    console.log(`📈 Summary:`);
    console.log(`   - Total circular cycles: ${circularDependencies.length}`);
    console.log(`   - Total modules involved: ${totalCircularModules}`);
    console.log(`   - Average cycle length: ${avgCycleLength.toFixed(2)}`);
    console.log(`   - Longest cycle: ${maxCycleLength} modules`);
    console.log(`   - Shortest cycle: ${minCycleLength} modules\n`);

    // Categorize by severity
    const lowSeverity = circularAnalysis.filter((c) => c.severity === "low");
    const mediumSeverity = circularAnalysis.filter(
      (c) => c.severity === "medium"
    );
    const highSeverity = circularAnalysis.filter((c) => c.severity === "high");

    console.log(`⚠️  Severity Breakdown:`);
    console.log(`   - Low severity (≤2 modules): ${lowSeverity.length}`);
    console.log(`   - Medium severity (3-4 modules): ${mediumSeverity.length}`);
    console.log(`   - High severity (≥5 modules): ${highSeverity.length}\n`);

    // Show high severity cycles first
    if (highSeverity.length > 0) {
      console.log(`🚨 HIGH SEVERITY CYCLES:`);
      highSeverity.forEach((analysis, index) => {
        console.log(
          `   ${index + 1}. ${analysis.cycle.join(" → ")} → ${analysis.cycle[0]}`
        );
        console.log(`      Length: ${analysis.length} modules`);
        if (analysis.suggestions.length > 0) {
          console.log(`      Suggestions: ${analysis.suggestions.join(", ")}`);
        }
        console.log();
      });
    }

    // Generate detailed report
    const report = {
      metadata: {
        generatedAt: new Date().toISOString(),
        appDirectory: APP_DIR,
        totalCycles: circularDependencies.length,
        totalModulesInvolved: totalCircularModules,
        averageCycleLength: avgCycleLength,
        maxCycleLength,
        minCycleLength,
      },
      statistics: {
        lowSeverity: lowSeverity.length,
        mediumSeverity: mediumSeverity.length,
        highSeverity: highSeverity.length,
      },
      circularDependencies: circularAnalysis,
      allCycles: circularDependencies,
      dependencyTree: dependencyTree,
    };

    // Save detailed report
    const reportPath = "./scripts/circular-dependencies-report.json";
    fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));

    console.log(
      `💾 Detailed circular dependency report saved to: ${reportPath}`
    );

    return report;
  } catch (error) {
    console.error("❌ Error checking circular dependencies:", error.message);
    throw error;
  }
}

// Function to generate suggestions for breaking circular dependencies
function generateSuggestions(cycle, dependencyTree) {
  const suggestions = [];

  // Analyze the cycle to find potential break points
  for (let i = 0; i < cycle.length; i++) {
    const currentModule = cycle[i];
    const nextModule = cycle[(i + 1) % cycle.length];

    // Check if this is a simple index.js → component.js cycle
    if (currentModule.includes("index.js") && nextModule.includes(".jsx")) {
      suggestions.push(
        `Consider moving exports from ${currentModule} to avoid index.js cycles`
      );
    }

    // Check for component → index cycles
    if (currentModule.includes(".jsx") && nextModule.includes("index.js")) {
      suggestions.push(
        `Consider restructuring ${currentModule} to avoid index.js dependency`
      );
    }
  }

  // General suggestions based on cycle length
  if (cycle.length === 2) {
    suggestions.push(
      "Simple 2-module cycle - consider merging modules or creating a shared interface"
    );
  } else if (cycle.length > 4) {
    suggestions.push(
      "Complex cycle detected - consider introducing a shared service layer"
    );
  }

  return suggestions;
}

// Function to find modules that are part of multiple cycles
function findMultiCycleModules(circularDependencies) {
  const moduleCounts = {};

  circularDependencies.forEach((cycle) => {
    cycle.forEach((module) => {
      moduleCounts[module] = (moduleCounts[module] || 0) + 1;
    });
  });

  return Object.entries(moduleCounts)
    .filter(([module, count]) => count > 1)
    .sort((a, b) => b[1] - a[1]);
}

// Run circular dependency check
if (require.main === module) {
  checkCircularDependencies().catch(console.error);
}

module.exports = {
  checkCircularDependencies,
  generateSuggestions,
  findMultiCycleModules,
};
