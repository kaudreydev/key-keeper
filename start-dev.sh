#!/bin/bash

set -e

COMPOSE_FILE="compose.yaml"
ENV_FILE=".env.development.local"

CONTAINERS=("frontend")

running=false
for name in "${CONTAINERS[@]}"; do
  if docker ps --filter "name=^/${name}$" --format '{{.Names}}' | grep -q .; then
    running=true
    break
  fi
done

if [ "$running" = false ]; then
  echo "🔺 Starting dev environment..."
  docker-compose -f "$COMPOSE_FILE" --env-file "$ENV_FILE" up --build -d
fi