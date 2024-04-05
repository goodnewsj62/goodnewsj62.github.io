from flask import session, redirect, url_for, request
from flask_admin.contrib.pymongo import ModelView
from .forms import BlogForm, BlogForm,ProjectForm, StackForm,TextForm



class CustomModelView(ModelView):
    def is_accessible(self):
        return session.get("user") is not None

    def inaccessible_callback(self, name, **kwargs):
        # redirect to login page if user doesn't have access
        return redirect(url_for('auth_.login', next=request.url))

class TextView(CustomModelView):
    column_list = ('title', 'content')
    form = TextForm



class ProjectView(CustomModelView):
    column_list = ('title', "url","category", "stack")
    form = ProjectForm


class BlogsView(CustomModelView):
    column_list = ('platform', "content","url", "image")
    form = BlogForm



class StackView(CustomModelView):
    column_list = ('name', "category","image")
    form = StackForm


