import create from 'zustand';
import config from './config';

const weatherConfig = config.weather;
const weatherUpdateIntervalMs = weatherConfig.weatherUpdateIntervalSeconds * 1000;
const key = weatherConfig.key;
const positionTimeoutMs = 5000;

async function getCoordinates() {
    return new Promise( (resolve, reject) => {
        const timeout = setTimeout( ()=> reject(), positionTimeoutMs);;
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
           
            const params = `units=${weatherConfig.units}&lang=${weatherConfig.lang}&lat=${location.latitude}&lon=${location.longitude}&exclude=minutely,hourly&appid=${key}`;
            const url = `https://api.openweathermap.org/data/2.5/onecall?${params}`;

            const response = await fetch(url);

            set({ weather: await response.json() });
        };

        setInterval(() => set({ date: new Date() }), 1000);
        setInterval(() => setWeather(), weatherUpdateIntervalMs);
        setWeather();
        return ({ date: new Date(), weather: null })
    })


export default useStore;
