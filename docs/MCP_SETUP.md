# Настройка MCP инструментов в проекте

## Обзор

Этот проект использует Model Context Protocol (MCP) инструменты для расширения возможностей разработки в Cursor IDE.

## Установленные инструменты

### 1. Context7

- **Описание**: Инструмент для получения актуальной документации библиотек
- **Команда**: `npx -y @upstash/context7-mcp`
- **Функции**:
  - Поиск библиотек по названию
  - Получение документации с примерами кода
  - Поддержка различных тем и версий

### 2. TaskManager

- **Описание**: Система управления задачами и проектами
- **Команда**: `npx -y @kazuph/mcp-taskmanager`
- **Функции**:
  - Создание и управление задачами
  - Отслеживание прогресса
  - Система одобрений

### 3. Shrimp TaskManager

- **Описание**: Продвинутая система управления задачами для структурированных рабочих процессов
- **Команда**: `npx -y @cjo4m06/mcp-shrimp-task-manager`
- **Статус**: ✅ Настроен с поддержкой подпапок проектов

### 4. Node.js Debugger

- **Описание**: Отладка Node.js приложений во время выполнения
- **Команда**: `npx -y @hyperdrive-eng/mcp-nodejs-debugger`
- **Функции**:
  - Установка точек останова
  - Просмотр переменных и стека вызовов
  - Пошаговая отладка
  - Выполнение выражений в контексте

### 5. DuckDuckGo Search

- **Описание**: Веб-поиск для получения актуальной информации
- **Команда**: `npx -y duckduckgo-mcp-server`
- **Функции**:
  - Поиск актуальной информации
  - Настройка уровня безопасности
  - Ограничение количества результатов

## Конфигурация

### Локальная конфигурация

Файл `.cursor/mcp.json` содержит локальную конфигурацию для проекта:

```json
{
  "mcpServers": {
    "context7": {
      "command": "npx",
      "args": ["-y", "@upstash/context7-mcp"],
      "env": {}
    },
    "taskmanager": {
      "command": "npx",
      "args": ["-y", "@kazuph/mcp-taskmanager"]
    },
    "shrimp-task-manager": {
      "command": "npx",
      "args": ["-y", "@cjo4m06/mcp-shrimp-task-manager"],
      "env": {
        "DATA_DIR": "/Users/art/code/.shrimp-task-manager/Wildhaven-website",
        "TEMPLATES_USE": "en",
        "ENABLE_GUI": "false"
      }
    },
    "nodejs-debugger": {
      "command": "npx",
      "args": ["-y", "@hyperdrive-eng/mcp-nodejs-debugger"]
    },
    "duckduckgo-search": {
      "command": "npx",
      "args": ["-y", "duckduckgo-mcp-server"]
    }
  }
}
```

### Глобальная конфигурация

Глобальная конфигурация находится в `~/.cursor/mcp.json` и содержит те же настройки.

## Использование

### Context7

```bash
# Поиск библиотеки
mcp_context7_resolve-library-id --libraryName "react"

# Получение документации
mcp_context7_get-library-docs --context7CompatibleLibraryID "/context7/react_dev" --topic "hooks" --tokens 2000
```

### TaskManager

```bash
# Создание нового запроса с задачами
mcp_taskmanager_request_planning --originalRequest "Описание запроса" --tasks "[{'title': 'Задача 1', 'description': 'Описание задачи'}]"

# Получение следующей задачи
mcp_taskmanager_get_next_task --requestId "req-1"

# Отметка задачи как выполненной
mcp_taskmanager_mark_task_done --requestId "req-1" --taskId "task-1"
```

### Shrimp TaskManager

Инструмент предоставляет следующие команды (используются через чат с префиксом `@shrimp-taskmanager`):

```bash
# Планирование новых задач
@shrimp-taskmanager plan_task 'Описание задачи'

# Анализ требований задачи
@shrimp-taskmanager analyze_task 'Описание для анализа'

# Критический обзор результатов
@shrimp-taskmanager reflect_task 'Что нужно проанализировать'

# Декомпозиция сложных задач
@shrimp-taskmanager split_tasks 'Сложная задача для разбиения'

# Просмотр списка задач
@shrimp-taskmanager list_tasks
```

**Пример использования:**

```bash
@shrimp-taskmanager plan_task 'Create a login page for the website'
```

Инструмент автоматически анализирует контекст проекта и создает структурированный план с учетом используемых технологий.

### Node.js Debugger

```bash
# Подготовка приложения для отладки
node --inspect your-app.js

# Команды отладки (используются в чате)
"Установи точку останова в app.js на строке 35"
"Покажи значения переменных в текущем контексте"
"Выполни шаг в функцию"
"Продолжи выполнение"
```

### DuckDuckGo Search

```bash
# Поиск информации
@duckduckgo-search duckduckgo_search "Next.js 15 новые возможности"

# Поиск с параметрами
@duckduckgo-search duckduckgo_search "React Server Components" --count 5 --safeSearch strict
```

## Проверка работоспособности

Все инструменты протестированы и работают корректно:

✅ **Context7**: Успешно получает документацию библиотек
✅ **TaskManager**: Корректно управляет задачами и отслеживает прогресс
✅ **Shrimp TaskManager**: Настроен с поддержкой подпапок проектов. Создает детальные планы с анализом зависимостей, критериями приемки и псевдокодом.
✅ **Node.js Debugger**: Готов к отладке приложений
✅ **DuckDuckGo Search**: Доступен для веб-поиска

## Структура файлов

```
Wildhaven-website/
├── .cursor/
│   └── mcp.json          # Локальная MCP конфигурация
├── .gitignore            # Исключает .cursor/ из Git
└── MCP_SETUP.md         # Эта документация
```

## Примечания

1. Папка `.cursor/` добавлена в `.gitignore` для исключения из системы контроля версий.
2. Инструменты загружаются автоматически при запуске Cursor IDE.
3. **Для активации Shrimp TaskManager после изменения конфигурации перезапустите Cursor IDE.**
4. При проблемах с загрузкой проверьте доступ к npm registry и интернет-соединение.
