$("#logout").click(function() {
  firebase
    .auth()
    .signOut()
    .then(
      function() {
        console.log("Signed Out");
        window.location.href = "signin.html";
      },
      function(error) {
        console.error("Sign Out Error", error);
      }
    );
});
