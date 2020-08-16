import { SET_UPDATES } from "../actions/evalUpdate";

const initialState = {
  updates: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_UPDATES:
      return {
        updates: action.updates,
      };
  }
  return state;
};
