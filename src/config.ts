enum categories {
    Radio = 'Radio',
    TVInt = 'TV International',
    TVRO = 'TV Romania',
}

const config: Config = {

    backgroundImageUpdateIntervalSeconds: 600,

    mediaPlayerStreams: [
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
            name: 'Europa FM',
            url: 'https://astreaming.edi.ro:8443/europafm_aacp48k',
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
            id: '120',
            name: 'RadioParadise',
            url: 'http://stream.radioparadise.com/aac-128',
            isRadio: true,
            category: categories.Radio,
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
