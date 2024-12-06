#!/bin/sh

# Initialize the database (if migrations folder doesn't exist)
if [ ! -d "migrations" ]; then
  echo "Initializing database migrations..."
  flask db init
  flask db migrate -m "Initial migration"
fi

# Apply database migrations
echo "Applying database migrations..."
flask db upgrade

# Start the application
echo "Starting Flask application..."
flask run --host=0.0.0.0 --port=8000
