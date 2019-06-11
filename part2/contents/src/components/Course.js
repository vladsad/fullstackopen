import React from 'react'

const Header = ({text}) => {
    return (
        <h1>{text}</h1>
    )
}

const Part = ({part}) => {
    const {name, exercises} = part
    return (
        <p>{name} {exercises}</p>
    )
}

const Content = ({parts}) => {
    const rows = () => parts.map(part =>
        <Part
          key={part.id}
          part={part}
        />
    )

    return (
        <>
        {rows()}
        </>
    )
}

const Total = ({parts}) => {
    const total = parts.reduce((acc,part) => {
        return acc + part.exercises
    }, 0)

    return (
        <p>
         <b>total of {total} exercises</b>
        </p>
    )
}

const Course = ({course}) => {
    return (
        <>
        <Header text={course.name} />
        <Content parts={course.parts} />
        <Total parts={course.parts} />
        </>
    )
}

export default Course