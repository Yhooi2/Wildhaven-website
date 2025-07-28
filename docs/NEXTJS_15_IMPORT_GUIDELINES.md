# Рекомендации по импортам в Next.js 15

## 📋 Обзор

Этот документ содержит актуальные рекомендации по использованию импортов в Next.js 15, основанные на официальной документации и лучших практиках.

## 🎯 Основные принципы

### 1. ES Modules (ESM) - приоритетный подход

**Рекомендуется:**

```javascript
// ✅ Правильно - именованные импорты
import { Button, Container } from "@/components/ui";
import { Header, Logo } from "@/components/Header";

// ✅ Правильно - default импорты для страниц
import PageComponent from "./page";

// ✅ Правильно - динамические импорты
import dynamic from "next/dynamic";
const ClientComponent = dynamic(() => import("../components/ClientComponent"));
```

**Избегать:**

```javascript
// ❌ Не рекомендуется - CommonJS require
const component = require("./component");

// ❌ Не рекомендуется - export * с CommonJS модулями
export * from "./commonjs-module";
```

### 2. Централизованные экспорты

**Рекомендуется использовать index.js файлы для централизации экспортов:**

```javascript
// app/_components/index.js
export { Header, Logo, Navigation } from "./Header";
export { BackButton } from "./BackButton";
export { ErrorLayout } from "./ErrorLayout";
export { TextExpander } from "./TextExpander";

// app/_components/Header/index.js
export { default as Header } from "./Header.jsx";
export { default as Logo } from "./Logo.jsx";
export { default as Navigation } from "./Navigation.jsx";
```

### 3. Абсолютные пути с алиасами

**Настройка в jsconfig.json:**

```json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./*"]
    }
  }
}
```

**Использование:**

```javascript
// ✅ Правильно - абсолютные пути
import { Button } from "@/components/ui";
import { Header } from "@/components/Header";
import bg from "@/public/bg.png";

// ❌ Избегать - относительные пути
import Button from "../../../components/ui/Button";
```

## 🏗️ Архитектурные рекомендации

### 1. Feature-Sliced Architecture

**Структура импортов по слоям:**

```javascript
// 1. Внешние зависимости (самые дальние)
import React from "react";
import { NextResponse } from "next/server";

// 2. Внутренние API/утилиты
import { supabase } from "@/app/_api/supabase";
import { formatDate } from "@/app/_features/reservation/utils";

// 3. Shared компоненты
import { Button, Container } from "@/app/_components/ui";
import { Header } from "@/app/_components/Header";

// 4. Feature компоненты
import { ReservationForm } from "@/app/_features/reservation/components";

// 5. Локальные компоненты (самые близкие)
import { CabinCard } from "./_components/CabinCard";
```

### 2. Именованные экспорты vs Default экспорты

**Именованные экспорты (рекомендуется для компонентов):**

```javascript
// ✅ Правильно - именованные экспорты
export function Button({ children, ...props }) {
  return <button {...props}>{children}</button>;
}

export function Container({ children }) {
  return <div className="container">{children}</div>;
}
```

**Default экспорты (только для страниц и layout):**

```javascript
// ✅ Правильно - default экспорт для страниц
export default function Page() {
  return <div>Page content</div>;
}

// ✅ Правильно - default экспорт для layout
export default function Layout({ children }) {
  return <div>{children}</div>;
}
```

## 🚀 Next.js 15 специфичные рекомендации

### 1. Асинхронные параметры

**В Next.js 15 params и searchParams стали асинхронными:**

```javascript
// ✅ Правильно - асинхронный доступ
export default async function Page({ params, searchParams }) {
  const { slug } = await params;
  const { page } = await searchParams;

  return <div>Page: {slug}</div>;
}

// ❌ Неправильно - синхронный доступ
export default function Page({ params, searchParams }) {
  const { slug } = params; // Ошибка!
  return <div>Page: {slug}</div>;
}
```

### 2. Динамические импорты

**Для оптимизации производительности:**

```javascript
// ✅ Правильно - динамический импорт с именованными экспортами
import dynamic from "next/dynamic";

const ClientComponent = dynamic(() =>
  import("../components/hello").then((mod) => mod.Hello)
);

// ✅ Правильно - динамический импорт с default экспортом
const HeavyComponent = dynamic(() => import("../components/HeavyComponent"));
```

### 3. Импорты из внешних URL

**С поддержкой urlImports в Next.js 15:**

```javascript
// ✅ Правильно - импорт из внешнего URL
import { a, b, c } from "https://example.com/assets/some/module.js";
```

### 4. Оптимизация импортов пакетов

**Настройка в next.config.js:**

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    optimizePackageImports: ["@heroicons/react", "date-fns"],
  },
};

module.exports = nextConfig;
```

## 📁 Структура импортов в проекте

### 1. Компоненты UI

```javascript
// app/_components/ui/index.js
export { Button } from "./Button";
export { Container } from "./Container";
export { ErrorHeading, SectionHeading } from "./Heading";
export { Icon } from "./Icon";
export { Input } from "./Input";
export { Layout } from "./Layout";
export { Spinner } from "./Spinner";
export { SpinnerMini } from "./SpinnerMini";
export { Text } from "./Text";
```

### 2. Feature компоненты

```javascript
// app/_features/reservation/index.js
export { ReservationForm } from "./components/ReservationForm";
export { DateSelector } from "./components/DateSelector";
export { useReservation } from "./context/useReservation";
export { formatDate } from "./utils/dateHelpers";
```

### 3. API и утилиты

```javascript
// app/_api/index.js
export { supabase } from "./supabase";
export { auth } from "./auth";
export { dataService } from "./data-service";
```

## 🔧 Конфигурация и настройки

### 1. jsconfig.json

```json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./*"],
      "@/components/*": ["./app/_components/*"],
      "@/features/*": ["./app/_features/*"],
      "@/api/*": ["./app/_api/*"]
    }
  }
}
```

### 2. ESLint правила

```javascript
// .eslintrc.js
module.exports = {
  extends: ["next/core-web-vitals"],
  rules: {
    "import/order": [
      "error",
      {
        groups: [
          "builtin",
          "external",
          "internal",
          "parent",
          "sibling",
          "index",
        ],
        "newlines-between": "always",
        alphabetize: {
          order: "asc",
          caseInsensitive: true,
        },
      },
    ],
  },
};
```

## ⚠️ Избегаемые паттерны

### 1. CommonJS в ESM модулях

```javascript
// ❌ Неправильно
const component = require("./component");
module.exports = component;

// ✅ Правильно
import component from "./component";
export default component;
```

### 2. Циклические зависимости

```javascript
// ❌ Избегать - циклические импорты
// fileA.js
import { something } from "./fileB";

// fileB.js
import { something } from "./fileA";
```

### 3. Избыточные импорты

```javascript
// ❌ Неправильно - импорт всего модуля
import * as utils from "./utils";

// ✅ Правильно - импорт только нужного
import { formatDate, parseDate } from "./utils";
```

## 🧪 Тестирование импортов

### 1. Проверка циклических зависимостей

```bash
npm run check:circular
```

### 2. Анализ зависимостей

```bash
npm run analyze:deps
npm run report:deps
```

### 3. Визуализация зависимостей

```bash
npm run graph:deps
```

## 📚 Дополнительные ресурсы

- [Next.js 15 Documentation](https://nextjs.org/docs)
- [ES Modules Guide](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules)
- [Import/Export Best Practices](https://webpack.js.org/guides/ecma-script-modules/)

---

_Последнее обновление: Декабрь 2024_
_Версия Next.js: 15.4.2-canary.18_
