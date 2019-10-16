import React, {useState} from 'react'

const Authors = (props) => {

  const [name, setName] = useState({
    'value': ''
  })
  const [born, setBorn] = useState('')

  const submit = async (e) => {
    e.preventDefault()

    await props.editAuthor({
      variables: { name: name.value, setBornTo: +born}
    })

    setName('')
    setBorn('')
  }

  const handleChange = (event) => {
    setName({value: event.target.value});
  }

  if (!props.show) {
    return null
  }

  if (props.authors.loading) {
    return <div>loading...</div>
  }

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              born
            </th>
            <th>
              books
            </th>
          </tr>
          {props.authors.data.allAuthors.map(a =>
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          )}
        </tbody>
      </table>

      <h3>Set birthyear</h3>
      <form onSubmit={submit}>
        <label>
          name
          <select value={name.value} onChange={handleChange}>
            {
              props.authors.data.allAuthors.map((a,i) => {
                return <option key={i} value={a.name}>{a.name}</option>
              })
            }
          </select>
        </label>
        <div>
          born
          <input
            type='number'
            value={born}
            onChange={({ target }) => setBorn(target.value)}
          />
        </div>
        <button type='submit'>update author</button>
      </form>
    </div>
  )
}

export default Authors