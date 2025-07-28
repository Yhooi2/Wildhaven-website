# MCP Инструменты - Быстрый старт

## 🛠️ Установленные инструменты:

### 1. Context7

- **Назначение**: Получение актуальной документации библиотек
- **Пример**: `@context7 resolve-library-id react`

### 2. TaskManager

- **Назначение**: Управление задачами и workflow
- **Пример**: `@taskmanager request_planning`

### 3. Shrimp TaskManager

- **Назначение**: Продвинутое планирование и анализ задач
- **Примеры**:
  - `@shrimp-taskmanager list_tasks`
  - `@shrimp-taskmanager plan_task 'Описание задачи'`
  - `@shrimp-taskmanager init_project_rules`
  - `@shrimp-taskmanager research_mode 'Тема исследования'`

### 4. Node.js Debugger

- **Назначение**: Отладка Node.js приложений во время выполнения
- **Подготовка**: Запустите приложение с `node --inspect your-app.js`
- **Примеры**:
  - "Установи точку останова в app.js на строке 35"
  - "Покажи значения переменных в текущем контексте"
  - "Помоги отладить ошибку в Node.js приложении"

### 5. DuckDuckGo Search

- **Назначение**: Веб-поиск для получения актуальной информации
- **Примеры**:
  - `@duckduckgo-search duckduckgo_search "Next.js 15 новые возможности"`
  - `@duckduckgo-search duckduckgo_search "React Server Components best practices" --count 5`
  - `@duckduckgo-search duckduckgo_search "Tailwind CSS новые классы" --safeSearch strict`

## 🚀 Первые шаги:

1. **Перезапустите Cursor IDE** для применения настроек
2. Инициализируйте правила проекта: `@shrimp-taskmanager init_project_rules`
3. Создайте первую задачу: `@shrimp-taskmanager plan_task 'Ваша задача'`
4. Для отладки: запустите `node --inspect your-app.js` и используйте `@nodejs-debugger`

## 📁 Структура данных:

Данные Shrimp TaskManager хранятся в:
`/Users/art/code/.shrimp-task-manager/Wildhaven-website`
