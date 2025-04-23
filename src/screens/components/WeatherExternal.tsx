import { useEffect, useState } from "react";
import './WeatherExternal.scss';

const refreshInterval = 14400000; // 4 hours in milliseconds

function WeatherExternal(props: any) {
    const [reloadKey, setReloadKey] = useState(0);

    useEffect(() => {
        const script = document.createElement("script");
        script.src = "https://app3.weatherwidget.org/js/?id=ww_3f3926a5d53e5";
        script.async = true;
        document.body.appendChild(script);

        // Cleanup script on component unmount
        return () => {
            document.body.removeChild(script);
        };
    }, [reloadKey]); // Re-run effect when reloadKey changes

    useEffect(() => {
        const intervalId = setInterval(() => {
            setReloadKey((prevKey) => prevKey + 1); // Trigger re-render
        }, refreshInterval);


        return () => clearInterval(intervalId);
    }, []);

    const widgetHTML = `
    <div id="ww_3f3926a5d53e5" v='1.3' loc='id' a='{"t":"responsive","lang":"en","sl_lpl":1,"ids":["wl955"],"font":"Arial","sl_ics":"one_a","sl_sot":"celsius","cl_bkg":"#FFFFFF00","cl_font":"#000000","cl_cloud":"#d4d4d4","cl_persp":"#2196F3","cl_sun":"#FFC107","cl_moon":"#FFC107","cl_thund":"#FF5722","sl_tof":"5","cl_odd":"#00000000"}'>
    More forecasts: <a href="https://oneweather.org/es/madrid/25_days/" id="ww_3f3926a5d53e5_u" target="_blank">Previsión tiempo 30 días Madrid</a></div>
    `;

    return (
        <div key={reloadKey} dangerouslySetInnerHTML={{ __html: widgetHTML }} />
    );
}

export default WeatherExternal;