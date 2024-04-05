from wtforms import Form
from wtforms.fields import StringField ,TextAreaField,URLField,SelectField


class TextForm(Form):
    title = StringField('title')
    content = TextAreaField('content')

class ProjectForm(Form):
    title = StringField('title')
    url =  StringField("url")
    content  = TextAreaField("content")
    category =  SelectField("category", choices=[("client","client") , ("personal", "personal")])
    stack = StringField("stack")

class BlogForm(Form):
    # {platform:"",  content:"", url:"", image:""}
    platform = StringField('platform')
    content =  TextAreaField("content")
    url =  URLField("url")
    image = StringField("image")


    
class StackForm(Form):
    # {name: "python", image:"",  type:"backend"}
    name = StringField('name')
    category =  SelectField("category", choices=[("frontend","frontend") , ("backend", "backend")])
    image = StringField("image")