import React, {useEffect, useState} from 'react'
import Filter from "./components/Filter"
import PersonForm from "./components/PersonForm"
import Persons from "./components/Persons"
import axios from "axios";

const App = () => {
    const [persons, setPersons] = useState([])
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [filterValue, setNewFilterValue] = useState('')

    const getPersons = () => {
        axios.get('http://localhost:3001/persons').then(response => {
            console.log(response)
            setPersons(response.data)
        })
    }
    useEffect(getPersons, [])

    const handleNameInput = (event) => {
        setNewName(event.target.value)
    }

    const handleNumberInput = (event) => {
        setNewNumber(event.target.value)
    }

    const handleFilterInput = (event) => {
        setNewFilterValue(event.target.value)
    }

    const addName = () => {
        setPersons(persons.concat({name: newName, number: newNumber}))
        setNewName("")
        setNewNumber("")
    }

    const checkName = (checkable) => {
        return persons.find(name => checkable === name.name)
    }

    return (
        <div>
            <h2>Phonebook</h2>
            <Filter persons={persons} filterValue={filterValue} handleFilterInput={handleFilterInput}/>
            <PersonForm
                handleNameInput={handleNameInput}
                handleNumberInput={handleNumberInput}
                newName={newName}
                newNumber={newNumber}
                addName={addName}
                checkName={checkName}
            />
            <Persons persons={persons}/>
        </div>
    )
}

export default App

