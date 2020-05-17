// var firebaseConfig = {
//   apiKey: "AIzaSyA1WlfpPBv4gBZMWYNYfTxKb-2Qgt6fvzM",
//   authDomain: "lifeline-f29d3.firebaseapp.com",
//   databaseURL: "https://lifeline-f29d3.firebaseio.com",
//   projectId: "lifeline-f29d3",
//   storageBucket: "lifeline-f29d3.appspot.com",
//   messagingSenderId: "500356708530",
//   appId: "1:500356708530:web:fad654e6035644309b31ab",
//   measurementId: "G-YBMF7RDHEG"
// };

// var firebaseConfig2 = {
//   apiKey: "AIzaSyA1WlfpPBv4gBZMWYNYfTxKb-2Qgt6fvzM",
//   authDomain: "lifeline-f29d3.firebaseapp.com",
//   databaseURL: "https://lifeline-f29d3.firebaseio.com",
//   projectId: "lifeline-f29d3",
//   storageBucket: "lifeline-f29d3.appspot.com",
//   messagingSenderId: "500356708530",
//   appId: "1:500356708530:web:fad654e6035644309b31ab",
//   measurementId: "G-YBMF7RDHEG"
// };
// var tag;
// var nurseID;

// $(function() {
//   firebase.initializeApp(firebaseConfig);
//   firebase.auth.Auth.Persistence.SESSION;
//   var secApp = firebase.initializeApp(firebaseConfig2, "Secondary");

//   firebase.auth().onAuthStateChanged(function(user) {
//     if (user) {
//       // User is signed in.
//       var uid = user.uid;
//       // window.alert(uid);
//       firebase
//         .database()
//         .ref("/LIFELINE/Admins/" + uid)
//         .once("value")
//         .then(function(snapshot) {
//           if (snapshot.exists()) {
//             // var userData = snapshot.val();
//             // var useremail = snapshot.child("email").val();
//             var name = snapshot.child("name").val();
//             var tag1 = snapshot.child("hospitalTag").val();
//             $("#user-name").text(name);
//             // console.log(name);
//             // console.log($("#user-name"));

//             tag = tag1;
//             return tag1;
//           }
//         })
//         .then(function(tag1) {
//           $("#addNurse").click(function() {
//             secApp
//               .auth()
//               .createUserWithEmailAndPassword(
//                 $("#exampleInputEmail1").val(),
//                 "passwordNurse"
//               )
//               .then(function(user1) {
//                 nurseID = user1.user.uid;
//                 console.log(nurseID);
//               })
//               .catch(function(error) {
//                 // Handle Errors here.
//                 var errorCode = error.code;
//                 var errorMessage = error.message;
//                 // ...
//               });
//             firebase
//               .database()
//               .ref("LIFELINE/Hospitals/" + tag1 + "/Nurses/" + UUID())
//               .set({
//                 name: $("#nurseName").val(),
//                 email: $("#exampleInputEmail1").val(),
//                 phoneNumber: $("#phnNum").val()
//               });

//             window.alert(
//               "you have successfully added nurse " + $("#nurseName").val()
//             );
//           });
//         })

//         .catch(function(error) {
//           console.log(error);
//         });
//     } else {
//       // No user is signed in.
//     }
//   });
// });

// var rand = Math.random;

// function UUID() {
//   var nbr,
//     randStr = "";
//   do {
//     randStr += (nbr = rand()).toString(16).substr(3, 6);
//   } while (randStr.length < 30);
//   return (
//     randStr.substr(0, 8) +
//     "-" +
//     randStr.substr(8, 4) +
//     "-4" +
//     randStr.substr(12, 3) +
//     "-" +
//     (((nbr * 4) | 0) + 8).toString(16) + // [89ab]
//     randStr.substr(15, 3) +
//     "-" +
//     randStr.substr(18, 12)
//   );
// }

var firebaseConfig = {
  apiKey: "AIzaSyA1WlfpPBv4gBZMWYNYfTxKb-2Qgt6fvzM",
  authDomain: "lifeline-f29d3.firebaseapp.com",
  databaseURL: "https://lifeline-f29d3.firebaseio.com",
  projectId: "lifeline-f29d3",
  storageBucket: "lifeline-f29d3.appspot.com",
  messagingSenderId: "500356708530",
  appId: "1:500356708530:web:fad654e6035644309b31ab",
  measurementId: "G-YBMF7RDHEG",
};

var firebaseConfig2 = {
  apiKey: "AIzaSyA1WlfpPBv4gBZMWYNYfTxKb-2Qgt6fvzM",
  authDomain: "lifeline-f29d3.firebaseapp.com",
  databaseURL: "https://lifeline-f29d3.firebaseio.com",
  projectId: "lifeline-f29d3",
  storageBucket: "lifeline-f29d3.appspot.com",
  messagingSenderId: "500356708530",
  appId: "1:500356708530:web:fad654e6035644309b31ab",
  measurementId: "G-YBMF7RDHEG",
};
var tag;
var hosName;
var nurseID;

$(function () {
  firebase.initializeApp(firebaseConfig);
  firebase.auth.Auth.Persistence.SESSION;
  var secApp = firebase.initializeApp(firebaseConfig2, "Secondary");

  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      // User is signed in.
      var uid = user.uid;
      // window.alert(uid);
      firebase
        .database()
        .ref("/LIFELINE/DashboardUsers/" + uid)
        .once("value")
        .then(function (snapshot) {
          if (snapshot.exists()) {
            var name = snapshot.child("name").val();
            var tag1 = snapshot.child("hospitalTag").val();
            hosName = snapshot.child("hospitalName").val();
            $("#user-name").text(name);

            tag = tag1;
            return tag1;
          }
        })
        // Create nurse
        .then(function (tag1) {
          $("#addNurse").click(function () {
            secApp
              .auth()
              .createUserWithEmailAndPassword(
                $("#exampleInputEmail1").val(),
                "passwordNurse"
              )
              .then(function (user1) {
                nurseID = user1.user.uid;
                // save nurse in under hospital
                firebase
                  .database()
                  .ref("LIFELINE/Hospitals/" + tag1 + "/Nurses/" + nurseID)
                  .set({
                    name: $("#nurseName").val(),
                    email: $("#exampleInputEmail1").val(),
                    phoneNumber: $("#phnNum").val(),
                  });
                // save nurse under dashboard users
                firebase
                  .database()
                  .ref("LIFELINE/DashboardUsers/" + nurseID)
                  .set({
                    name: $("#nurseName").val(),
                    email: $("#exampleInputEmail1").val(),
                    phoneNumber: $("#phnNum").val(),
                    hospitalTag: tag,
                    hospitalName: hosName,
                    isAdmin: false,
                    isSuperAdmin: false,
                  });

                window.alert("you have successfully added nurse " + nurseID);
                secApp
                  .auth()
                  .signOut()
                  .then(
                    function () {
                      // Sign-out successful.
                      console.log("you're out");
                    },
                    function (error) {
                      // An error happened.
                      // console.log(error);
                      window.alert(error);
                    }
                  );
                // send password reset message
                firebase
                  .auth()
                  .sendPasswordResetEmail($("#exampleInputEmail1").val())
                  .then(function () {
                    console.log("Successfully sent reset link");
                  })
                  .catch(function (error) {
                    console.log(error);
                  });
              })
              .catch(function (error) {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                // ...
              });
          });
        })

        .catch(function (error) {
          console.log(error);
        });
    } else {
      // No user is signed in.
    }
  });
});

var rand = Math.random;

function UUID() {
  var nbr,
    randStr = "";
  do {
    randStr += (nbr = rand()).toString(16).substr(3, 6);
  } while (randStr.length < 30);
  return (
    randStr.substr(0, 8) +
    "-" +
    randStr.substr(8, 4) +
    "-4" +
    randStr.substr(12, 3) +
    "-" +
    (((nbr * 4) | 0) + 8).toString(16) + // [89ab]
    randStr.substr(15, 3) +
    "-" +
    randStr.substr(18, 12)
  );
}
