declare module 'react-icons-weather'

type Stream = { 
    id: string, 
    name: string, 
    url: string | Function,
    isRadio: boolean,
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