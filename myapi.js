var authKey = "418794e850304ae795f5900c822c4fb0";

// These variables will hold the results we get from the user's inputs via HTML
var queryTerm 	= "";
var numResults 	= 0;
var startYear 	= 0;
var endYear		= 0;

// Based on the queryTerm we will create a queryURL 
var queryURLBase = "https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=" + authKey + "&q=";

// Array to hold the various article info
var articleCounter = 0;

// Functions below

function run(queryURL, numArticles){
//ajax call below to get data
	$.ajax({url: queryURL, method: "GET"}) 
		.done(function(NYTData) {

			// Loop through and provide the correct number of articles
			for (var i=0; i<numArticles; i++) {

					// Add to the Article Counter (to make sure we show the right number)
					articleCounter++;

					// Create the HTML Well (Section) and Add the Article content for each
					var wellSection = $("<div>");
					wellSection.addClass('well');
					wellSection.attr('id', 'articleWell-' + articleCounter)
					$('#wellSection').append(wellSection);

					// Confirm that the specific JSON for the article isn't missing any details
					// If the article has a headline include the headline in the HTML
					if(NYTData.response.docs[i].headline != "null")
					{
						$("#articleWell-"+ articleCounter).append('<h3><span class="label label-primary">' + articleCounter + '</span><strong>   ' + NYTData.response.docs[i].headline.main + "</strong></h3>");
						
						// Log the first article's Headline to console.
						console.log(NYTData.response.docs[i].headline.main);
					}
					
					// If the article has a Byline include the headline in the HTML
					if( NYTData.response.docs[i].byline && NYTData.response.docs[i].byline.hasOwnProperty("original"))
					{
						$("#articleWell-"+ articleCounter).append('<h5>' + NYTData.response.docs[i].byline.original + "</h5>");

						// Log the first article's Author to console.
						console.log(NYTData.response.docs[i].byline.original);
					}

					// Then display the remaining fields in the HTML (Section Name, Date, URL)
					$("#articleWell-"+ articleCounter).append('<h5>Section: ' + NYTData.response.docs[i].section_name + "</h5>");
					$("#articleWell-"+ articleCounter).append('<h5>' + NYTData.response.docs[i].pub_date + "</h5>");
					$("#articleWell-"+ articleCounter).append("<a href='" + NYTData.response.docs[i].web_url + "'>" + NYTData.response.docs[i].web_url + "</a>");

					// Log the remaining fields to console as well
					console.log(NYTData.response.docs[i].pub_date);
					console.log(NYTData.response.docs[i].section_name);
					console.log(NYTData.response.docs[i].web_url);	
			}
		});

}


// on click search button 
$(".btn").on("click", function(){
		articleCounter = 0;

		$("#wellSection").empty();

		// Search Term
		var searchTerm = $('#form_name').val().trim();
		queryURL = queryURLBase + searchTerm;

		// Num Results
		numResults = $("#form_email").val();

		// Start Year
		startYear = $('#form_message').val().trim();

		if (parseInt(startYear)) {
			queryURL = queryURL + "&begin_date=" + startYear + "0101";
		}
		if (parseInt(endYear)) {
			queryURL = queryURL + "&end_date=" + endYear + "0101";
		}
		run(queryURL, numResults );

		// This line allows us to take advantage of the HTML "submit" property. This way we can hit enter on the keyboard and it registers the search (in addition to clicks).
		return false;

})

