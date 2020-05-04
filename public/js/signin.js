// $(function() {
//   $("#btn-login ").click(function() {
//     var email = $("#email").val();
//     var password = $("#password").val();

//     if (email != "" && password != "") {
//       var result = firebase.auth().signInWithEmailAndPassword(email, password);

//       result.catch(function(err) {
//         var errorCode = err.code;
//         var errorMessage = err.message;
//         window.alert("Message from provider:" + errorMessage);
//       });
//     } else {
//       window.alert("Please fill out all fields.");
//     }
//   });

//   firebase.auth().onAuthStateChanged(function(user) {
//     if (user) {
//       email = user.email;
//       console.log(email);
//       uid = user.uid;

//       return firebase
//         .database()
//         .ref("/LIFELINE/Admins/" + uid)
//         .once("value")
//         .then(function(snapshot) {
//           if (snapshot.exists()) {
//             var userData = snapshot.val();
//             var useremail = snapshot.child("email").val();
//             var name = snapshot.child("name").val();

//             if (useremail == email) {
//               window.location.href = "index.html";
//             } else {
//               firebase
//                 .auth()
//                 .signOut()
//                 .then(
//                   function() {
//                     // Sign-out successful.
//                     console.log("you're out");
//                   },
//                   function(error) {
//                     // An error happened.
//                     // console.log(error);
//                     window.alert(error);
//                   }
//                 );
//               window.alert(
//                 "Please contact your administrator. You dont have access to this portal. thank you."
//               );
//             }
//           } else {
//             window.alert(
//               "Please contact your administrator. You dont have access to this portal. thank you."
//             );
//           }
//         });
//     }
//   });
// });

////////////////////////////////////////////////////////

// $(function() {
//   $("#btn-login ").click(function() {
//     var email = $("#email").val();
//     var password = $("#password").val();

//     if (email != "" && password != "") {
//       var result = firebase.auth().signInWithEmailAndPassword(email, password);

//       result;
//       result.catch(function(err) {
//         var errorCode = err.code;
//         var errorMessage = err.message;
//         window.alert("Message from provider:" + errorMessage);
//       });
//     } else {
//       window.alert("Please fill out all fields.");
//     }
//   });

//   firebase.auth().onAuthStateChanged(function(user) {
//     if (user) {
//       email = user.email;
//       console.log(email);
//       uid = user.uid;

//       return (
//         firebase
//           .database()
//           .ref("/LIFELINE/HospitalStaff/hospital1/" + uid)
//           // .ref("/LIFELINE/Admins/" + uid)
//           .once("value")
//           .then(function(snapshot) {
//             if (snapshot.exists()) {
//               if (snapshot.child) {
//                 var userData = snapshot.val();
//                 var useremail = snapshot.child("email").val();
//                 var name = snapshot.child("name").val();
//                 var hosId = snapshot.child("hospitalTag").val();
//                 var hospitalName = snapshot.child("hospitalName").val();

//                 $("#user-name").text(name);
//                 $("#hospital-name").text(hospitalName + " Page");

//                 firebase
//                   .database()
//                   .ref("/LIFELINE/HospitalStaff/" + hosId)
//                   .once("value")
//                   .then(function(snapshot) {
//                     let staffs = snapshot;
//                     staffs.forEach(function(staff) {
//                       if (useremail == email) {
//                         // if (staff.child("isAdmin").val() === true) {
//                         window.location.href = "index.html";
//                         // } else if (staff.child("isAdmin").val() === false) {
//                         //   window.location.href = "index.html";
//                         // }
//                       } else {
//                         firebase
//                           .auth()
//                           .signOut()
//                           .then(
//                             function() {
//                               // Sign-out successful.
//                               console.log("you're out");
//                             },
//                             function(error) {
//                               // An error happened.
//                               // console.log(error);
//                               window.alert(error);
//                             }
//                           );
//                         window.alert(
//                           "Please contact your administrator. You dont have access to this portal. thank you."
//                         );
//                       }
//                       // }
//                     });
//                   });
//               }
//             } else {
//               window.alert(
//                 "Please contact your administrator. You dont have access to this portal. thank you."
//               );
//             }
//           })
//       );
//     }
//   });
// });

$(function() {
  $("#btn-login ").click(function() {
    var email = $("#email").val();
    var password = $("#password").val();

    if (email != "" && password != "") {
      var result = firebase.auth().signInWithEmailAndPassword(email, password);

      result;
      result.catch(function(err) {
        var errorCode = err.code;
        var errorMessage = err.message;
        window.alert("Message from provider:" + errorMessage);
      });
    } else {
      window.alert("Please fill out all fields.");
    }
  });

  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      email = user.email;
      console.log(email);
      uid = user.uid;
      console.log(uid);

      return (
        firebase
          .database()
          .ref("/LIFELINE/DashboardUsers/" + uid)
          // .ref("/LIFELINE/Admins/" + uid)
          .once("value")
          .then(function(snapshot) {
            if (snapshot.exists()) {
              if (snapshot.child) {
                var userData = snapshot.val();
                var useremail = snapshot.child("email").val();
                var name = snapshot.child("name").val();
                var hosId = snapshot.child("hospitalTag").val();
                var hospitalName = snapshot.child("hospitalName").val();

                $("#user-name").text(name);
                $("#hospital-name").text(hospitalName + " Page");

                window.location.href = "index.html";
                // firebase
                //   .database()
                //   .ref("/LIFELINE/HospitalStaff/" + hosId)
                //   .once("value")
                //   .then(function(snapshot) {
                //     let staffs = snapshot;
                //     staffs.forEach(function(staff) {
                //       if (useremail == email) {
                //         // if (staff.child("isAdmin").val() === true) {
                //         window.location.href = "index.html";
                //         // } else if (staff.child("isAdmin").val() === false) {
                //         //   window.location.href = "index.html";
                //         // }
                //       }
                // else {

                // }
                // }
                //     });
                //   });
              }
            } else {
              firebase
                .auth()
                .signOut()
                .then(
                  function() {
                    // Sign-out successful.
                    console.log("you're out");
                  },
                  function(error) {
                    // An error happened.
                    // console.log(error);
                    window.alert(error);
                  }
                );
              window.alert(
                "Please contact your administrator. You dont have access to this portal. thank you."
              );
              // window.alert(
              //   "Please contact your administrator. You dont have access to this portal. thank you."
              // );
            }
          })
      );
    }
  });
});
