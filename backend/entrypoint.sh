#!/bin/bash

set -e

echo "Waiting for database..."

# Wait for Postgres to be ready
until pg_isready -h db -p 5432 -U ${POSTGRES_USER}; do
  >&2 echo "Postgres is unavailable - sleeping"
  sleep 1
done

echo "Postgres is up - continuing..."

# Collect static files
python manage.py collectstatic --noinput

# Run migrations
python manage.py migrate

# Start gunicorn
exec gunicorn --bind 0.0.0.0:8001 zakah.wsgi:application
