import os
from flask import Flask
from dotenv import load_dotenv,  find_dotenv
from pymongo import MongoClient
from flask_admin import Admin

load_dotenv(find_dotenv())


client = MongoClient('localhost', 27017,  username= os.getenv("MONGO_USER"),  password=os.getenv("MONGO_PASSWORD"))

db = client.osonwa
header = db.header # {title:"",  content:""}
projects =db.projects # {title:"", url:"", type:"personal",  content: "",  stack: []}
blogs =  db.blogs # {platform:"",  content:"", url:""}
stacks=  db.stacks # {name: "python", url:"",  type:"backend"}
texts = db.texts  # will store text like about,  services  {title: "about",  content:"text"} 


admin_=  Admin( name='microblog', template_mode='bootstrap4')


def create_app(config=None):
    app =  Flask(__name__)

    app.config.from_mapping(
        SECRET_KEY= os.getenv("SECRET_KEY"),
        FLASK_ADMIN_SWATCH= "cerulean"
        # DATABASE=os.path.join(app.instance_path, 'flaskr.sqlite'),
    )

    admin_.init_app(app)


    from .view import basic
    from .admin import UserView

    admin_.add_views(UserView(db["texts"]))

    app.register_blueprint(basic)


    return app

