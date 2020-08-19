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
                        } else {
                            window.alert(`${props.newName} is already on the phone book`)
                        }
                    }}>add
                    </button>
                </div>
            </form>
        </div>
    )
}

export default PersonForm