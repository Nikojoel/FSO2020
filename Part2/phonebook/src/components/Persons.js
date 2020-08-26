import React from "react";

const Persons = (props) => {
    return (
        <div>
            <h2>Numbers</h2>
            {props.persons.map((person, i) =>
                    <p key={i}>{person.name} {person.number}<button onClick={() => {
                        if (window.confirm(`Delete ${person.name} ?`)) {
                            props.remove(person.id)
                        }
                    }}>Delete</button></p>
                )}
        </div>
    )
}

export default Persons