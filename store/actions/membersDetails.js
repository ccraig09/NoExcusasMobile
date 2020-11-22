import { useState } from "react";

import MemberDetails from "../../models/memberDetail";
export const UPDATE_MEMBER = "UPDATE_MEMBER";
import { AsyncStorage } from "react-native";
export const SET_MEMBER = "SET_MEMBER";
export const SET_FRONT = "SET_FRONT";
export const SET_SIDE = "SET_SIDE";
import firebase from "../../components/firebase";

export const db = firebase.firestore().collection("Members");

export default firebase;

// const [error, setError] = useState();

export const fetchMemberDetails = () => {
  return async (dispatch, getState) => {
    // const userId = getState().auth.userId;
    const userId = await AsyncStorage.getItem("userData").then((value) => {
      const data = JSON.parse(value);
      return data.userId;
    });
    console.log("get state worked and userid is:", userId);
    try {
      let loadedDetails;

      await db
        .doc(userId)
        .get()
        .then(function (doc) {
          if (doc.exists) {
            // console.log("doc data is: ", doc.data().FirstName);
            loadedDetails = doc.data();
            // console.log("this is doc dat", loadedDetails);
            dispatch({ type: SET_MEMBER, details: loadedDetails });
            // console.log("loadedDetails are:", loadedDetails);
          } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
          }
        })
        .catch(function (error) {
          console.log("Error getting document:", error);
        });
    } catch (err) {
      throw err;
    }
    //
  };
};

export const baseName = (userName) => {
  return async () => {
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        var userId = user.uid.toString();
        try {
          db.doc(userId)
            .set(
              {
                FirstName: userName,
                Nametimestamp: firebase.firestore.FieldValue.serverTimestamp(),
              },
              { merge: true }
            )
            .catch(function (error) {
              console.log("Error getting document:", error);
            });
        } catch (err) {
          console.log(err.message);
        }
      }
    });
  };
};
export const baseLast = (last) => {
  return async () => {
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        var userId = user.uid.toString();
        try {
          db.doc(userId)
            .set(
              {
                LastName: last,
                Nametimestamp: firebase.firestore.FieldValue.serverTimestamp(),
              },
              { merge: true }
            )
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

export const fatInfo = (fat) => {
  return async () => {
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        var userId = user.uid.toString();
        try {
          db.doc(userId)
            .set(
              {
                Fat: fat,
                fattimestamp: firebase.firestore.FieldValue.serverTimestamp(),
              },
              { merge: true }
            )
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
export const dateUpload = (dateChanged) => {
  return async () => {
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        var userId = user.uid.toString();
        try {
          db.doc(userId)
            .set(
              {
                dateChanged,
              },
              { merge: true }
            )
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
// export const evalUpdate = (kcal) => {
//   return async () => {
//     firebase.auth().onAuthStateChanged(function (user) {
//       if (user) {
//         var userId = user.uid.toString();
//         try {
//           db.doc(userId)
//             .collection(Evals)
//             .doc()
//             .set(
//               {
//                 KCAL: kcal,
//               },
//               { merge: true }
//             )
//             .catch(function (error) {
//               console.log("Error getting document:", error);
//             });
//         } catch (err) {
//           setError(err.message);
//         }
//       }
//     });
//   };
// };

export const muscleInfo = (muscle) => {
  return async () => {
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        var userId = user.uid.toString();
        try {
          db.doc(userId)
            .set(
              {
                Muscle: muscle,
                muscletimestamp: firebase.firestore.FieldValue.serverTimestamp(),
              },
              { merge: true }
            )
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
export const kcalInfo = (kcal) => {
  return async () => {
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        var userId = user.uid.toString();
        try {
          db.doc(userId)
            .set(
              {
                KCAL: kcal,
                kcaltimestamp: firebase.firestore.FieldValue.serverTimestamp(),
              },
              { merge: true }
            )
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

export const metaInfo = (metabolical) => {
  return async () => {
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        var userId = user.uid.toString();
        try {
          db.doc(userId)
            .set(
              {
                Metabolical: metabolical,
                Metatimestamp: firebase.firestore.FieldValue.serverTimestamp(),
              },
              { merge: true }
            )
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
export const vifatInfo = (vifat) => {
  return async () => {
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        var userId = user.uid.toString();
        try {
          db.doc(userId)
            .set(
              {
                ViFat: vifat,
                Vifattimestamp: firebase.firestore.FieldValue.serverTimestamp(),
              },
              { merge: true }
            )
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
export const bmiInfo = (bmi) => {
  return async () => {
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        var userId = user.uid.toString();
        try {
          db.doc(userId)
            .set(
              {
                BMI: bmi,
                Bmitimestamp: firebase.firestore.FieldValue.serverTimestamp(),
              },
              { merge: true }
            )
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
export const weightInfo = (weight) => {
  return async () => {
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        var userId = user.uid.toString();
        try {
          db.doc(userId)
            .set(
              {
                Weight: weight,
                Weighttimestamp: firebase.firestore.FieldValue.serverTimestamp(),
              },
              { merge: true }
            )
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
export const genderInfo = (gender) => {
  return async () => {
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        var userId = user.uid.toString();
        try {
          db.doc(userId)
            .set(
              {
                Gender: gender,
                Gendertimestamp: firebase.firestore.FieldValue.serverTimestamp(),
              },
              { merge: true }
            )
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
export const deleteBaseFront = () => {
  // console.log("this is eid to be deleted", );
  return () => {
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        var userId = user.uid.toString();
        var storage = firebase.storage().ref();
        // storage.child(`UserBaseImages/${userId}/${Eid}/SideImage`).delete();
        storage.child(`UserBaseImages/${userId}/FrontImage`).delete();
      }
    });
  };
};
export const deleteBaseLateral = () => {
  // console.log("this is eid to be deleted", );
  return () => {
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        var userId = user.uid.toString();
        var storage = firebase.storage().ref();
        // storage.child(`UserBaseImages/${userId}/${Eid}/SideImage`).delete();
        storage.child(`UserBaseImages/${userId}/SideImage`).delete();
      }
    });
  };
};

export const frontImage = async (blob) => {
  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      var userId = user.uid.toString();
      // return async () => {
      // console.log("uploading imagee", response);
      // const response = await fetch(uri);
      // const blob = await response.blob();
      let name = "FrontImage" + "-media.jpg";
      var ref = firebase
        .storage()
        .ref()
        .child("UserBaseImages/" + `${userId}/` + "FrontImage");
      return ref.put(blob);
    }
  });
  // const userId = getState().auth.userId;
  // console.log("uploadAsFile", uri);
  // const response = await fetch(uri);
  // const blob = await response.blob();

  // var metadata = {
  //   contentType: "image/jpeg",
  // };

  // let name = userId;
  // const ref = firebase
  //   .storage()
  //   .ref()
  //   .child("assets/" + name);

  // const task = ref.put(blob, metadata);

  // return new Promise((resolve, reject) => {
  //   task.on(
  //     "state_changed",
  //     (snapshot) => {
  //       progressCallback &&
  //         progressCallback(snapshot.bytesTransferred / snapshot.totalBytes);

  //       var progress =
  //         (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
  //       console.log("Upload is " + progress + "% done");
  //     },
  //     (error) =>
  //       reject(error) /* this is where you would put an error callback! */,
  //     () => {
  //       var downloadURL = task.snapshot.downloadURL;
  //       console.log("_uploadAsByteArray ", task.snapshot.downloadURL);

  //       // save a reference to the image for listing purposes
  //       var ref = firebase.database().ref("assets");
  //       ref
  //         .push({
  //           URL: downloadURL,
  //           //'thumb': _imageData['thumb'],
  //           name: name,
  //           //'coords': _imageData['coords'],
  //           owner:
  //             firebase.auth().currentUser && firebase.auth().currentUser.uid,
  //           when: new Date().getTime(),
  //         })
  //         .then(
  //           (r) => resolve(r),
  //           (e) => reject(e)
  //         );
  //     }
  //   );
  // });
  // var ref = firebase.storage().ref().child("my-image");
  // return ref.put(base64);
  // firebase.auth().onAuthStateChanged(function (user) {
  //   if (user) {
  //     var userId = user.uid.toString();
  //     try {
  //       db.doc(userId)
  //         .set(
  //           {
  //             FrontImage: imagePath,
  //             fronttimestamp: firebase.firestore.FieldValue.serverTimestamp(),
  //           },
  //           { merge: true }
  //         )
  //         .catch(function (error) {
  //           console.log("Error getting document:", error);
  //         });
  //     } catch (err) {
  //       setError(err.message);
  //     }
  //   }
  // });
  // };
};
// };
export const sideImage = (blobS) => {
  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      var userId = user.uid.toString();

      let name = "SideImage" + "-media.jpg";
      var ref = firebase
        .storage()
        .ref()
        .child("UserBaseImages/" + `${userId}/` + "SideImage");
      return ref.put(blobS);
    }
  });
};
export const ageInfo = (age) => {
  return async () => {
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        var userId = user.uid.toString();
        try {
          db.doc(userId)
            .set(
              {
                Age: age,
                Agetimestamp: firebase.firestore.FieldValue.serverTimestamp(),
              },
              { merge: true }
            )
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
export const heightInfo = (height) => {
  return async () => {
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        var userId = user.uid.toString();
        try {
          db.doc(userId)
            .set(
              {
                Height: height,
                heighttimestamp: firebase.firestore.FieldValue.serverTimestamp(),
              },
              { merge: true }
            )
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
