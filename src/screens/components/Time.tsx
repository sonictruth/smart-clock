import './Time.scss';
import useStore from '../../store';

const pad = function (number: number) {
    return number.toString().padStart(2, '0');
}

function Time() {
    const time = useStore(({ date }) =>
        pad(date.getHours()) + ':' + pad(date.getMinutes())
    );

    return <div className="Time">
        {time}
    </div>;
}

export default Time;