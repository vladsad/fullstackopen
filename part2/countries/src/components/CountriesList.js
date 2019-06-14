import React, {useState} from 'react'
import axios from 'axios'
import Country from './Country'

const CountriesList = ({countries}) => {

    const [showCountries, setShowCountries] = useState([])

    const handleButton = (index) => {
        showCountries[index] = showCountries[index] === undefined ? true : !showCountries[index]
        setShowCountries([...showCountries])
    }

    const rows = () => {
        return countries.map((country,index) => {
                return (
                    <div key={index}>
                    {country.name} <button key={index} onClick={()=>(
                        handleButton(index)
                        )}>show</button>
                    { showCountries[index] === true ? <Country country={countries[index]}/> : <></>}
                    </div>
                )
            }   
        )
    }

    return (
        <>
            { countries.length === 1 ?  <Country country={countries[0]}/> : rows()}
        </>
    )
}

export default CountriesList