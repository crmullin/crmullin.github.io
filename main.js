$(document.ready( function() {
	function add(blah1, blah2){
		return blah1 + blah2
	}

	var bool = true

	$("#square1").on('click', function() {
		if (bool) {
			$("#square1").css("background-color", "grey")
			bool = false
		} else {
			$("#square1").css("background-color", "blue")
			bool = true;
		}	


		$.get("endpoint", datatosend, function(response){

		})
	})
} )