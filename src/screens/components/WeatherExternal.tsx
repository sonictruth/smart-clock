import { useEffect, useState } from "react";
import './WeatherExternal.scss';

const widgetHTML = `
<a class="weatherwidget-io" href="https://forecast7.com/en/41d392d17/barcelona/" data-label_1="BARCELONA" data-label_2="WEATHER" data-font="Arial Black" data-days="3" data-theme="pure" data-basecolor="" data-shadow="#000000" data-accent="" data-textcolor="#ffffff" data-highcolor="#ffffff" data-lowcolor="#ffffff" data-suncolor="#ffce00" data-mooncolor="#b8b8b8" data-cloudcolor="#878787" data-cloudfill="#c0c0c0" data-raincolor="#00d0b8" data-snowcolor="#b1fefa" >BARCELONA WEATHER</a>
`;


const refreshInterval = 19400000; 

function WeatherExternal(props: any) {
    const [reloadKey, setReloadKey] = useState(0);

    useEffect(() => {
    (function(d: Document, s: string, id: string) {
        let js: HTMLScriptElement | null = d.getElementById(id) as HTMLScriptElement | null;
        const fjs = d.getElementsByTagName(s)[0] as HTMLElement | null;
        if (!js) {
         js = d.createElement(s) as HTMLScriptElement;
         js.id = id;
         js.src = 'https://weatherwidget.io/js/widget.min.js';
         if (fjs && fjs.parentNode) {
             fjs.parentNode.insertBefore(js, fjs);
         }
        }
    })(document, 'script', 'weatherwidget-io-js');
    
     return () => {
         const js = document.getElementById('weatherwidget-io-js');
         if (js && js.parentNode) {
          js.parentNode.removeChild(js);
         }
     };
    }, [reloadKey]); // Re-run effect when reloadKey changes

    useEffect(() => {
        const intervalId = setInterval(() => {
            setReloadKey((prevKey) => prevKey + 1); 
        }, refreshInterval);


        return () => clearInterval(intervalId);
    }, []);



    return (
        <div key={reloadKey} dangerouslySetInnerHTML={{ __html: widgetHTML }} />
    );
}

export default WeatherExternal;