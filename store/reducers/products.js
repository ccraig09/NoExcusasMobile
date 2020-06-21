import CONTENT from "../../data/dummy-data";
import CARDIOCATEGORY from "../../data/cardio-data";
import STRENGTHCATEGORY from "../../data/strength-data";
import MIXEDCATEGORY from "../../data/mixed-data";
import RECOVERYCATEGORY from "../../data/recovery-data";

const initialState = {
  availableClasses: CONTENT,
  cardioSelected: CARDIOCATEGORY,
  strengthSelected: STRENGTHCATEGORY,
  mixedSelected: MIXEDCATEGORY,
  recoverySelected: RECOVERYCATEGORY,
};

export default (state = initialState, action) => {
  return state;
};
