import { useState, useEffect } from 'react';
import './Time.scss';

function Time() {
    const [date, setDate] = useState(new Date());
    useEffect(() => {
        var timerID = setInterval(() => tick(), 1000);
        return function cleanup() {
            clearInterval(timerID);
        };
    });
    function tick() {
        setDate(new Date());
    }
    return <div className="Time">
        {date.toLocaleTimeString()}
        <button className="button is-primary">
            Primary button
        </button>
    </div>;
}

export default Time;