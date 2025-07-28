#!/bin/bash

echo "🔍 Checking MCP Server Status..."
echo "=================================="

echo ""
echo "1. Checking Context7 MCP package..."
npm view @upstash/context7-mcp version 2>/dev/null && echo "✅ Context7 package available" || echo "❌ Context7 package not found"

echo ""
echo "2. Testing Context7 MCP execution..."
timeout 5s npx -y @upstash/context7-mcp@latest --help >/dev/null 2>&1 && echo "✅ Context7 MCP executable" || echo "❌ Context7 MCP execution failed"

echo ""
echo "3. Checking global installation..."
which context7-mcp >/dev/null 2>&1 && echo "✅ Context7 globally installed" || echo "❌ Context7 not globally available"

echo ""
echo "4. Checking other MCP servers..."
timeout 3s npx -y @kazuph/mcp-taskmanager --help >/dev/null 2>&1 && echo "✅ TaskManager MCP working" || echo "❌ TaskManager MCP issues"

echo ""
echo "5. Checking MCP configuration..."
if [ -f ".cursor/mcp.json" ]; then
    echo "✅ MCP configuration file exists"
    echo "📋 Context7 config:"
    cat .cursor/mcp.json | grep -A 6 '"context7"'
else
    echo "❌ MCP configuration file missing"
fi

echo ""
echo "=================================="
echo "🎯 Next steps:"
echo "1. Restart Cursor IDE completely"
echo "2. Check MCP server logs in Cursor"
echo "3. Try using @context7 in chat"
echo "==================================" 