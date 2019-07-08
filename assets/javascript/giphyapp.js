// Generate buttons
let topics = ["Dwight Schrute", "Jim Halpert", "Pam Beesly", "Kelly Kapoor", "Michael Scott"];

// let $createBtn = $('<button class="btn castbtn"/>').appendTo('#buttonbox');

let createBtn = function() {
    let btn = $('<button class="btn castbtn btn-lg"/>').appendTo('#btnbox');
    return btn;
};

function createBtns() {

    for (let i = 0; i < topics.length; i++) {
        createBtn().text(topics[i]);
    }


    $(".castbtn").on("click", function() {
        $(".showme").remove();
        var cast = $(this).text();
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + cast + "&api_key=PFnZ8BpKMtDwfFAok7htvGM3Engjb9HB&limit=10";
        console.log(cast);
        $.ajax({
                url: queryURL,
                method: "GET"
            })
            .then(function(response) {
                var results = response.data;

                for (var i = 0; i < results.length; i++) {
                    var gifDiv = $("<div>").addClass("gifdiv").addClass("grid-item");

                    var rating = results[i].rating;

                    var p = $("<p>").addClass("gifp").text("Rating: " + rating);

                    var castImage = $("<img>");
                    // castImage.attr("src", results[i].images.fixed_height.url);

                    castImage.attr({
                        src: results[i].images.fixed_height_still.url,
                        "data-still": results[i].images.fixed_height_still.url,
                        "data-animate": results[i].images.fixed_height.url,
                        "data-state": "still",
                        class: "gif"
                    });



                    gifDiv.prepend(p);
                    gifDiv.prepend(castImage);

                    $("#results").prepend(gifDiv);
                }
            });
    });

}
createBtns();


console.log($(".castbtn"));



// make gifs still or animate
$('#results').on("click", '.gif', function() {
    // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
    var state = $(this).attr("data-state");
    // If the clicked image's state is still, update its src attribute to what its data-animate value is.
    // Then, set the image's data-state to animate
    // Else set src to the data-still value
    if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
    } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
    }
    console.log($(this).attr("data-state"));
});



// create a new button for user search result and re-load all the buttons.
$(".navbar-form").submit(function(e) {
    e.preventDefault(); //stop form from submitting
    console.log($("#usersearch").val());
    let userKeyword = $("#usersearch").val();
    topics.push(userKeyword);
    $('#btnbox').empty();
    createBtns();
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


$('.grid').masonry({
    itemSelector: '.grid-item',
    columnWidth: '.grid-item',
    horizontalOrder: true,
    percentPosition: true
});