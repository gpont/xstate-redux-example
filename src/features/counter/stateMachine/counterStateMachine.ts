import { createMachine, interpret, Typestate } from "xstate";

type EventType = "LOADING" | "FAILED" | "SUCCESS";
type State = "loading" | "success" | "failed";

const machine = createMachine<{}, { type: EventType }, Typestate<State>>({
  id: "counter",
  initial: "idle",
  context: {},
  states: {
    idle: {
      on: {
        LOADING: { target: "loading" },
      },
    },
    loading: {
      on: {
        FAILED: { target: "failed" },
        SUCCESS: { target: "idle" },
      },
    },
    failed: {
      on: {
        LOADING: { target: "loading" },
      },
    },
  },
});

export const counterMachine = interpret(machine, { devTools: true }).start();
