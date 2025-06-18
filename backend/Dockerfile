# Use the official Python image as the base image
FROM python:3.12-slim

# Set environment variables
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

# Set the working directory inside the container
WORKDIR /app

# Install system dependencies
RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential \
    libpq-dev \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# Install Python dependencies
COPY requirements.txt /app/
RUN pip install --no-cache-dir -r requirements.txt

# Copy the Django project into the container
COPY . /app/

# Copy the entrypoint script
COPY entrypoint.sh /app/entrypoint.sh

USER 0
RUN mkdir -p /app/static
RUN mkdir -p /app/staticfiles
USER $CONTAINER_USER_ID

# Expose the port the app runs on
EXPOSE 8000
