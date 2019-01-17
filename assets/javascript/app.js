
$(document).ready(function() { 

var topics = ["Chihuahua", "German Shepard", "Bulldog", "Doberman", "Husky"];

    // function to display gifs
    function displayStaticGif() {
        // deletes gifs prior to adding new ones
        $("#display-images").empty();

        var input = $(this).attr("data-name");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
            input + "&api_key=wFV6QaGmYZO3FYZNB3KGWcg4mBAd4tJq&limit=10";

        // creates ajax call
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function(response) {
            
            // for loop goes through each gif and adds these variables
            for(var i = 0; i < response.data.length; i++) {
                
                // create a div to hold the results
                var displayDiv = $("<div>");
                displayDiv.addClass("holder");

                var image = $("<img>");
                image.attr("src", response.data[i].images.fixed_height_still.url);
                image.attr("data-still", response.data[i].images.fixed_height_still.url);
                image.attr("data-animate", response.data[i].images.fixed_height.url);
                image.attr("data-state", "still");
                image.addClass("gif");
                displayDiv.append(image);

                var rating = response.data[i].rating;
                displayDiv.append("<p style='color: #3fbf56; font-weight: bold; text-align: center'> Rating: " + rating + "</p>");

                $("#display-images").append(displayDiv);
                console.log(response);
            }
        });
    }

    // function to create buttons for each array(original ones and the ones to be)
    function renderButtons() {
        // deletes original buttons so there no repeats when new button is generated
        $("#display-buttons").empty();
        // loops through the topics array
        for (var j = 0; j < topics.length; j++) {

            var newButton = $("<button>");
            newButton.attr("data-name", topics[j]); // add a data-attribute
            newButton.text(topics[j]); // assigns button text
            $("#display-buttons").append(newButton);
        }

    }

    // function to animate gifs
    function imageChangeState() {

        var state = $(this).attr("data-state");
        var animateImage = $(this).attr("data-animate");
        var stillImage = $(this).attr("data-still");

        if (state == "still") {
            $(this).attr("src", animateImage);
            $(this).attr("data-state", "animate");
        } else if (state == "animate") {
            $(this).attr("src", stillImage);
            $(this).attr("data-state", "still");
        }
    }

    $("#submitButton").on("click", function(event) {
        event.preventDefault();

        // grabs the user input value
        var input = $("#user-input").val().trim();

        // the input now is added to the array
        topics.push(input);

        // function is called, which makes buttons for all my shows plus the user show
        renderButtons();

        // this line is so users can hit "enter" instead of clicking the submit button
        return false; 
    });

    renderButtons();

    // function for displaying gif on button click
    $(document).on("click", "button", displayStaticGif);

    // function to animate gif on click
    $(document).on("click", ".gif", imageChangeState);

 
});