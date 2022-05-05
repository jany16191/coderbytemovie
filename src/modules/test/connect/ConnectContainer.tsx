import { fontSize } from "@mui/material/node_modules/@mui/system";
import { Dispatch } from "@reduxjs/toolkit";
import React from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../app/store";
import { decrement } from "../../../features/counter/counterSlice";

const ConnectContainer = ({
  numOfCakes,
  buyCake,
}: {
  numOfCakes: number;
  buyCake: () => void;
}) => {
  return (
    <>
      <div style={{ marginTop: "24px", fontSize: "16px", fontWeight: "bold" }}>
        Connect react-redux
      </div>

      <div>Count cakes: {numOfCakes}</div>

      <button onClick={() => buyCake()}>Buy cake</button>
    </>
  );
};

const mapStateToProps = (state: RootState) => {
  return {
    numOfCakes: state.movies.value,
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    buyCake: () => dispatch(decrement()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ConnectContainer);
