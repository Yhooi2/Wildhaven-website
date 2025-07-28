# Чек-лист импортов Next.js 15

## ✅ Что делать

### 1. ES Modules

- [ ] Используйте `import/export` вместо `require/module.exports`
- [ ] Именованные экспорты для компонентов: `export function Component()`
- [ ] Default экспорты только для страниц и layout: `export default function Page()`

### 2. Абсолютные пути

- [ ] Используйте алиасы: `@/app/_components/ui`
- [ ] Избегайте относительных путей: `../../../components/Button`
- [ ] Настройте jsconfig.json с путями

### 3. Централизованные экспорты

- [ ] Создавайте index.js файлы для экспортов
- [ ] Группируйте связанные компоненты в одном экспорте
- [ ] Используйте реэкспорты: `export { Button } from "./Button"`

### 4. Next.js 15 особенности

### 5. Архитектурные принципы

- [ ] Feature-Sliced структура импортов
- [ ] Порядок импортов: внешние → API → shared → features → локальные
- [ ] Избегайте циклических зависимостей

## ❌ Что НЕ делать

- [ ] Не используйте `export *` с CommonJS модулями

### 2. Плохие практики

- [ ] Не импортируйте весь модуль: `import * as utils`
- [ ] Не создавайте циклические зависимости
- [ ] Не используйте длинные относительные пути

### 3. Синхронный доступ к параметрам

- [ ] Не обращайтесь к `params` и `searchParams` синхронно
- [ ] Всегда используйте `await` для параметров в Next.js 15

## 🔧 Конфигурация

### jsconfig.json

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

### next.config.js

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    optimizePackageImports: ["@heroicons/react", "date-fns"],
  },
};

module.exports = nextConfig;
```

## 📋 Быстрая проверка

### Перед коммитом:

- [ ] Запустите `npm run lint`
- [ ] Проверьте циклические зависимости: `npm run check:circular`
- [ ] Убедитесь, что все импорты используют абсолютные пути
- [ ] Проверьте, что нет CommonJS в .jsx файлах

### Структура импортов:

```javascript
// 1. React и Next.js
import React from "react";
import { NextResponse } from "next/server";

// 2. Внешние библиотеки
import { format } from "date-fns";

// 3. Внутренние API
import { supabase } from "@/app/_api/supabase";

// 4. Shared компоненты
import { Button, Container } from "@/app/_components/ui";

// 5. Feature компоненты
import { ReservationForm } from "@/app/_features/reservation";

// 6. Локальные компоненты
import { LocalComponent } from "./_components/LocalComponent";
```

## 🚨 Частые ошибки

1. **Синхронный доступ к параметрам**

   ```javascript
   // ❌ Неправильно
   const { slug } = params;

   // ✅ Правильно
   const { slug } = await params;
   ```

2. **CommonJS в компонентах**

   ```javascript
   // ❌ Неправильно
   const Component = require("./Component");
   module.exports = Component;

   // ✅ Правильно
   import Component from "./Component";
   export default Component;
   ```

3. **Длинные относительные пути**

   ```javascript
   // ❌ Неправильно
   import Button from "../../../_components/ui/Button";

   // ✅ Правильно
   import { Button } from "@/app/_components/ui";
   ```

## 📚 Документация

- [NEXTJS_15_IMPORT_GUIDELINES.md](./NEXTJS_15_IMPORT_GUIDELINES.md) - Подробные рекомендации
- [IMPORT_EXAMPLES.md](./IMPORT_EXAMPLES.md) - Конкретные примеры
- [PROJECT_ARCHITECTURE.md](./PROJECT_ARCHITECTURE.md) - Архитектура проекта

---

_Версия Next.js: 15.4.2-canary.18_
_Последнее обновление: Декабрь 2024_
