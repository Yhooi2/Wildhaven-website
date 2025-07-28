const fs = require("fs");
const path = require("path");
const madge = require("madge");

// Directories to analyze
const APP_DIR = "./app";

// Function to generate comprehensive dependency report
async function generateDependencyReport() {
  console.log("📊 Generating comprehensive dependency report...\n");

  try {
    // Generate dependency tree using madge
    const result = await madge(APP_DIR, {
      fileExtensions: ["js", "jsx"],
      excludeRegExp: [/node_modules/, /\.next/, /\.git/],
    });

    const dependencyTree = result.obj();
    const circularDependencies = result.circular();

    // Analyze dependency statistics
    const allModules = Object.keys(dependencyTree);
    const totalModules = allModules.length;
    const totalDependencies = Object.values(dependencyTree).reduce(
      (sum, deps) => sum + deps.length,
      0
    );
    const circularCount = circularDependencies.length;

    // Calculate dependency metrics
    const avgDependencies = totalDependencies / totalModules;
    const maxDependencies = Math.max(
      ...Object.values(dependencyTree).map((deps) => deps.length)
    );
    const minDependencies = Math.min(
      ...Object.values(dependencyTree).map((deps) => deps.length)
    );

    // Find most dependent modules
    const modulesByDependencyCount = Object.entries(dependencyTree)
      .map(([module, deps]) => ({
        module,
        count: deps.length,
        dependencies: deps,
      }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 15);

    // Find modules with most dependents (reverse dependencies)
    const dependentsMap = {};
    Object.entries(dependencyTree).forEach(([module, deps]) => {
      deps.forEach((dep) => {
        if (!dependentsMap[dep]) dependentsMap[dep] = [];
        dependentsMap[dep].push(module);
      });
    });

    const modulesByDependentsCount = Object.entries(dependentsMap)
      .map(([module, dependents]) => ({
        module,
        count: dependents.length,
        dependents,
      }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 15);

    // Generate report structure
    const report = {
      metadata: {
        generatedAt: new Date().toISOString(),
        appDirectory: APP_DIR,
        totalModules,
        totalDependencies,
        circularDependenciesCount: circularCount,
      },
      statistics: {
        averageDependencies: avgDependencies,
        maxDependencies,
        minDependencies,
        dependencyDensity:
          totalDependencies / (totalModules * (totalModules - 1)),
      },
      dependencyTree,
      circularDependencies: circularDependencies.map((cycle) => ({
        cycle,
        length: cycle.length,
        modules: cycle,
      })),
      topModulesByDependencies: modulesByDependencyCount,
      topModulesByDependents: modulesByDependentsCount,
      analysis: {
        criticalModules: modulesByDependencyCount.filter(
          (m) => m.count > avgDependencies * 2
        ),
        isolatedModules: modulesByDependencyCount.filter((m) => m.count === 0),
        highlyDependentModules: modulesByDependentsCount.filter(
          (m) => m.count > avgDependencies * 2
        ),
      },
    };

    // Save comprehensive report
    const reportPath = "./scripts/dependency-report.json";
    fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));

    // Output summary
    console.log("📋 DEPENDENCY REPORT SUMMARY:");
    console.log("=============================\n");

    console.log(`📊 General Statistics:`);
    console.log(`   - Total modules: ${totalModules}`);
    console.log(`   - Total dependencies: ${totalDependencies}`);
    console.log(
      `   - Average dependencies per module: ${avgDependencies.toFixed(2)}`
    );
    console.log(`   - Max dependencies in a module: ${maxDependencies}`);
    console.log(`   - Min dependencies in a module: ${minDependencies}\n`);

    console.log(`⚠️  Issues Found:`);
    console.log(`   - Circular dependencies: ${circularCount}\n`);

    if (circularCount > 0) {
      console.log(`🔄 Circular Dependencies:`);
      circularDependencies.forEach((cycle, index) => {
        console.log(`   ${index + 1}. ${cycle.join(" → ")}`);
      });
      console.log();
    }

    console.log(`🔝 Top 5 modules by dependency count:`);
    modulesByDependencyCount.slice(0, 5).forEach((module, index) => {
      console.log(`   ${index + 1}. ${module.module} (${module.count} deps)`);
    });

    console.log(`\n🔝 Top 5 modules by dependents count:`);
    modulesByDependentsCount.slice(0, 5).forEach((module, index) => {
      console.log(
        `   ${index + 1}. ${module.module} (${module.count} dependents)`
      );
    });

    console.log(`\n💾 Comprehensive report saved to: ${reportPath}`);

    return report;
  } catch (error) {
    console.error("❌ Error generating dependency report:", error.message);
    throw error;
  }
}

// Function to generate simplified report for specific use cases
async function generateSimpleReport() {
  try {
    const result = await madge(APP_DIR, {
      fileExtensions: ["js", "jsx"],
    });

    const simpleReport = {
      modules: Object.keys(result.obj()),
      dependencies: result.obj(),
      circular: result.circular(),
    };

    fs.writeFileSync(
      "./scripts/simple-dependency-report.json",
      JSON.stringify(simpleReport, null, 2)
    );

    console.log(
      "💾 Simple report saved to scripts/simple-dependency-report.json"
    );
    return simpleReport;
  } catch (error) {
    console.error("❌ Error generating simple report:", error.message);
    throw error;
  }
}

// Run report generation
if (require.main === module) {
  generateDependencyReport().catch(console.error);
}

module.exports = { generateDependencyReport, generateSimpleReport };
