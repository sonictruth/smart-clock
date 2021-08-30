import React, {
    useRef,
    useState,
} from 'react';
import Time from './components/Time';
import Weather from './components/Weather';
import ReactPlayer from 'react-player';
import { findDOMNode } from 'react-dom';
import screenfull from 'screenfull';
import config from '../config';
import './MediaPlayer.scss';

const mediaURLLocalStorageKey = 'mediaURL';
const streams = config.mediaPlayerStreams;

function MediaPlayer() {
    const playerRef = useRef(null);
    const [volume, setVolume] = useState(1);
    const [playing, setPlaying] = useState(false);

    const [url, setURL] = useState(
        localStorage.getItem(mediaURLLocalStorageKey) || streams[0].url
    );

    const currentStream = (streams.find(stream => stream.url === url));

    const handleVolumeChange = (event: any) => {
        setVolume(parseFloat(event.target.value));
    }

    const setAndSaveURL = (url: string) => {
        setURL(url);
        localStorage.setItem(mediaURLLocalStorageKey, url);
    }
    const handleStopPropagating = (event: any) =>
        event.stopPropagation();

    const disableTouchProps = {
        onTouchEnd: handleStopPropagating,
        onMouseUp: handleStopPropagating
    };


    const handleClickFullscreen = () => {
        if (screenfull.isEnabled) {
            if (playerRef.current) {
                const el = playerRef.current;
                const node = findDOMNode(el);
                screenfull.request(node as Element);
            }
        }
    }

    return <div className="MediaPlayer" >
        <div className="MediaPlayerScreen">
            {currentStream?.isRadio &&
                <div className="MediaPlayerScreenName">
                    <div>{currentStream.name}</div>
                </div>
            }

            <ReactPlayer

                className="MediaPlayerReactPlayer"
                ref={playerRef}
                width='100%'
                height='100%'
                url={url}
                playing={playing}
                controls={false}
                loop={true}
                volume={volume}
                onReady={() => setTimeout(() => setPlaying(true), 1000)}
            />
        </div>

        <div className="MediaPlayerBottom">

            <div>
                <Time />
            </div>
            <div>
                <Weather simple={true} />
            </div>
            <div {...disableTouchProps}>
                <input type='range'
                    min={0} max={1}
                    step='any'
                    value={volume}
                    onChange={handleVolumeChange} />
            </div>
            <div {...disableTouchProps}>
                <button
                    className="button is-small is-dark"
                    onClick={handleClickFullscreen}>
                    Fullscreen
                </button>
            </div>
            <div {...disableTouchProps}>
                <div className="select is-small is-dark">
                    <select
                        defaultValue={url}
                        onChange={event => setAndSaveURL(event.target.value)}>
                        {config.mediaPlayerStreams.map((stream: any, key: number) =>
                            <option
                                key={key}
                                value={stream.url}>
                                {stream.name}
                            </option>)}
                    </select>
                </div>

            </div>
        </div>
    </div>;
}

export default MediaPlayer;
