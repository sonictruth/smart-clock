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

const liteBackgrounds = Array.from(Array(40).keys()).map( index => `d${index+1}.jpeg`);

const backgroundUpdateIntervalSeconds = 600;
const urlSearchParams = new URLSearchParams(window.location.search);
const params = Object.fromEntries(urlSearchParams.entries());
const isLite = params.isLite && params.isLite === 'true';

function MainScreen() {
    const [backgroundURL, setBackgroundURL] = useState(getRandomBackground());

    useEffect(() => {
        const timerID = setInterval(() => setBackgroundURL(
            getRandomBackground()),
            backgroundUpdateIntervalSeconds * 1000
        );
        return () => clearInterval(timerID);
    }, []);

    function getRandomBackground() {
        const collection = isLite ? liteBackgrounds : backgrounds;
        return collection[Math.floor(Math.random() * collection.length)];
    }
    return <div style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/backgrounds/${backgroundURL})` }} className="MainScreen">
        <div className="top" >
            <Time />
        </div>
        <div className="bottom">
            <Weather />
        </div>
    </div>;
}

export default MainScreen;