import { useEffect } from "react";

const widgetHTML = `
<div id="ww_e61a7c4847e9" v='1.3' loc='id' a='{"t":"responsive","lang":"en","sl_lpl":1,"ids":["wl955"],"font":"Arial","sl_ics":"one_a","sl_sot":"celsius","cl_bkg":"#000000","cl_font":"#FFFFFF","cl_cloud":"#FFFFFF","cl_persp":"#81D4FA","cl_sun":"#FFC107","cl_moon":"#FFC107","cl_thund":"#FF5722","cl_odd":"#FFFFFF17","sl_tof":"5"}'>More forecasts: <a href="https://oneweather.org/es/madrid/25_days/" id="ww_e61a7c4847e9_u" target="_blank">Tiempo 25 días Madrid</a></div>
`;

function WeatherExternal(props: any) {
    useEffect(() => {
        const script = document.createElement("script");
        script.src = "https://app3.weatherwidget.org/js/?id=ww_e61a7c4847e9";
        script.async = true;
        document.body.appendChild(script);

        // Cleanup script on component unmount
        return () => {
            document.body.removeChild(script);
        };
    }, []);

    return <div dangerouslySetInnerHTML={{ __html: widgetHTML }} />;
}

export default WeatherExternal;