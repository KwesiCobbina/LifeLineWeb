var firebaseConfig = {
  apiKey: "AIzaSyA1WlfpPBv4gBZMWYNYfTxKb-2Qgt6fvzM",
  authDomain: "lifeline-f29d3.firebaseapp.com",
  databaseURL: "https://lifeline-f29d3.firebaseio.com",
  projectId: "lifeline-f29d3",
  storageBucket: "lifeline-f29d3.appspot.com",
  messagingSenderId: "500356708530",
  appId: "1:500356708530:web:fad654e6035644309b31ab",
  measurementId: "G-YBMF7RDHEG"
};
var tag;
var today = new Date();
var date =
  today.getDate() + "-" + (today.getMonth() + 1) + "-" + today.getFullYear();

var time =
  today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();

$(function() {
  firebase.initializeApp(firebaseConfig);
  firebase.auth.Auth.Persistence.SESSION;

  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      // User is signed in.
      var uid = user.uid;
      //   window.alert(uid);
      firebase
        .database()
        .ref("/LIFELINE/DashboardUsers/" + uid)
        .once("value")
        .then(function(snapshot) {
          if (snapshot.exists()) {
            var name = snapshot.child("name").val();
            var tag1 = snapshot.child("hospitalTag").val();
            $("#user-name").text(name);
            tag = tag1;
            return tag1;
          }
        })
        .then(function(tag1) {
          //   console.log(tag1);
          return firebase
            .database()
            .ref("LIFELINE/Hospitals/" + tag1)
            .once("value");
        })
        .then(function(snapshot) {
          if (snapshot.exists()) {
            var hospitalName = snapshot.child("hospitalName").val();
            var longitude = snapshot.child("long").val();
            var latitude = snapshot.child("lat").val();
            // console.log(snapshot.val());
            $("#sendRequest").click(function() {
              var uid = UUID();
              firebase
                .database()
                .ref("LIFELINE/BloodRequests/" + uid + "/")
                .set({
                  uid: uid,
                  message: $("#donateMessage").val(),
                  hospitalLong: longitude,
                  hospitalLat: latitude,
                  bldGroup: $("#bldGrp").val(),
                  emgContact: $("#phnNum").val(),
                  hospitalName: hospitalName,
                  dateRequested: date,
                  timeRequested: time,
                  hospitalId: tag
                });
              window.alert("New request was successful.");
            });
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    } else {
      // No user is signed in.
    }
  });
});

// if (user) {
//   // User is signed in.
//   var uid = user.uid;
//   // window.alert(uid);
//   firebase
//     .database()
//     .ref("/LIFELINE/Admins/" + uid)
//     .once("value")
//     .then(function(snapshot) {
//       if (snapshot.exists()) {
//         var userData = snapshot.val();
//         var useremail = snapshot.child("email").val();
//         var name = snapshot.child("name").val();
//         var tag1 = snapshot.child("hospitalTag").val();
//         $("#user-name").text(name);
//         console.log(name);
//         console.log($("#user-name"));

//         tag = tag1;
//         return tag1;
//       }
//     })
//     .then(function(tag1) {
//       //   console.log(tag1);
//       return firebase
//         .database()
//         .ref("LIFELINE/Hospitals/" + tag1)
//         .once("value");
//     })
//     .then(function(snapshot) {
//       if (snapshot.exists()) {
//         // console.log(snapshot.child("Nurses").val());
//         nursesData = [];
//         var nurses = snapshot.child("Nurses");
//         var hospitalName = snapshot.child("hospitalName").val();
//         nurses.forEach(function(nurse) {
//           var nurs = new Array(
//             nurse.child("name").val(),
//             nurse.child("email").val(),
//             nurse.child("phoneNumber").val()
//           );
//           //   console.log(nurse.child("email").val());
//           //   console.log(nurse.child("name").val());
//           //   console.log(nurs);
//           nursesData.push(nurs);
//           console.log(nursesData);
//         });

//         reloadTable();
//         $("#hospital-name").text(hospitalName + " Page");
//       }
//     })
//     .catch(function(error) {
//       console.log(error);
//     });
// } else {
//   // No user is signed in.
// }

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
