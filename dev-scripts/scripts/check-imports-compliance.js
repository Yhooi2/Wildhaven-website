#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

/**
 * Проверка соответствия рекомендациям Next.js 15 по импортам
 */

function checkFile(filePath) {
  const content = fs.readFileSync(filePath, "utf8");
  const lines = content.split("\n");
  const issues = [];

  // Проверка на CommonJS require
  if (
    content.includes("require(") &&
    !filePath.includes("scripts/") &&
    !filePath.includes("dev-scripts/")
  ) {
    issues.push("❌ Обнаружен CommonJS require - используйте ES Modules");
  }

  // Проверка на относительные пути (более 2 уровней)
  const relativePathRegex = /import.*from\s+["']\.\.\/\.\.\/\.\./g;
  if (relativePathRegex.test(content)) {
    issues.push(
      "❌ Обнаружены длинные относительные пути - используйте абсолютные пути с @/"
    );
  }

  // Проверка на default экспорты в компонентах (кроме страниц и layout)
  if (
    content.includes("export default") &&
    !filePath.includes("page.js") &&
    !filePath.includes("layout.js") &&
    !filePath.includes("loading.js") &&
    !filePath.includes("error.js") &&
    !filePath.includes("not-found.js")
  ) {
    issues.push(
      "❌ Обнаружен default экспорт в компоненте - используйте именованные экспорты"
    );
  }

  // Проверка на отсутствие @/ алиасов
  const importLines = lines.filter(
    (line) => line.includes("import") && line.includes("from")
  );
  const hasRelativeImports = importLines.some(
    (line) =>
      line.includes("from") &&
      (line.includes("../") || line.includes("./")) &&
      !line.includes("@/")
  );

  if (hasRelativeImports) {
    issues.push("❌ Обнаружены относительные импорты без @/ алиасов");
  }

  return issues;
}

function checkProject() {
  console.log(
    "🔍 Проверка соответствия рекомендациям Next.js 15 по импортам...\n"
  );

  const appDir = path.join(process.cwd(), "app");
  const issues = [];

  function scanDirectory(dir) {
    const files = fs.readdirSync(dir);

    for (const file of files) {
      const filePath = path.join(dir, file);
      const stat = fs.statSync(filePath);

      if (stat.isDirectory()) {
        scanDirectory(filePath);
      } else if (file.endsWith(".js") || file.endsWith(".jsx")) {
        const fileIssues = checkFile(filePath);
        if (fileIssues.length > 0) {
          issues.push({
            file: filePath.replace(process.cwd(), ""),
            issues: fileIssues,
          });
        }
      }
    }
  }

  scanDirectory(appDir);

  if (issues.length === 0) {
    console.log(
      "✅ Все файлы соответствуют рекомендациям Next.js 15 по импортам!"
    );
    return true;
  } else {
    console.log("❌ Обнаружены проблемы с импортами:\n");

    issues.forEach(({ file, issues: fileIssues }) => {
      console.log(`📁 ${file}:`);
      fileIssues.forEach((issue) => console.log(`  ${issue}`));
      console.log("");
    });

    return false;
  }
}

// Проверка циклических зависимостей
function checkCircularDependencies() {
  try {
    console.log("🔄 Проверка циклических зависимостей...");
    execSync("npm run check:circular", { stdio: "inherit" });
    console.log("✅ Циклических зависимостей не обнаружено!\n");
    return true;
  } catch (error) {
    console.log("❌ Обнаружены циклические зависимости!\n");
    return false;
  }
}

// Проверка ESLint
function checkESLint() {
  try {
    console.log("🔍 Проверка ESLint...");
    execSync("npm run lint", { stdio: "inherit" });
    console.log("✅ ESLint проходит без ошибок!\n");
    return true;
  } catch (error) {
    console.log("❌ ESLint обнаружил ошибки!\n");
    return false;
  }
}

// Проверка сборки
function checkBuild() {
  try {
    console.log("🏗️ Проверка сборки...");
    execSync("npm run build", { stdio: "inherit" });
    console.log("✅ Проект собирается без ошибок!\n");
    return true;
  } catch (error) {
    console.log("❌ Ошибки при сборке проекта!\n");
    return false;
  }
}

// Главная функция
function main() {
  console.log("🚀 Проверка соответствия рекомендациям Next.js 15\n");

  const results = {
    imports: checkProject(),
    circular: checkCircularDependencies(),
    eslint: checkESLint(),
    build: checkBuild(),
  };

  console.log("📊 Результаты проверки:");
  console.log(`  ✅ Импорты: ${results.imports ? "ПРОЙДЕНО" : "ОШИБКИ"}`);
  console.log(
    `  ✅ Циклические зависимости: ${results.circular ? "ПРОЙДЕНО" : "ОШИБКИ"}`
  );
  console.log(`  ✅ ESLint: ${results.eslint ? "ПРОЙДЕНО" : "ОШИБКИ"}`);
  console.log(`  ✅ Сборка: ${results.build ? "ПРОЙДЕНО" : "ОШИБКИ"}`);

  const allPassed = Object.values(results).every((result) => result);

  if (allPassed) {
    console.log(
      "\n🎉 Все проверки пройдены! Проект соответствует рекомендациям Next.js 15."
    );
    process.exit(0);
  } else {
    console.log("\n⚠️ Обнаружены проблемы. Исправьте их перед продолжением.");
    process.exit(1);
  }
}

if (require.main === module) {
  main();
}

module.exports = {
  checkProject,
  checkCircularDependencies,
  checkESLint,
  checkBuild,
};
