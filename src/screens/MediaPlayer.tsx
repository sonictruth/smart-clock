import React, {
    useRef,
    useState,
    useEffect,
} from 'react';
import Time from './components/Time';
import ReactPlayer from 'react-player';
import { findDOMNode } from 'react-dom';
import screenfull from 'screenfull';
import config from '../config';
import './MediaPlayer.scss';

function MediaPlayer() {
    const playerRef = useRef(null);
    const [volume, setVolume] = useState(1);
    const [playing, setPlaying] = useState(false);
    const [url, setURL] = useState(config.mediaPlayerStreams[0].url);

    useEffect(() => {


    }, []);

    const handleVolumeChange = (event: any) => {
        setVolume(parseFloat(event.target.value));
    }

    const handleStopPropagating = (event: any) =>
        event.stopPropagation();


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
            <ReactPlayer
                ref={playerRef}
                className='react-player'
                width='100%'
                height='100%'
                url={url}
                playing={playing}
                controls={false}
                loop={true}
                volume={volume}
                onReady={() => setPlaying(true)}
                onStart={() => { }}
            />
        </div>
        <div className="MediaPlayerTime">
            <Time />
        </div>
        <div className="MediaPlayerControls"
            onTouchEnd={handleStopPropagating}
            onMouseUp={handleStopPropagating}
        >
            <input type='range'
                min={0} max={1}
                step='any'
                value={volume}
                onChange={handleVolumeChange} />
            <br />
            <button onClick={handleClickFullscreen}>Fullscreen</button>
            <br />
            <ul>
                {config.mediaPlayerStreams.map((stream: any, key: number) =>
                    <li key={key} >
                        <button onClick={() => setURL(stream.url)}>{stream.name}</button>
                    </li>
                )}
            </ul>

        </div>
    </div>;
}

export default MediaPlayer;
