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
                var image = $("<img>");
                image.attr("src", results[i].images.fixed_height.url);
                console.log(results[i].images.fixed_height.url);
                
                //append the rating and the gid to the new div
                animalDiv.append(pRating);
                animalDiv.append(image);
                
                //and add the new div to the global one that contains all the gifs
                $("#animals-view").prepend(animalDiv);
            }
           
            
        });
    };


    function renderButtons(){
        $("#buttons-view").empty();

        for(var i = 0; i < animals.length; i++){
            var a = $("<button>");
            a.addClass("animalBtn");
            a.attr("data-name", animals[i]);
            a.text(animals[i]);
            $("#buttons-view").append(a);
        };
    }


    $("#add-animal").on("click", function(event){
        event.preventDefault();
        var userInput = $("#animal-input").val().trim();
        animals.push(userInput);
        renderButtons();
        $("#animal-input").val("");
    });


    $(document).on("click", ".animalBtn", displayAnimal);

    renderButtons();

});