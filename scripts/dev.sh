#!/usr/bin/env bash
set -e

echo "🚀 Starting AN DEV in Development Mode..."
echo "1. API running on http://localhost:3001"
echo "2. Web SPA running on http://localhost:3000"

# Run both api and web in background and trap exit
npm run dev:api &
API_PID=$!

npm run dev:web &
WEB_PID=$!

trap "kill $API_PID $WEB_PID 2>/dev/null" EXIT INT TERM

wait

