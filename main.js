//function songFunction() {
	//var x = document.getElementsByTagName("AUDIO").innerHTML;
	//document.getElementById("songPlayLoc").innerHTML = x;
//}

function clicked(){

	var poem = $("#submit").val();

	$.ajax({
		url:"https://text-sentiment.p.mashape.com/analyze",
		type:"POST",
		headers: {
			"Accept": "application/json; charset=utf-8",
			"Content-Type": "application/x-www-form-urlencoded",
			"X-Mashape-Key": "a6VxOx7M3Amshij6uyj84fTrVHmjp1TSOldjsnWL91sN5PtGUV"
		},
		data: {text: poem},
		dataType:"json"
	}).done(function(data) {
		console.log(data);
	});
}

$(document).ready(function() {
	$("#submit").onClick(clicked());
});