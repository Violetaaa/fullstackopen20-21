import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import personService from './services/persons'

const Notification = ({ message }) => {
  if (message === null) {
    return null
  }

  const style = {
    color: message.type === 'success' ? 'green' : 'red',
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 1,
    marginBottom: 10
  }

  return (
    <div style={style}>
      {message.text}
    </div>
  )
}

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

const Persons = ({ persons, newSearch, deletePerson }) => {
  const filteredPersons = newSearch ? persons.filter(person => (person.name.toLowerCase()).includes(newSearch.toLowerCase())) : persons


  return (
    <ul>
      {filteredPersons.map(person =>
        <li key={person.name}>
          {person.name} {person.phone}
          <button onClick={() => deletePerson(person)}>delete</button>
        </li>)}
    </ul>
  )
}

const App = () => {

  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newPhone, setNewPhone] = useState('')
  const [newSearch, setNewSearch] = useState('')
  const [message, setMessage] = useState(null)

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
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

    const duplicatedPerson = persons.find(p => p.name === newName)

    if (duplicatedPerson) {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        const updatedPerson = { ...duplicatedPerson, phone: newPhone }

        personService
          .update(updatedPerson)
          .then(returnedPerson => {
            setMessage({
              'text': `Updated number from ${updatedPerson.name}`,
              'type': 'success'
            })
            setTimeout(() => {
              setMessage(null)
            }, 5000)
            setPersons(persons.map(p => p.id !== updatedPerson.id ? p : returnedPerson))
            setNewName('')
            setNewPhone('')
          })
          .catch(error => {
            setMessage({
              "text": `Unable to update ${updatedPerson.name}`,
              "type": ''
            })

            setTimeout(() => {
              setMessage(null)
            }, 5000)
          })


      }
    } else {
      const noteObject = {
        name: newName,
        phone: newPhone
      }
      personService
        .create(noteObject)
        .then(returnedPerson => {
          setMessage({
            "text": `Added ${returnedPerson.name}`,
            "type": 'success'
          })
          setTimeout(() => {
            setMessage(null)
          }, 5000)
          setPersons(persons.concat(returnedPerson))
          setNewName('')
          setNewPhone('')

        })
    }
  }

  const deletePerson = (person) => {
    if (window.confirm(`Delete ${person.name}?`)) {
      personService
        .remove(person.id)
        .then(response => {
          setPersons(persons.filter(p => p.id !== person.id))
        })
        .catch(error => {
          setMessage({
            "text": `${person.name} already deleted`,
            "type": ''
          })

          setTimeout(() => {
            setMessage(null)
          }, 5000)
        })
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>

      <Notification message={message} />

      <Filter newSearch={newSearch} handleSearchChange={handleSearchChange} />

      <h2>Add a new</h2>
      <PersonForm
        addName={addName} newName={newName} handleNameChange={handleNameChange} newPhone={newPhone} handlePhoneChange={handlePhoneChange}
      />
      <h2>Numbers</h2>
      <Persons persons={persons} newSearch={newSearch} deletePerson={deletePerson} />
    </div>
  )
}

export default App


ReactDOM.render(<App />, document.getElementById('root'))