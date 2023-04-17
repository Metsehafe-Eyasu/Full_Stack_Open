import axios from "axios";

const baseUrl = "https://restcountries.com/v3.1/all";
const weatherURL = "https://api.openweathermap.org/data/2.5/weather"
const api_key = import.meta.env.VITE_API_KEY

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

const getWeather = (lat, lon) => {
    const request = axios.get(`${weatherURL}?lat=${lat}&lon=${lon}&appid=${api_key}&units=metric`)
    return request.then((response) => response.data)
}

export default { getAll, getWeather };