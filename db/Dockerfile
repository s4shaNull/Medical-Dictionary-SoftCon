# Set the official MariaDB image as a base image
FROM mariadb:latest

# Set the working directory
WORKDIR /usr/local/mysql

# Copy the database schema and seed 
COPY ./queries .

# Copy configuration files
COPY my.cnf /etc/mysql/my.cnf
COPY mysql-entrypoint.sh /usr/local/bin/

#Make the entrypoint executable
RUN  chmod +x /usr/local/bin/mysql-entrypoint.sh

# Expose the default MySQL port
EXPOSE 3306

# Start the MySQL server
ENTRYPOINT ["mysql-entrypoint.sh"]
