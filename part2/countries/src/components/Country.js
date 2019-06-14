import React, {useState, useEffect} from 'react'
import axios from 'axios'
import Weather from './Weather'

const Country = ({country}) => {
    const languages = () => country.languages.map((lang,index) => (
            <li key={index}>{lang.name}</li>
        ))

    return (
        <>
            <h1>
                {country.name}
            </h1>
            <p>capital {country.capital}</p>
            <p>population {country.population}</p>
            <h2>languages</h2>
            <ul>
                {languages()}
            </ul>
            <img src={country.flag} width="100" height="100" alt={country.name + ' flag'} />
            <Weather country={country.name}/>
            </>
    )
}

export default Country