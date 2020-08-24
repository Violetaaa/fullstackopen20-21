import React, { useState, useEffect  } from 'react'
import ReactDOM from 'react-dom'
// import axios from 'axios'
import personService from './services/persons'


const PersonForm = ({ addName, newName, handleNameChange, newPhone, handlePhoneChange }) => {
  return (
    <form onSubmit={addName}>
      <div>
        name: <input
          value={newName}
          onChange={handleNameChange} />
      </div>
      <div>
        phone: <input
          value={newPhone}
          onChange={handlePhoneChange} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>

  )
}
const Filter = ({ newSearch, handleSearchChange }) => {
  return (
    <div>
      filter shown with <input
        value={newSearch}
        onChange={handleSearchChange} />
    </div>
  )
}

const Persons = ({ persons, newSearch }) => {
  const filteredPersons = newSearch ? persons.filter(person => (person.name.toLowerCase()).includes(newSearch.toLowerCase())) : persons
  return (
    <ul>
      {filteredPersons.map(person =>
        <li key={person.name}>{person.name} {person.phone} </li>)}
    </ul>
  )
}

const App = () => {

  const [persons, setPersons] = useState([])
  // const [persons, setPersons] = useState([
  //   { name: 'Arto Hellas', number: '040-123456' },
  //   { name: 'Ada Lovelace', number: '39-44-5323523' },
  //   { name: 'Dan Abramov', number: '12-43-234345' },
  //   { name: 'Mary Poppendieck', number: '39-23-6423122' }
  // ])
  const [newName, setNewName] = useState('')
  const [newPhone, setNewPhone] = useState('')
  const [newSearch, setNewSearch] = useState('')

  useEffect(() => {
    personService
      .getAll()
      .then(response => {
        setPersons(response.data)
      })
  }, [])

  const handleSearchChange = (event) => {
    setNewSearch(event.target.value)
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handlePhoneChange = (event) => {
    setNewPhone(event.target.value)
  }

  const addName = (event) => {
    event.preventDefault()
    if (persons.find(person => person.name === newName)) {
      window.alert(`${newName} is already added to phonebook`)
    } else {
      const noteObject = {
        name: newName,
        phone: newPhone
      }
      personService
        .create(noteObject)
        .then(response => {
          setPersons(persons.concat(response.data))      
          setNewName('')
          setNewPhone('')
      })   
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter newSearch={newSearch} handleSearchChange={handleSearchChange} />

      <h2>Add a new</h2>
      <PersonForm
        addName={addName} newName={newName} handleNameChange={handleNameChange} newPhone={newPhone} handlePhoneChange={handlePhoneChange}
      />
      <h2>Numbers</h2>
      <Persons persons={persons} newSearch={newSearch} />

    </div>
  )
}

export default App


ReactDOM.render(<App />, document.getElementById('root'))