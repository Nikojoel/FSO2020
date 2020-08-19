import React from "react";

const Header = ({course}) => {
    return (
        <h1>{course.name}</h1>
    )
}

const Total = ({course}) => {
    const reducer = (accumulator, currentValue) => accumulator + currentValue.exercises
    const total = course.parts.reduce(reducer, 0)
    console.log(total)
    return(
        <b>Number of exercises {total}</b>
    )
}

const Part = (course) => {
    return (
        <p>
            {course.part.name} {course.part.exercises}
        </p>
    )
}

const Content = ({course}) => {
    return (
        <div>
            {course.parts.map((part, i) =>
                <Part part={part} key={i}/>)
            }
        </div>
    )
}

const Course = ({course}) => {
    return (
        <div>
            <Header course={course}/>
                <Content course={course}>
                    <Part/>
                </Content>
            <Total course={course}/>
        </div>
    )
}

export default Course
