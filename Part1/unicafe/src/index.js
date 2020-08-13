import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = (props) => {
    return (
        <button onClick={props.handleEvent}>{props.text}</button>
    )
}

const SingleStatistics = (props) => {
    return (
        <tr>
            <td>
                {props.text}
            </td>
            <td>
                {props.value}
            </td>
        </tr>
    )
}

const AvgStatistics = (props) => {
    const avg = (props.data.good + (props.data.bad * -1)) / props.data.all
    return (
        <tr>
            <td>
                {props.text}
            </td>
            <td>
                {avg}
            </td>
        </tr>
    )
}

const PositiveStatistics = (props) => {
    const pos = (props.data.good / props.data.all) * 100
    return (
        <tr>
            <td>
                {props.text}
            </td>
            <td>
                {pos}%
            </td>
        </tr>
    )
}
const Statistics = (props) => {
    if (props.all === 0) {
        return (
            <h3>No feedback given</h3>
        )
    }
        return (
            <div>
                <h3>Statistics</h3>
                <table>
                    <tbody>
                        <SingleStatistics text="Good" value={props.good}/>
                        <SingleStatistics text="Neutral" value={props.neutral}/>
                        <SingleStatistics text="Bad" value={props.bad}/>
                        <SingleStatistics text="All" value={props.all}/>
                        <AvgStatistics text="Average" data={props}/>
                        <PositiveStatistics text="Positive" data={props}/>
                    </tbody>
                </table>
                </div>
        )

}
const App = () => {
    // save clicks of each button to own state
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)
    const [all, setAll] = useState(0)

    return (
        <div>
            <h3>Give Feedback</h3>
            <form onClick={(e) => {
                e.preventDefault()
                setAll(all + 1)
            }}>
                <Button text="good" handleEvent={() => setGood(good + 1)}/>
                <Button text="neutral" handleEvent={() => setNeutral(neutral + 1)}/>
                <Button text="bad" handleEvent={() => setBad(bad + 1)}/>
            </form>
            <Statistics good={good} bad={bad} neutral={neutral} all={all}/>
        </div>
    )
}

ReactDOM.render(<App />,
    document.getElementById('root')
)