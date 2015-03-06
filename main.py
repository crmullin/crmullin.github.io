import unirest

from flask import Flask, render_template
app = Flask(__name__)

@app.route('/')
def index():
	return render_template('index.html')

@app.route('/text-sentiment/')
def text_sentiment():
	response = unirest.post("https://text-sentiment.p.mashape.com/analyze",
	  headers={
	    "X-Mashape-Key": "Pr3tNC8L1SmshEoa0dB0tGt01sESp13swn9jsnK2g0yqnrQFkY",
	    "Content-Type": "application/x-www-form-urlencoded",
	    "Accept": "application/json"
	  },
	  params={
	    "text": "I am not really happy"
	  }
	"pos_percent" = pos_percent
	if pos_percent >= 50:
		print ("good")
	)
if __name__ == '__main__':
	app.run()