#!/bin/bash

# 🚀 Скрипт для автоматической настройки MCP инструментов в новых проектах
# Использование: ./setup-new-project-mcp.sh [PROJECT_NAME]

set -e

# Цвета для вывода
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Получаем имя проекта
PROJECT_NAME=${1:-$(basename $(pwd))}
BASE_DIR="/Users/art/code/.shrimp-task-manager"
PROJECT_DIR="$BASE_DIR/$PROJECT_NAME"

echo -e "${BLUE}🚀 Настройка MCP инструментов для проекта: ${GREEN}$PROJECT_NAME${NC}"
echo ""

# Создаем структуру папок для Shrimp TaskManager
echo -e "${YELLOW}📁 Создание структуры папок...${NC}"
mkdir -p "$PROJECT_DIR"
mkdir -p "$PROJECT_DIR/templates"
mkdir -p "$PROJECT_DIR/memory"

# Создаем базовые файлы
echo '{"tasks": [], "version": "1.0.0"}' > "$PROJECT_DIR/tasks.json"
touch "$PROJECT_DIR/project-rules.md"

# Создаем .cursor папку если её нет
mkdir -p .cursor

# Создаем конфигурацию MCP
echo -e "${YELLOW}⚙️  Создание конфигурации MCP...${NC}"
cat > .cursor/mcp.json << EOF
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
        "DATA_DIR": "$PROJECT_DIR",
        "TEMPLATES_USE": "en",
        "ENABLE_GUI": "false"
      }
    },
    "nodejs-debugger": {
      "command": "npx",
      "args": ["-y", "@hyperdrive-eng/mcp-nodejs-debugger"]
    }
  }
}
EOF

# Добавляем .cursor в .gitignore если его там нет
if [ -f .gitignore ]; then
    if ! grep -q "^.cursor/" .gitignore; then
        echo -e "${YELLOW}📝 Добавление .cursor/ в .gitignore...${NC}"
        echo "" >> .gitignore
        echo "# cursor" >> .gitignore
        echo ".cursor/" >> .gitignore
    fi
else
    echo -e "${YELLOW}📝 Создание .gitignore...${NC}"
    cat > .gitignore << EOF
# cursor
.cursor/
EOF
fi

# Создаем README для быстрого старта
cat > MCP_QUICK_START.md << EOF
# MCP Инструменты - Быстрый старт

## 🛠️ Установленные инструменты:

### 1. Context7
- **Назначение**: Получение актуальной документации библиотек
- **Пример**: \`@context7 resolve-library-id react\`

### 2. TaskManager  
- **Назначение**: Управление задачами и workflow
- **Пример**: \`@taskmanager request_planning\`

### 3. Shrimp TaskManager
- **Назначение**: Продвинутое планирование и анализ задач
- **Примеры**:
  - \`@shrimp-taskmanager list_tasks\`
  - \`@shrimp-taskmanager plan_task 'Описание задачи'\`
  - \`@shrimp-taskmanager init_project_rules\`
  - \`@shrimp-taskmanager research_mode 'Тема исследования'\`

### 4. Node.js Debugger
- **Назначение**: Отладка Node.js приложений во время выполнения
- **Подготовка**: Запустите приложение с \`node --inspect your-app.js\`
- **Примеры**:
  - "Установи точку останова в app.js на строке 35"
  - "Покажи значения переменных в текущем контексте"
  - "Помоги отладить ошибку в Node.js приложении"

## 🚀 Первые шаги:

1. **Перезапустите Cursor IDE** для применения настроек
2. Инициализируйте правила проекта: \`@shrimp-taskmanager init_project_rules\`
3. Создайте первую задачу: \`@shrimp-taskmanager plan_task 'Ваша задача'\`
4. Для отладки: запустите \`node --inspect your-app.js\` и используйте \`@nodejs-debugger\`

## 📁 Структура данных:

Данные Shrimp TaskManager хранятся в:
\`$PROJECT_DIR\`
EOF

echo ""
echo -e "${GREEN}✅ Настройка завершена успешно!${NC}"
echo ""
echo -e "${BLUE}📁 Создана структура:${NC}"
echo -e "   📁 $PROJECT_DIR"
echo -e "   📁 $PROJECT_DIR/templates"
echo -e "   📁 $PROJECT_DIR/memory"
echo -e "   📄 $PROJECT_DIR/tasks.json"
echo -e "   📄 $PROJECT_DIR/project-rules.md"
echo -e "   📄 .cursor/mcp.json"
echo -e "   📄 MCP_QUICK_START.md"
echo ""
echo -e "${YELLOW}🔄 Следующие шаги:${NC}"
echo -e "1. ${GREEN}Перезапустите Cursor IDE${NC}"
echo -e "2. Проверьте работу: ${BLUE}@shrimp-taskmanager list_tasks${NC}"
echo -e "3. Инициализируйте проект: ${BLUE}@shrimp-taskmanager init_project_rules${NC}"
echo ""
echo -e "${GREEN}🎯 Готово! MCP инструменты настроены для проекта $PROJECT_NAME${NC}" 