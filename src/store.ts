import create from 'zustand';
import config from './config';

const weatherConfig = config.weather;
const key = weatherConfig.key;

async function getCoordinates() {
    return new Promise( (resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
    });
}

async function getLocation() {
    const location = {
        latitude: weatherConfig.latitude,
        longitude: weatherConfig.longitude
    }
    try {
        const position:any = await getCoordinates();
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
            const response =
                await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${location.latitude}&lon=${location.longitude}&exclude=minutely,hourly&appid=${key}`);;
            set({ weather: await response.json() });
        };

        setInterval(() => set({ date: new Date() }), 1000);
        setInterval(() => setWeather(), config.updateIntervalSeconds * 1000);
        setWeather();
        return ({ date: new Date(), weather: null })
    })

export default useStore;
