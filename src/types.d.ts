declare module 'react-icons-weather'


type StreamInfo = { 
    id: number, 
    name: string, 
    url: string | Function,
    isRradio: boolean,
};

type Config = {
    mediaPlayerStreams: SteamInfo[],
    youtubePlaylistURL: string,
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