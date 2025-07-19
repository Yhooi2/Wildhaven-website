#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

console.log("🧪 Тестирование текущего шага рефакторинга...\n");

// Проверка существования файлов
function checkFileExists(filePath) {
  const exists = fs.existsSync(filePath);
  console.log(`${exists ? "✅" : "❌"} ${filePath}`);
  return exists;
}

// Проверка импортов в файле
function checkImports(filePath, expectedImports) {
  if (!fs.existsSync(filePath)) {
    console.log(`❌ ${filePath} не существует`);
    return false;
  }

  const content = fs.readFileSync(filePath, "utf8");
  let allImportsFound = true;

  expectedImports.forEach((importStr) => {
    const found = content.includes(importStr);
    if (!found) {
      console.log(`❌ ${filePath}: не найден импорт "${importStr}"`);
      allImportsFound = false;
    }
  });

  if (allImportsFound) {
    console.log(`✅ ${filePath}: все импорты корректны`);
  }

  return allImportsFound;
}

// Тест 1: Проверка структуры папок
console.log("📁 Проверка структуры папок:");
const requiredDirs = [
  "app/_features",
  "app/_features/reservation",
  "app/_features/reservation/components",
  "app/_features/reservation/components/ui",
  "app/_features/reservation/context",
  "app/_features/reservation/hooks",
  "app/_features/reservation/utils",
];

requiredDirs.forEach((dir) => checkFileExists(dir));

// Тест 2: Проверка файлов утилит
console.log("\n🔧 Проверка файлов утилит:");
const utilFiles = [
  "app/_features/reservation/utils/pricing.js",
  "app/_features/reservation/utils/dateHelpers.js",
  "app/_features/reservation/utils/index.js",
];

utilFiles.forEach((file) => checkFileExists(file));

// Тест 3: Проверка компонентов
console.log("\n⚛️ Проверка компонентов:");
const componentFiles = [
  "app/_features/reservation/components/DateSelector.jsx",
  "app/_features/reservation/components/DateSelector.styles.js",
  "app/_features/reservation/components/ui/PriceDisplay.jsx",
  "app/_features/reservation/components/ui/BookingSummary.jsx",
  "app/_features/reservation/components/ui/ClearButton.jsx",
  "app/_features/reservation/components/ui/index.js",
];

componentFiles.forEach((file) => checkFileExists(file));

// Тест 4: Проверка импортов
console.log("\n📦 Проверка импортов:");
checkImports("app/_features/reservation/components/DateSelector.jsx", [
  'import { calculatePricing } from "../utils"',
]);

checkImports("app/_features/reservation/utils/index.js", [
  'export * from "./pricing"',
  'export * from "./dateHelpers"',
]);

console.log("\n🎉 Тестирование завершено!");
