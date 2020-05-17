$(function () {
  $("#btn-login ").click(function () {
    var email = $("#email").val();
    var password = $("#password").val();

    if (email != "" && password != "") {
      var result = firebase.auth().signInWithEmailAndPassword(email, password);

      result;
      result.catch(function (err) {
        var errorCode = err.code;
        var errorMessage = err.message;
        window.alert("Message from provider:" + errorMessage);
      });
    } else {
      window.alert("Please fill out all fields.");
    }
  });

  firebase.auth().onAuthStateChanged(function (user) {
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
          .then(function (snapshot) {
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
              }
            } else {
              firebase
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
