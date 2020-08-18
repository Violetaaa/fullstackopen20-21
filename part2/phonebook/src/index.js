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

  const handleNameChange = (event) => {
    // console.log(event.target.value)    
    setNewName(event.target.value)
  }

  const addName = (event) => {
    event.preventDefault()

    if (persons.find(person => person.name === newName)) {
      window.alert(`${newName} is already added to phonebook`)
    } else {
      const noteObject = {
        name: newName,
      }
      setPersons(persons.concat(noteObject)) //añade nueva nota a la lista
      setNewName('') //resetea el valor del input
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
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {persons.map(person =>
          <li key={person.name}>{person.name} </li>)}
      </ul>
    </div>
  )
}

export default App


ReactDOM.render(<App />, document.getElementById('root'))