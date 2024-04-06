from flask import render_template, Blueprint
from app import texts, projects, blogs, stacks

basic = Blueprint("basic",__name__)


@basic.route("/", methods=("GET", ))
@basic.route("/home", methods=("GET", ))
def home():
    ctx = {
        "about": texts.find_one({"title": "about"}),
        "frontend": texts.find_one({"title": "frontend"}),
        "backend": texts.find_one({"title":"backend"}),
        "header": texts.find_one({"title": "header"}),
        "projects": [{**project, "stack":  project.get("stack","").split(",")} for project in projects.find()],
        "stack":  [{**each} for each in stacks.find()]
    }
    return render_template("home.html",  ctx=ctx  )


@basic.route("/projects", methods=("GET", ))
def projects_view():
    return render_template("projects.html",  project=projects.find() )


@basic.route("/blogs", methods=("GET", ))
def blogs_view():
    return render_template("blogs.html",  blogs=blogs.find())
