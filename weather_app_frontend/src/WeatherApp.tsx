import React, { useState } from "react";
// This @forawesome css import is used for displaying some html icons
import '@fortawesome/fontawesome-free/css/all.min.css';
// WeatherApp.css is the CSS file for styling the WeatherApp component
import './WeatherApp.css';

// Define the structure of the weather data we expect to receive.
interface WeatherData {
    name: string;
    country: string;
    weather: string;
    icon: string;
    temp: number;
    temp_max: number;
    temp_min: number;
    error?: string;
}

// This is the main WeatherApp component that sending GET request to the python FastAPI backend and displays weather data.
const WeatherApp: React.FC = () => {
    // These are the states used to manage the weather data, loading state, country code, and search input.
    const [countryCode, setCountryCode] = useState<string>("");
    const [weather, setWeather] = useState<WeatherData | null>(null);
    const [loading, setLoading] = useState(false);
    const [searchInput, setSearchInput] = useState<string>("")


    // fetchWeather function is the core function that send a GET request to the FastAPI backend to fetch weather data based on the city and country code.
    // it has 2 parameters: cityArg and countryCodeArg. This correspond to the query parameters in the FastAPI backend.
    const fetchWeather = async (cityArg:string, countryCodeArg:string) => {
        setLoading(true);
        // Reset the weather state before fetching new data
        setWeather(null);
        try {
            let url = `http://localhost:8000/weather?city=${encodeURIComponent(cityArg)}`;
            if (countryCode.trim()) {
                url += `,${encodeURIComponent(countryCodeArg)}`;
            }
            // use fetch API to send a GET request to the FastAPI backend
            const response = await fetch(url);
            console.log("response", response);
            // Then convert the response to JSON format
            const data = await response.json();
            console.log("data", data);
            // use the setWeather function to update the weather state with the fetched data
            setWeather(data);
        } catch (error) {
            console.log("error fetching data", error)
            setWeather({} as WeatherData);
        }
        setLoading(false);
    }

    return (
        <div className="weather_app">
            {/* Search Bar */}
            <div id="search-bar">
                <label htmlFor="search-bar-input" style={{display: "none"}}></label>
                <input
                    autoComplete="off"
                    id="search-bar-input"
                    type="text"
                    placeholder="Search by City, Country Code"
                    value={searchInput}
                    onChange={e => {
                        setSearchInput(e.target.value)
                    }}/>
                {/*Here is the core logic of passing the user entered city and country code in the search bar to the fetchWeather function */}
                <button
                    id="search-icon"
                    onClick= {() => {
                        const parts = searchInput.split(",");
                        const cityVal =parts[0].trim();
                        const countryCodeVal = parts[1]?.trim() || "";
                        setCountryCode(countryCodeVal);
                        fetchWeather(cityVal, countryCodeVal);
                    }}
                    disabled={loading || !searchInput}
                    style={{padding: 4}}
                >
                    <i className="fa fa-search" aria-hidden="true"></i>
                </button>
            </div>

            {/* Date and City */}
            <div id="info">
                <p id="date">{new Date().toLocaleDateString()}</p>
                <h4 id="city">
                    {weather?.name}{weather?.country ? `, ${weather.country}` : ""}
                </h4>
            </div>

            {/* Icon */}
            <div id="temp-img">
                {weather?.icon && (
                    <img
                        src={`https://openweathermap.org/img/wn/${weather.icon}@2x.png`}
                        alt={weather.weather}
                    />
                )}
            </div>

            {/* Description */}
            <p id="description" style={{textTransform: "capitalize"}}>
                {weather?.weather}
            </p>

            {/* Temperature */}
            <div id="temp">
                {weather?.temp !== undefined ? `${Math.round(weather.temp)}°C` : ""}
            </div>

            {/* Info at the bottom */}
            <div className="extra-info" style={{marginTop: "1em", display: "flex", justifyContent: "space-between"}}>
                <div className="col">
                    <div className="info">
                        <h5>Highs</h5>
                        <p id="temp-max">
                            {weather?.temp_max !== undefined ? `Max: ${Math.round(weather.temp_max)}°C` : ""}
                        </p>
                    </div>
                </div>
                <div className="col">
                    <div className="info">
                        <h5>Lows</h5>
                        <p id="temp-min">
                            {weather?.temp_min !== undefined ? `Min: ${Math.round(weather.temp_min)}°C` : ""}
                        </p>
                    </div>
                </div>
            </div>

            {/* Loading & Error */}
            {loading && <div style={{color: "blue"}}>Loading...</div>}
            {weather?.error && <div style={{color: "red"}}>{weather.error}</div>}
        </div>
    );
}

export default WeatherApp;