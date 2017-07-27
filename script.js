
$(document).ready(function(){

var config = {
  apiKey: "AIzaSyD3LudFHFoL4xsjEvDXewHl-5g3nIfbM1w",
  authDomain: "cho-cho-train.firebaseapp.com",
  databaseURL: "https://cho-cho-train.firebaseio.com",
  projectId: "cho-cho-train",
  storageBucket: "cho-cho-train.appspot.com",
  messagingSenderId: "141246703174"
};
firebase.initializeApp(config);

var trainData = firebase.database();

$("addTrain").on("click", function(){
  var trainName = $("#trName").val().trim();
  var destination = $("#trDest").val().trim();
  var firstTrain = moment($("#trTime").val().trim(), "HH:mm").subtract(10,"years").format("x");
  var frequency = $("#trFrequency").val().trim();

console.log(firstTrain);

 var newTrain = {
    name : trainName,
    destination: destination,
    firstTrain: firstTrain,
    frequency : frequency
  }

trainData.ref().push(newTrain);
  alert("train added");

$("#trName").val("");
$("#trDest").val("");
$("#trTime").val("");
$("#trFrequency").val("");

return false;

});

trainData.ref().on("child_added", function(snapshot){
  var name = snapshot.val().name;
  var destination = snapshot.val().destination;
  var frequency = snapshot.val().frequency;
  var firstTrain = snapshot.val().firstTrain;

  var remainder = moment().dif(moment.unix(firstTrain), "minutes")%frequency;
  var minutes = frequency-remainder;
  var arrival = moment().add(minutes, "m").format("hh:mm A");


$("#train-table tbody").append("<tr><td>"+destination+"</td><td>"+frequency + "</td><td>"+arrival+"</td><td>"+minutes+"</td></tr>");

})
});
