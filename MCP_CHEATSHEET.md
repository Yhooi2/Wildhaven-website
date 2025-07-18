# 🚀 MCP Инструменты - Шпаргалка

## 📋 Быстрая настройка нового проекта

```bash
# Запустить скрипт автоматической настройки
chmod +x scripts/setup-new-project-mcp.sh
./scripts/setup-new-project-mcp.sh [PROJECT_NAME]

# Перезапустить Cursor IDE
# Проверить работу: @shrimp-taskmanager list_tasks
```

## 🛠️ Основные команды

### Context7 - Документация библиотек

```bash
@context7 resolve-library-id react
@context7 get-library-docs /reactjs/react.dev --topic hooks
```

### DuckDuckGo Search - Веб-поиск

```bash
@duckduckgo-search duckduckgo_search "запрос поиска"
# Параметры:
# query: строка поиска (макс 400 символов)
# count: количество результатов (1-20, по умолчанию 10)
# safeSearch: уровень безопасности (strict/moderate/off, по умолчанию moderate)
```

### TaskManager - Workflow

```bash
@taskmanager request_planning
@taskmanager get_next_task
@taskmanager mark_task_done
```

### Shrimp TaskManager - Продвинутое планирование

```bash
# Управление задачами
@shrimp-taskmanager list_tasks
@shrimp-taskmanager plan_task 'Описание задачи'
@shrimp-taskmanager execute_task <task-id>
@shrimp-taskmanager verify_task <task-id>

# Анализ и планирование
@shrimp-taskmanager analyze_task 'Что анализировать'
@shrimp-taskmanager reflect_task 'Что улучшить'
@shrimp-taskmanager split_tasks 'Сложная задача'

# Проект и исследования
@shrimp-taskmanager init_project_rules
@shrimp-taskmanager research_mode 'Тема исследования'
@shrimp-taskmanager process_thought 'Сложная проблема'
```

### Node.js Debugger - Отладка приложений

```bash
# Подготовка (в терминале)
node --inspect your-app.js
node --inspect-brk your-app.js  # с остановкой на первой строке

# Команды отладки
"Установи точку останова в app.js на строке 35"
"Покажи значения переменных в текущем контексте"
"Выполни шаг в функцию"
"Продолжи выполнение"
"Покажи стек вызовов"
"Оцени выражение: user.name"
```

## 📁 Структура файлов

```
/Users/art/code/.shrimp-task-manager/
├── PROJECT_NAME/
│   ├── tasks.json              # Задачи проекта
│   ├── project-rules.md        # Правила проекта
│   ├── templates/              # Шаблоны промптов
│   └── memory/                 # Память задач
└── другие-проекты/

PROJECT_ROOT/
├── .cursor/
│   └── mcp.json               # Конфигурация MCP
├── scripts/
│   └── setup-new-project-mcp.sh
└── MCP_QUICK_START.md
```

## 🔧 Конфигурация .cursor/mcp.json

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
    "shrimp-taskmanager": {
      "command": "npx",
      "args": ["-y", "@cjo4m06/mcp-shrimp-task-manager"],
      "env": {
        "DATA_DIR": "/Users/art/code/.shrimp-task-manager/PROJECT_NAME",
        "TEMPLATES_USE": "en",
        "ENABLE_GUI": "false"
      }
    }
  }
}
```

## 🎯 Типичный workflow

1. **Новый проект**: `./scripts/setup-new-project-mcp.sh`
2. **Перезапуск Cursor**: Обязательно после настройки
3. **Инициализация**: `@shrimp-taskmanager init_project_rules`
4. **Планирование**: `@shrimp-taskmanager plan_task 'Задача'`
5. **Выполнение**: `@shrimp-taskmanager execute_task <id>`
6. **Проверка**: `@shrimp-taskmanager verify_task <id>`

## 🆘 Устранение проблем

- **"0 tools enabled"**: Игнорировать, если команды работают
- **Инструмент не отвечает**: Перезапустить Cursor IDE
- **Ошибки зависимостей**: Проверить настройки в MCP Settings
- **Данные не сохраняются**: Проверить правильность DATA_DIR

## 💡 Полезные советы

- Всегда используйте абсолютные пути для DATA_DIR
- Данные Shrimp TaskManager сохраняются между сессиями
- Можно использовать несколько инструментов одновременно
- Context7 отлично дополняет Shrimp TaskManager для исследований
