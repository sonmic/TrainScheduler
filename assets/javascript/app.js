// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyCPd9mQd9gUw_3P-wJQDteENtEccwjj1pA",
    authDomain: "train-scheduler-74c3a.firebaseapp.com",
    databaseURL: "https://train-scheduler-74c3a.firebaseio.com",
    projectId: "train-scheduler-74c3a",
    storageBucket: "",
    messagingSenderId: "955634657286",
    appId: "1:955634657286:web:0ac6c9d1503bac05"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

var database = firebase.database();

// Button for adding Trains
$("#submitbtn").on("click", function(event) {
    event.preventDefault();
    console.log(true);
    // Grabs user input
    var trainName = $("#nameInput").val().trim();
    var destinationInput = $("#destinationInput").val().trim();
    var timeInput = ($("#timeInput").val().trim());
    var frequencyInput = $("#frequencyInput").val().trim();

    // Creates local "temporary" object for holding train data
    var newTrain = {
        name: trainName,
        destination: destinationInput,
        time: timeInput,
        frequency: frequencyInput
    };

    // Uploads employee data to the database
    database.ref().push(newTrain);

    // Logs everything to console
    console.log(newTrain.name);
    console.log(newTrain.destination);
    console.log(newTrain.time);
    console.log(newTrain.frequency);

    alert("Train successfully added");

    // Clears all of the text-boxes
    $("#nameInput").val("");
    $("#destinationInput").val("");
    $("#timeInput").val("");
    $("#frequencyInput").val("");
});

// 3. Create Firebase event for adding train to the database and a row in the html when a user adds an entry
database.ref().on("child_added", function(childSnapshot) {
    console.log(childSnapshot.val());

    // Store everything into a variable.
    var trainName = childSnapshot.val().name;
    var destinationInput = childSnapshot.val().destination;
    var timeInput = childSnapshot.val().time;
    var frequencyInput = childSnapshot.val().frequency;

    // Train Info
    console.log(trainName);
    console.log(destinationInput);
    console.log(timeInput);
    console.log(frequencyInput);

    // Prettify the train time
    // var trainTimePretty = moment.unix(empStart).format("MM/DD/YYYY");

    // Calculate the next arrival using hardcore math
    // To calculate next arrival
    // var nextArrival = moment().diff(moment(empStart, "X"), "months");
    // console.log(nextArrival);
    var d = new Date();
    var curr_hour = d.getHours();
    var curr_min = d.getMinutes();
    var timeNow = curr_hour + ":" + curr_min;
    console.log(timeNow);

    // Calculate minutes away
    // var minAway;
    // console.log();

    // Create the new row
    var newRow = $("<tr>").append(
        $("<td>").text(trainName),
        $("<td>").text(destinationInput),
        $("<td>").text(frequencyInput),
        $("<td>").text("nextArrival"),
        $("<td>").text("minAway"),
    );

    // Append the new row to the table
    $("#traintable > tbody").append(newRow);
});