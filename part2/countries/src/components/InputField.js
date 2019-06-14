import React, { useState, useEffect }  from 'react'
import axios from 'axios'

const InputField = ({input, setInput, inputResult, setInputResult}) => {

    const [countreisFromApi, setCountreisFromApi] = useState([])

    const hook = () => {
        axios
        .get('https://restcountries.eu/rest/v2/all')
        .then(response => {
            setCountreisFromApi(response.data)
        })
    }

    useEffect(hook, [])

    const handleInput = (event) => {
        const newInput = event.target.value
        setInput(newInput)
        const filteredCountreis = countreisFromApi.filter((country) => {
            return country.name.toLowerCase().includes(newInput.toLowerCase().trim())
        })
        if (filteredCountreis.length < 1 || filteredCountreis.length > 10) {
            setInputResult('Too many matches, specify another filter')
        } else {
            setInputResult(filteredCountreis)
        }
    }
    return (
        <>
            <input value={input} onChange={handleInput}/>
        </>
    )
}

export default InputField