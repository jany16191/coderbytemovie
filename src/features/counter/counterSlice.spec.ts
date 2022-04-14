import counterReducer, {
  CounterState,
  // incrementByAmount,
} from "./counterSlice";

describe("counter reducer", () => {
  const initialState: CounterState = {
    value: 3,
    movies: [],
  };
  it("should handle initial state", () => {
    expect(counterReducer(undefined, { type: "unknown" })).toEqual({
      value: 0,
      status: "idle",
    });
  });
});
