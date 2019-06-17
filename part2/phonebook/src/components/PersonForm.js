import React from 'react'
import personService from '../services/persons'

const PersonForm = ({persons,newName,newNumber,setPersons,setNewName,setNewNumber,setPersonsToShow,setNewFilterName}) => {
    const handleNameChange = (event) => {
        setNewName(event.target.value)
    }

    const handleNumberChange = (event) => {
        setNewNumber(event.target.value)
    }

    const isPersonsContainsName = (name) => {
        const index = persons.findIndex((person) => person.name === name)
        const result = {
            response: index === -1 ? false : true,
            index,
        }
        return result
    }

    const addPerson = (event) => {
        event.preventDefault()

        const newPerson = {
            name: newName,
            number: newNumber
        }

        const check = isPersonsContainsName(newName)

        if (check.response) {
            if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one`)) {
                personService
                    .update(check.index + 1, newPerson)
                    .then(() => personService.getAll())
                    .then(persons => {
                        setNewFilterName('')
                        setNewName('')
                        setNewNumber('')
                        setPersons(persons)
                        setPersonsToShow(persons)
                    })
                    .catch(error => console.log('error'))
            }
        } else {
            personService
                .create(newPerson)
                .then(() => personService.getAll())
                .then(persons => {
                    setNewFilterName('')
                    setNewName('')
                    setNewNumber('')
                    setPersons(persons)
                    setPersonsToShow(persons)
                })
                .catch(error => console.log('error'))
        }
    }

    return (
        <form onSubmit={addPerson}>
            <div>
                name: <input value={newName} onChange={handleNameChange}/>
            </div>
            <div>
                number: <input value={newNumber} onChange={handleNumberChange}/>
            </div>
            <div>
                <button type="submit">add</button>
            </div>
        </form>
    )
}

export default PersonForm