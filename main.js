//function songFunction() {
	//var x = document.getElementsByTagName("AUDIO").innerHTML;
	//document.getElementById("songPlayLoc").innerHTML = x;
//}

/*
			"Accept": "application/json; charset=utf-8",
			"Content-Type": "application/x-www-form-urlencoded",
			*/
var audioElement = document.createElement('audio');
audioElement.setAttribute('src', 'static/Happy.mp3');

function clicked(){

	var poem = $("#mypoem").val();
	console.log(poem);

	$.ajax({
		url:"https://text-sentiment.p.mashape.com/analyze",
		type:"POST",
		headers: {
			"X-Mashape-Key": "Pr3tNC8L1SmshEoa0dB0tGt01sESp13swn9jsnK2g0yqnrQFkY"
		},
		data: {text: poem},
		dataType:"json"
	}).done(function(sentimentVal) {
		console.log("Response:");
		console.log(sentimentVal);

		var negative = sentimentVal.neg;
		var positive = sentimentVal.pos;
		var middle = sentimentVal.mid;

		if (negative > positive) {
			var mml0, mml1;
			var env   = T("adsr", {d:3000, s:0, r:600});
			var synth = T("SynthDef", {mul:0.45, poly:8});

			synth.def = function(opts) {
			  var op1 = T("sin", {freq:opts.freq*6, fb:0.25, mul:0.4});
			  var op2 = T("sin", {freq:opts.freq, phase:op1, mul:opts.velocity/128});
			  return env.clone().append(op2).on("ended", opts.doneAction).bang();
			};

			var master = synth;
			var mod    = T("sin", {freq:2, add:3200, mul:800, kr:1});
			master = T("eq", {params:{lf:[800, 0.5, -2], mf:[6400, 0.5, 4]}}, master);
			master = T("phaser", {freq:mod, Q:2, steps:4}, master);
			master = T("delay", {time:"BPM60 L16", fb:0.65, mix:0.25}, master);

			mml0 = "t60 l4 v6 q2 o3";
			mml0 += "[ [g < b0<d0f+2>> d <a0<c+0f+2>>]8 ";
			mml0 += "f+ <a0<c+0f+2>>> b<<b0<d0f+2>> e<g0b2> e<b0<d0g2>> d<f0a0<d2>>";
			mml0 += ">a<<a0<c0e2>> d<g0b0<e2>> d<d0g0b0<e2>> d<c0e0a0<d2>> d<c0f+0a0<d2>>";
			mml0 += "d<a0<c0f2>> d<a0<c0e2>> d<d0g0b0<e2>> d<c0e0a0<d2>> d<c0f+0a0<d2>>";
			mml0 += "| e<b0<e0g2>> f+<a0<c+0f+2>>> b<<b0<d0f+2>> e<<c+0e0a2>> e<a0<c+0f+0a2>>";
			mml0 += "eb0<a0<d>e0b0<d0g>> a0<g2.> d0a0<d2.> ]";
			mml0 += "e<b0<e0g2>> e<a0<d0f0a2>> e<a0<c0f2>> e<<c0e0a2>> e<a0<c0f0a2>>";
			mml0 += "eb0<a0<d>e0b0<d0g>> a0<g2.> d0a0<d2.>";

			mml1 = "t60 v14 l4 o6";
			mml1 += "[ r2. r2. r2. r2.";
			mml1 += "rf+a gf+c+ >b<c+d >a2. f+2.& f+2.& f+2.& f+2.< rf+a gf+c+ >b<c+d >a2.<";
			mml1 += "c+2. f+2. >e2.&e2.&e2.";
			mml1 += "ab<c ed>b< dc>b< d2.& d2d";
			mml1 += "efg acd ed>b <d2.& d2d";
			mml1 += "| g2. f+2.> bab< c+de c+de>";
			mml1 += "f+2. c0e0a0<c2.> d0f+0a0<d2. ]";
			mml1 += "g2. f2.> b<cf edc edc>";
			mml1 += "f2. c0e0a0<c2.> d0f0a0<d2.";

			T("mml", {mml:[mml0, mml1]}, synth).on("ended", function() {
			  this.stop();
			}).set({buddies:master}).start();

			/*
				if(("#stopMusic").click()) { 
    				return .pause()
    			}
				else {
				}
*/


		/*	var pattern = new sc.Pshuf(sc.series(12), Infinity);
			var scale   = new sc.Scale.major();
			var chords  = [
			  [0, 1, 4], [0, 1, 5], [0, 1, 6],
			  [0, 2, 6], [0, 2, 5], [0, 2, 4],
			  [0, 3, 6], [0, 3, 5], [0, 3, 4]
			];

			var msec = timbre.timevalue("BPM120 L16");
			var osc  = T("saw");
			var env  = T("env", {table:[0.2, [1, msec * 48], [0.2, msec * 16]]});
			var gen  = T("OscGen", {osc:osc, env:env, mul:0.5});

			var pan   = T("pan", gen);
			var synth = pan;

			synth = T("+saw", {freq:(msec * 2)+"ms", add:0.5, mul:0.85}, synth);
			synth = T("lpf" , {cutoff:800, Q:12}, synth);
			synth = T("reverb", {room:0.95, damp:0.1, mix:0.75}, synth);

			T("interval", {interval:msec * 64}, function() {
			  var root = pattern.next();
			  chords.choose().forEach(function(i) {
			    gen.noteOn(scale.wrapAt(root + i) +60, 80); 
			  });
			  pan.pos.value = Math.random() * 2 - 1;
			}).set({buddies:synth}).start();    */
		}
		else {
			audioElement.currentTime=8;
			audioElement.play();
		} 

//Thanks to mohayanao.github.io/timbre.js for their source code! This is REALLY cool!

	});
}

$(document).ready(function() {

	$("#stop").click(function() {
		T("mml", {mml:[mml0, mml1]}, synth).on("ended", function() {
			  this.stop();
			}).set({buddies:master}).pause();
	});

	$("#submit").click(function() {
		clicked();
	});
});