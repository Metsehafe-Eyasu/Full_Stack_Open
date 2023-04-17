import { useState } from "react";
import { useEffect } from "react";

import countriesService from "../services/countries";
import Weather from "./Weather";

const Country = ({ country }) => {
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    const lat = country.capitalInfo.latlng[0];
    const lng = country.capitalInfo.latlng[1];
    countriesService.getWeather(lat, lng).then((weather) => {
      setWeather(weather);
      console.log(weather);
    });
  }, [country.capitalInfo.latlng]);

  return (
    <div>
      <h1>{country.name.common}</h1>
      <p>capital {country.capital[0]}</p>
      <p>area {country.area}</p>
      <br />
      <h3>languages</h3>
      <ul>
        {Object.entries(country.languages).map((country) => (
          <li key={country[0]}> {country[1]} </li>
        ))}
      </ul>
      <br />
      <img src={country.flags.png} alt="flag" width="auto" height="100" />

      {weather && <Weather location={country.capital[0]} weather={weather} />}
    </div>
  );
};
export default Country;
