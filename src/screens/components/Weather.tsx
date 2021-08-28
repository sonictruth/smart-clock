import useStore from '../../store';
import './Weather.scss';

function Weather() {

    const weather:any = useStore((state: any) => state.weather);

    return (
        <div className="Weather">
            {weather &&
                <div>
{weather.current.weather[0].description}
                </div>}
        </div>
    );
}

export default Weather;