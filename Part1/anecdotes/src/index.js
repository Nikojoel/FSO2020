import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const App = (props) => {
    const [selected, setSelected] = useState(0)
    const [votes, setVotes] = useState(new Array(6).fill(0))

    return (
        <div>
            <button onClick={() => {
                setSelected(Math.floor(Math.random() * 6))
            }}>Refresh</button>
            <button onClick={() => {
                const copy = [...votes]
                copy[selected] += 1
                setVotes(copy)
            }}>Vote</button>
            <h3>
                Anecdote of the day
            </h3>
            <p>
                {props.anecdotes[selected]}
            </p>
            <p>
                has {votes[selected]} votes
            </p>
            <h3>
                Top voted anecdote
            </h3>
            {Math.max.apply(null, votes) !== 0 &&
            <p>
                {props.anecdotes[votes.indexOf(Math.max(...votes))]}
            </p>
            }
            <p>
                has {Math.max.apply(null, votes)} votes
            </p>

        </div>
    )
}

const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
    <App anecdotes={anecdotes} />,
    document.getElementById('root')
)