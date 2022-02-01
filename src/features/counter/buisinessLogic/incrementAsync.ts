import { AppThunk } from "../../../app/store";
import { counterMachine } from "../stateMachine/counterStateMachine";
import { incrementByAmount } from "../store/counterSlice";
import { fetchCount } from "./counterAPI";

export const incrementAsync =
  (amount: number): AppThunk =>
  async (dispatch, getState) => {
    try {
      counterMachine.send("LOADING");

      const response = await fetchCount(amount);

      counterMachine.send("SUCCESS");

      dispatch(incrementByAmount(response.data));
    } catch (e) {
      counterMachine.send("FAILED");
    }
  };
