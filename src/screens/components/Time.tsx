import './Time.scss';
import useStore from '../../store';

function Time() {
    const time = useStore((state: any) => {
        const date = state.date;
        return pad(date.getHours()) + ':' + pad(date.getMinutes());
    });

    function pad(number: number) {
        return String(number).padStart(2, '0');
    }
    return <div className="Time">
        {time}
    </div>;
}

export default Time;