import React from 'react';
import config from '../config';
import './YouToubePlayer.css';

function YouToubePlayer() {
    const [isHelpTestVisible, setHelpTestVisible] = React.useState(true);
    const origin = encodeURIComponent(document.location.origin);
    const params: any = {
        rel: 0,
        showinfo: 0,
        modestbranding: 1,
        iv_load_policy: 3,
        enablejsapi: 1,
        disablekb: 1,
        hd: 0,
        autoplay: 1,
        mute: 0,
        origin: origin,
        controls: 0,
    }
    const paramsString = new URLSearchParams(params).toString();

    const src = `${config.youtubePlaylistURL}&${paramsString}`;

    const helpTimeoutMs = 5000;
    setTimeout(() => setHelpTestVisible(false), helpTimeoutMs);

    return <div className="Video">
        <iframe
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen={true}
            src={src}
            title="YouTube video player"
        >
        </iframe>
        <div className="help" >
            <div className="text" style={{ display: isHelpTestVisible ? '' : 'none' }} >
                Swipe in this area to go to the next screen.<br />
                Click on the playlist icon on top right to change the channel.
            </div>
        </div>
    </div>;
}

export default YouToubePlayer;
