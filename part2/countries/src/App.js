import React, { useState } from 'react'
import InputField from './components/InputField'
import CountriesList from './components/CountriesList'

function App() {

  const [input, setInput] = useState('')
  const [inputResult, setInputResult] = useState('')

  return (
    <div>
      find countries <InputField 
                        input={input} setInput={setInput}
                        inputResult={inputResult} setInputResult={setInputResult}
                        />
        { (typeof inputResult === 'object') ? <CountriesList countries={inputResult}/> : <p>{inputResult}</p> }
    </div>
  );
}

export default App;
