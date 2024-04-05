from wtforms import Form
from wtforms.fields import StringField 
from flask_admin.contrib.pymongo import ModelView
from app import admin,db


class UserForm(Form):
    title = StringField('title')
    content = StringField('content')

class UserView(ModelView):
    column_list = ('title', 'content')
    form = UserForm


