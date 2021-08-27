import './MainScreen.scss';
import Time from './components/Time';
import Weather from './components/Weather';

function MainScreen() {
    return <div className="MainScreen">
        <div className="top">
            <Time />
        </div>
        <div className="bottom">
            <Weather />
        </div>
    </div>;
}

export default MainScreen;