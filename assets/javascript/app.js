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
    var firstTrainInput = ($("#firstTrainInput").val().trim());
    var frequencyInput = $("#frequencyInput").val().trim();

    // Creates local "temporary" object for holding train data
    var newTrain = {
        name: trainName,
        destination: destinationInput,
        time: firstTrainInput,
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
    $("#firstTrainInput").val("");
    $("#frequencyInput").val("");
});

// 3. Create Firebase event for adding train to the database and a row in the html when a user adds an entry
database.ref().on("child_added", function(childSnapshot) {
    console.log(childSnapshot.val());

    // Store everything into a variable.
    var trainName = childSnapshot.val().name;
    var destinationInput = childSnapshot.val().destination;
    var firstTrainInput = childSnapshot.val().time;
    var frequencyInput = childSnapshot.val().frequency;

    // Train Info
    console.log(trainName);
    console.log(destinationInput);
    console.log(firstTrainInput);
    console.log(frequencyInput);

    ///////////////////////////////////////////////////////////////


    console.log(firstTrainInput);
    // First Time (pushed back 1 year to make sure it comes before current time)
    var firstTimeConverted = moment(firstTrainInput, "HH:mm").subtract(1, "years");;
    console.log(firstTimeConverted);

    // Current Time
    var currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

    // Difference between the times
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);

    // Time apart (remainder)
    var tRemainder = diffTime % frequencyInput;
    console.log(tRemainder);

    // Minute Until Train
    var minAway = frequencyInput - tRemainder;
    console.log("MINUTES AWAY: " + minAway);

    // Next Train
    var nextArrival = moment().add(minAway, "minutes");
    console.log("ARRIVAL TIME: " + moment(nextArrival).format("hh:mm"));

    ///////////////////////////////////////////////////////////////

    // Create the new row
    var newRow = $("<tr>").append(
        $("<td>").text(trainName),
        $("<td>").text(destinationInput),
        $("<td>").text(frequencyInput),
        $("<td>").text(moment(nextArrival).format("hh:mm")),
        $("<td>").text(minAway),
    );

    // Append the new row to the table
    $("#traintable > tbody").append(newRow);
});


// scroll btn

// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function() {
    scrollFunction()
};

function scrollFunction() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        document.getElementById("topBtn").style.display = "block";
    } else {
        document.getElementById("topBtn").style.display = "none";
    }
}

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}