import { UPDATE_MEMBER, SET_MEMBER } from "../actions/membersDetails";
import MemberDetails from "../../models/memberDetail";

const initialState = {
  details: {},
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_MEMBER:
      return {
        details: action.details,
      };
    // return Object.assign({}, state, {
    //   details: action.details,
    // });

    // case UPDATE_MEMBER:
    //   const updateMember = new MemberDetails(
    //     // action.detailsData.id,
    //     action.memberData.fName,
    //     action.memberData.lName,
    //     action.memberData.age,
    //     action.memberData.weight,
    //     action.memberData.height,
    //     action.memberData.medHistory,
    //     action.memberData.occupation,
    //     action.memberData.bmi,
    //     action.memberData.fat,
    //     action.memberData.muscle,
    //     action.memberData.kcal,
    //     action.memberData.meta,
    //     action.memberData.vis,
    //     action.memberData.startDate,
    //     action.memberData.endDate,
    //     action.memberData.daysLeft,
    //     action.memberData.basePic,
    //     action.memberData.newPic
    //   );
    //   return {
    //     ...state,
    //     details: state.details.concat(updateMember),
    //   };
  }
  return state;
};
