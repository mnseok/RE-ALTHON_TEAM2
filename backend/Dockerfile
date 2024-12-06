# Base image
FROM python:3.10-slim

# Set working directory
WORKDIR /app

# Install dependencies
COPY requirements.txt requirements.txt
RUN pip install --no-cache-dir -r requirements.txt

# Copy the project files
COPY . .

# Add the entrypoint script
COPY entrypoint.sh /app/entrypoint.sh

# Grant execution permissions to entrypoint.sh
RUN chmod +x /app/entrypoint.sh

# Set environment variables
ENV FLASK_APP=run.py
ENV FLASK_ENV=production
ENV PYTHONUNBUFFERED=1

# Expose the port the app runs on
EXPOSE 8000

# Command to run the application
CMD ["/app/entrypoint.sh"]
