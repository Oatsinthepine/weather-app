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


## Using compose.yaml to Orchestrate Backend and Frontend

After creating a Dockerfile for both the frontend and backend, we use Docker Compose (via a compose.yaml file) to build images and start containers for both services together with a single command.

This has several benefits:

	•	Simplifies startup: Don’t need to run docker run separately for each service. Instead, you run `docker compose up --build` and both backend and frontend are built, networked, and started automatically.

	•	Service orchestration: Compose manages networking between services. The backend and frontend can easily communicate on a shared Docker network, using service names like backend or frontend as hostnames.

	•	Environment management: Compose lets you pass environment variables, mount volumes, or set ports for each service in one place.

	•	Reproducibility: Anyone can clone the project and spin up the entire stack with one command, ensuring consistency across different machines and environments.
