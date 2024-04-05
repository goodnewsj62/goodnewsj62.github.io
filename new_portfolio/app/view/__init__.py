from flask import render_template, Blueprint
from app import texts

basic = Blueprint("basic",__name__)


@basic.route("/", methods=("GET", ))
def home():
    print( [ text for text in texts.find()])
    return "hi"
