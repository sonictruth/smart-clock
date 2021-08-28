const config = {

    updateIntervalSeconds: 18000,

    youtubePlaylistURL: 'https://www.youtube.com/embed/videoseries?list=PLywsZdsYYHTZNdHTYDNooq86TCJLPCjoK',

    mediaPlayerStreams: [
        {
            name: 'iCat',
            url: 'https://directes-radio-int.ccma.cat/int/mp4:icatfm/playlist.m3u8'
        },
        {
            name: 'Live Youtube',
            url: 'https://www.youtube.com/embed/videoseries?list=PLywsZdsYYHTZNdHTYDNooq86TCJLPCjoK',
        },
    ],
    // TODO: Move to env variable
    weather: {
        key: '5a7cef30eb5cb1750171f99e9988dc7d',
        locationLabel: 'Barcelona',
        lat: 41.376681,
        lon: 2.176177,
        lang: 'en',
        unit: 'metric'
    }
}

export default config;
