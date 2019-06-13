import React, { useState } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const App = () => {
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])
  const [ personsToShow, setPersonsToShow ] = useState(persons)
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ newFilterName, setNewFilterName ] = useState('')

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter 
        persons={persons} setPersonsToShow={setPersonsToShow} 
        newFilterName={newFilterName} setNewFilterName={setNewFilterName}/>
      <h3>Add new note</h3>
      <PersonForm
        persons={persons} setPersons={setPersons}
        newName={newName} setNewName={setNewName}
        newNumber={newNumber} setNewNumber={setNewNumber}
        setPersonsToShow={setPersonsToShow} setNewFilterName={setNewFilterName}
        />
      <h2>Numbers</h2>
      <Persons personsToShow={personsToShow}/>
    </div>
  )
}

export default App