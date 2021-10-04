declare module 'react-icons-weather'

type OpenWeatherData = {
    alerts: any[],
    current: any,
    daily: any[],
    lat: number,
    lon: number,
    timezone: string,
    timezone_offset: number,
}

type ClockState = {
    date: Date,
    weather: OpenWeatherData | null,
}

type Stream = {
    id: string,
    name: string,
    url: string | Function,
    isRadio: boolean,
    category: string,
};

type TouchPosition = {
    start: number,
    end: number,
}

type Config = {
    backgroundImageUpdateIntervalSeconds: number,
    mediaPlayerStreams: Stream[],
    weather: {
        apiURL: string,
        apiKey: string,
        latitude: number,
        longitude: number,
        tempSymbol: string,
        units: string,
        lang: 'en',
        weatherUpdateIntervalSeconds: number,
    }
}