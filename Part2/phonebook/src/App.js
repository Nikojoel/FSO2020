import React, {useEffect, useState} from 'react'
import Filter from "./components/Filter"
import PersonForm from "./components/PersonForm"
import Persons from "./components/Persons"
import Notification from "./components/Notification";
import APIService from "./services/API"

const App = () => {
    const [persons, setPersons] = useState([])
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [filterValue, setNewFilterValue] = useState('')
    const [error, setError] = useState(null)
    const [styleClass, setClass] = useState('')

    const getPersons = () => {
        APIService.getAll().then(response => {
            setPersons(response)
        })
    }
    useEffect(getPersons, [])

    const addName = () => {
        const data = {name: newName, number: newNumber}
            APIService.create(data).then(response => {
                setPersons(persons.concat(response))
                setNewName("")
                setNewNumber("")
                setClass("success")
                setError(`Added ${newName}`)
                setTimeout(() => {
                    setError(null)
                }, 5000)
        }).catch(e => {
            console.log(e)
            setClass("error")
            setError(e.response.data.error)
                setTimeout(() => {
                    setError(null)
                }, 5000)
            })
    }

    const updateName = (id) => {
        const data = {name: newName, number: newNumber}
            APIService.update(id, data).then(() => {
                getPersons()
                setNewName("")
                setNewNumber("")
                setClass("success")
                setError(`Updated ${newName}`)
                setTimeout(() => {
                    setError(null)
                }, 5000)
            }).catch(e => {
                console.log(e)
                setClass("error")
                setError(`${newName} was already removed from the server`)
                setTimeout(() => {
                    setError(null)
                }, 5000)
            })
    }

    const removeName = (id) => {
        APIService.remove(id).then(getPersons)
    }

    const handleNameInput = (event) => {
        setNewName(event.target.value)
    }

    const handleNumberInput = (event) => {
        setNewNumber(event.target.value)
    }

    const handleFilterInput = (event) => {
        setNewFilterValue(event.target.value)
    }

    const checkName = (checkable) => {
        return persons.find(name => checkable === name.name)
    }

    return (
        <div>
            <Notification message={error} className={styleClass}/>
            <h2>Phonebook</h2>
            <Filter persons={persons} filterValue={filterValue} handleFilterInput={handleFilterInput}/>
            <PersonForm
                handleNameInput={handleNameInput}
                handleNumberInput={handleNumberInput}
                newName={newName}
                newNumber={newNumber}
                addName={addName}
                checkName={checkName}
                updateName={updateName}
            />
            <Persons persons={persons} remove={removeName}/>
        </div>
    )
}

export default App

