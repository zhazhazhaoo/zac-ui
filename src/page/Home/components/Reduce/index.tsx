import {useMemo, useReducer, useState} from "react";
import {Button} from 'antd';
import style from './index.module.scss';
import moment from 'moment';

const initialState = {count: 0, moment: ''};
const reducer = (state: any, action: any) => {
    switch (action.type) {
        case 'increment':
            return {count: state.count + 1, moment: moment().format('YYYY-mm-DD HH:MM:SS')};
        case 'decrement':
            return {count: state.count - 1, moment: moment().format('YYYY-mm-DD HH:MM:SS')};
        case 'clear':
            return {count: 0, moment: ''};
        default:
            throw new Error();
    }
}
const Reduce: React.FC<any> = () => {
    const [current, dispatch] = useReducer(reducer, initialState);
    const [record, setRecord] = useState([] as any);
    useMemo(() => {
        if (current.moment) {
            setRecord([...record, current]);
        } else {
            setRecord([]);
        }
    }, [current])

    return (
        <div className={style.root}>
            <div className={'top-button'}>
                <Button className='m-l-10' onClick={() => dispatch({type: 'increment'})}>+</Button>
                <Button className='m-l-10' onClick={() => dispatch({type: 'decrement'})}>-</Button>
                <Button className='m-l-10' onClick={() => dispatch({type: 'clear'})}>clear</Button>
            </div>
            <div className='content'>
                {current.count}-------{current.moment} </div>
            <div className='content'>
                =======================================
            </div>

            {
                record.reverse().map((item: any) => <div className='content'>{item.count}-------{item.moment}</div>)
            }
        </div>
    );
}
export default Reduce;