//Javascript file

$(document).ready(function(){

    //Array of animals
    var animals = ["Bunny", "Cat", "Dog", "Squirrel", "Horse", "Bat", "Mouse", "Skunk", "Lion","Panda", "Tiger"];


    //Function that will display the gifs from a choosen animal
    function displayAnimal(){
        var animal = $(this).attr("data-name");
        var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=HXZA60whyzP8qrKhoNQwkFYprPTgHFhR&q=" + animal + "&limit=10&offset=0";

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function(response){
            $("animals-view").prepend("<p>" + response.rating + "</p>");
            $("animals-view").prepend("<img src=" + response.fixed_height_still + ">")
        })
    }




});