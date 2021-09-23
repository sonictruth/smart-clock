const config: Config = {

    backgroundImageUpdateIntervalSeconds: 600,

    mediaPlayerStreams: [
        {
            id: '10',
            name: 'EuroNews',
            url: 'https://www.youtube.com/watch?v=sPgqEHsONK8',
            isRadio: false,
        },
        {
            id: '20',
            name: 'Al Jazeera',
            url: 'https://www.youtube.com/watch?v=-upyPouRrB8',
            isRadio: false,
        },
        {
            id: '30',
            name: 'Sky News',
            url: 'https://www.youtube.com/watch?v=9Auq9mYxFEE',
            isRadio: false,
        },
        // Stream pre-processing for handling tokens, scraping, selecting specific streams 
        {
            id: '150',
            name: 'Digi 24 Low',
            url: async () => {
                const response =
                    await fetch('https://dai.google.com/linear/hls/event/OQfdjUhHSDSlb1fJVzehsQ/master.m3u8');
                const playlist =
                    await response.text();
                const url = playlist
                    .split('\n')
                    .find(line => line.includes('bandwidth/2917391.m3u8'));
                return url;
            },
            isRadio: false,
        },
        {
            id: '40',
            name: 'Digi24',
            url: 'https://dai.google.com/linear/hls/event/OQfdjUhHSDSlb1fJVzehsQ/master.m3u8',
            isRadio: false,
        },
        {
            id: '41',
            name: 'Kiss FM',
            url: 'https://live.kissfm.ro/kissfm.aacp',
            isRadio: true,
        },
        {
            id: '43',
            name: 'Digi FM',
            url: 'https://edge76.rcs-rds.ro/digifm/digifm.mp3',
            isRadio: true,
        },

        
        {
            id: '50',
            name: 'TVRi',
            url: 'https://mn-nl.mncdn.com/tvri_test/smil:tvri_test.smil/playlist.m3u8',
            isRadio: false,
        },
        {
            id: '60',
            name: '3/24',
            url: 'https://directes-tv-int.ccma.cat/int/ngrp:324_web/chunklist_b1728000.m3u8',
            isRadio: false,
        },
        {
            id: '70',
            name: 'PrimaTV',
            url: 'https://stream1.1616.ro:1945/prima/livestream/playlist.m3u8?wowzatokenhash=hOdIznDoakApEuQ8FaFI3yrJuBMZHqCB7B3cWTmRWsc=',
            isRadio: false,
        },
        {
            id: '100',
            name: 'Radio 3',
            url: 'https://rtvelivestreamv3.akamaized.net/rne_r3_main.m3u8',
            isRadio: true,
        },
        {
            id: '110',
            name: 'iCat',
            url: 'https://directes-radio-int.ccma.cat/int/mp4:icatfm/playlist.m3u8',
            isRadio: true,
        },
        {
            id: '120',
            name: 'RadioParadise',
            url: 'http://stream.radioparadise.com/aac-128',
            isRadio: true,
        },
        {
            id: '130',
            name: 'LoFi',
            url: 'https://www.youtube.com/watch?v=5qap5aO4i9A',
            isRadio: false,
        },
        // Weekly updated yourube playlist
        {
            id: '140',
            name: 'UK Weekly Playlist',
            url: 'https://youtube.com/playlist?list=PLx0sYbCqOb8Q_CLZC2BdBSKEEB59BOPUM',
            isRadio: false,
        },
    ],

    weather: {
        apiURL: process.env.REACT_APP_OPEN_WEATHER_URL || 'https://www.sonicpix.ro/owproxy/',
        apiKey: process.env.REACT_APP_OPEN_WEATHER_KEY || 'nokey',
        latitude: 41.376681,
        longitude: 2.176177,
        units: 'metric',
        tempSymbol: '°C',
        lang: 'en',
        weatherUpdateIntervalSeconds: 3600,
    }
}

export default config;
