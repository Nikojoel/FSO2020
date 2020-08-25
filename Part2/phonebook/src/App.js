import React, {useEffect, useState} from 'react'
import Filter from "./components/Filter"
import PersonForm from "./components/PersonForm"
import Persons from "./components/Persons"
import APIService from "./services/API"

const App = () => {
    const [persons, setPersons] = useState([])
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [filterValue, setNewFilterValue] = useState('')

    const getPersons = () => {
        APIService.getAll().then(response => {
            setPersons(response)
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
        const data = {name: newName, number: newNumber}
        APIService.create(data).then(response => {
            setPersons(persons.concat(response))
        })
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

