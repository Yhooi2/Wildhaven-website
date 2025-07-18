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
- **Статус**: ✅ Настроен через Smithery CLI с поддержкой подпапок проектов

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
    "shrimp-taskmanager": {
      "command": "npx",
      "args": ["-y", "@cjo4m06/mcp-shrimp-task-manager"]
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

## Проверка работоспособности

Все инструменты протестированы и работают корректно:

✅ **Context7**: Успешно получает документацию библиотек
✅ **TaskManager**: Корректно управляет задачами и отслеживает прогресс
✅ **Shrimp TaskManager**: Настроен через Smithery CLI. Создает детальные планы с анализом зависимостей, критериями приемки и псевдокодом.

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
