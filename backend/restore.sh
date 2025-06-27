#!/bin/bash
set -euo pipefail

print_usage() {
  echo "Usage: $0 -c <container_name> -d <db_name> -u <db_user> -p <backup_path> -f <backup_file>"
  echo "Example: $0 -c my_postgres_container -d my_database -u postgres -p /home/user/db_backup -f pg_backup_2025_06_18.dump"
}

while getopts "c:d:u:p:f:" opt; do
  case $opt in
    c) CONTAINER_NAME="$OPTARG" ;;
    d) DB_NAME="$OPTARG" ;;
    u) DB_USER="$OPTARG" ;;
    p) BACKUP_DIR="$OPTARG" ;;
    f) BACKUP_FILE="$OPTARG" ;;
    *) print_usage; exit 1 ;;
  esac
done

if [[ -z "${CONTAINER_NAME:-}" || -z "${DB_NAME:-}" || -z "${DB_USER:-}" || -z "${BACKUP_DIR:-}" || -z "${BACKUP_FILE:-}" ]]; then
  echo "Error: missing required arguments."
  print_usage
  exit 1
fi

if ! docker ps -q -f name="^${CONTAINER_NAME}$" > /dev/null; then
  echo "Container ${CONTAINER_NAME} not running."
  exit 1
fi

if [[ ! -f "${BACKUP_DIR}/${BACKUP_FILE}" ]]; then
  echo "Backup file not found: ${BACKUP_DIR}/${BACKUP_FILE}"
  exit 1
fi

read -p "This will overwrite '${DB_NAME}'. Proceed? (y/N): " confirm
if [[ "$confirm" != "y" ]]; then
  echo "Operation cancelled."
  exit 1
fi

docker cp "${BACKUP_DIR}/${BACKUP_FILE}" "${CONTAINER_NAME}:/tmp/${BACKUP_FILE}"

docker exec -i "${CONTAINER_NAME}" psql -U "${DB_USER}" -c "DROP DATABASE IF EXISTS ${DB_NAME};"
docker exec -i "${CONTAINER_NAME}" psql -U "${DB_USER}" -c "CREATE DATABASE ${DB_NAME};"

docker exec -i "${CONTAINER_NAME}" pg_restore -U "${DB_USER}" -d "${DB_NAME}" "/tmp/${BACKUP_FILE}"

docker exec "${CONTAINER_NAME}" rm "/tmp/${BACKUP_FILE}"

echo "Restore completed from ${BACKUP_FILE}"
