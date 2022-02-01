import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "./store";
import { useSelector as useXStateSelector } from "@xstate/react";
import { Interpreter } from "xstate";

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const useMachineState = (machine: any) => {
  const state = useXStateSelector(
    machine as Interpreter<any>,
    ({ value }) => value
  );

  return [state, machine.send];
};
