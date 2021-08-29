const config = {

    updateIntervalSeconds: 18000,

    youtubePlaylistURL: 'https://www.youtube.com/embed/videoseries?list=PLywsZdsYYHTZNdHTYDNooq86TCJLPCjoK',

    mediaPlayerStreams: [
        {
            name: 'EuroNews',
            url: 'https://www.youtube.com/watch?v=sPgqEHsONK8',
        },
        {
            name: 'Al Jazeera',
            url: 'https://www.youtube.com/watch?v=-upyPouRrB8',
        },
        {
            name: 'Sky News',
            url: 'https://www.youtube.com/watch?v=9Auq9mYxFEE',
        },
        {
            name: 'Digi24',
            url: 'https://dai.google.com/linear/hls/pa/event/OQfdjUhHSDSlb1fJVzehsQ/stream/c3f6c010-88ac-4f94-9d53-a8b4187941f5:BRU/variant/3fb6388b913e3f69ed30aa07c842fbc3/bandwidth/1477770.m3u8',
        },
        {
            name: '324',
            url: 'https://directes-tv-int.ccma.cat/int/ngrp:324_web/master.m3u8',
        },
        {
            name: 'TVRi',
            url: 'https://mn-nl.mncdn.com/tvri_test/smil:tvri_test.smil/playlist.m3u8',
        },
        {
            name: 'PrimaTV',
            url: 'https://stream1.1616.ro:1945/prima/livestream/playlist.m3u8?wowzatokenhash=hOdIznDoakApEuQ8FaFI3yrJuBMZHqCB7B3cWTmRWsc=',
        },
        {
            name: 'Kanal D',
            url: 'https://stream1.kanald.ro/iphone/live.m3u8',
        },


      
        {
            name: 'iCat',
            url: 'https://directes-radio-int.ccma.cat/int/mp4:icatfm/playlist.m3u8'
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
