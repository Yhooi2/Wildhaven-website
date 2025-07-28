const fs = require("fs");
const path = require("path");
const madge = require("madge");

// Directories to analyze
const APP_DIR = "./app";

// Function to find all .js and .jsx files recursively
function findJSFiles(dir) {
  const files = [];

  function walkDir(currentDir) {
    const items = fs.readdirSync(currentDir);

    for (const item of items) {
      const fullPath = path.join(currentDir, item);
      const stat = fs.statSync(fullPath);

      if (stat.isDirectory()) {
        walkDir(fullPath);
      } else if (item.endsWith(".js") || item.endsWith(".jsx")) {
        files.push(fullPath);
      }
    }
  }

  walkDir(dir);
  return files;
}

// Function to analyze dependencies for a specific file
function analyzeFileDependencies(filePath) {
  try {
    const content = fs.readFileSync(filePath, "utf8");
    const imports = [];

    // Find import statements
    const importRegex =
      /import\s+(?:(?:\{[^}]*\}|\*\s+as\s+\w+|\w+)(?:\s*,\s*(?:\{[^}]*\}|\*\s+as\s+\w+|\w+))*\s+from\s+)?['"]([^'"]+)['"]/g;
    let match;

    while ((match = importRegex.exec(content)) !== null) {
      const importPath = match[1];
      if (!importPath.startsWith(".") && !importPath.startsWith("/")) {
        // External dependency
        imports.push({
          type: "external",
          path: importPath,
          line: content.substring(0, match.index).split("\n").length,
        });
      } else {
        // Internal dependency
        imports.push({
          type: "internal",
          path: importPath,
          line: content.substring(0, match.index).split("\n").length,
        });
      }
    }

    return imports;
  } catch (error) {
    console.error(`Error analyzing file ${filePath}:`, error.message);
    return [];
  }
}

// Main analysis function
async function analyzeDependencies() {
  console.log("🔍 Analyzing dependencies in the project...\n");

  const allJSFiles = findJSFiles(APP_DIR);
  const dependencyAnalysis = {};

  // Analyze each file
  for (const file of allJSFiles) {
    const relativePath = path.relative(".", file);
    const dependencies = analyzeFileDependencies(file);

    dependencyAnalysis[relativePath] = {
      dependencies: dependencies,
      externalCount: dependencies.filter((d) => d.type === "external").length,
      internalCount: dependencies.filter((d) => d.type === "internal").length,
      totalCount: dependencies.length,
    };
  }

  // Generate statistics
  const totalFiles = Object.keys(dependencyAnalysis).length;
  const totalDependencies = Object.values(dependencyAnalysis).reduce(
    (sum, file) => sum + file.totalCount,
    0
  );
  const totalExternal = Object.values(dependencyAnalysis).reduce(
    (sum, file) => sum + file.externalCount,
    0
  );
  const totalInternal = Object.values(dependencyAnalysis).reduce(
    (sum, file) => sum + file.internalCount,
    0
  );

  // Find files with most dependencies
  const filesByDependencies = Object.entries(dependencyAnalysis)
    .sort((a, b) => b[1].totalCount - a[1].totalCount)
    .slice(0, 10);

  // Output results
  console.log("📋 DEPENDENCY ANALYSIS RESULTS:");
  console.log("==============================\n");

  console.log(`📊 Summary:`);
  console.log(`   - Total files analyzed: ${totalFiles}`);
  console.log(`   - Total dependencies: ${totalDependencies}`);
  console.log(`   - External dependencies: ${totalExternal}`);
  console.log(`   - Internal dependencies: ${totalInternal}`);
  console.log(
    `   - Average dependencies per file: ${(totalDependencies / totalFiles).toFixed(2)}\n`
  );

  console.log(`🔝 Top 10 files by dependency count:`);
  filesByDependencies.forEach(([file, stats], index) => {
    console.log(
      `   ${index + 1}. ${file} (${stats.totalCount} deps: ${stats.externalCount} external, ${stats.internalCount} internal)`
    );
  });

  // Find files with no dependencies
  const filesWithNoDeps = Object.entries(dependencyAnalysis)
    .filter(([file, stats]) => stats.totalCount === 0)
    .map(([file]) => file);

  if (filesWithNoDeps.length > 0) {
    console.log(`\n📦 Files with no dependencies (${filesWithNoDeps.length}):`);
    filesWithNoDeps.forEach((file) => console.log(`   ${file}`));
  }

  // Save detailed results
  const results = {
    summary: {
      totalFiles,
      totalDependencies,
      totalExternal,
      totalInternal,
      averageDependencies: totalDependencies / totalFiles,
    },
    filesByDependencies: filesByDependencies,
    filesWithNoDeps,
    detailedAnalysis: dependencyAnalysis,
  };

  fs.writeFileSync(
    "./scripts/dependency-analysis.json",
    JSON.stringify(results, null, 2)
  );
  console.log(
    "\n💾 Detailed results saved to scripts/dependency-analysis.json"
  );

  return results;
}

// Run analysis
if (require.main === module) {
  analyzeDependencies().catch(console.error);
}

module.exports = { analyzeDependencies, analyzeFileDependencies };
