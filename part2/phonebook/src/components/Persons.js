import React from 'react'
import personService from '../services/persons'

const Persons = ({personsToShow, setPersonsToShow, setPersons, setNewFilterName}) => {
    const deletePerson = (id) => {
        if (window.confirm(`Delete ${personsToShow[id].name} ?`)) {
            personService
                .remove(personsToShow[id].id)
                .then(() => personService.getAll())
                .then(persons => {
                    setPersons(persons)
                    setPersonsToShow(persons)
                })
                .catch(error => console.log('error'))
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