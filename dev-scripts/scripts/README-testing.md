# 🧪 Testing Scripts для JSX Refactoring

## Созданные скрипты тестирования:

### 1. `test-after-step.js` - Полное тестирование

**Использование:**

```bash
node scripts/test-after-step.js "Step Name"
node scripts/test-after-step.js "Step 2" --skip-build
node scripts/test-after-step.js "Step 3" --skip-lint
```

**Что проверяет:**

- ✅ Структуру файлов
- ✅ Критические файлы (layout.js, page.js, etc.)
- ✅ Пустые файлы (0 bytes)
- ✅ Импорты (.js расширения в импортах)
- ✅ ESLint (с поддержкой warnings)
- ✅ Production build

### 2. `quick-test.js` - Быстрое тестирование

**Использование:**

```bash
node scripts/quick-test.js "Step Name"
```

**Что проверяет:**

- ✅ ESLint
- ✅ Production build

## 🎯 План использования по этапам:

### Этап 2: UI компоненты

```bash
# После переименования UI компонентов
node scripts/quick-test.js "UI Components Renamed"
```

### Этап 3: Header компоненты

```bash
# После переименования Header
node scripts/test-after-step.js "Header Components"
```

### Этап 4: Cabins модуль

```bash
# После переименования Cabins
node scripts/quick-test.js "Cabins Module"
```

### Этап 8: Финальная проверка

```bash
# Полная проверка в конце
node scripts/test-after-step.js "Final Verification"
```

## 🚀 Автоматическое использование:

Скрипты возвращают exit code:

- `0` - все тесты прошли
- `1` - есть ошибки

Можно использовать в цепочке команд:

```bash
# Переименовать файлы И протестировать
mv file.js file.jsx && node scripts/quick-test.js "After rename" || echo "Test failed!"
```

## 🎨 Цветовая схема:

- 🟢 **Зеленый**: Тесты прошли
- 🔴 **Красный**: Ошибки
- 🟡 **Желтый**: Предупреждения
- 🔵 **Синий**: Информация

## ⚡ Производительность:

- **quick-test**: ~10-15 секунд
- **test-after-step**: ~30-45 секунд (с build)
- **test-after-step --skip-build**: ~10 секунд
