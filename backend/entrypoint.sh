#!/bin/sh

# Run migrations
python manage.py makemigrations
python manage.py migrate

# Start the application
exec gunicorn --bind 0.0.0.0:8000 zakahcal.wsgi:application
