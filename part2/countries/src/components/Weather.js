import React, {useState,useEffect} from 'react'
import axios from 'axios'

const Weather = ({country}) => {

    const [weather, setWeather] = useState(null)

    const hook = () => {
        const url = 
            'http://api.apixu.com/v1/current.json?key=d22124d1a97e4622b4c81518191406&q=' + encodeURIComponent(country)

        axios
            .get(url)
            .then(response => {
                setWeather(response.data)
            })
    }

    useEffect(hook, [])

    if (weather === null) {
        return <></>
    }

    return (
        <>
        <h2>Weather in {country}</h2>
        <p>temperature {weather.current.temp_c} Celsius</p>
        <img src={weather.current.condition.icon} width="64" height="64" alt={weather.current.condition.text} />
        <p>wind {weather.current.wind_kph} kph direction {weather.current.wind_dir}</p>
        </>
    )
}

export default Weather