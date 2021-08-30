import useStore from '../../store';
import WeatherIcon from 'react-icons-weather';
import './Weather.scss';
import config from '../../config';

const temperatureSymbol: string = config.weather.tempSymbol;

function getDayPeriodFromUnixTS(ts: number): string {
    return new Date(ts * 1000).toLocaleString(
        undefined, { weekday: 'long', dayPeriod: 'short' }
    )
}

function getDayOfWeeekeStringFromUnixTS(ts: number) {
    return new Date(ts * 1000).toLocaleDateString(
        'en', { weekday: 'short', day: 'numeric' }
    )
}

function getKmPerHourFromMetersPerSecond(metersPerSecond: string) {
    return Math.round(
        (parseFloat(metersPerSecond) * 3.6)
    ).toString() + 'Km/h';
}

function getFormatedTemperature(temp: string) {
    return Math.round(parseFloat(temp)) + temperatureSymbol;
}

function Weather(props: any) {

    const weather: any = useStore((state: any) => state.weather);

    const isSimple: boolean = props.simple;

    return (
        <div className="Weather">
            {!weather && <div>Loading...</div>}
            {weather && weather.current &&
                (isSimple ?
                    <div>
                        <WeatherIcon
                            name="owm"
                            iconId={weather.current.weather[0].id.toString()} />
                        &nbsp;&nbsp;
                        {getFormatedTemperature(weather.current.temp)}
                    </div>
                    :
                    <div className="WeatherBackground">
                        <div className="WeatherCurrent">
                            <div className="columns">
                                <div className="column WeatherHumidity">
                                    H: {weather.current.humidity}%
                                </div>

                                <div className="column">
                                    <WeatherIcon
                                        name="owm"
                                        iconId={weather.current.weather[0].id.toString()} />
                                    &nbsp;&nbsp;
                                    {getFormatedTemperature(weather.current.temp)}
                                </div>

                                <div className="column WeatherWind">
                                    W: {getKmPerHourFromMetersPerSecond(weather.current.wind_speed)}
                                </div>
                            </div>
                        </div>

                        <div className="WeatherDaily">
                            <div className="columns">
                                {weather.daily.map((day: any, key: number) =>
                                    <div key={key}
                                        className="column">
                                        <div>{getDayOfWeeekeStringFromUnixTS(day.dt)}</div>
                                        <div className="WeatherIcon"><WeatherIcon
                                            name="owm"
                                            iconId={day.weather[0].id.toString()} /></div>
                                        <div>
                                            {getFormatedTemperature(day.temp.day)}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="WeatherAlerts">
                            {weather.alerts && weather.alerts.map(
                                (alert: any, key: number) =>
                                    key === 0 && <div key={key}>
                                        {getDayPeriodFromUnixTS(alert.start)}: {alert.event}.
                                    </div>
                            )}
                        </div>
                    </div>
                )
            }
        </div>
    );
}

export default Weather;