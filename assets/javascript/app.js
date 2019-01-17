
$(document).ready(function() { 

var topics = ["Chihuahua", "German Shepard", "Bulldog", "Doberman", "Husky"];

    function displayStaticGif() {

        $("#display-images").empty();
        var input = $(this).attr("data-name");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
            input + "&api_key=wFV6QaGmYZO3FYZNB3KGWcg4mBAd4tJq&limit=10";

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function(response) {

            for(var i = 0; i < response.data.length; i++) {
                
                var displayDiv = $("<div>");
                displayDiv.addClass("holder");

                var image = $("<img>");
                image.attr("src", response.data[i].images.fixed_height_still.url);
                image.attr("data-still", response.data[i].images.fixed_height_still.url);
                image.attr("data-animate", response.data[i].images.fixed_height.url);
                image.attr("data-state", "still");
                image.attr("class", "gif");
                displayDiv.append(image);

                var rating = response.data[i].rating;
                displayDiv.append(rating);

                $("#display-images").append(displayDiv);
                console.log(response);
            }
        });
    }

    function renderButtons() {

        $("#display-buttons").empty();

        for (var j = 0; j < topics.length; j++) {

            var newButton = $("<button>");
            newButton.attr("data-name", topics[j]);
            newButton.text(topics[j]);
            $("#display-buttons").append(newButton);
        }

    }

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

        var input = $("#user-input").val().trim();
        form.reset();
        topics.push(input);

        renderButtons();

    });

    renderButtons();

    $(document).on("click", "button", displayStaticGif);
    $(document).on("click", ".gif", imageChangeState);

 
});