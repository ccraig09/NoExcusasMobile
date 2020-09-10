import {
  UPDATE_MEMBER,
  SET_MEMBER,
  SET_FRONT,
  SET_SIDE,
} from "../actions/membersDetails";

const initialState = {
  details: {},
  // frontImage: "",
  // sideImage: "",
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_MEMBER:
      return {
        details: action.details,
      };
    // case SET_FRONT:
    //   return {
    //     frontImage: action.frontImage,
    //   };
    // case SET_SIDE:
    //   return {
    //     sideImage: action.sideImage,
    //   };
  }
  return state;
};

// return Object.assign({}, state, {
//   details: action.details,
// });
