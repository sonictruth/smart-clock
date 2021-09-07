declare module 'react-icons-weather'

type StreamInfo = { 
    id: string, 
    name: string, 
    url: string | Function,
    isRadio: boolean,
};

type Config = {
    backgroundImageUpdateIntervalSeconds: number,
    mediaPlayerStreams: StreamInfo[],
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