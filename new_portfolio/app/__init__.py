import os
from flask import Flask
from dotenv import load_dotenv,  find_dotenv
from pymongo import MongoClient
from flask_admin import Admin

load_dotenv(find_dotenv())


client = MongoClient('localhost', 27017,  username= os.getenv("MONGO_USER"),  password=os.getenv("MONGO_PASSWORD"))

db = client.osonwa

projects =db.projects # {title:"", url:"", type:"personal",  content: "",  stack: []}
blogs =  db.blogs # {platform:"",  content:"", url:"", image:""}
stacks=  db.stacks # {name: "python", image:"",  type:"backend"}
texts = db.texts  # will store text like about,  services, header  {title: "about",  content:"text"} 


admin_=  Admin( name='microblog', template_mode='bootstrap4')


def create_app(config=None):
    app =  Flask(__name__, instance_relative_config=True)

    app.config.from_mapping(
        SECRET_KEY= os.getenv("SECRET_KEY"),
        FLASK_ADMIN_SWATCH= "cerulean"
        # DATABASE=os.path.join(app.instance_path, 'flaskr.sqlite'),
    )

    from .admin.home import MyAdminIndexView
    admin_.init_app(app, index_view=MyAdminIndexView())


    from .view import basic
    from .admin import TextView,ProjectView, BlogsView, StackView
    from .auth import auth_

    admin_.add_views(TextView(db["texts"]))
    admin_.add_views(ProjectView(db["projects"]))
    admin_.add_views(BlogsView(db["blogs"]))
    admin_.add_views(StackView(db["stacks"]))

    app.register_blueprint(basic)
    app.register_blueprint(auth_)


    return app

