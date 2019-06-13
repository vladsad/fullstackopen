import React from 'react'

const Persons = ({personsToShow}) => {
    const rows = () => personsToShow.map((person,index) =>
        <li key={index}>{person.name} {person.number}</li>
    )

    return (
        <ul>
            {rows()}
        </ul>
    )
}

export default Persons