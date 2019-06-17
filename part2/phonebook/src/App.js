import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personService from './services/persons'

const App = () => {
  const [ persons, setPersons ] = useState([])
  const [ personsToShow, setPersonsToShow ] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ newFilterName, setNewFilterName ] = useState('')

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
        setPersonsToShow(initialPersons)
      })
  }, [])

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
      <Persons 
        personsToShow={personsToShow} setPersonsToShow={setPersonsToShow} 
        setPersons={setPersons}
      />
    </div>
  )
}

export default App