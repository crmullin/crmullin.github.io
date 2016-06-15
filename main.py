import jinja2, webapp2, os

Env = jinja2.Environment(loader = jinja2.FileSystemLoader(os.path.dirname(__file__)))

class MainPage(webapp2.RequestHandler):
    def get(self):
        template = Env.get_template(main.html)
        self.response.out.write(template.render())

application = webapp2.WSGIApplication([("/", MainPage)], debug = True)
