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

var firebaseConfig3 = {
  apiKey: "AIzaSyA1WlfpPBv4gBZMWYNYfTxKb-2Qgt6fvzM",
  authDomain: "lifeline-f29d3.firebaseapp.com",
  databaseURL: "https://lifeline-f29d3.firebaseio.com",
  projectId: "lifeline-f29d3",
  storageBucket: "lifeline-f29d3.appspot.com",
  messagingSenderId: "500356708530",
  appId: "1:500356708530:web:fad654e6035644309b31ab",
  measurementId: "G-YBMF7RDHEG",
};

var x = document.getElementById("demo");
var hospitalLongitude;
var hospitalLatitude;
var adminID;

function showPosition(position) {
  hospitalLatitude = position.coords.latitude;
  hospitalLongitude = position.coords.longitude;
}

$(function () {
  if ("geolocation" in navigator) {
    //check geolocation available
    //try to get user current location using getCurrentPosition() method
    navigator.geolocation.getCurrentPosition(function (position) {
      // $("#result").html(
      //   "Found your location <br />Lat : " +
      //     position.coords.latitude +
      //     " </br>Lang :" +
      //     position.coords.longitude
      // );
      hospitalLatitude = position.coords.latitude;
      hospitalLongitude = position.coords.longitude;
    });
  } else {
    console.log("Browser doesn't support geolocation!");
  }
  var secApp = firebase.initializeApp(firebaseConfig3, "Secondary");

  $("#addHospital").click(function () {
    var adminEmail = $("#adminEmail1").val();
    var password = "adminPassword";
    var hospitalName = $("#hosName").val();
    var hospitalEmail = $("#hosEmail1").val();
    var hospitalPhnNumber = $("#hosphnNum").val();
    var bloodBank = [
      { A: { haveQuantity: 0, need: 0, needQuantity: 0, used: 0 } },
      { B: { haveQuantity: 0, need: 0, needQuantity: 0, used: 0 } },
      { AB: { haveQuantity: 0, need: 0, needQuantity: 0, used: 0 } },
      { O: { haveQuantity: 0, need: 0, needQuantity: 0, used: 0 } },
    ];
    var hospitalLocation = $("#hospitalLocation").val();
    var isAdmin = true;
    var isSuperAdmin = false;
    if ($("#hospitalLat").val() != "" && $("#hospitalLong").val() != "") {
      var hospitalLat = Number($("#hospitalLat").val());
      var hospitalLong = Number($("#hospitalLong").val());
    } else {
      var hospitalLat = hospitalLatitude;
      var hospitalLong = hospitalLongitude;
    }
    var adminName = $("#adminName").val();
    var adminPhnNumber = $("#adminphnNum").val();

    console.log(hospitalLatitude, "this", hospitalLongitude);
    if (adminEmail != "") {
      secApp
        .auth()
        .createUserWithEmailAndPassword($("#adminEmail1").val(), "adminPass")
        .then(function (adminUser) {
          adminID = adminUser.user.uid;
          // console.log(adminID);
          return adminID;
        })
        .then(function (adminID) {
          // console.log(adminID);
          var hospitalTag = UUID();
          firebase
            .database()
            .ref("LIFELINE/Hospitals/" + hospitalTag)
            .set({
              admin: adminID,
              hospitalName: hospitalName,
              lat: hospitalLat,
              long: hospitalLong,
              bloodBank: bloodBank,
              phoneNumber: hospitalPhnNumber,
            });
          return hospitalTag;
        })
        .then(function (hospitalTag) {
          console.log(adminEmail);
          firebase
            .database()
            .ref("LIFELINE/DashboardUsers/" + adminID)
            .set({
              email: adminEmail,
              hospitalName: hospitalName,
              hospitalTag: hospitalTag,
              isAdmin: isAdmin,
              isSuperAdmin: isSuperAdmin,
              name: adminName,
              phoneNumber: adminPhnNumber,
            });

          // send password reset message
          firebase
            .auth()
            .sendPasswordResetEmail($("#adminEmail1").val())
            .then(function () {
              console.log("Successfully sent reset link");
            })
            .catch(function (error) {
              console.log(error);
            });
          window.alert(
            "New hospital " +
              hospitalName +
              " and administrator " +
              adminName +
              " were successfully created."
          );
        });
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
