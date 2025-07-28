# Примеры импортов для проекта Wildhaven

## 📁 Текущая структура проекта

```
app/
├── _api/                    # Data layer
├── _components/             # Shared UI components
├── _features/              # Feature-based architecture
├── _styles/                # Global styles
├── account/                # Account pages
├── cabins/                 # Cabins pages
├── about/                  # About pages
└── api/                    # API routes
```

## 🎯 Рекомендуемые паттерны импортов

### 1. Импорты компонентов UI

```javascript
// ✅ Правильно - из централизованного экспорта
import { Button, Container, Heading } from "@/app/_components/ui";
import { Header, Logo, Navigation } from "@/app/_components/Header";
import { BackButton, ErrorLayout } from "@/app/_components";

// ✅ Правильно - конкретные компоненты
import { Button } from "@/app/_components/ui/Button";
import { Header } from "@/app/_components/Header/Header";

// ❌ Избегать - относительные пути
import Button from "../../../_components/ui/Button";
```

### 2. Импорты feature компонентов

```javascript
// ✅ Правильно - из feature модулей
import { ReservationForm, DateSelector } from "@/app/_features/reservation";
import { SignInButton, SignOutButton } from "@/app/_features/auth";

// ✅ Правильно - конкретные компоненты
import { ReservationForm } from "@/app/_features/reservation/components/ReservationForm";
import { useReservation } from "@/app/_features/reservation/context/useReservation";
import { formatDate } from "@/app/_features/reservation/utils/dateHelpers";
```

### 3. Импорты API и утилит

```javascript
// ✅ Правильно - из API слоя
import { supabase } from "@/app/_api/supabase";
import { auth } from "@/app/_api/auth";
import { dataService } from "@/app/_api/data-service";

// ✅ Правильно - Next.js API
import { NextResponse } from "next/server";
import { draftMode } from "next/headers";
```

### 4. Импорты страниц и layout

```javascript
// ✅ Правильно - default экспорты для страниц
import Page from "./page";
import Layout from "./layout";

// ✅ Правильно - компоненты страниц
import { CabinCard } from "./_components/CabinCard";
import { CabinList } from "./_components/CabinList";
```

## 🚀 Next.js 15 специфичные примеры

### 1. Асинхронные параметры в страницах

```javascript
// app/cabins/[cabinId]/page.js
export default async function CabinPage({ params, searchParams }) {
  // ✅ Правильно - асинхронный доступ
  const { cabinId } = await params;
  const { date } = await searchParams;

  return (
    <div>
      <h1>Cabin: {cabinId}</h1>
      <p>Date: {date}</p>
    </div>
  );
}
```

### 2. Динамические импорты для оптимизации

```javascript
// app/cabins/page.js
import dynamic from "next/dynamic";

// ✅ Правильно - динамический импорт тяжелых компонентов
const CabinMap = dynamic(() => import("./_components/CabinMap"), {
  loading: () => <div>Loading map...</div>,
  ssr: false,
});

// ✅ Правильно - динамический импорт с именованными экспортами
const HeavyChart = dynamic(() =>
  import("./_components/HeavyChart").then((mod) => mod.ChartComponent)
);
```

### 3. Импорты изображений

```javascript
// ✅ Правильно - импорт изображений
import bg from "@/public/bg.png";
import logo from "@/public/logo.png";

// ✅ Правильно - использование с Next.js Image
import Image from "next/image";

export default function Hero() {
  return (
    <Image
      src={bg}
      fill
      placeholder="blur"
      className="object-cover"
      alt="Background"
    />
  );
}
```

## 📦 Импорты внешних библиотек

### 1. React и Next.js

```javascript
// ✅ Правильно - основные импорты
import React from "react";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
```

### 2. UI библиотеки

```javascript
// ✅ Правильно - именованные импорты
import { CalendarIcon, UserIcon } from "@heroicons/react/24/outline";
import { format, parseISO } from "date-fns";

// ✅ Правильно - оптимизированные импорты
import { Calendar } from "react-day-picker";
```

### 3. Supabase и Auth

```javascript
// ✅ Правильно - из API слоя
import { supabase } from "@/app/_api/supabase";
import { auth } from "@/app/_api/auth";

// ✅ Правильно - NextAuth
import { signIn, signOut, useSession } from "next-auth/react";
```

## 🏗️ Архитектурные примеры

### 1. Feature-Sliced импорты

```javascript
// app/cabins/page.js
// 1. Внешние зависимости
import React from "react";
import { NextResponse } from "next/server";

// 2. Внутренние API
import { supabase } from "@/app/_api/supabase";

// 3. Shared компоненты
import { Container, Heading } from "@/app/_components/ui";
import { Header } from "@/app/_components/Header";

// 4. Feature компоненты
import { CabinList, CabinFilter } from "@/app/_features/cabins";

// 5. Локальные компоненты
import { CabinCard } from "./_components/CabinCard";

export default function CabinsPage() {
  return (
    <div>
      <Header />
      <Container>
        <Heading>Our Cabins</Heading>
        <CabinList />
      </Container>
    </div>
  );
}
```

### 2. Context и Hooks

```javascript
// app/_features/reservation/components/ReservationForm.jsx
import { useReservation } from "../context/useReservation";
import { formatDate } from "../utils/dateHelpers";
import { Button, Input } from "@/app/_components/ui";

export function ReservationForm() {
  const { reservation, updateReservation } = useReservation();

  return (
    <form>
      <Input
        type="date"
        value={formatDate(reservation.date)}
        onChange={(e) => updateReservation({ date: e.target.value })}
      />
      <Button type="submit">Book Now</Button>
    </form>
  );
}
```

## ⚠️ Избегаемые паттерны

### 1. Циклические зависимости

```javascript
// ❌ Неправильно - циклические импорты
// app/_components/Header/Header.jsx
import { Navigation } from "./Navigation"; // Navigation импортирует Header

// app/_components/Header/Navigation.jsx
import { Header } from "./Header"; // Цикл!
```

### 2. Избыточные импорты

```javascript
// ❌ Неправильно - импорт всего модуля
import * as ui from "@/app/_components/ui";
// Используется только ui.Button

// ✅ Правильно - импорт только нужного
import { Button } from "@/app/_components/ui";
```

### 3. CommonJS в ESM

```javascript
// ❌ Неправильно - CommonJS в ESM модуле
const component = require("./component");
module.exports = component;

// ✅ Правильно - ES Modules
import component from "./component";
export default component;
```

## 🔧 Конфигурационные примеры

### 1. Расширенный jsconfig.json

```json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./*"],
      "@/components/*": ["./app/_components/*"],
      "@/features/*": ["./app/_features/*"],
      "@/api/*": ["./app/_api/*"],
      "@/styles/*": ["./app/_styles/*"],
      "@/public/*": ["./public/*"]
    }
  }
}
```

### 2. ESLint конфигурация

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
        pathGroups: [
          {
            pattern: "react",
            group: "external",
            position: "before",
          },
          {
            pattern: "next/**",
            group: "external",
            position: "before",
          },
          {
            pattern: "@/app/_api/**",
            group: "internal",
            position: "after",
          },
          {
            pattern: "@/app/_components/**",
            group: "internal",
            position: "after",
          },
          {
            pattern: "@/app/_features/**",
            group: "internal",
            position: "after",
          },
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

## 🧪 Тестирование примеров

### 1. Проверка импортов

```bash
# Проверка циклических зависимостей
npm run check:circular

# Анализ зависимостей
npm run analyze:deps

# Визуализация графа зависимостей
npm run graph:deps
```

### 2. Линтинг импортов

```bash
# Проверка ESLint
npm run lint

# Автоисправление
npx eslint --fix app/
```

## 📚 Дополнительные ресурсы

- [PROJECT_ARCHITECTURE.md](./PROJECT_ARCHITECTURE.md) - Архитектура проекта
- [NEXTJS_15_IMPORT_GUIDELINES.md](./NEXTJS_15_IMPORT_GUIDELINES.md) - Общие рекомендации
- [MCP_QUICK_START.md](./MCP_QUICK_START.md) - Настройка MCP инструментов

---

_Примеры основаны на текущей структуре проекта Wildhaven_
_Версия Next.js: 15.4.2-canary.18_
