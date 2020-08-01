import Eval from "../../models/eval";

export const DELETE_EVAL = "DELETE_EVAL";
export const CREATE_EVAL = "CREATE_EVAL";
export const SET_EVAL = "SET_EVAL";

import firebase from "../../components/firebase";

export const db = firebase.firestore().collection("Members");

export default firebase;

export const fetchMemberEvals = () => {
  return async (dispatch, getState) => {
    const userId = getState().auth.userId;
    console.log("get state worked and userid is:", userId);
    try {
      const loadedEvals = [];

      await db
        .doc(userId)
        .get()
        .then(function (doc) {
          if (doc.exists) {
            // console.log("doc data is: ", doc.data().FirstName);
            resData = doc.data().Title;

            console.log("loadedEvals are:", loadedEvals);
          } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
          }
        })
        .catch(function (error) {
          console.log("Error getting document:", error);
        });

      for (const key in resData) {
        loadedEvals.push(
          new Eval(
            key,
            resData[key].ownerId,
            resData[key].title,
            resData[key].date,
            resData[key].notes
          )
        );
      }
      dispatch({
        type: SET_EVAL,
        userEvals: loadedEvals.filter((prod) => prod.ownerId === userId),
      });
    } catch (err) {
      throw err;
    }
  };
};

export const deleteEval = (evalId) => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    await db
      .doc(userId)
      .get()
      .then(function (doc) {
        if (doc.exists) {
          // console.log("doc data is: ", doc.data().FirstName);
          resData = doc.data();

          console.log("loadedEvals are:", loadedEvals);
        } else {
          // doc.data() will be undefined in this case
          console.log("No such document!");
        }
      })
      .catch(function (error) {
        console.log("Error getting document:", error);
      });
    dispatch({ type: DELETE_EVAL, eid: evalId });
  };
};

export const createEval = (title) => {
  return async () => {
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        var userId = user.uid.toString();
        try {
          db.doc(userId).set(
            {
              Title: title,
              // Date: date,
              // Notes: notes,
            },
            { merge: true }
          );
          //     .get()
          //     .then(function (doc) {
          //       if (doc.exists) {
          //         console.log("doc data is: ", doc.data().FirstName);
          //         const resData = doc.data();
          //         dispatch({
          //           type: CREATE_EVAL,
          //           evalData: {
          //             // id: resData.name,
          //             title,
          //             // date,
          //             // notes,
          //             // ownerId: userId,
          //           },
          //         });
          //       } else {
          //         // doc.data() will be undefined in this case
          //         console.log("No such document!");
          //       }
          //     })
          //     .catch(function (error) {
          //       console.log("Error getting document:", error);
          //     })
          //     .catch(function (error) {
          //       console.log("Error getting document:", error);
          //     });
        } catch (err) {
          setError(err.message);
        }
      }
    });
  };
};
