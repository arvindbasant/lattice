import * as React from 'react';
// import { RouteComponentProps } from 'react-router';
import { Link } from 'react-router-dom';
import { CounterState } from '../store/counter/counter-type';
import { DispatchProps } from '../store/utils/dispatch-props';
import { counterActions, CounterActions } from '../store/counter/counter-actions';
import { connect } from 'react-redux';
import { ApplicationState } from '../store/types';

// tslint:disable-next-line
const styles = require('./Counter.scss');

type CounterProps = CounterState & DispatchProps<CounterActions>;

export class Counter extends React.Component<CounterProps> {
    public render() {
        const { dispatch, counter } = this.props;
        return (
            <div>
                <div className={styles.backButton} data-tid="backButton">
                    <Link to="/">
                        <i className="fa fa-arrow-left fa-3x" />
                    </Link>
                </div>
                <div className={`counter ${styles.counter}`} data-tid="counter">
                    {counter}
                </div>
                <div className={styles.btnGroup}>
                    <button className={styles.btn} onClick={() => dispatch(counterActions.incrementCounter())} data-tclass="btn">
                        <i className="fa fa-plus" />
                    </button>
                    <button className={styles.btn} onClick={() => dispatch(counterActions.decrementCounter(0))} data-tclass="btn">
                        <i className="fa fa-minus" />
                    </button>
                    <button className={styles.btn} onClick={() => dispatch(counterActions.incrementIfOdd(counter))} data-tclass="btn">odd</button>
                </div>
            </div>
        );
    }
}

export default connect<CounterState, DispatchProps<CounterActions>>(
    (state: ApplicationState): CounterState => ({
        counter: state.counter.counter
    })
)(Counter);