import React from 'react'

const Filter = ({persons, newFilterName, setPersonsToShow, setNewFilterName}) => {
    const handleFilterNameChange = (event) => {
        const newValue = event.target.value
        setNewFilterName(newValue)
        const filteredPersons = persons.filter((person) => {
        return person.name.toLowerCase().includes(newValue.toLowerCase().trim())
        })
        setPersonsToShow(filteredPersons)
    }

    return (
        <div>
            filter shown with <input value={newFilterName} onChange={handleFilterNameChange} />
        </div>
    )
}

export default Filter