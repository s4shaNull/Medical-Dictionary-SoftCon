#!/bin/bash
set -e

# Start MySQL Server
if [ -z "$MYSQL_DATABASE" ]; then
    echo >&2 "error: MYSQL_DATABASE is not set"
    exit 1
fi

if [ -z "$MYSQL_USER" ]; then
    echo >&2 "error: MYSQL_USER is not set"
    exit 1
fi

if [ -z "$MYSQL_PASSWORD" ]; then
    echo >&2 "error: MYSQL_PASSWORD is not set"
    exit 1
fi

mysql_install_db --user=$MYSQL_USER --datadir="/var/lib/mysql"

# Start the MySQL daemon in the background.
mysqld --user=$MYSQL_USER &

# Wait for the MySQL daemon to start up.
echo "Waiting for database to start up..."
while [ ! -x /run/mysqld/mysqld.sock ]; do
    sleep 1
done
echo "Database is up!"

# Create the database if it doesn't already exist
echo "Creating database if it doesn't already exist..."

mysql -u root -e "CREATE DATABASE IF NOT EXISTS $MYSQL_DATABASE"
echo "Database created!"

# Run any additional setup scripts
echo "Running additional setup scripts..."

# Alter password for  mysql user
mysql -u root -e "ALTER USER '$MYSQL_USER'@'localhost' IDENTIFIED BY '$MYSQL_PASSWORD';"

# Create a user for the Flask API, and grant the privileges:
mysql -u root -e "CREATE USER '$MYSQL_FLASK_USER'@'$HOST_IP_ADDR' IDENTIFIED BY '$MYSQL_FLASK_PASSWORD';"
mysql -u root -e "GRANT ALL PRIVILEGES ON *.* TO '$MYSQL_FLASK_USER'@'$HOST_IP_ADDR' IDENTIFIED BY '$MYSQL_FLASK_PASSWORD';"
mysql -u root -e "FLUSH PRIVILEGES;"

# Alter password for root user:
mysql -u root -e "ALTER USER 'root'@'localhost' IDENTIFIED BY '$MYSQL_ROOT_PASSWORD';"

# Create the tables using schema.sql and seed.sql
mysql -u $MYSQL_USER -p$MYSQL_PASSWORD --database="$MYSQL_DATABASE" < "/usr/local/mysql/schema.sql"
mysql -u $MYSQL_USER -p$MYSQL_PASSWORD --database="$MYSQL_DATABASE" < "/usr/local/mysql/seed.sql"

echo "Setup complete!"

# View the error log
tail -f /var/log/mysql/error.log
