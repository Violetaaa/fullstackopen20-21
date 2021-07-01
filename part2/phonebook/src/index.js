import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import personService from './services/persons'



const Notification = ({ message }) => {
  if (message === null) {
    return null
  }

  const style = {
    color: message.type === 'success' ? 'green' : 'red',
    background: '#eee',
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
    <div>
    <h2 className="display-5">Add a new contact</h2>
    <form onSubmit={addName}>
      <div className="form-group">
        Name: <input
          value={newName}
          onChange={handleNameChange} 
          className="form-control mt-3"/>
      </div>
      <div className="form-group">
        Phone: <input
          value={newPhone}
          onChange={handlePhoneChange}
          className="form-control mt-3" />
      </div>
      <div>
        <button className="btn btn-dark my-4 px-4" type="submit">Add</button>
      </div>
    </form>
    </div>

  )
}
const Filter = ({ newSearch, handleSearchChange }) => {
  return (

    <div className="form-inline pb-5">
<label className="mr-2">Filter shown with</label>      
      <input
        value={newSearch}
        onChange={handleSearchChange} 
        className="form-control"/>
    </div>
  )
}

const Persons = ({ persons, newSearch, deletePerson }) => {
  const filteredPersons = newSearch ? persons.filter(person => (person.name.toLowerCase()).includes(newSearch.toLowerCase())) : persons


  return (
    <div>
        <h2>Numbers</h2>
        <ul>
          {filteredPersons.map(person =>
          <li key={person.name}>
            {person.name} {person.phone}
            <button onClick={() => deletePerson(person)}>delete</button>
          </li>)}
        </ul>
    </div>
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
    <div className="container">
      <div className="row justify-content-md-center">
        <div>

          <h1 className="display-4 py-5">Phonebook</h1>

          <Notification message={message} />

          <Filter newSearch={newSearch} handleSearchChange={handleSearchChange} />

          <PersonForm
            addName={addName} newName={newName} handleNameChange={handleNameChange} newPhone={newPhone} handlePhoneChange={handlePhoneChange}
          />
      
          <Persons persons={persons} newSearch={newSearch} deletePerson={deletePerson} />
        </div>
      </div>
    </div>
  )
}

export default App


ReactDOM.render(<App />, document.getElementById('root'))