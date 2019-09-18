




$(document).ready(function(){
    let things = ["cat", "dog", "horse", "fire", "clouds"];
    
    function populateButtons(arrayToUse, classToAdd, areaToAddTo){
        $(areaToAddTo).empty();

        for (let i = 0; i < arrayToUse.length; i++){
            let a = $("<button>");
            a.addClass(classToAdd);
            a.attr("data-type", arrayToUse[i]);
            a.text(arrayToUse[i]);
            $(areaToAddTo).append(a);

     }
    }
    $(document).on("click", ".giphy-button", function(){
        $("#images").empty();

        $(".giphy-button").removeClass("active");
        $(this).addClass("active");

        let type = $(this).attr("data-type");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
            type + "&api_key=BkaUZZWcFij6J7AoQj3WtPb1R2p9O6V9&limit=10";

        $.ajax({
            url: queryURL,
            method: "GET"
          })
            // After the data comes back from the API
            .then(function(response) {
                let results = response.data;

                for(var i = 0; i < results.length; i++){
                    let giphyDiv = $("<div class=\"giphy-item\">");


                    let animated = results[i].images.fixed_height.url;
                    let still = results[i].images.fixed_height_still.url;

                    let giphyImage = $("<img>");
                    giphyImage.attr("src", still);
                    giphyImage.attr("data-still", still);
                    giphyImage.attr("data-animate", animated);
                    giphyImage.attr("data-state", "still");
                    giphyImage.addClass("giphy-image");

                    giphyDiv.append(giphyImage);
                    
                    $("#images").append(giphyDiv);
                }
            });
    });

    $(document).on("click", ".giphy-image", function(){
        let state = $(this).attr("data-state");

        if(state === "still"){
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");
        }else{
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
        }
    });
    $("#add-giphy").on("click", function(event){
        event.preventDefault();
        let newGiphy = $("input").eq(0).val();

        if(newGiphy.length > 2) {
            things.push(newGiphy);
        }
        populateButtons(things, "giphy-button", "#giphy-buttons");
    });

    populateButtons(things, "giphy-button", "#giphy-buttons");



})