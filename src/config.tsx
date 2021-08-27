// import YouToubePlayer from './screens/YouToubePlayer';
import MediaPlayer from './screens/MediaPlayer';
import MainScreen from './screens/MainScreen';

const config: any = {};

config.updateIntervalSeconds = 10;

config.youtubePlaylistURL = 'https://www.youtube.com/embed/videoseries?list=PLywsZdsYYHTZNdHTYDNooq86TCJLPCjoK';

config.mediaPlayerStreams = [
    {
        name: 'iCat',
        url: 'https://directes-radio-int.ccma.cat/int/mp4:icatfm/playlist.m3u8'
    },
    {
        name: 'Live Youtube',
        url: 'https://www.youtube.com/embed/videoseries?list=PLywsZdsYYHTZNdHTYDNooq86TCJLPCjoK',
    },
]

config.routes = [
    /*
    {
        path: "/YouToubePlayer",
        component: YouToubePlayer,
    },
    */
    {
        path: "/MediaPlayer",
        component: MediaPlayer,
    },
    {
        path: "/",
        component: MainScreen
    },
];

// TODO: Move to env variable
config.weather = {
    key: '5a7cef30eb5cb1750171f99e9988dc7d',
    locationLabel: 'Barcelona',
    lat: 41.376681,
    lon: 2.176177,
    lang: 'en',
    unit: 'metric'
}


export default config;
