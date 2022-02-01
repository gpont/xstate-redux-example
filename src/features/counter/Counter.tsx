import React, { useState } from "react";

import {
  useAppSelector,
  useAppDispatch,
  useMachineState,
} from "../../app/hooks";
import { selectCount, selectStatus } from "./store/counterSlice";
import styles from "./Counter.module.css";
import { incrementAsync } from "./buisinessLogic/incrementAsync";
import { counterMachine } from "./stateMachine/counterStateMachine";

export function Counter() {
  const count = useAppSelector(selectCount);
  const status = useAppSelector(selectStatus);
  const [state] = useMachineState(counterMachine);
  const dispatch = useAppDispatch();
  const [incrementAmount, setIncrementAmount] = useState("2");

  const incrementValue = Number(incrementAmount) || 0;

  return (
    <div>
      <div className={styles.row}>
        <span className={styles.value}>{count}</span>
        <span className={styles.value}>{status}</span>
        <span className={styles.value}>{state}</span>
      </div>
      <div className={styles.row}>
        <input
          className={styles.textbox}
          aria-label="Set increment amount"
          value={incrementAmount}
          onChange={(e) => setIncrementAmount(e.target.value)}
        />
        <button
          className={styles.asyncButton}
          onClick={() => dispatch(incrementAsync(incrementValue))}
        >
          Add Async
        </button>
      </div>
    </div>
  );
}
