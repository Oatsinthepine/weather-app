from fastapi import FastAPI, Query, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import httpx
import os
from typing import Optional
from dotenv import load_dotenv

# load .env file for the API key
load_dotenv()
OPENWEATHER_API_KEY = os.environ.get("OPENWEATHER_API_KEY")


app = FastAPI()

# allow frontend on localhost:5173 (Vite's default) to access the backend
# fastapi CORS middleware documentations link: https://fastapi.tiangolo.com/tutorial/cors/?h=app.add_mi#use-corsmiddleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials = True,
    allow_methods = ["*"],
    allow_headers = ["*"],
)

@app.get("/")
def root():
    return {"message": "Weather app backend ready!"}

@app.get("/weather")
async def get_weather(city: str = Query(..., example="Melbourne", description="The name of the city to get the weather for"),
                      country_code: Optional[str] = Query(None, example="AU", description="The country code of the city (optional)")) -> dict:
    """
    Get the current weather for a given city using OpenWeather API. Query() function enables the additional features like adding extra metadata, description, example values
    and validations to query parameters.

    :param city: This is a query parameter, the name of the city to get the weather for.
    :param country_code: This is an optional query parameter, the country code of the city (e.g., 'AU' for Australia).
    :return: A dictionary containing the weather data.
    """
    if not OPENWEATHER_API_KEY:
        raise HTTPException(status_code=500, detail="OpenWeather API key is not set.")

    url = f"https://api.openweathermap.org/data/2.5/weather?q={city},{country_code}&appid={OPENWEATHER_API_KEY}&units=metric"
    # Use httpx to make an asynchronous HTTP request to the OpenWeather API
    # here used the httpx client to make an async request, this async call can execute without blocking other requests
    async with httpx.AsyncClient() as client:
        response = await client.get(url)
        print("response status code:", response.status_code)
        print("response is:", response)
        data = response.json()
        print("response data is:", data)

    if data.get("cod") == "404":
        return {"error": "City not found."}

    return {
        "name": data.get("name"),
        "country": data.get("sys", {}).get("country"),
        "weather": data.get("weather", [{}])[0].get("description"),
        "icon": data.get("weather", [{}])[0].get("icon"),
        "temp": data.get("main", {}).get("temp"),
        "temp_max": data.get("main", {}).get("temp_max"),
        "temp_min": data.get("main", {}).get("temp_min"),
    }
