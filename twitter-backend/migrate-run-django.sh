#!/bin/bash

echo "Running makemigrations..."
python manage.py makemigrations

echo "Running migrate..."
python manage.py migrate

echo "Starting Django development server..."
exec python manage.py runserver 0.0.0.0:8000