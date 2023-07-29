import { useState, useEffect } from 'react'
import axios from 'axios'
import PropTypes from 'prop-types'

const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  return {
    type,
    value,
    onChange
  }
}

const useCountry = (name) => {
  const [country, setCountry] = useState(null)

  useEffect(() => {
    if (name === '') {
      return
    }

    axios
      .get(`https://studies.cs.helsinki.fi/restcountries/api/name/${name}`)
      .then(response => {
        setCountry({ found: true, data: response.data })
        console.log(response)
      }).catch(() => {
        setCountry({ found: false })
      })
  }, [name])

  return country
}

const Country = ({ country }) => {
  if (!country) {
    return null
  }

  if (!country.found) {
    return (
      <div>
        not found...
      </div>
    )
  }

  console.log('country', country)

  return (
    <div>
      <h3>{country.data.name.common} </h3>
      <div>capital {country.data.capital[0]} </div>
      <div>population {country.data.population}</div> 
      <img src={country.data.flags.png} height='100' alt={`flag of ${country.data.name.common}`}/>  
    </div>
  )
}

Country.propTypes = {
  country: PropTypes.shape({
    found: PropTypes.bool,
    data: PropTypes.shape({
      name: PropTypes.shape({
        common: PropTypes.string,
      }),
      capital: PropTypes.arrayOf(PropTypes.string),
      population: PropTypes.number,
      flags: PropTypes.shape({
        png: PropTypes.string,
      }),
    }),
  }),
};


const App = () => {
  const nameInput = useField('text')
  const [name, setName] = useState('')
  const country = useCountry(name)

  const fetch = (e) => {
    e.preventDefault()
    setName(nameInput.value)
    console.log('fetch name', nameInput.value)
  }

  return (
    <div>
      <form onSubmit={fetch}>
        <input {...nameInput} />
        <button>find</button>
      </form>

      <Country country={country} />
    </div>
  )
}

export default App