const Weather = ({ location, weather }) => {
  const weatherIcon = weather.weather[0].icon;
  const icon = `http://openweathermap.org/img/w/${weatherIcon}.png`;
  return (
    <div>
      <h2>Weather in {location}</h2>
      <p>temperature {weather.main.temp} celsius</p>
      <img src={icon} alt="weather icon" width="auto" height="100" />
      <p>wind {weather.wind.speed} m/s</p>
    </div>
  );
};
export default Weather;
