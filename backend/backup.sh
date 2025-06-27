#!/bin/bash
set -euo pipefail

print_usage() {
  echo "Usage: $0 -c <container_name> -d <db_name> -u <db_user> -p <backup_path>"
  echo "Example: $0 -c my_postgres_container -d my_database -u postgres -p /home/user/db_backup"
}

while getopts "c:d:u:p:" opt; do
  case $opt in
    c) CONTAINER_NAME="$OPTARG" ;;
    d) DB_NAME="$OPTARG" ;;
    u) DB_USER="$OPTARG" ;;
    p) BACKUP_DIR="$OPTARG" ;;
    *) print_usage; exit 1 ;;
  esac
done

if [[ -z "${CONTAINER_NAME:-}" || -z "${DB_NAME:-}" || -z "${DB_USER:-}" || -z "${BACKUP_DIR:-}" ]]; then
  echo "Error: missing required arguments."
  print_usage
  exit 1
fi

if ! docker ps -q -f name="^${CONTAINER_NAME}$" > /dev/null; then
  echo "Container ${CONTAINER_NAME} not running."
  exit 1
fi

DATE=$(date +%Y_%m_%d)
BACKUP_FILE="pg_backup_${DATE}.dump"

mkdir -p "${BACKUP_DIR}"

echo "Backing up inside container..."

docker exec "${CONTAINER_NAME}" pg_dump -U "${DB_USER}" "${DB_NAME}" -F c -f "/tmp/${BACKUP_FILE}"

docker cp "${CONTAINER_NAME}:/tmp/${BACKUP_FILE}" "${BACKUP_DIR}/${BACKUP_FILE}"

docker exec "${CONTAINER_NAME}" rm "/tmp/${BACKUP_FILE}"

echo "Backup completed: ${BACKUP_DIR}/${BACKUP_FILE}"
