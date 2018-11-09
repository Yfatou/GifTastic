//Javascript file

$(document).ready(function(){

    //Array of animals
    var animals = ["Bunny", "Cat", "Dog", "Squirrel", "Horse", "Bat", "Mouse", "Skunk", "Lion","Panda", "Tiger"];


    //Function that will display the gifs from a choosen animal
    function displayAnimal(){

        var animal = $(this).attr("data-name");
        var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=HXZA60whyzP8qrKhoNQwkFYprPTgHFhR&q=" + animal + "&limit=10";
        
        console.log(queryURL);
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function(response){
            var results = response.data;//The result of the Get queryURL is put in an array

            for(var i = 0; i < results.length; i++){

                var animalDiv = $("<div class='animal'>");//new div to display the rating and the gif
                //Store the rating from the result into a variable
                var pRating = $("<p>").text("Rating: " + results[i].rating);
                //new image for the gif
                var image = $("<img class='gif'>");
                //image attributes 
                image.attr("src", results[i].images.original_still.url);
                image.attr("data-still", results[i].images.original_still.url);
                image.attr("data-animate", results[i].images.original.url);
                image.attr("data-state", "still");
                
                //append the rating and the gid to the new div
                animalDiv.append(pRating);
                animalDiv.append(image);
                
                //and add the new div to the global one that contains all the gifs
                $("#animals-view").prepend(animalDiv);
            }

            //when the user click on a gif
            $(".gif").on("click", function() {
                console.log("on click gif");
                var state = $(this).attr("data-state");
        
                //if the gif is still,it become animated
                if (state === "still") {
                    $(this).attr("src", $(this).attr("data-animate"));
                    $(this).attr("data-state", "animate");
                  } else {//if it's animated, it become still
                    $(this).attr("src", $(this).attr("data-still"));
                    $(this).attr("data-state", "still");
                  }
                });

           
        });
    };

    // $(".gif").on("click", function() {
    //     console.log("on click gif");
    //     var state = $(this).attr("data-state");

    //     if (state === "still") {
    //         $(this).attr("src", $(this).attr("data-animate"));
    //         $(this).attr("data-state", "animate");
    //       } else {
    //         $(this).attr("src", $(this).attr("data-still"));
    //         $(this).attr("data-state", "still");
    //       }
    //     });
    


    //function to display the buttons
    function renderButtons(){
        //clear the button view before adding
        $("#buttons-view").empty();

        //go through the initial animals array and display buttons for each element in the array
        for(var i = 0; i < animals.length; i++){
            var a = $("<button>");
            //var a = $("<button type='button' class='btn btn-info>");
            a.addClass("animalBtn");
            a.attr("data-name", animals[i]);
            a.text(animals[i]);
            //append the buttons to the div 
            $("#buttons-view").append(a);
        };
    }

    //function to add a new animal from the inputBox
    $("#add-animal").on("click", function(event){
        event.preventDefault();//to prevent the page to refresh
        var userInput = $("#animal-input").val().trim();//the new value entered by the user
        animals.push(userInput);//the value is added to the array animals
        renderButtons();//we call the function to display the buttons
        $("#animal-input").val("");//clear the input box
    });

    //function on click when the user click on an animal button
    $(document).on("click", ".animalBtn", displayAnimal);

    renderButtons();

});