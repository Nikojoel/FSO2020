import React, {useState} from 'react'
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";

const App = () => {
    const [persons, setPersons] = useState([
        { name: 'Arto Hellas', number: '040-123456' },
        { name: 'Ada Lovelace', number: '39-44-5323523' },
        { name: 'Dan Abramov', number: '12-43-234345' },
        { name: 'Mary Poppendieck', number: '39-23-6423122' }
    ])
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [filterValue, setNewFilterValue] = useState('')

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

