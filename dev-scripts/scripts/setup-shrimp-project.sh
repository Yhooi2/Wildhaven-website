#!/bin/bash

# Скрипт для настройки Shrimp Task Manager для нового проекта

# Получаем имя проекта из аргумента или текущей папки
PROJECT_NAME=${1:-$(basename $(pwd))}
BASE_DIR="/Users/art/code/.shrimp-task-manager"
PROJECT_DIR="$BASE_DIR/$PROJECT_NAME"

echo "🦐 Настройка Shrimp Task Manager для проекта: $PROJECT_NAME"

# Создаем структуру папок
mkdir -p "$PROJECT_DIR"
mkdir -p "$PROJECT_DIR/templates"
mkdir -p "$PROJECT_DIR/memory"

# Создаем базовые файлы
touch "$PROJECT_DIR/tasks.json"
touch "$PROJECT_DIR/project-rules.md"

# Создаем шаблон конфигурации для .cursor/mcp.json
cat > "$PROJECT_DIR/mcp-config-template.json" << EOF
{
  "shrimp-taskmanager": {
    "command": "npx",
    "args": ["-y", "@cjo4m06/mcp-shrimp-task-manager"],
    "env": {
      "DATA_DIR": "$PROJECT_DIR",
      "TEMPLATES_USE": "en",
      "ENABLE_GUI": "false"
    }
  }
}
EOF

echo "✅ Создана структура папок:"
echo "   📁 $PROJECT_DIR"
echo "   📁 $PROJECT_DIR/templates"
echo "   📁 $PROJECT_DIR/memory"
echo "   📄 $PROJECT_DIR/tasks.json"
echo "   📄 $PROJECT_DIR/project-rules.md"
echo "   📄 $PROJECT_DIR/mcp-config-template.json"

echo ""
echo "🔧 Для использования добавьте в .cursor/mcp.json:"
echo "   Содержимое из: $PROJECT_DIR/mcp-config-template.json"

echo ""
echo "🎯 Готово! Теперь можно использовать Shrimp Task Manager для проекта $PROJECT_NAME" 