//Javascript file

$(document).ready(function(){

    //Array of animals
    var animals = ["Bunny", "Cat", "Dog", "Squirrel", "Horse", "Bat", "Mouse", "Skunk", "Lion","Panda", "Tiger"];


    //Function that will display the gifs from a choosen animal
    function displayAnimal(){
        var animal = $(this).attr("data-name");
        var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=HXZA60whyzP8qrKhoNQwkFYprPTgHFhR&q=" + animal + "&limit=10&offset=0";

        console.log(queryURL);
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function(response){
            var results = response.data;

            for(var i = 0; i < results.length; i++){

                var animalDiv = $("<div class='animal'>");
                var rating = results[i].rating;
                console.log(rating);
                var pRating = $("<p>").text("Rating: " + rating);
                
                var image = $("<img>");
                image.attr("src", results[i].images.fixed_height.url);
                console.log(results[i].images.fixed_height.url);
                animalDiv.append(pRating);
                animalDiv.append(image);
                
                

                $("animals-view").prepend(animalDiv).show();
            }
           
            
        });
    };

    function renderButtons(){
        $("#buttons-view").empty();
        $.each(animals, function(index){
            var a = $("<button>");
            a.addClass("animal");
            a.attr("data-name", animals[index]);
            a.text(animals[index]);
            $("#buttons-view").append(a);
            index++;
        });
    }


    $("#add-animal").on("click", function(event){
        event.preventDefault();
        var userInput = $("#animal-input").val().trim();
        animals.push(userInput);
        renderButtons();
        $("#animal-input").val("");
    });


    $(document).on("click", ".animal", displayAnimal);

    renderButtons();

});