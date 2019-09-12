function NYAPICall(title, startYear, endYear) {
    var apiKey = "Nr7qAhwHql1V7ZBKlGjZuqHiZsSdypus";
    
    if (startYear === undefined || startYear === "") {
        startYear = "";
    } else {
        startYear = "&begin_date=" + startYear + "0101";
    }
    if (endYear === undefined || endYear === "") {
        endYear = "";
    } else {
        endYear = "&end_date=" + endYear + "0101";
    }

    
    var query = "https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=" + apiKey + "&q=" + title + startYear + endYear;

    console.log(query);
    $.ajax({
        url: query,
        method: "GET"
    }).then(function (response) {
        var results = response.response.docs;
        var endNumber = $("#exampleFormControlSelect1").val();
        

        for (var i = 0; i < endNumber; i++) {
            var title = results[i].headline.main;
            var snip = results[i].snippet;
            var details = results[i].lead_paragraph;
            console.log(query)

            $("#data-display").append(
                "<div class='card-header bg-light text-dark'><span> " +
                (i + 1) +
                ". </span><span>" + title + "<br>" +
                snip  +  details  +
                "</span><p></div>"
            );

            var multimedia = results[i].multimedia;
            if (multimedia.length > 0) {
                console.log(multimedia[0].url);
            }
        }
    });
}

$("#search").on("click", function (event) {
    event.preventDefault();
    var search = $("#exampleFormControlInput1").val();
    var startyear = $("#startyearinput").val();
    var endyear = $("#endyearinput").val();
    
    NYAPICall(search, startyear, endyear);
});