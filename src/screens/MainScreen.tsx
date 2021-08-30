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
    'v13.gif',
];

const backgroundUpdateIntervalSeconds = 900;
const urlSearchParams = new URLSearchParams(window.location.search);
const params = Object.fromEntries(urlSearchParams.entries());
const isLite = params.isLite && params.isLite === 'true';

console.log(isLite);

function MainScreen() {
    const [backgroundURL, setBackgroundURL] = useState(getRandomBackgrounnd());

    useEffect(() => {
        const timerID = setInterval(() => setBackgroundURL(
            getRandomBackgrounnd()),
            backgroundUpdateIntervalSeconds * 1000
        );

        return function cleanup() {
            clearInterval(timerID);
        };
    });

    function getRandomBackgrounnd() {
        return backgrounds[Math.floor(Math.random() * backgrounds.length)];
    }
    return <div style={isLite ? {} : { backgroundImage: `url(${process.env.PUBLIC_URL}/backgrounds/${backgroundURL})` }} className="MainScreen">
        <div className="top" >
            <Time />
        </div>
        <div className="bottom">
            <Weather />
        </div>
    </div>;
}

export default MainScreen;