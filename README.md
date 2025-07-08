# Weather App (FastAPI + React/TS)

---
![demo](front.png)


## This project is a mini fullstack weather app for practice.

## Back-end:
- Using FastAPI (Python)

## Front-end:
- using React + TypeScript 


## Docker practice
- ### Steps for docker build on back-ends
    1: cd into the weather_app_backend folder

    2: create Dockerfile

    3: `docker build -t weather-backend .`, this is the command to build the docker image called 'weatehr-backend'

    4: When running the docker image, use `docker run -d --name weather-backed -p 8000:8000 --env-file .env weather-backend`

    	•	-d: Detached mode (runs in the background)

	    •	--name weather-backend: Name your container

	    •	-p 8000:8000: Maps container port 8000 to host port 8000

	    •	--env-file .env: Passes environment variables into the container

    ### Testing   

    - Try http://localhost:8000/weather?city={city name},{country code}, which should works fine but now its running inside Docker!

    - **Stop** : `docker stop weather-backend`
    - **Restart** `docker start weather-backend`
    - **see logs** `docker logs weather-backend `
