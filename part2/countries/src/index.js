import React, { useState, useEffect } from 'react'
import axios from 'axios'
import ReactDOM from 'react-dom'

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>{text}</button>
)

const Countries = ({ countries, newSearch, setNewSearch, weather, setWeather }) => {
  // console.log(countries)
  const filteredCountries = countries.filter(countrie => (countrie.name.toLowerCase()).includes(newSearch.toLowerCase()))
  // console.log(filteredCountries[0])
  const handleButton = (event) => {
    // console.log(event.target.parentNode.getAttribute("value"))
    setNewSearch(event.target.parentNode.getAttribute("value"))
  }
  if (filteredCountries.length > 10) {
    return (
      <div>
        <p>Too many matches, specify another filter</p>
      </div>
    )
  } else if (filteredCountries.length <= 10 && filteredCountries.length > 1) {
    return (
      <div>
        <ul>
          {filteredCountries.map(countrie =>
            <li value={countrie.name} key={countrie.name}>{countrie.name} <Button handleClick={handleButton} text='show' /></li>)}
        </ul>
      </div>
    )
  } else if (filteredCountries.length === 1) {
    return (
      <Country country={filteredCountries[0]} weather={weather} setWeather={setWeather} />
    )
  } else {
    return (
      <div></div>
    )
  }
}

const Filter = ({ newSearch, handleSearchChange }) => {
  return (
    <div>
      find countries <input
        value={newSearch}
        onChange={handleSearchChange} />
    </div>
  )
}

const Country = ({ country, weather, setWeather }) => {
  
  useEffect(() => {
    const params = {
      access_key: process.env.REACT_APP_API_KEY,
      query: country.capital
  }

  axios
      .get('http://api.weatherstack.com/current', {params})
      .then(response => {
        setWeather(response.data.current)
      })
  }, [country.capital, setWeather])
  
  return (
    <div>
      <h1>{country.name}</h1>
      <p>capital {country.capital}</p>
      <p>population {country.population}</p>
      <h2>Languajes</h2>
      <ul>
        {country.languages.map(language => (
          <li key={language.name}>{language.name}</li>
        ))}
      </ul>
      <img src={country.flag} alt={country.name}></img>
      <h2>Weather in {country.capital}</h2>
      <p>temperature {weather.temperature}</p>
      <img src={weather.weather_icons} alt={country.name}></img>
      <p>wind {weather.wind_speed} mph directions {weather.wind_dir}</p>
    </div>

  )
}

const App = () => {

  const [countries, setCountries] = useState([])
  const [newSearch, setNewSearch] = useState('')
  const [weather, setWeather] = useState('');

  const handleSearchChange = (event) => {
    setNewSearch(event.target.value)
  }

  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  return (
    <div>
      <h2>Filter</h2>
      <Filter newSearch={newSearch} handleSearchChange={handleSearchChange} />
      <h2>Countries</h2>
      <Countries countries={countries} newSearch={newSearch} setNewSearch={setNewSearch} weather={weather} setWeather={setWeather}/>
    </div>
  )
}

export default App

ReactDOM.render(<App />, document.getElementById('root'))