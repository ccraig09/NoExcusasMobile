import { DELETE_EVAL, CREATE_EVAL, SET_EVAL } from "../actions/evals";
import Eval from "../../models/eval";

initalState = {
  userEvals: [],
};

export default (state = initalState, action) => {
  switch (action.type) {
    case SET_EVAL:
      return {
        userEvals: action.userEvals,
      };
    case CREATE_EVAL:
      const newEval = new Eval(
        action.evalData.id,
        action.evalData.title,
        action.evalData.ownerId,
        action.evalData.docTitle,
        action.evalData.time
      );
      return {
        ...state,
        userEvals: state.userEvals.concat(newEval),
      };
    case DELETE_EVAL:
      return initalState;
    // {
    //   ...state,
    //   userEvals: state.userEvals.filter((eva) => eva.id !== action.eid),
    // };
  }
  return state;
};
