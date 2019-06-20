import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personService from './services/persons'
import Notification from './components/Notification'

const App = () => {
  const [ persons, setPersons ] = useState([])
  const [ personsToShow, setPersonsToShow ] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ newFilterName, setNewFilterName ] = useState('')
  const [ notification, setNotification ] = useState([null, 'default'])

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
        setPersonsToShow(initialPersons)
      })
  }, [])

  const updateNotification = (message) => {
    const [text, type] = message
    setNotification([text, type])

    setTimeout(() => {
      setNotification([null, 'default'])
    }, 10000)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notification}/>
      <Filter 
        persons={persons} setPersonsToShow={setPersonsToShow} 
        newFilterName={newFilterName} setNewFilterName={setNewFilterName}/>
      <h3>Add new note</h3>
      <PersonForm
        persons={persons} setPersons={setPersons}
        newName={newName} setNewName={setNewName}
        newNumber={newNumber} setNewNumber={setNewNumber}
        setPersonsToShow={setPersonsToShow} setNewFilterName={setNewFilterName}
        updateNotification={updateNotification}
        />
      <h2>Numbers</h2>
      <Persons 
        personsToShow={personsToShow} setPersonsToShow={setPersonsToShow} 
        setPersons={setPersons} 
        updateNotification={updateNotification}
      />
    </div>
  )
}

export default App