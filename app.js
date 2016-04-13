$(document).ready(function(){
	var source = $("#movie-template").html();
	var movieTemplate = Handlebars.compile(source);

	$("#get-movie-form").on("submit", function(event){
		event.preventDefault();
		//makes the text url friendly
		var title = encodeURIComponent($("#movie-title").val());
		$.ajax({
			url: "http://www.omdbapi.com?s="+title,
			type: "GET",
			success: function(movie) {
				console.log(movie.Search);
				var search_arr = movie.Search;
				 search_arr.forEach(function (element) {
				 	var id = element.imdbID;
				 	$.ajax({
						url: "http://www.omdbapi.com/?i="+id,
						type: "GET",
						success: function(movie) {
							$("#search-input-box").fadeOut( "slow");
				 			$(".movie-card").show("slide", { direction: "left" }, 1000);
				 			$("#movie-card-container").append(movieTemplate(movie));
				 			$("#search-again-box").show('slow');
						},
						error: function() {
							alert("Error!");
						}
					});
				 });
			},
			error: function() {
				alert("Error!");
			}
		});
	});
});