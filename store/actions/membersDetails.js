import MemberDetails from "../../models/memberDetail";
export const UPDATE_MEMBER = "UPDATE_MEMBER";
export const SET_MEMBER = "SET_MEMBER";
import firebase from "../../components/firebase";

// import * as firebase from "firebase/app";
// import "firebase/auth";
// import "firebase/firestore";

// const firebaseConfig = {
//   apiKey: "AIzaSyC7T1dVJFpMAu8YT64sA1IjDduZc2dkV2M",
//   authDomain: "no-excusas.firebaseapp.com",
//   databaseURL: "https://no-excusas.firebaseio.com",
//   projectId: "no-excusas",
//   storageBucket: "no-excusas.appspot.com",
//   messagingSenderId: "734413363397",
//   appId: "1:734413363397:web:dac9605a445fa0402df8ac",
//   measurementId: "G-0EMD528XFE",
// };
// if (!firebase.apps.length) {
//   firebase.initializeApp(firebaseConfig);
// }

export const db = firebase.firestore().collection("Members");

export default firebase;

export const fetchMemberDetails = () => {
  return async (dispatch, getState) => {
    const userId = getState().auth.userId;
    try {
      const response = await fetch(
        `https://No-Excusas.firebaseio.com/memberDetails/${userId}.json`
      );

      if (!response.ok) {
        throw new Error("Something went wrong!");
      }

      const resData = await response.json();
      const loadedMemberDetails = [];

      for (const key in resData) {
        loadedMemberDetails.push(
          new MemberDetails(
            key,
            resData[key].fName,
            resData[key].lName,
            resData[key].age,
            resData[key].weight,
            resData[key].height,
            resData[key].medHistory,
            resData[key].occupation,
            resData[key].bmi,
            resData[key].fat,
            resData[key].muscle,
            resData[key].kcal,
            resData[key].meta,
            resData[key].vis,
            resData[key].startDate,
            resData[key].endDate,
            resData[key].daysLeft,
            resData[key].basePic,
            resData[key].newPic
          )
        );
      }
      dispatch({ type: SET_MEMBER, memberDetails: loadedMemberDetails });
    } catch (err) {
      throw err;
    }
  };
};

export const addMemberDetails = (
  fName,
  lName,
  age,
  weight,
  height,
  medHistory,
  occupation,
  bmi,
  fat,
  muscle,
  kcal,
  meta,
  vis,
  startDate,
  endDate,
  daysLeft,
  basePic,
  newPic
) => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    const userId = getState().auth.userId;
    // const date = new Date();

    db.doc(userId).set({
      FirstName: fName,
      LastName: lName,
      // age: age,
      // weight: weight,
      // heght: height,
      // medicalHistory: medHistory,
      // occupation: occupation,
      // bmi: bmi,
      // fat: fat,
      // muscle: muscle,
      // kcal: kcal,
      // metabolicalAge: meta,
      // visceralFat: vis,
      // startDate: startDate,
      // endDate: endDate,
      // daysLeft: daysLeft,
      // basePic: basePic,
      // newp: newPic,
    });
    console.log(fName, lName);
    // const response = await fetch(
    //   `https://No-Excusas.firebaseio.com/memberDetails/${userId}.json?auth=${token}`,
    //   {
    //     method: "PATCH",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify({
    //       fName,
    //       lName,
    //       age,
    //       weight,
    //       height,
    //       medHistory,
    //       occupation,
    //       bmi,
    //       fat,
    //       muscle,
    //       kcal,
    //       meta,
    //       vis,
    //       startDate,
    //       endDate,
    //       daysLeft,
    //       basePic,
    //       newPic,
    //       // date: date.toISOString(),
    //     }),
    //   }
    // );
    // if (!response.ok) {
    //   throw new Error("Something went wrong!");
    // }

    // const resData = await response.json();

    dispatch({
      type: UPDATE_MEMBER,
      memberData: {
        // id: resData.name,
        fName: fName,
        lName: lName,
        age: age,
        weight: weight,
        height: height,
        medHistory: medHistory,
        occupation: occupation,
        bmi: bmi,
        fat: fat,
        muscle: muscle,
        kcal: kcal,
        meta: meta,
        vis: vis,
        startDate: startDate,
        endDate: endDate,
        daysLeft: daysLeft,
        basePic: basePic,
        newPic: newPic,
      },
    });
  };
};
