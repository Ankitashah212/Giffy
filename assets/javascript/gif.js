
var howIFeel = ["Angry", "Hungry", "Happy", "Sad", "Sleepy", "Frustrated","mad","stupid","overwhelmed","eye roll", "are you kidding me?", "OMG","seriously?", "not again","stitch", "inside out" ];

//make buttons
function makeMyButtons() {
    $("#feeling-view").empty();
    for (let i = 0; i < howIFeel.length; i++) {

        var b = $("<button>");
        b.addClass("feel");
        b.attr("data-feel", howIFeel[i]);
        b.text(howIFeel[i]);
        $("#feeling-view").append(b)
    }
}

function displayGiffs() {
    var myKey = "f3054b45a58048edb4967e838f0b17ac";
    var limit = 10;
    var rating = 'g';
    var feeling = $(this).attr("data-feel");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        feeling + "&api_key=" + myKey + "&limit=" + limit + "&rating=" + rating;

    $.ajax({
        url: queryURL,
        method: "GET"
    }).done(function (gifs) {
        console.log(gifs);
        var gifArray = gifs.data;

        for (let i = 0; i < gifArray.length; i++) {

            let gifDiv = $("<div class='giffys'>");
            let rating = gifArray[i].rating;
            let p = $("<p>").text("Rating: " + rating);
            let gifImage = $("<img>");
            //add extra attributes to stop and play gifs
            gifImage.attr("src", gifArray[i].images.fixed_height_still.url);
            gifImage.attr("data-state", "still");
            gifImage.attr("data-still", gifArray[i].images.fixed_height_still.url);
            gifImage.attr("data-animate", gifArray[i].images.fixed_height.url);
            gifImage.addClass("gif");

            gifDiv.prepend(p);
            gifDiv.prepend(gifImage);

            $("#feeling-gifs").prepend(gifDiv);
        }
    });
}

function toggleGiffs() {

    var state = $(this).attr("data-state");
    var stillImage = $(this).attr("data-still");
    var animateImage = $(this).attr("data-animate");
    console.log("in the function");
    if (state == "still") {
        $(this).attr("data-state", "animate");
        $(this).attr("src", animateImage);
    } else {
        $(this).attr("data-state", "still");
        $(this).attr("src", stillImage);
    }

}
//make buttons from predefined array
makeMyButtons();

$("#add-feeling").on("click", () => {
    var input = $("#feeling-input").val().trim();
    $("#feeling-input").val(''); // setting to blank
    if (input.length > 0) {
        howIFeel.push(input);
        makeMyButtons();
    }
});

$(document).on("click", ".feel", displayGiffs);
$(document).on("click", ".gif", toggleGiffs);
