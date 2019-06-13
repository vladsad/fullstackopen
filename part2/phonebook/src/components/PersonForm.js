import React from 'react'

const PersonForm = ({persons,newName,newNumber,setPersons,setNewName,setNewNumber,setPersonsToShow,setNewFilterName}) => {
    const handleNameChange = (event) => {
        setNewName(event.target.value)
    }

    const handleNumberChange = (event) => {
        setNewNumber(event.target.value)
    }

    const isPersonsContainsName = (name) => {
        return persons.some((person) => person.name === name)
    }

    const addPerson = (event) => {
        event.preventDefault()

        if (isPersonsContainsName(newName)) {
            alert(`${newName} is already added to phonebook`)
            return
        }

        const newPerson = {
            name: newName,
            number: newNumber
        }
        
        const newPersons = [...persons, newPerson]


        setNewFilterName('')
        setNewName('')
        setNewNumber('')
        setPersons(newPersons)
        setPersonsToShow(newPersons)
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