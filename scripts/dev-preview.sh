#!/bin/sh
# Dev-server launcher for the Claude preview harness: honors the assigned $PORT.
cd "$(dirname "$0")/.." || exit 1
exec /Users/charalambosandreou/.local/node/bin/node node_modules/vite/bin/vite.js --port "${PORT:-5173}" --strictPort --host 127.0.0.1
