import { useEffect } from "react";
import { useState } from "react";
import Country from "./components/Country";

import countriesService from "./services/countries";

function App() {
  const [countries, setCountries] = useState([]);
  const [filter, setFilter] = useState("");
  const [selectedCountry, setSelectedCountry] = useState(null);

  useEffect(() => {
    countriesService.getAll().then((countries) => {
      setCountries(countries);
    });
  }, []);

  const filteredCountries = countries.filter((country) =>
    country.name.common.toLowerCase().includes(filter.toLowerCase())
  );

  const handleChange = (event) => {
    setFilter(event.target.value);
    setSelectedCountry(null);
  };

  return (
    <div>
      <form>
        find countries{" "}
        <input
          value={filter}
          onChange={handleChange}
        />
      </form>
      <br />
      <div>
        {filteredCountries.length > 10 ? (
          "Too many matches, specify another filter"
        ) : filteredCountries.length == 1 ? (
          <Country country={filteredCountries[0]} />
        ) : (
          filteredCountries.map((country) => (
            <div key={country.name.common}>
              {country.name.common}
              <button onClick={() => setSelectedCountry(country)}>show</button>
            </div>
          ))
        )}
      </div>

      <div>{selectedCountry && <Country country={selectedCountry} />}</div>
    </div>
  );
}

export default App;
