import Time from './screens/Time';
import Weather from './screens/Weather';
// import YouToubePlayer from './screens/YouToubePlayer';
import MediaPlayer from './screens/MediaPlayer';

const config: any = {};

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
        path: "/weather",
        component: Weather
    },
    {
        path: "/",
        component: Time
    },
];

export default config;
