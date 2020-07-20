#!/bin/sh
set -e
export PORT=${PORT:-8080}
REDIS_HOST=`node -p "new URL('${FLY_REDIS_CACHE_URL}').hostname"`
REDIS_PORT=`node -p "new URL('${FLY_REDIS_CACHE_URL}').port"`
REDIS_PASSWORD=`node -p "new URL('${FLY_REDIS_CACHE_URL}').password"`
export REDIS_HOST=${REDIS_HOST:-localhost} REDIS_PORT=${REDIS_PORT:-6379} REDIS_PASSWORD
/redis-commander/docker/entrypoint.sh "$@"
