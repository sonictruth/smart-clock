const config = {

    youtubePlaylistURL: 'https://www.youtube.com/embed/videoseries?list=PLywsZdsYYHTZNdHTYDNooq86TCJLPCjoK',

    mediaPlayerStreams: [
        {
            name: 'EuroNews',
            url: 'https://www.youtube.com/watch?v=sPgqEHsONK8',
            isRadio: false,
        },
        {
            name: 'Al Jazeera',
            url: 'https://www.youtube.com/watch?v=-upyPouRrB8',
            isRadio: false,
        },
        {
            name: 'Sky News',
            url: 'https://www.youtube.com/watch?v=9Auq9mYxFEE',
            isRadio: false,
        },
        {
            name: 'Digi24',
            url: 'https://dai.google.com/linear/hls/event/OQfdjUhHSDSlb1fJVzehsQ/master.m3u8',
            isRadio: false,
        },
        {
            name: 'TVRi',
            url: 'https://mn-nl.mncdn.com/tvri_test/smil:tvri_test.smil/playlist.m3u8',
            isRadio: false,
        },   
        {
            name: '3/24',
            url: 'https://directes-tv-int.ccma.cat/int/ngrp:324_web/chunklist_b1728000.m3u8',
            isRadio: false,
        },
        {
            name: 'PrimaTV',
            url: 'https://stream1.1616.ro:1945/prima/livestream/playlist.m3u8?wowzatokenhash=hOdIznDoakApEuQ8FaFI3yrJuBMZHqCB7B3cWTmRWsc=',
            isRadio: false,
        },
        {
            name: 'Antena 3',
            url: 'https://ivm.antenaplay.ro/live/a3/playlist.m3u8',
            isRadio: false,
        },
        {
            name: 'Antena 1',
            url: 'https://ivm.antenaplay.ro/live/a1/playlist.m3u8',
            isRadio: false,
        },
        {
            name: 'Radio 3',
            url: 'https://rtvelivestreamv3.akamaized.net/rne_r3_main.m3u8',
            isRadio: true,
        },
        {
            name: 'iCat',
            url: 'https://directes-radio-int.ccma.cat/int/mp4:icatfm/playlist.m3u8',
            isRadio: true,
        },
        {
            name: 'RadioParadise',
            url: 'http://stream.radioparadise.com/aac-128',
            isRadio: true,
        },
        {
            name: 'LoFi',
            url: 'https://www.youtube.com/watch?v=5qap5aO4i9A',
            isRadio: false,
        },
        // Weekly updated yourube playlist
        {
            name: 'UK Weekly Playlist',
            url: 'https://youtube.com/playlist?list=PLx0sYbCqOb8Q_CLZC2BdBSKEEB59BOPUM',
            isRadio: false,
        }
    ],

    weather: {
        key: process.env.REACT_APP_OPEN_WEATHER_KEY,
        latitude: 41.376681,
        longitude: 2.176177,
        units: 'metric',
        tempSymbol: '°C',
        lang: 'en',
        weatherUpdateIntervalSeconds: 3600,
    }
}

export default config;
