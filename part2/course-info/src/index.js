import React from 'react'
import ReactDOM from 'react-dom'

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <div>
      <Course course={course} />
    </div>
  )
}

const Course = ({ course }) => {
  return (
    <div>
      <Header name={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
  </div>
  )
}


const Header = (props) => {
  return (
    <div>
       <h1>{props.name}</h1>
    </div>
  )
}

const Content = (props) => {
  // console.log(props)
  return (
    <div>
     {props.parts.map(part => (<Part key={part.id} part={part}/>))}
    </div>
  ) 

}

const Part = (props) => {
  // console.log(props)
  return (
      <div>
         <p>
          {props.part.name} {props.part.exercises}
        </p>
      </div>
  )
}

const Total = (props) => {
  return (
    <div>
      <p>Number of exercises {props.parts.reduce((total, part) => total + part.exercises, 0)}</p>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))