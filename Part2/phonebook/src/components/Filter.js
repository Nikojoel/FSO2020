import React from "react";

const Filter = (props) => {
    const filtered = props.persons.filter(char => char.name.toUpperCase().includes(props.filterValue.toUpperCase(), 0))
    return (
        <div>
            <div>
                filter names: <input value={props.filterValue} onChange={props.handleFilterInput}/>
            </div>
            {props.filterValue !== "" &&
            filtered.map((person, i) =>
                    <p key={i}>{person.name} {person.number}</p>
                )}
        </div>
    )
}
export default Filter