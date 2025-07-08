# use offical python 3.12 image as the base image
FROM python:3.12-slim

# set  working directory inside the container
WORKDIR /app

# copy the requirements.txt file into the container, . means to the current directory
COPY requirements.txt .

# Install dependencies
RUN pip install --upgrade pip
RUN pip install -r requirements.txt

# copy all the files on my host computer's current directory into the container's /app directory
# “Copy everything in this directory on my computer (the host) into /app inside the container.”
COPY . .

# Expose port 8000 for the application
EXPOSE 8000

# commmand to run the fastapi app with uvicorn
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]

