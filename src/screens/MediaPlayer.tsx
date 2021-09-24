import {
    useEffect,
    useState,
    useRef,
} from 'react';
import Time from './components/Time';
import Weather from './components/Weather';
import ReactPlayer from 'react-player';
import config from '../config';
import './MediaPlayer.scss';

const streamIDLocalStorageKey = 'streamID';

const streamErrorRetryMs = 10000;

enum MediaPlayerState {
    Loading = 'loading',
    Error = 'error',
    Playing = 'playing',
    Stopped = 'stopped',
}

function MediaPlayer() {

    const setTimeoutReplayRef = useRef();

    const [streamID, setSteamID] = useState(
        localStorage.getItem(streamIDLocalStorageKey)
    );

    const [mediaPlayerState, setMediaPlayerState] =
        useState<MediaPlayerState>(MediaPlayerState.Stopped);

    const [volume, setVolume] = useState(1);

    const [streams, setStreams] = useState<Stream[]>();

    const [currentStream, setCurrentSteam] = useState<Stream>();

    const [streamURL, setStreamURL] = useState();

    const [lastErrorDetails, setLastErrorDetails] = useState('');

    useEffect(() => () =>
        clearTimeout(setTimeoutReplayRef.current)
        , []);

    useEffect(() => {
        (async () => {
            let streams: Stream[] = config.mediaPlayerStreams;
            try {
                const urlSearchParams = new URLSearchParams(window.location.search);
                const params = Object.fromEntries(urlSearchParams.entries());
                if (params.playlist) {
                    streams = await loadPlaylist(params.playlist);
                }
            } catch (error) {
                console.error('Unable to load custom playlist', error);
            }
            setStreams(streams);
        })();
    }, []);

    useEffect(() =>
        setCurrentSteam(
            streams?.find(stream => stream.id === streamID)
        )
        , [streamID, streams]);

    useEffect(() => {
        (async () => {
            let url;
            let hasError = false;
            setMediaPlayerState(MediaPlayerState.Loading);

            try {
                if (currentStream) {
                    if (typeof currentStream.url === 'function') {
                        url = await currentStream.url();
                    } else {
                        url = currentStream.url;
                    }
                }
            } catch (error) {
                const errorText = 'Unable to get custom URL';
                setLastErrorDetails(errorText);
                console.error(errorText, error);
                hasError = true;
            }

            if (hasError) {
                setLastErrorDetails('Unable to load custom url');
                setMediaPlayerState(MediaPlayerState.Error);
                retryStream(currentStream);
            } else {
                setMediaPlayerState(
                    url ? MediaPlayerState.Loading : MediaPlayerState.Stopped
                );
            }
            setStreamURL(url);
        })()
    }, [currentStream]);

    const retryStream = (currentStream: Stream | undefined) => {
        clearTimeout(setTimeoutReplayRef.current);
        setTimeoutReplayRef.current = setTimeout(() => {
            if (currentStream) {
                setCurrentSteam({ ...currentStream });
            }
        }, streamErrorRetryMs) as any;
    }

    const loadPlaylist = async (url: string): Promise<Stream[]> => {
        const response = await fetch(url);
        const playlist = await response.text();
        const streams = playlist
            .split('#EXTINF:')
            .reduce(
                (acc, curr, index) => {
                    const line = curr.split(',');
                    if (line.length === 2) {
                        const streamNameAndUrl = line[1].split('\n');
                        acc.push({
                            id: index.toString(),
                            name: streamNameAndUrl[0],
                            url: streamNameAndUrl[1]
                                .replace('http://', 'https://'),
                            isRadio: false,
                        });
                    }
                    return acc;
                }, [] as Stream[]);
        return streams;
    }

    const handleChannelSelection = (streamID: string) => {
        setLastErrorDetails('');
        clearTimeout(setTimeoutReplayRef.current);
        setSteamID(streamID);
        localStorage.setItem(streamIDLocalStorageKey, streamID);
    }

    const handleVolumeChange = (event: any) =>
        setVolume(parseFloat(event.target.value));

    const handleReactPlayerOnPlay = () => {
        setMediaPlayerState(MediaPlayerState.Playing);
    }

    const handleReactPlayerError = (error: any, errorInfo: any) => {
        setMediaPlayerState(MediaPlayerState.Error);
        const errorMessage = errorInfo.type ? `${errorInfo.type} ${errorInfo.details}`: error;
        setLastErrorDetails(errorMessage); 
        console.error('React player error:', error, errorInfo);
        if (errorInfo?.details === 'manifestLoadError' ||
            errorInfo?.details === 'manifestLoadTimeOut' ||
            errorInfo?.details === 'bufferStalledError') {
            retryStream(currentStream);
        }
    }

    const disableTouchProps = {
        onTouchEnd: (event: any) =>
            event.stopPropagation(),
        onMouseUp: (event: any) =>
            event.stopPropagation(),
    };

    return <div className="MediaPlayer" >
        <div className="MediaPlayerScreen">
            {(mediaPlayerState === MediaPlayerState.Stopped) &&
                <div className="MediaPlayerScreen-info">
                    <h1>Media Player 📺</h1>
                </div>
            }
            {(mediaPlayerState === MediaPlayerState.Error) &&
                <div className="MediaPlayerScreen-status">
                    <h1>😢 Error</h1>
                    <div>We are having problems loading {currentStream?.name}.</div>
                    <small>{lastErrorDetails}</small>
                </div>
            }
            {(mediaPlayerState === MediaPlayerState.Loading) &&
                <div className="MediaPlayerScreen-status">
                    <h1>⏳</h1>
                    Loading {currentStream?.name}...
                </div>
            }
            {(mediaPlayerState === MediaPlayerState.Playing && currentStream?.isRadio) &&
                <div className="MediaPlayerScreen-status">
                    <h2>📻{currentStream.name}</h2>
                    <h1><Time /></h1>
                </div>
            }
            {
                mediaPlayerState !== MediaPlayerState.Stopped &&
                mediaPlayerState !== MediaPlayerState.Error &&

                <ReactPlayer
                    className="MediaPlayerReactPlayer"
                    width='100%'
                    height='100%'
                    url={streamURL}
                    playing={true}
                    controls={false}
                    loop={true}
                    volume={volume}
                    onPlay={() => handleReactPlayerOnPlay()}
                    onError={(error: any, errorObject: any) =>
                        handleReactPlayerError(error, errorObject)}
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
                        value={streamID || ''}
                        onChange={event => handleChannelSelection(event.target.value)}>
                        <option
                            value=''>
                            ⇨ Choose channel
                        </option>
                        {streams &&
                            streams.map((stream: any, key: number) =>
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
