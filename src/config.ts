enum categories {
    Radio = 'Radio',
    TVInt = 'TV International',
    TVRO = 'TV Romania',
}

const config: Config = {

    backgroundImageUpdateIntervalSeconds: 600,

    mediaPlayerStreams: [
        {
            id: '10',
            name: 'EuroNews',
            url: 'https://www.youtube.com/watch?v=8abhZa0DSjY',
            isRadio: false,
            category: categories.TVRO,
        },
        {
            id: '20',
            name: 'Al Jazeera',
            url: 'https://www.youtube.com/watch?v=gCNeDWCI0vo',
            isRadio: false,
            category: categories.TVInt,
        },
        {
            id: '30',
            name: 'Sky News',
            url: 'https://www.youtube.com/watch?v=9Auq9mYxFEE',
            isRadio: false,
            category: categories.TVInt,
        },
        // Stream pre-processing for handling tokens, scraping, selecting specific streams 
        /*
        {
            id: '150',
            name: 'Digi 24',
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
            category: categories.TVRO,
        },
        {
            id: '151',
            name: 'Antena 3',
            url: async () => {
                const response =
                    await fetch('https://www.antena3.ro/live/');
                const html =
                    await response.text();
                const htmlSplit = html.split(`liveEmbedHTML5('`);

                return htmlSplit[1].split(`'`)[0];
            },
            isRadio: false,
            category: categories.TVRO,
        },
        */
        {
            id: '41',
            name: 'Kiss FM',
            url: 'https://live.kissfm.ro/kissfm.aacp',
            isRadio: true,
            category: categories.Radio,
        },
        {
            id: '43',
            name: 'Digi FM',
            url: 'https://edge76.rcs-rds.ro/digifm/digifm.mp3',
            isRadio: true,
            category: categories.Radio,
        },
        {
            id: '75',
            name: '324',
            url: 'https://directes-tv-int.ccma.cat/live-origin/canal324-hls/master.m3u8',
            isRadio: false,
            category: categories.TVInt,
        },
        {
            id: '70',
            name: 'PrimaTV',
            url: 'https://stream1.1616.ro:1945/prima/livestream/playlist.m3u8?wowzatokenhash=hOdIznDoakApEuQ8FaFI3yrJuBMZHqCB7B3cWTmRWsc=',
            isRadio: false,
            category: categories.TVRO,
        },
        {
            id: '120',
            name: 'RadioParadise',
            url: 'http://stream.radioparadise.com/aac-128',
            isRadio: true,
            category: categories.Radio,
        },
        {
            id: '200',
            name: 'VH1',
            url: ' https://content.uplynk.com/channel/36953f5b6546464590d2fcd954bc89cf.m3u8',
            isRadio: false,
            category: categories.TVInt,
        },

       
        // Weekly updated Youtube playlist example 
        // {
        //    id: '140',
        //    name: 'UK Weekly Playlist',
        //    url: 'https://youtube.com/playlist?list=PLx0sYbCqOb8Q_CLZC2BdBSKEEB59BOPUM',
        //    isRadio: false,
        //},
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
