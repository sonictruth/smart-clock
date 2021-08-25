import { useState, useEffect } from 'react';
import './Time.css';

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
    </div>;
}

export default Time;