export const UPDATE_MEMBER = "UPDATE_MEMBER";
import { AsyncStorage } from "react-native";
export const SET_UPDATES = "SET_UPDATES";
import firebase from "../../components/firebase";

export const db = firebase.firestore().collection("Members");

export default firebase;

export const fetchUpdates = (Eid) => {
  return async (dispatch, getState) => {
    const userId = getState().auth.userId;
    try {
      const events = await db.doc(userId).collection("Evals");
      events.get().then((querySnapshot) => {
        const collection = querySnapshot.docs.map((doc) => {
          return { id: doc.id, ...doc.data() };
        });
        // let loadedUpdates = {};
        const loadedUpdates = collection;
        console
          .log
          // loadedUpdates.filter((per) => per.Eid.Eid === Eid)[0].bmi
          ();
        // console.log(
        //   "these are the evalupdates:",
        //   collection.filter((sumn) => sumn.Eid)
        // );
        dispatch({
          type: SET_UPDATES,
          updates: loadedUpdates.filter((per) => per.Eid.Eid === Eid),
        });
      });
    } catch (err) {
      throw err;
    }
  };
};

export const deleteSub = (UpId) => {
  return () => {
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        var userId = user.uid.toString();
        db.doc(userId).collection("Evals").doc(UpId).delete();
      }
    });
  };
};

export const deleteImages = (Eid) => {
  console.log("this is eid to be deleted", Eid);
  return () => {
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        var userId = user.uid.toString();
        var storage = firebase.storage().ref();
        storage.child(`UserBaseImages/${userId}/${Eid}/SideImage`).delete();
        storage.child(`UserBaseImages/${userId}/${Eid}/FrontImage`).delete();
      }
    });
  };
};
export const deleteFrontal = (Eid) => {
  console.log("this is eid to be deleted", Eid);
  return () => {
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        var userId = user.uid.toString();
        var storage = firebase.storage().ref();
        storage.child(`UserBaseImages/${userId}/${Eid}/FrontImage`).delete();
      }
    });
  };
};
export const deleteLateral = (Eid) => {
  console.log("this is eid to be deleted", Eid);
  return () => {
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        var userId = user.uid.toString();
        var storage = firebase.storage().ref();
        storage.child(`UserBaseImages/${userId}/${Eid}/SideImage`).delete();
      }
    });
  };
};

export const frontImage = async (blob, Eid) => {
  console.log("reaching firebase storage");
  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      var userId = user.uid.toString();
      var ref = firebase
        .storage()
        .ref()
        .child("UserBaseImages/" + `${userId}/` + `${Eid}/` + "FrontImage");
      return ref.put(blob);
    }
  });
};
export const sideImage = async (blobs, Eid) => {
  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      var userId = user.uid.toString();
      var ref = firebase
        .storage()
        .ref()
        .child("UserBaseImages/" + `${userId}/` + `${Eid}/` + "SideImage");
      return ref.put(blobs);
    }
  });
};

export const bmiInfo = (bmi, Eid) => {
  return async () => {
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        var userId = user.uid.toString();
        try {
          db.doc(userId)
            .collection("Evals")
            .doc()
            .set(
              {
                bmi,
                Eid,
              },
              { merge: true }
            )
            .catch(function (error) {
              console.log("Error getting document:", error);
            });
        } catch (err) {
          throw new Error(err.message);
        }
      }
    });
  };
};
export const bmiEdit = (bmi, UpdId, Eid) => {
  return async () => {
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        var userId = user.uid.toString();
        try {
          db.doc(userId)
            .collection("Evals")
            .doc(UpdId)
            .set(
              {
                bmi,
                Eid,
              },
              { merge: true }
            )
            .catch(function (error) {
              console.log("Error getting document:", error);
            });
        } catch (err) {
          throw new Error(err.message);
        }
      }
    });
  };
};
export const metaInfo = (meta) => {
  return async () => {
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        var userId = user.uid.toString();
        try {
          db.doc(userId)
            .collection("Evals")
            .doc()
            .set(
              {
                meta,
              },
              { merge: true }
            )
            .catch(function (error) {
              console.log("Error getting document:", error);
            });
        } catch (err) {
          throw new Error(err.message);
        }
      }
    });
  };
};
export const vifatInfo = (vifat) => {
  return async () => {
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        var userId = user.uid.toString();
        try {
          db.doc(userId)
            .collection("Evals")
            .doc()
            .set(
              {
                vifat,
              },
              { merge: true }
            )
            .catch(function (error) {
              console.log("Error getting document:", error);
            });
        } catch (err) {
          throw new Error(err.message);
        }
      }
    });
  };
};
export const kcalInfo = (kcal) => {
  return async () => {
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        var userId = user.uid.toString();
        try {
          db.doc(userId)
            .collection("Evals")
            .doc()
            .set(
              {
                kcal,
              },
              { merge: true }
            )
            .catch(function (error) {
              console.log("Error getting document:", error);
            });
        } catch (err) {
          throw new Error(err.message);
        }
      }
    });
  };
};
export const muscleInfo = (muscle) => {
  return async () => {
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        var userId = user.uid.toString();
        try {
          db.doc(userId)
            .collection("Evals")
            .doc()
            .set(
              {
                muscle,
              },
              { merge: true }
            )
            .catch(function (error) {
              console.log("Error getting document:", error);
            });
        } catch (err) {
          throw new Error(err.message);
        }
      }
    });
  };
};
export const fatInfo = (fat) => {
  return async () => {
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        var userId = user.uid.toString();
        try {
          db.doc(userId)
            .collection("Evals")
            .doc()
            .set(
              {
                fat,
              },
              { merge: true }
            )
            .catch(function (error) {
              console.log("Error getting document:", error);
            });
        } catch (err) {
          throw new Error(err.message);
        }
      }
    });
  };
};
