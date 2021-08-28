import './MainScreen.scss';
import Time from './components/Time';
import Weather from './components/Weather';
import { useState, useEffect } from 'react';

const backgrounds = [
    'v1.gif',
    'v2.gif',
    'v4.gif',
    'v5.gif',
    'v6.gif',
    'v7.gif',
    'v8.gif',
    'v9.gif',
    'v10.gif',
    'v11.gif',
    'v12.gif',
    'v13.gif',
];

const backggroundUpdateIntervalSeconds = 100;

function MainScreen() {
    const [backgroundURL, setBackgroundURL] = useState(getRandomBackgrounnd());

    useEffect(() => {
        const timerID = setInterval(() => setBackgroundURL(
            getRandomBackgrounnd()),
            backggroundUpdateIntervalSeconds * 1000
        );

        return function cleanup() {
            clearInterval(timerID);
        };
    });

    function getRandomBackgrounnd() {
        return backgrounds[Math.floor(Math.random() * backgrounds.length)];
    }
    return <div style={{ backgroundImage: `url(/smart-clock/backgrounds/${backgroundURL})` }} className="MainScreen">
        <div className="top">
            <Time />
        </div>
        <div className="bottom">
            <Weather />
        </div>
    </div>;
}

export default MainScreen;