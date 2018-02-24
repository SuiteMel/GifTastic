
var topics = ["we bare bears", "teen wolf", "the librarians", "izombie"];

function renderResults() {
  $("#results").empty();

  var query = $(this).attr("data-name");

  var queryURL = "https://api.giphy.com/v1/gifs/search";
  queryURL += '?' + $.param({
    'api_key': "QsmfqJXFs0oapPFal7xD2hcOkfJAnSRV",
    'q': query,
    'limit': 10,
    'rating': "g"
  });


  $.ajax({
    url: queryURL,
    method: 'GET'
  }).then(function (response) {
    var results = response.data;

    $.each(results, function (i, j) {
      var img = $("<img>").attr({
        "src": results[i].images.fixed_height_still.url,
        "data-still": results[i].images.fixed_height_still.url,
        "data-animate": results[i].images.fixed_height.url,
        "data-state": "still",
        "class": "gif"
      });

      var rating = $("<p>").text("Rating: " + results[i].rating);

      var div = $("<div>").attr("class", "gifGroup");
      div.addClass("float-left");

      div.append(rating, img);
      $("#results").append(div);

    });

    $(".gif").on("click", function () {
      var state = $(this).attr("data-state");

      if (state === "still") {
        $(this).attr({
          "src": $(this).attr("data-animate"),
          "data-state": "animate"
        });
      } else if (state === "animate") {
        $(this).attr({
          "src": $(this).attr("data-still"),
          "data-state": "still"
        });
      }
    });
  });
}

function renderButtons() {
  $("#buttons-view").empty();
  $.each(topics, function (i, j) {
    var a = $("<button>");
    a.addClass("topic btn btn-primary");
    a.attr({
      "data-name": topics[i]
    });
    a.text(topics[i]);
    $("#buttons-view").append(a);
  });
}

$("#add-topic").on("click", function (event) {
  event.preventDefault();
  var topic = $("#topic-input").val().trim();
  topics.push(topic);
  renderButtons();
});

$(document).on("click", ".topic", renderResults);

renderButtons();