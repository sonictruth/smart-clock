import './MainScreen.scss';
import Time from './components/Time';
// import Weather from './components/Weather';
import WeatherExternal from './components/WeatherExternal';


import {
    useState,
    useEffect,
} from 'react';
import config from '../config';

const TOTAL_BACKGROUNDS = 167;
const backgrounds = Array.from({ length: TOTAL_BACKGROUNDS }, (_, index) => `d${index + 1}.jpg`);

console.log(backgrounds);

const backgroundImageUpdateIntervalSeconds
    = config.backgroundImageUpdateIntervalSeconds;

function MainScreen() {
    const [backgroundURL, setBackgroundURL] = useState(getRandomBackground());

    useEffect(() => {
        const timerID = setInterval(() => setBackgroundURL(
            getRandomBackground()),
            backgroundImageUpdateIntervalSeconds * 1000
        );
        return () => clearInterval(timerID);
    }, []);

    function getRandomBackground() {
        return backgrounds[Math.floor(Math.random() * backgrounds.length)];
    }

    return <div
        className="MainScreen"
        style={{
            backgroundImage:
                `url(${process.env.PUBLIC_URL}/backgrounds_andrei/${backgroundURL})`
        }}>
        <div className="top" >
            <Time />
        </div>
        <div className="bottom">
            <WeatherExternal />
        </div>
    </div>;
}

export default MainScreen;
