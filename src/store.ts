import create from 'zustand';
import config from './config';

const weatherConfig = config.weather;
const weatherUpdateIntervalMs = weatherConfig.weatherUpdateIntervalSeconds * 1000;
const apiKey = weatherConfig.apiKey;
const apiURL = weatherConfig.apiURL;
const positionTimeoutMs = 5000;

async function getCoordinates() {
    return new Promise((resolve, reject) => {
        const timeout = setTimeout(() => reject(), positionTimeoutMs);;
        navigator.geolocation.getCurrentPosition(position => {
            clearTimeout(timeout);
            resolve(position);
        }, reject);

    });
}

async function getLocation() {
    const location = {
        latitude: weatherConfig.latitude,
        longitude: weatherConfig.longitude
    }
    try {
        const position: any = await getCoordinates();
        location.latitude = position.coords.latitude;
        location.longitude = position.coords.longitude;
    } catch (error) {
        console.error('Unable to get location', error);
    }
    return location;
}


const useStore = create(
    set => {
        async function setWeather() {

            const location = await getLocation();

            const params = new URLSearchParams({
                units: weatherConfig.units,
                lang: weatherConfig.lang,
                lat: location.latitude.toString(),
                lon: location.longitude.toString(),
                exclude: 'minutely,hourly',
                appid: apiKey,
            }).toString()

            const callURL = `${apiURL}?${params}`;
            const response = await fetch(callURL);

            set({ weather: await response.json() });
        };

        setInterval(() => set({ date: new Date() }), 1000);
        setInterval(() => setWeather(), weatherUpdateIntervalMs);
        setWeather();
        return ({ date: new Date(), weather: null })
    })


export default useStore;
