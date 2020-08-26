import React from "react";

const PersonForm = (props) => {
    return (
        <div>
            <h2>Add new number</h2>
            <form>
                <div>
                    name: <input value={props.newName} onChange={props.handleNameInput}/>
                </div>
                <div>
                    number: <input value={props.newNumber} onChange={props.handleNumberInput}/>
                </div>
                <div>
                    <button type="submit" onClick={(e)=> {
                        e.preventDefault()
                        if (props.checkName(props.newName) === undefined) {
                            props.addName()
                        } else if (window.confirm(`${props.newName} is already on the phone book, replace the old number with a new one?`)) {
                            props.updateName(props.checkName(props.newName).id)
                        }
                    }}>Add
                    </button>
                </div>
            </form>
        </div>
    )
}

export default PersonForm