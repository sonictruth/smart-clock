import './MainScreen.scss';
import Time from './components/Time';
import Weather from './components/Weather';
import {
    useState,
    useEffect,
} from 'react';
import config from '../config';

const backgrounds = Array.from(
    Array(40)
        .keys())
    .map(index => `d${index + 1}.jpeg`
    );
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
