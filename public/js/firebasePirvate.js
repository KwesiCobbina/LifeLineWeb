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
// var tag;

// $(function() {
//   firebase.initializeApp(firebaseConfig);
//   firebase.auth.Auth.Persistence.SESSION;

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
//             var userData = snapshot.val();
//             var useremail = snapshot.child("email").val();
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
//           //   console.log(tag1);
//           return firebase
//             .database()
//             .ref("LIFELINE/Hospitals/" + tag1)
//             .once("value");
//         })
//         .then(function(snapshot) {
//           if (snapshot.exists()) {
//             // console.log(snapshot.child("Nurses").val());
//             nursesData = [];
//             var nurses = snapshot.child("Nurses");
//             var hospitalName = snapshot.child("hospitalName").val();
//             nurses.forEach(function(nurse) {
//               var nurs = new Array(
//                 nurse.child("name").val(),
//                 nurse.child("email").val(),
//                 nurse.child("phoneNumber").val()
//               );
//               nursesData.push(nurs);
//               requestsData.push(nurs);
//             });

//             reloadTable();
//             $("#hospital-name").text(hospitalName + " Page");
//           }
//         })
//         .catch(function(error) {
//           console.log(error);
//         });
//     } else {
//       // No user is signed in.
//     }
//   });
// });

// $(function() {
//   firebase.auth().onAuthStateChanged(function(user) {
//     firebase
//       .database()
//       .ref("LIFELINE/BloodRequests")
//       .once("value")
//       .then(function(snapshot) {
//         requestsData = [];
//         var requests = snapshot.child(tag);
//         requests.forEach(function(req) {
//           var request = new Array(
//             req.key,
//             req.child("dateRequested").val(),
//             req.child("timeRequested").val(),
//             req.child("bldGroup").val(),
//             req.child("emgContact").val(),
//             req.child("message").val()
//           );
//           console.log(req.key);
//           requestsData.push(request);
//         });
//         reloadReqTable();
//       });
//   });
// });

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

$(function() {
  firebase.initializeApp(firebaseConfig);
  firebase.auth.Auth.Persistence.SESSION;

  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      // User is signed in.
      var uid = user.uid;
      // window.alert(uid);
      firebase
        .database()
        // .ref("/LIFELINE/Admins/" + uid)
        .ref("/LIFELINE/DashboardUsers/" + uid)
        .once("value")
        .then(function(snapshot) {
          if (snapshot.exists()) {
            var userData = snapshot.val();
            var useremail = snapshot.child("email").val();
            var name = snapshot.child("name").val();
            var tag1 = snapshot.child("hospitalTag").val();
            var hospitalName = snapshot.child("hospitalName").val();
            $("#user-name").text(name);
            $("#hospital-name").text(hospitalName + " Page");
            // console.log(name);
            // console.log($("#user-name"));

            // console.log("asdfghjkl");
            // console.log(snapshot.child("isSuperAdmin").val());
            if (
              snapshot.child("isAdmin").val() === false &&
              snapshot.child("isSuperAdmin").val() === false
            ) {
              console.log(snapshot.child("isAdmin"));
              $("#rqtBld").hide();
              $("#adNrs").hide();
              $("div#donateRqt").hide();
              $("#donChart").hide();
              $("#donate").hide();
              $("#donChart").hide();
              $("#administratorView").hide();
            } else if (
              snapshot.child("isAdmin").val() === true &&
              snapshot.child("isSuperAdmin").val() === false
            ) {
              $("#takeBlood").hide();
              $("#administratorView").hide();
            } else {
              $("#hospital-name").text("Add Hospital Page");
              $("#rqtBld").hide();
              $("#adNrs").hide();
              $("div#donateRqt").hide();
              $("#donChart").hide();
              $("#donate").hide();
              $("#donChart").hide();
              $("#takeBlood").hide();
              $("#bbs").hide();
              $("#bt").hide();
              $("#blddets").hide();
            }
            tag = tag1;
            return tag1;
          }
        })
        .then(function(tag1) {
          // console.log(tag1);

          return firebase
            .database()
            .ref("LIFELINE/Hospitals/" + tag1 + "/Nurses")
            .once("value");
        })
        .then(function(snapshot) {
          if (snapshot.exists()) {
            // console.log(snapshot);
            nursesData = [];
            var staff = snapshot;
            console.log(staff);
            // var hospitalName = snapshot.child("hospitalName").val();
            staff.forEach(function(nurse) {
              // if (nurse.child("isAdmin").val() === false) {
              var nurs = new Array(
                nurse.child("name").val(),
                nurse.child("email").val(),
                nurse.child("phoneNumber").val()
              );
              nursesData.push(nurs);
              // }

              // requestsData.push(nurs);
            });

            reloadTable();
            // $("#hospital-name").text(hospitalName + " Page");
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

$(function() {
  firebase.auth().onAuthStateChanged(function(user) {
    console.log("user.uid");
    firebase
      .database()
      .ref("LIFELINE/BloodRequests/")
      .once("value")
      .then(function(snapshot) {
        requestsData = [];
        var requests = snapshot;
        // var requests = snapshot;
        console.log(requests);
        requests.forEach(function(req) {
          console.log(req.child("hospitalId").val());
          if (req.child("hospitalId").val() == tag) {
            var request = new Array(
              req.key,
              req.child("dateRequested").val(),
              req.child("timeRequested").val(),
              req.child("bldGroup").val(),
              req.child("emgContact").val(),
              req.child("message").val()
            );
            console.log(req.key);
            requestsData.push(request);
          }
        });
        reloadReqTable();
      });
  });
});

$(function() {
  $("#withdrawBlood").click(function() {
    // console.log(tag);
    var bloodGroup = $("#reqbldGrp :selected").text();

    var needed, avail, used, sendNeed, sendHave;
    $("#title-blood").text(" " + bloodGroup);
    var num = Number($("#withQuan").val());
    if ($("#withQuan").val() != "" && typeof num == "number") {
      firebase
        .database()
        .ref("/LIFELINE/Hospitals/" + tag + "/bloodBank/" + bloodGroup)
        .once("value")
        .then(function(snapshot) {
          if (snapshot.exists()) {
            needed = snapshot.child("needQuantity").val();
            avail = snapshot.child("haveQuantity").val();
            used = snapshot.child("used").val();

            if (needed >= 0) {
              $("#need").text(Number(needed) - Number($("#withQuan").val()));
              $("#avail").text(Number(avail) + Number($("#withQuan").val()));
              $("#used").text(used);
            } else {
              // $("#need").text(Number(needed) - Number($("#withQuan").val()));
              $("#avail").text(Number(avail) + Number($("#withQuan").val()));
              $("#used").text(used);
            }

            sendHave = Number(avail) + Number($("#withQuan").val());
            sendNeed = Number(needed) - Number($("#withQuan").val());
            // console.log(typeof sendNeed);
            firebase
              .database()
              .ref()
              .child("LIFELINE/Hospitals/" + tag + "/bloodBank/" + bloodGroup)
              .update({
                needQuantity: sendNeed,
                haveQuantity: sendHave
              }),
              function(error) {};

            window.alert(
              "You have successfully added blood to your blood bank."
            );
          }
        });
    } else {
      window.alert("You have failed to added blood to your blood bank.");
    }
    // firebase
    //   .database()
    //   .ref("/LIFELINE/Hospitals/" + tag + "/bloodBank/" + bloodGroup)
    //   .once("value")
    //   .then(function(snapshot) {
    //     if (snapshot.exists()) {
    //       needed = snapshot.child("needQuantity").val();
    //       avail = snapshot.child("haveQuantity").val();
    //       used = snapshot.child("used").val();
    //       // console.log(avail, avail + parseInt($("#withQuan").val()));
    //       if ($("#need").val() != 0) {
    //         $("#need").text(Number(needed) - Number($("#withQuan").val()));
    //         $("#avail").text(Number(avail) + Number($("#withQuan").val()));
    //         $("#used").text(used);
    //       } else {
    //         // $("#need").text(Number(needed) - Number($("#withQuan").val()));
    //         $("#avail").text(Number(avail) + Number($("#withQuan").val()));
    //         $("#used").text(used);
    //       }

    //       sendHave = Number(avail) + Number($("#withQuan").val());
    //       sendNeed = Number(needed) - Number($("#withQuan").val());
    //       // console.log(typeof sendNeed);
    //       firebase
    //         .database()
    //         .ref()
    //         .child("LIFELINE/Hospitals/" + tag + "/bloodBank/" + bloodGroup)
    //         .update({
    //           needQuantity: sendNeed,
    //           haveQuantity: sendHave
    //         }),
    //         function(error) {
    //           window.alert(
    //             "You have failed to added blood to your blood bank."
    //           );
    //         };

    //       window.alert(
    //         "You have successfully added blood to your blood bank."
    //       );
    //     }
    //   });
    //

    // console.log(typeof sendHave);
    // console.log(typeof $("#withQuan").val());

    // console.log(Number(sendHave));

    // console.log(sendHave);
  });
});
// $("#withQuan").val();

// firebase
//   .database()
//   .ref("/LIFELINE/Hospitals/" + tag + "/bloodBank/" + bloodGroup)
//   .once("value")
//   .then(function(snapshot) {
//     if (snapshot.exists()) {
//       var needed = snapshot.child("needQuantity").val();
//       var avail = snapshot.child("haveQuantity").val();
//       var used = snapshot.child("used").val();
//       $("#need").text(needed);
//       $("#avail").text(avail);
//       $("#used").text(used);
//     }
//   });
