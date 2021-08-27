import { useState, useEffect } from 'react';
import useStore from '../../store';
import config from '../../config';
import './Weather.scss';


function Weather() {

    const [uptimeSeconds, setUptimeSeconds] = useState(0);
    
    useEffect(
        () =>
            useStore.subscribe(
                () => {
                    if (uptimeSeconds % config.updateIntervalSeconds === 0) {
                        updateWeather()
                    }
                    setUptimeSeconds(uptimeSeconds+1);
                },
                (state: any) => state.date,
            )
        , [uptimeSeconds]
    );

    function updateWeather() {
        console.log('execute');
    }

    return (
        <div className="Weather">
            Weather {uptimeSeconds}
        </div>
    );
}

export default Weather;