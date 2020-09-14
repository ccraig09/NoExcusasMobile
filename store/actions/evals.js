import Eval from "../../models/eval";

export const DELETE_EVAL = "DELETE_EVAL";
export const CREATE_EVAL = "CREATE_EVAL";
export const SET_EVAL = "SET_EVAL";

import firebase from "../../components/firebase";

export const db = firebase.firestore().collection("Members");
export const dbE = firebase.firestore().collection("MemberEvals");

export default firebase;

export const fetchMemberEvals = () => {
  return async (dispatch, getState) => {
    const userId = getState().auth.userId;
    const token = getState().auth.token;
    // console.log("get state worked and userid is:", userId);
    try {
      // dbE;
      const events = await dbE;
      events.get().then((querySnapshot) => {
        const collection = querySnapshot.docs.map((doc) => {
          return { id: doc.id, ...doc.data() };
        });
        // console.log("receiving data from collection in firebase:", collection);
        // const snapshot = await dbE.get();
        // snapshot.forEach((doc) => {
        //   console.log(doc.id, "=>", doc.data());
        //   console.log(
        //     "going to load all DOC and look for single docs",
        //     doc.data()
        //   );

        // const resData = doc.data();
        const loadedEvals = [];
        // loadedEvals.push({ id: doc.id, ...doc.data() });
        // console.log("resdata loaded from EVERYTHING should be:", resData);

        for (const key in collection) {
          loadedEvals.push(
            new Eval(
              key,
              collection[key].title,
              collection[key].ownerId,
              collection[key].id,
              collection[key].timestamp
            )
          );
          const time = collection[key].timestamp;
          loadedEvals.sort((a, b) => (a.time > b.time ? 1 : -1));

          // console.log("testing doctitle new", collection[key].timestamp);
          dispatch({
            type: SET_EVAL,

            userEvals: loadedEvals.filter((eva) => eva.ownerId === userId),
          });
        }
      });
      //   });
      // })
      // .catch(function (error) {
      //   console.log("Error getting document:", error);
      // });
    } catch (err) {
      throw err;
    }
  };
};

export const createEval = (title) => {
  return async (dispatch, getState) => {
    const userId = getState().auth.userId;
    try {
      await dbE.doc().set(
        {
          title,
          ownerId: userId,
          timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        },
        { merge: true }
      );

      const events = dbE;
      await events
        .get()
        .then((querySnapshot) => {
          const collection = querySnapshot.docs.map((doc) => {
            return { id: doc.id, ...doc.data() };
          });

          console.log(
            "on Create Collection Everything",
            collection[0].timestamp
          );
          dispatch({
            type: CREATE_EVAL,
            evalData: {
              id: collection[0].id,
              title,
              ownerId: userId,
              docTitle: collection[0].id,
              time: collection[0].timestamp,
            },
          });
        })
        .catch(function (error) {
          console.log("Error getting document:", error);
        });
    } catch (err) {
      setError(err.message);
    }
  };
};

export const deleteEval = (docId) => {
  return async (dispatch, getState) => {
    await dbE.doc(docId).delete();
    dispatch({ type: DELETE_EVAL, eid: docId });
  };
};

// export const deleteEval = (evalId) => {
//   return async (dispatch, getState) => {
//     const token = getState().auth.token;
//     await db
//       .doc(userId)
//       .get()
//       .then(function (doc) {
//         if (doc.exists) {
//           // console.log("doc data is: ", doc.data().FirstName);
//           resData = doc.data();

//           console.log("loadedEvals are:", loadedEvals);
//         } else {
//           // doc.data() will be undefined in this case
//           console.log("No such document!");
//         }
//       })
//       .catch(function (error) {
//         console.log("Error getting document:", error);
//       });
//     dispatch({ type: DELETE_EVAL, eid: evalId });
//   };
// };
