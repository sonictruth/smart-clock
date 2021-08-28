import create from 'zustand';
import config from './config';

const weatherConfig = config.weather;
const key = weatherConfig.key;
const lat = weatherConfig.lat;
const lon = weatherConfig.lon;

const useStore = create(
    set => {
        async function setWeather() {

            const response =
                await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly&appid=${key}`);;
            set({ weather: await response.json() });
        };
        /* xxxdd*/
        setInterval(() => set({ date: new Date() }), 1000);
        setInterval(() => setWeather(), config.updateIntervalSeconds * 1000);
        setWeather();
        return ({ date: new Date(), weather: null })
    })

export default useStore;
