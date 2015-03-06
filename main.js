//function songFunction() {
	//var x = document.getElementsByTagName("AUDIO").innerHTML;
	//document.getElementById("songPlayLoc").innerHTML = x;
//}

function clicked(){

	var poem = $("#mypoem").val();

	$.ajax({
		url:"https://text-sentiment.p.mashape.com/analyze",
		type:"POST",
		headers: {
			"Accept": "application/json; charset=utf-8",
			"Content-Type": "application/x-www-form-urlencoded",
			"X-Mashape-Key": "a6VxOx7M3Amshij6uyj84fTrVHmjp1TSOldjsnWL91sN5PtGUV"
		},
		sentimentVal: {text: poem},
		dataType:"json"
	}).done(function(sentimentVal) {
		console.log("Response:");
		console.log(sentimentVal);

		var negative = sentimentVal.neg;
		var positive = sentimentVal.pos;
		var middle = sentimentVal.mid;



	});
}

$(document).ready(function() {

	T("sin").play();

	$("#submit").click(function() {
		clicked();
	});
});