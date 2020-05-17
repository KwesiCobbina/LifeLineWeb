// var firebaseConfig4 = {
//   apiKey: "AIzaSyA1WlfpPBv4gBZMWYNYfTxKb-2Qgt6fvzM",
//   authDomain: "lifeline-f29d3.firebaseapp.com",
//   databaseURL: "https://lifeline-f29d3.firebaseio.com",
//   projectId: "lifeline-f29d3",
//   storageBucket: "lifeline-f29d3.appspot.com",
//   messagingSenderId: "500356708530",
//   appId: "1:500356708530:web:fad654e6035644309b31ab",
//   measurementId: "G-YBMF7RDHEG"
// };
// Initialize Firebase

$(function () {
  //   $("#search-blood").click(function () {
  //     var bloodGroup = $("#blood-group :selected").text();
  //     $("#title-blood").text(" " + bloodGroup);
  //     return firebase
  //       .database()
  //       .ref("/LIFELINE/Hospitals//bloodBank/" + bloodGroup)
  //       .once("value")
  //       .then(function (snapshot) {
  //         if (snapshot.exists()) {
  //           var needed = snapshot.child("needQuantity").val();
  //           var avail = snapshot.child("haveQuantity").val();
  //           var used = snapshot.child("used").val();
  //           $("#need").text(needed);
  //           $("#avail").text(avail);
  //           $("#used").text(used);
  //         }
  //       });
  //   });

  //-------------
  //- DONUT CHART -
  //-------------
  // Get context with jQuery - using jQuery's .get() method.
  var donutChartCanvas = $("#donutChart").get(0).getContext("2d");
  var donutData = {
    labels: ["O", "A", "B", "AB"],
    datasets: [
      {
        data: [700, 500, 400, 600],
        backgroundColor: ["#f56954", "#00a65a", "#f39c12", "#00c0ef"],
      },
    ],
  };
  var donutOptions = {
    maintainAspectRatio: false,
    responsive: true,
  };
  //Create pie or douhnut chart
  // You can switch between pie and douhnut using the method below.
  var donutChart = new Chart(donutChartCanvas, {
    type: "doughnut",
    data: donutData,
    options: donutOptions,
  });
});
