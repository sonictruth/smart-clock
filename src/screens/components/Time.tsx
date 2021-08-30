import './Time.scss';
import useStore from '../../store';

function Time() {
    const time = useStore((state: any) => 
        state.date.toLocaleTimeString(undefined, {timeStyle: 'short'})
    );

    return <div className="Time">
        {time}
    </div>;
}

export default Time;