import React from 'react'
import personService from '../services/persons'

const Persons = ({personsToShow, setPersonsToShow, setPersons, updateNotification}) => {
    const deletePerson = (id) => {
        if (window.confirm(`Delete ${personsToShow[id].name} ?`)) {
            personService
                .remove(personsToShow[id].id)
                .then(() => personService.getAll())
                .then(persons => {
                    setPersons(persons)
                    setPersonsToShow(persons)
                    updateNotification([`Removed ${personsToShow[id].name}`, 'success'])
                })
                .catch(() => 
                    updateNotification([`Information of ${personsToShow[id].name} has already been removed from server`, 'error'])
                )

        }
    }

    const rows = () => personsToShow.map((person,index) =>
        <li key={index}>{person.name} {person.number}  <button onClick={() => deletePerson(index)}>delete</button>
        </li>
    )

    return (
        <ul>
            {rows()}
        </ul>
    )
}

export default Persons