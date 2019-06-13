import React from 'react'

const Filter = ({persons, newFilterName, setPersonsToShow, setNewFilterName}) => {
    const handleFilterNameChange = (event) => {
        const filterName = event.target.value.trim()
        const filteredPersons = persons.filter((person) => {
        return person.name.toLowerCase().includes(filterName.toLowerCase())
        })
        setNewFilterName(filterName)
        setPersonsToShow(filteredPersons)
    }

    return (
        <div>
            filter shown with <input value={newFilterName} onChange={handleFilterNameChange} />
        </div>
    )
}

export default Filter