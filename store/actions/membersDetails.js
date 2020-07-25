import MemberDetails from "../../models/memberDetail";
export const UPDATE_MEMBER = "UPDATE_MEMBER";
import { AsyncStorage } from "react-native";
export const SET_MEMBER = "SET_MEMBER";
import firebase from "../../components/firebase";

export const db = firebase.firestore().collection("Members");

export default firebase;

export const fetchMemberDetails = () => {
  return async (dispatch, getState) => {
    const userId = getState().auth.userId;
    console.log("get state worked and userid is:", userId);
    try {
      let loadedDetails;

      await db
        .doc(userId)
        .get()
        .then(function (doc) {
          if (doc.exists) {
            console.log("doc data is: ", doc.data().FirstName);
            loadedDetails = doc.data();
            dispatch({ type: SET_MEMBER, details: loadedDetails });
            console.log("loadedDetails are:", loadedDetails);
          } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
          }
        })
        .catch(function (error) {
          console.log("Error getting document:", error);
        });

      console.log("second check for detatils being loaded...:", loadedDetails);

      console.log("thrid check for details...:", loadedDetails);
    } catch (err) {
      throw err;
    }
  };
};

// export const fetchMemberDetails = () => {
//   return async (dispatch, getState) => {
//     const userId = getState().auth.userId;
//     console.log("get state worked and userid is:", userId);
//     try {
//       let loadedDetails;

//       await db
//         .doc(userId)
//         .get()
//         .then(function (doc) {
//           if (doc.exists) {
//             console.log("doc data is: ", doc.data().FirstName);
//             loadedDetails = doc.data();
//             console.log("loadedDetails are:", loadedDetails);
//             saveDataToStorage(loadedDetails);
//           } else {
//             // doc.data() will be undefined in this case
//             console.log("No such document!");
//           }
//         })
//         .catch(function (error) {
//           console.log("Error getting document:", error);
//         });

//       console.log("second check for detatils being loaded...:", loadedDetails);

//       AsyncStorage.getItem("resData").then((value) => {
//         const data = JSON.parse(value);
//         console.log("resData should be and is from action ", data);
//         dispatch({ type: SET_MEMBER, details: data });
//       });
//     } catch (err) {
//       throw err;
//     }
//   };
// };
// try {
//   const response = await fetch(
//     `https://No-Excusas.firebaseio.com/memberDetails/${userId}.json`
//   );

//   if (!response.ok) {
//     throw new Error("Something went wrong!");
//   }

//   const resData = await response.json();
//   const loadedMemberDetails = [];

//   for (const key in resData) {
//     loadedMemberDetails.push(
//       new MemberDetails(
//         key,
//         resData[key].fName,
//         resData[key].lName,
//         resData[key].age,
//         resData[key].weight,
//         resData[key].height,
//         resData[key].medHistory,
//         resData[key].occupation,
//         resData[key].bmi,
//         resData[key].fat,
//         resData[key].muscle,
//         resData[key].kcal,
//         resData[key].meta,
//         resData[key].vis,
//         resData[key].startDate,
//         resData[key].endDate,
//         resData[key].daysLeft,
//         resData[key].basePic,
//         resData[key].newPic
//       )
//     );
//   }
//   dispatch({ type: SET_MEMBER, memberDetails: loadedMemberDetails });
// } catch (err) {
//   throw err;
// }
//   };
// };

export const baseDetails = (name, last) => {
  return async () => {
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        var userId = user.uid.toString();
        try {
          db.doc(userId)
            .update({
              FirstName: name,
              LastName: last,

              // Height: height,
              // Weight: weight,
              // BMI: bmi,
              // Fat: fat,
              // Muscle: muscle,
              // KCAL: kcal,
              // Metabolical: meta,
              // ViFat: vifat,
            })
            .catch(function (error) {
              console.log("Error getting document:", error);
            });
        } catch (err) {
          setError(err.message);
        }
      }
    });
  };
};
export const baseInfo = (age, height, gender) => {
  return async () => {
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        var userId = user.uid.toString();
        try {
          db.doc(userId)
            .set({
              Age: age,
              Height: height,
              Gender: gender,
              // Weight: weight,
              // BMI: bmi,
              // Fat: fat,
              // Muscle: muscle,
              // KCAL: kcal,
              // Metabolical: meta,
              // ViFat: vifat,
            })
            .catch(function (error) {
              console.log("Error getting document:", error);
            });
        } catch (err) {
          setError(err.message);
        }
      }
    });
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

const saveDataToStorage = (loadedDetails) => {
  AsyncStorage.setItem(
    "resData",
    JSON.stringify({
      loadedDetails: loadedDetails,
    })
  );
};
