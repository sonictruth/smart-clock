import React, {
    useEffect,
    useRef,
    useState,
} from 'react';
import Time from './components/Time';
import Weather from './components/Weather';
import ReactPlayer from 'react-player';
// import { findDOMNode } from 'react-dom';
// import screenfull from 'screenfull';
import config from '../config';
import './MediaPlayer.scss';

const streamIDLocalStorageKey = 'mediaURL';

function MediaPlayer() {
    const playerRef = useRef(null);
    const [volume, setVolume] = useState(1);
    const [playing, setPlaying] = useState(false);
    const [hasStreamError, setHasStreamError] = useState(false);
    const [streams, setStreams] = useState([] as any);
    const [streamID, setSteamID] = useState(
        localStorage.getItem(streamIDLocalStorageKey) || ''
    );
    const [url, setURL] = useState('');

    const currentStream = streams ?
        (streams.find((stream: any) =>
            stream.id === streamID)) : null;

    useEffect(() => {
        (async () => {
            let streams = config.mediaPlayerStreams;
            const urlSearchParams = new URLSearchParams(window.location.search);
            const params = Object.fromEntries(urlSearchParams.entries());
            if (params.playlist) {
                try {
                const response = await fetch(params.playlist);
                const playlist = await response.text();
                streams = playlist.split('#EXTINF:').reduce(
                    (acc, curr, index) => {
                        const line = curr.split(',');
                        if (line.length === 2) {
                            const streamNameAndUrl = line[1].split('\n');
                            acc.push({
                                id: index.toString(),
                                name: streamNameAndUrl[0],
                                url: streamNameAndUrl[1].replace('http://', 'https://'),
                                isRadio: false,
                            });
                        }
                        return acc;
                    }, [] as any);
                } catch (error) {
                    console.log('Unable to get playlist', error);
                }
            }
            setStreams(streams);
        })();
    }, []);

    useEffect(() => {
        (async () => {
            let url = '';
            setHasStreamError(false);
            if (currentStream) {
                if (typeof currentStream.url === 'function') {
                    url = await currentStream.url() || '';
                } else {
                    url = currentStream.url;
                }
            }
            setURL(url);
        })();
    }, [currentStream]);

    const handleVolumeChange = (event: any) => {
        setVolume(parseFloat(event.target.value));
    }

    const handleChannelSelection = (streamID: string) => {
        setSteamID(streamID);
        localStorage.setItem(streamIDLocalStorageKey, streamID);
    }
    const handleStopPropagating = (event: any) =>
        event.stopPropagation();

    const disableTouchProps = {
        onTouchEnd: handleStopPropagating,
        onMouseUp: handleStopPropagating
    };

    /*
    const handleClickFullscreen = () => {
        if (screenfull.isEnabled) {
            if (playerRef.current) {
                const el = playerRef.current;
                const node = findDOMNode(el);
                screenfull.request(node as Element);
            }
        }
    }
    */

    return <div className="MediaPlayer" >
        <div className="MediaPlayerScreen">

            {currentStream?.isRadio &&
                <div className="MediaPlayerScreenName">
                    <div>{currentStream.name}</div>
                </div>
            }
            {!url &&
                <div className="MediaPlayerWelcome">
                    <h1>Media Player 📺</h1>
                    When a channel is playing swipe in the clock area to go to the next screen.
                </div>
            }
            {hasStreamError &&
                <div className="MediaPlayerWelcome">
                    <h1>😢</h1>
                    Unable to play stream.
                </div>
            }
            {url && !hasStreamError &&
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
                    onError={(error)=> {setHasStreamError(true); setTimeout(() => setPlaying(true), 5000) }}
                    onReady={() => setTimeout(() => setPlaying(true), 1000)}
                />
            }
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
                <div className="select is-small is-dark">
                    <select
                        value={streamID}
                        onChange={event => handleChannelSelection(event.target.value)}>
                        <option
                            value=''>
                            ⇨ Choose channel
                        </option>
                        {streams.map((stream: any, key: number) =>
                            <option
                                key={key}
                                value={stream.id}>
                                {stream.name}
                            </option>)}
                    </select>
                </div>

            </div>
        </div>
    </div>;
}

export default MediaPlayer;
