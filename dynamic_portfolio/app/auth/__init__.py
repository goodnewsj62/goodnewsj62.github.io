from hashlib import sha256
import os

from flask import render_template, Blueprint, session, redirect

from .form import LoginForm

auth_ = Blueprint("auth_",__name__,  url_prefix="/auth")

@auth_.route("/login", methods=("GET",  "POST"))
def login():
    form =  LoginForm()
    if form.validate_on_submit():
        sha256_hash =  sha256()
        sha256_hash.update(form.password.data.encode())

        if sha256_hash.hexdigest() ==  os.getenv("MY_PASSWORD") and form.username.data == os.getenv("MY_USERNAME"):
            session["user"] =  True
            return redirect("/admin")
    return render_template("login.html",  form=form)

@auth_.route("/logout", methods=("GET",))
def logout():
    session.pop("user")
    return redirect("/auth/login")