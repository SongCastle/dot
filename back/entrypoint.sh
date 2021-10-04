#!/bin/bash
set -e

rm -f /opt/back/tmp/pids/server.pid

exec "$@"
