import './MainScreen.scss';
import Time from './components/Time';
import Weather from './components/Weather';
import { useState, useEffect } from 'react';

const animatedBackgrounds = [
    'v1.gif',
    'v2.gif',
    'v4.gif',
    'v5.gif',
    'v6.gif',
    'v7.gif',
    'v13.gif',
];

const backgrounds = Array.from(Array(40).keys()).map(index => `d${index + 1}.jpeg`);

const backgroundUpdateIntervalSeconds = 600;
const urlSearchParams = new URLSearchParams(window.location.search);
const params = Object.fromEntries(urlSearchParams.entries());
const isUsingAnimatedBackgrounds = params.animation && params.animation === 'true';

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
        const collection = isUsingAnimatedBackgrounds ? backgrounds : animatedBackgrounds;
        return collection[Math.floor(Math.random() * collection.length)];
    }
    return <div
        className="MainScreen"
        style={{
            backgroundImage:
                `url(${process.env.PUBLIC_URL}/backgrounds/${backgroundURL})`
        }}>
        <div className="top" >
            <Time />
        </div>
        <div className="bottom">
            <Weather />
        </div>
    </div>;
}

export default MainScreen;