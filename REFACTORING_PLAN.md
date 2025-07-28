# 🔄 План рефакторинга Wildhaven с автоматической проверкой

## 📋 Общий план миграции

### Этап 1: Подготовка инфраструктуры

- [ ] Создание структуры папок `_entities/`
- [ ] Настройка автоматических тестов после каждого шага
- [ ] Создание скриптов проверки целостности проекта
- [ ] Обновление jsconfig.json для лучшей поддержки импортов

### Этап 2: Рефакторинг Reservation → Booking + Reservation

- [ ] Шаг 2.1: Миграция PriceDisplay
- [ ] Шаг 2.2: Миграция GuestSelector
- [ ] Шаг 2.3: Миграция DateSelector
- [ ] Шаг 2.4: Миграция BookingSummary
- [ ] Шаг 2.5: Миграция ReservationStatus
- [ ] Шаг 2.6: Миграция ReservationCard
- [ ] Шаг 2.7: Миграция ReservationsList
- [ ] Шаг 2.8: Создание моделей для booking
- [ ] Шаг 2.9: Создание моделей для reservation
- [ ] Шаг 2.10: Финальная очистка

### Этап 3: Рефакторинг Cabin в отдельную сущность

- [ ] Шаг 3.1: Миграция CabinCard
- [ ] Шаг 3.2: Миграция CabinDetails
- [ ] Шаг 3.3: Создание CabinCatalog виджета
- [ ] Шаг 3.4: Создание модели cabin

## 🎯 Рекомендации по импортам Next.js 15

### ✅ Обязательные правила для всех задач:

1. **ES Modules только:**

   ```javascript
   // ✅ Правильно
   import { Component } from "./Component";
   export { Component } from "./Component";

   // ❌ Запрещено
   const Component = require("./Component");
   module.exports = Component;
   ```

2. **Абсолютные пути с алиасами:**

   ```javascript
   // ✅ Правильно
   import { PriceDisplay } from "@/app/_entities/booking";
   import { Button } from "@/app/_components/ui";

   // ❌ Запрещено
   import { PriceDisplay } from "../../../_entities/booking";
   ```

3. **Именованные экспорты для компонентов:**

   ```javascript
   // ✅ Правильно
   export function PriceDisplay({ price }) { ... }

   // ❌ Запрещено (кроме страниц и layout)
   export default function PriceDisplay({ price }) { ... }
   ```

4. **Централизованные экспорты:**

   ```javascript
   // app/_entities/booking/ui/index.js
   export { PriceDisplay } from "./PriceDisplay";
   export { GuestSelector } from "./GuestSelector";

   // app/_entities/booking/index.js
   export * from "./ui";
   export * from "./model";
   ```

5. **Правильный порядок импортов:**

   ```javascript
   // 1. React и Next.js
   import React from "react";

   // 2. Внешние библиотеки
   import { format } from "date-fns";

   // 3. Внутренние API
   import { supabase } from "@/app/_api/supabase";

   // 4. Shared компоненты
   import { Button } from "@/app/_components/ui";

   // 5. Feature компоненты
   import { ReservationForm } from "@/app/_features/reservation";

   // 6. Локальные компоненты
   import { LocalComponent } from "./LocalComponent";
   ```

### 🔍 Проверки для каждой задачи:

- [ ] **ESLint проходит без ошибок:** `npm run lint`
- [ ] **Проект собирается:** `npm run build`
- [ ] **Нет циклических зависимостей:** `npm run check:circular`
- [ ] **Все импорты используют абсолютные пути**
- [ ] **Компоненты используют именованные экспорты**
- [ ] **Страницы и layout используют default экспорты**
- [ ] **Централизованные экспорты настроены**

## 🤖 Детальные задачи для таск-менеджера

---

### 📁 TASK 1: Подготовка инфраструктуры

**Описание:** Создание базовой структуры и скриптов для автоматической проверки

**Действия:**

1. Создать структуру папок:

   ```bash
   mkdir -p app/_entities/booking/ui
   mkdir -p app/_entities/booking/model
   mkdir -p app/_entities/reservation/ui
   mkdir -p app/_entities/reservation/model
   ```

2. Обновить jsconfig.json для лучшей поддержки импортов:

   ```json
   {
     "compilerOptions": {
       "paths": {
         "@/*": ["./*"],
         "@/components/*": ["./app/_components/*"],
         "@/features/*": ["./app/_features/*"],
         "@/api/*": ["./app/_api/*"],
         "@/entities/*": ["./app/_entities/*"]
       }
     }
   }
   ```

3. Создать index.js файлы для новых папок с правильными экспортами

4. Создать скрипт автопроверки `scripts/check-step.js`:

   ```javascript
   // Проверка сборки, линтинга, тестов
   // Проверка корректности импортов
   // Проверка отсутствия битых ссылок
   // Проверка циклических зависимостей
   // Проверка соответствия рекомендациям Next.js 15
   ```

**Критерии готовности:**

- [ ] Структура папок создана
- [ ] jsconfig.json обновлен с новыми путями
- [ ] Скрипт проверки работает
- [ ] Проект собирается без ошибок
- [ ] ESLint проходит без ошибок
- [ ] Нет циклических зависимостей
- [ ] Все импорты используют абсолютные пути

**Команда проверки:** `npm run build && npm run lint && npm run check:circular && node scripts/check-step.js`

---

### 🎯 TASK 2.1: Миграция PriceDisplay

**Описание:** Перенос компонента PriceDisplay в сущность booking с соблюдением рекомендаций Next.js 15

**Действия:**

1. Переместить файл:

   ```bash
   mv app/_features/reservation/components/ui/PriceDisplay.jsx \
      app/_entities/booking/ui/PriceDisplay/PriceDisplay.jsx
   ```

2. Создать index.js с именованным экспортом:

   ```javascript
   // app/_entities/booking/ui/PriceDisplay/index.js
   export { PriceDisplay } from "./PriceDisplay.jsx";
   ```

3. Обновить экспорт в booking/ui:

   ```javascript
   // app/_entities/booking/ui/index.js
   export { PriceDisplay } from "./PriceDisplay";
   ```

4. Обновить главный экспорт booking:

   ```javascript
   // app/_entities/booking/index.js
   export * from "./ui";
   ```

5. Найти и обновить все импорты PriceDisplay на абсолютные пути:

   ```javascript
   // Было:
   import { PriceDisplay } from "./ui";

   // Стало:
   import { PriceDisplay } from "@/app/_entities/booking";
   ```

6. Удалить экспорт PriceDisplay из старых файлов

**Проверки импортов:**

- [ ] Все импорты используют абсолютные пути с `@/`
- [ ] Компонент использует именованный экспорт
- [ ] Централизованные экспорты настроены правильно
- [ ] Нет относительных путей `../` или `./`
- [ ] Порядок импортов соответствует рекомендациям

**Критерии готовности:**

- [ ] Файл перемещен в новую структуру
- [ ] Все импорты обновлены на абсолютные пути
- [ ] Компонент корректно экспортируется через именованный экспорт
- [ ] Проект собирается без ошибок
- [ ] ESLint проходит без ошибок
- [ ] Нет циклических зависимостей
- [ ] Компонент отображается на странице
- [ ] Все импорты используют `@/` алиасы

**Команда проверки:** `npm run build && npm run lint && npm run check:circular && npm run check:imports && node scripts/check-step.js --component=PriceDisplay`

---

### 🎯 TASK 2.2: Миграция GuestSelector

**Описание:** Перенос компонента GuestSelector в сущность booking с соблюдением рекомендаций Next.js 15

**Действия:**

1. Переместить файл:

   ```bash
   mv app/_features/reservation/components/GuestSelector.jsx \
      app/_entities/booking/ui/GuestSelector/GuestSelector.jsx
   ```

2. Создать index.js с именованным экспортом:

   ```javascript
   // app/_entities/booking/ui/GuestSelector/index.js
   export { GuestSelector } from "./GuestSelector.jsx";
   ```

3. Обновить экспорт в booking/ui:

   ```javascript
   // app/_entities/booking/ui/index.js
   export { GuestSelector } from "./GuestSelector";
   ```

4. Найти и обновить все импорты GuestSelector на абсолютные пути

5. Удалить экспорт GuestSelector из старых файлов

**Проверки импортов:**

- [ ] Все импорты используют абсолютные пути с `@/`
- [ ] Компонент использует именованный экспорт
- [ ] Централизованные экспорты настроены правильно
- [ ] Нет относительных путей `../` или `./`
- [ ] Порядок импортов соответствует рекомендациям

**Критерии готовности:**

- [ ] Файл перемещен в новую структуру
- [ ] Все импорты обновлены на абсолютные пути
- [ ] Компонент корректно экспортируется через именованный экспорт
- [ ] Проект собирается без ошибок
- [ ] ESLint проходит без ошибок
- [ ] Нет циклических зависимостей
- [ ] Компонент отображается и функционирует
- [ ] Все импорты используют `@/` алиасы

**Команда проверки:** `npm run build && npm run lint && npm run check:circular && npm run check:imports && node scripts/check-step.js --component=GuestSelector`

---

### 🎯 TASK 2.3: Миграция DateSelector

**Описание:** Перенос компонента DateSelector со стилями в сущность booking с соблюдением рекомендаций Next.js 15

**Действия:**

1. Переместить файлы:

   ```bash
   mv app/_features/reservation/components/DateSelector.jsx \
      app/_entities/booking/ui/DateSelector/DateSelector.jsx
   mv app/_features/reservation/components/DateSelector.styles.js \
      app/_entities/booking/ui/DateSelector/DateSelector.styles.js
   ```

2. Создать index.js с именованным экспортом:

   ```javascript
   // app/_entities/booking/ui/DateSelector/index.js
   export { DateSelector } from "./DateSelector.jsx";
   ```

3. Обновить импорт стилей в DateSelector.jsx на относительный путь:

   ```javascript
   import styles from "./DateSelector.styles.js";
   ```

4. Обновить экспорт в booking/ui и все внешние импорты на абсолютные пути

**Проверки импортов:**

- [ ] Все внешние импорты используют абсолютные пути с `@/`
- [ ] Компонент использует именованный экспорт
- [ ] Стили импортируются относительно компонента
- [ ] Централизованные экспорты настроены правильно
- [ ] Порядок импортов соответствует рекомендациям

**Критерии готовности:**

- [ ] Файлы перемещены с сохранением связей
- [ ] Стили корректно импортируются
- [ ] Все внешние импорты обновлены на абсолютные пути
- [ ] Компонент стилизуется корректно
- [ ] Проект собирается без ошибок
- [ ] ESLint проходит без ошибок
- [ ] Нет циклических зависимостей
- [ ] Все импорты используют `@/` алиасы

**Команда проверки:** `npm run build && npm run lint && npm run check:circular && npm run check:imports && node scripts/check-step.js --component=DateSelector`

---

### 🎯 TASK 2.4: Миграция BookingSummary

**Описание:** Перенос компонента BookingSummary в сущность booking с соблюдением рекомендаций Next.js 15

**Действия:**

1. Переместить файл:

   ```bash
   mv app/_features/reservation/components/ui/BookingSummary.jsx \
      app/_entities/booking/ui/BookingSummary/BookingSummary.jsx
   ```

2. Создать index.js с именованным экспортом:

   ```javascript
   // app/_entities/booking/ui/BookingSummary/index.js
   export { BookingSummary } from "./BookingSummary.jsx";
   ```

3. Обновить экспорт в booking/ui и все импорты на абсолютные пути

4. Проверить зависимости от других компонентов

**Проверки импортов:**

- [ ] Все импорты используют абсолютные пути с `@/`
- [ ] Компонент использует именованный экспорт
- [ ] Зависимости корректно разрешены
- [ ] Централизованные экспорты настроены правильно
- [ ] Порядок импортов соответствует рекомендациям

**Критерии готовности:**

- [ ] Файл перемещен в новую структуру
- [ ] Зависимости корректно разрешены
- [ ] Все импорты обновлены на абсолютные пути
- [ ] Проект собирается без ошибок
- [ ] ESLint проходит без ошибок
- [ ] Нет циклических зависимостей
- [ ] Все импорты используют `@/` алиасы

**Команда проверки:** `npm run build && npm run lint && npm run check:circular && npm run check:imports && node scripts/check-step.js --component=BookingSummary`

---

### 🎯 TASK 2.5: Миграция ReservationStatus

**Описание:** Перенос компонента ReservationStatus в сущность reservation с соблюдением рекомендаций Next.js 15

**Действия:**

1. Переместить файл:

   ```bash
   mv app/_features/reservation/components/ui/ReservationStatus.jsx \
      app/_entities/reservation/ui/ReservationStatus/ReservationStatus.jsx
   ```

2. Создать index.js с именованным экспортом:

   ```javascript
   // app/_entities/reservation/ui/ReservationStatus/index.js
   export { ReservationStatus } from "./ReservationStatus.jsx";
   ```

3. Создать index.js для reservation/ui:

   ```javascript
   // app/_entities/reservation/ui/index.js
   export { ReservationStatus } from "./ReservationStatus";
   ```

4. Создать главный экспорт reservation:

   ```javascript
   // app/_entities/reservation/index.js
   export * from "./ui";
   ```

5. Обновить все импорты на абсолютные пути

**Проверки импортов:**

- [ ] Все импорты используют абсолютные пути с `@/`
- [ ] Компонент использует именованный экспорт
- [ ] Централизованные экспорты настроены правильно
- [ ] Нет относительных путей `../` или `./`
- [ ] Порядок импортов соответствует рекомендациям

**Критерии готовности:**

- [ ] Файл перемещен в сущность reservation
- [ ] Все импорты обновлены на абсолютные пути
- [ ] Проект собирается без ошибок
- [ ] ESLint проходит без ошибок
- [ ] Нет циклических зависимостей
- [ ] Все импорты используют `@/` алиасы

**Команда проверки:** `npm run build && npm run lint && npm run check:circular && npm run check:imports && node scripts/check-step.js --component=ReservationStatus`

---

### 🎯 TASK 2.6: Миграция ReservationCard

**Описание:** Перенос компонента ReservationCard в сущность reservation с соблюдением рекомендаций Next.js 15

**Действия:**

1. Переместить файл в reservation/ui/ReservationCard/
2. Создать index.js с именованным экспортом
3. Обновить экспорты и импорты на абсолютные пути
4. Проверить зависимости от других компонентов

**Проверки импортов:**

- [ ] Все импорты используют абсолютные пути с `@/`
- [ ] Компонент использует именованный экспорт
- [ ] Зависимости разрешены корректно
- [ ] Централизованные экспорты настроены правильно
- [ ] Порядок импортов соответствует рекомендациям

**Критерии готовности:**

- [ ] Файл перемещен корректно
- [ ] Зависимости разрешены
- [ ] Все импорты обновлены на абсолютные пути
- [ ] Проект собирается без ошибок
- [ ] ESLint проходит без ошибок
- [ ] Нет циклических зависимостей
- [ ] Все импорты используют `@/` алиасы

**Команда проверки:** `npm run build && npm run lint && npm run check:circular && npm run check:imports && node scripts/check-step.js --component=ReservationCard`

---

### 🎯 TASK 2.7: Миграция ReservationsList

**Описание:** Перенос компонента ReservationsList в сущность reservation с соблюдением рекомендаций Next.js 15

**Действия:**

1. Переместить файл в reservation/ui/ReservationsList/
2. Создать index.js с именованным экспортом
3. Обновить экспорты и импорты на абсолютные пути
4. Проверить интеграцию с ReservationCard

**Проверки импортов:**

- [ ] Все импорты используют абсолютные пути с `@/`
- [ ] Компонент использует именованный экспорт
- [ ] Интеграция с ReservationCard работает
- [ ] Централизованные экспорты настроены правильно
- [ ] Порядок импортов соответствует рекомендациям

**Критерии готовности:**

- [ ] Файл перемещен корректно
- [ ] Список корректно отображает карточки
- [ ] Все импорты обновлены на абсолютные пути
- [ ] Проект собирается без ошибок
- [ ] ESLint проходит без ошибок
- [ ] Нет циклических зависимостей
- [ ] Все импорты используют `@/` алиасы

**Команда проверки:** `npm run build && npm run lint && npm run check:circular && npm run check:imports && node scripts/check-step.js --component=ReservationsList`

---

### 🎯 TASK 2.8: Создание моделей для booking

**Описание:** Создание model слоя для booking сущности с соблюдением рекомендаций Next.js 15

**Действия:**

1. Создать `booking-types.js` с типами данных
2. Переместить утилиты из `utils/pricing.js` в `booking-utils.js`
3. Переместить `utils/dateHelpers.js` в `booking-utils.js`
4. Создать единый экспорт модели с именованными экспортами

**Проверки импортов:**

- [ ] Все импорты используют абсолютные пути с `@/`
- [ ] Утилиты используют именованные экспорты
- [ ] Централизованные экспорты настроены правильно
- [ ] Порядок импортов соответствует рекомендациям
- [ ] Нет циклических зависимостей

**Критерии готовности:**

- [ ] Модели созданы
- [ ] Утилиты перемещены и работают
- [ ] Все зависимости обновлены на абсолютные пути
- [ ] Проект собирается без ошибок
- [ ] ESLint проходит без ошибок
- [ ] Нет циклических зависимостей
- [ ] Все импорты используют `@/` алиасы

**Команда проверки:** `npm run build && npm run lint && npm run check:circular && npm run check:imports && node scripts/check-step.js --model=booking`

---

### 🎯 TASK 2.9: Создание моделей для reservation

**Описание:** Создание model слоя для reservation сущности с соблюдением рекомендаций Next.js 15

**Действия:**

1. Создать `reservation-types.js` с именованными экспортами
2. Выделить утилиты для работы с резервациями
3. Создать единый экспорт модели с именованными экспортами

**Проверки импортов:**

- [ ] Все импорты используют абсолютные пути с `@/`
- [ ] Утилиты используют именованные экспорты
- [ ] Централизованные экспорты настроены правильно
- [ ] Порядок импортов соответствует рекомендациям
- [ ] Нет циклических зависимостей

**Критерии готовности:**

- [ ] Модели созданы
- [ ] Утилиты работают корректно
- [ ] Все импорты обновлены на абсолютные пути
- [ ] Проект собирается без ошибок
- [ ] ESLint проходит без ошибок
- [ ] Нет циклических зависимостей
- [ ] Все импорты используют `@/` алиасы

**Команда проверки:** `npm run build && npm run lint && npm run check:circular && npm run check:imports && node scripts/check-step.js --model=reservation`

---

### 🎯 TASK 2.10: Финальная очистка reservation фичи

**Описание:** Удаление пустых папок и обновление структуры фичи с соблюдением рекомендаций Next.js 15

**Действия:**

1. Удалить пустую папку `components/ui/`
2. Переименовать оставшиеся компоненты:
   - `Reservation.jsx` → `ReservationWidget.jsx`
   - `ReservationForm.jsx` → `BookingForm.jsx` (если нужно)
3. Обновить импорты в feature на абсолютные пути
4. Очистить старые index.js файлы

**Проверки импортов:**

- [ ] Все импорты используют абсолютные пути с `@/`
- [ ] Компоненты используют именованные экспорты
- [ ] Централизованные экспорты настроены правильно
- [ ] Порядок импортов соответствует рекомендациям
- [ ] Нет циклических зависимостей

**Критерии готовности:**

- [ ] Пустые папки удалены
- [ ] Структура фичи логична
- [ ] Все импорты обновлены на абсолютные пути
- [ ] Проект работает без ошибок
- [ ] ESLint проходит без ошибок
- [ ] Нет циклических зависимостей
- [ ] Все импорты используют `@/` алиасы

**Команда проверки:** `npm run build && npm run lint && npm run check:circular && npm run check:imports && npm run dev && node scripts/final-check.js`

---

## 🔧 Скрипты для автоматической проверки

### `scripts/check-step.js`

```javascript
#!/usr/bin/env node
const { exec } = require("child_process");
const fs = require("fs");

// Проверка сборки
// Проверка линтинга
// Проверка корректности импортов
// Проверка существования файлов
// Проверка работы компонента (опционально)
// Проверка циклических зависимостей
// Проверка соответствия рекомендациям Next.js 15
```

### `scripts/final-check.js`

```javascript
#!/usr/bin/env node

// Полная проверка архитектуры
// Проверка отсутствия циклических зависимостей
// Проверка следования принципам FSD
// Проверка работы всего приложения
// Проверка соответствия рекомендациям Next.js 15
```

## 📊 Метрики успеха

После каждого этапа проверяем:

- ✅ Проект собирается без ошибок
- ✅ ESLint проходит без предупреждений
- ✅ Все страницы загружаются
- ✅ Функциональность работает корректно
- ✅ Нет битых импортов
- ✅ Нет циклических зависимостей
- ✅ Все импорты используют абсолютные пути
- ✅ Компоненты используют именованные экспорты
- ✅ Архитектура стала чище

## 🛠️ Использование существующих скриптов

### Быстрая проверка:

```bash
node scripts/quick-test.js "Step Name"
```

### Полная проверка:

```bash
node scripts/test-after-step.js "Step Name"
```

### Анализ зависимостей:

```bash
npm run analyze:deps
npm run check:circular
```

### Проверка циклических зависимостей:

```bash
node scripts/check-circular-deps.js
```

## 📋 Соответствие Next.js 15 рекомендациям

### Именованные экспорты:

```javascript
// ✅ Правильно
export { PriceDisplay } from "./PriceDisplay.jsx";
export { GuestSelector } from "./GuestSelector.jsx";

// ❌ Неправильно
export default PriceDisplay;
```

### Централизованные именованные экспорты:

```javascript
// app/_entities/booking/index.js
export { PriceDisplay } from "./ui/PriceDisplay";
export { GuestSelector } from "./ui/GuestSelector";
export { DateSelector } from "./ui/DateSelector";
export { BookingSummary} from "./ui/BookingSummary";
export {booking-utils } from "./model/booking-utils";
```

### Абсолютные пути:

```javascript
// ✅ Правильно
import { PriceDisplay } from "@/app/_entities/booking";

// ❌ Неправильно
import { PriceDisplay } from "../../../_entities/booking";
```

## 🎯 Автоматизация процесса

### После каждого шага:

1. Запустить тесты: `node scripts/quick-test.js "Step Name"`
2. Проверить сборку: `npm run build`
3. Проверить линтинг: `npm run lint`
4. Проверить зависимости: `npm run check:circular`
5. Проверить импорты: `npm run check:imports`
6. Убедиться что все используют `@/` алиасы

### При ошибках:

1. Откатить изменения
2. Исправить проблемы
3. Повторить проверки
4. Продолжить только после успешных тестов

---

_План создан на основе анализа текущей архитектуры и рекомендаций Next.js 15_
_Использует существующие скрипты тестирования для автоматической проверки_
_Включает строгие проверки соответствия рекомендациям по импортам_
