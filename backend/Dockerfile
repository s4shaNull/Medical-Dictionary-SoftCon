# Use an existing Docker image as a base
FROM python:3.11-bullseye

# Set the working directory
WORKDIR /app

# Install the MariaDB Connector/C library for the mariadb module
RUN apt-get update && apt-get install -y wget curl
RUN wget https://downloads.mariadb.com/MariaDB/mariadb_repo_setup
# RUN echo "367a80b01083c34899958cdd62525104a3de6069161d309039e84048d89ee98b  mariadb_repo_setup" | sha256sum -c -
RUN chmod +x mariadb_repo_setup
RUN ./mariadb_repo_setup

RUN apt update && apt install -y libmariadb3 libmariadb-dev

# Install dependencies
COPY requirements.txt .
RUN pip3 install -r requirements.txt

# Copy the rest of the code
COPY . .

# Expose the app's port
EXPOSE 5000

# Run the app when the container starts
CMD ["python", "app.py"]
