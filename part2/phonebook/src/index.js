import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const App = () => {
  const [persons, setPersons] = useState([
    {
      name: 'Arto Hellas',
      phone: 123
    }
  ])
  const [newName, setNewName] = useState('')
  const [newPhone, setNewPhone] = useState('')

  const handleNameChange = (event) => {
    // console.log(event.target.value)    
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
      setPersons(persons.concat(noteObject)) //añade nuevo contacto a la lista
      setNewName('') //resetea el valor del input
      setNewPhone('')
    }
  }


  return (
    <div>
      <h2>Phonebook</h2>
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
      <h2>Numbers</h2>
      <ul>
        {persons.map(person =>
          <li key={person.name}>{person.name} {person.phone} </li>)}
      </ul>
    </div>
  )
}

export default App


ReactDOM.render(<App />, document.getElementById('root'))