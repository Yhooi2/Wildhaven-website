#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const { exec } = require("child_process");

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

// Проверка работы сервера
function checkServer() {
  return new Promise((resolve) => {
    exec("curl -s http://localhost:3000 > /dev/null", (error) => {
      if (error) {
        console.log("❌ Сервер не запущен или недоступен");
        resolve(false);
      } else {
        console.log("✅ Сервер работает корректно");
        resolve(true);
      }
    });
  });
}

// Проверка линтера
function checkLinter() {
  return new Promise((resolve) => {
    exec("npx next lint --quiet", (error, stdout, stderr) => {
      if (error && error.code !== 0) {
        console.log("❌ Линтер обнаружил ошибки:");
        console.log(stderr);
        resolve(false);
      } else {
        console.log("✅ Линтер не обнаружил критических ошибок");
        resolve(true);
      }
    });
  });
}

async function runTests() {
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

  let structureOk = true;
  requiredDirs.forEach((dir) => {
    if (!checkFileExists(dir)) structureOk = false;
  });

  // Тест 2: Проверка файлов утилит
  console.log("\n🔧 Проверка файлов утилит:");
  const utilFiles = [
    "app/_features/reservation/utils/pricing.js",
    "app/_features/reservation/utils/dateHelpers.js",
    "app/_features/reservation/utils/index.js",
  ];

  let utilsOk = true;
  utilFiles.forEach((file) => {
    if (!checkFileExists(file)) utilsOk = false;
  });

  // Тест 3: Проверка компонентов (гибко - некоторые могут быть еще не перенесены)
  console.log("\n⚛️ Проверка компонентов:");
  const componentFiles = [
    "app/_features/reservation/components/DateSelector.jsx",
    "app/_features/reservation/components/DateSelector.styles.js",
    "app/_features/reservation/components/ui/PriceDisplay.jsx",
    "app/_features/reservation/components/ui/BookingSummary.jsx",
    "app/_features/reservation/components/ui/ClearButton.jsx",
    "app/_features/reservation/components/ui/index.js",
  ];

  let componentsOk = true;
  componentFiles.forEach((file) => {
    if (!checkFileExists(file)) componentsOk = false;
  });

  // Тест 4: Проверка импортов (только если файлы существуют)
  console.log("\n📦 Проверка импортов:");
  let importsOk = true;

  if (fs.existsSync("app/_features/reservation/components/DateSelector.jsx")) {
    if (
      !checkImports("app/_features/reservation/components/DateSelector.jsx", [
        'import { calculatePricing } from "../utils"',
      ])
    )
      importsOk = false;
  }

  if (fs.existsSync("app/_features/reservation/utils/index.js")) {
    if (
      !checkImports("app/_features/reservation/utils/index.js", [
        'export * from "./pricing"',
        'export * from "./dateHelpers"',
      ])
    )
      importsOk = false;
  }

  // Тест 5: Проверка линтера
  console.log("\n🔍 Проверка линтера:");
  const linterOk = await checkLinter();

  // Тест 6: Проверка сервера
  console.log("\n🌐 Проверка сервера:");
  const serverOk = await checkServer();

  // Итоговый результат
  console.log("\n📊 Результаты тестирования:");
  console.log(`📁 Структура папок: ${structureOk ? "✅" : "❌"}`);
  console.log(`🔧 Утилиты: ${utilsOk ? "✅" : "❌"}`);
  console.log(`⚛️ Компоненты: ${componentsOk ? "✅" : "❌"}`);
  console.log(`📦 Импорты: ${importsOk ? "✅" : "❌"}`);
  console.log(`🔍 Линтер: ${linterOk ? "✅" : "❌"}`);
  console.log(`🌐 Сервер: ${serverOk ? "✅" : "❌"}`);

  const allOk =
    structureOk && utilsOk && componentsOk && importsOk && linterOk && serverOk;
  console.log(
    `\n🎯 Общий статус: ${allOk ? "✅ ВСЕ ТЕСТЫ ПРОЙДЕНЫ" : "❌ ЕСТЬ ПРОБЛЕМЫ"}`
  );

  if (!allOk) {
    console.log(
      "\n⚠️ Рекомендуется исправить проблемы перед переходом к следующему шагу!"
    );
    process.exit(1);
  }

  console.log("\n🎉 Можно переходить к следующему шагу!");
}

// Запуск тестов
runTests().catch(console.error);
