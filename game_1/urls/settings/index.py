from django.urls import path, include
from game_1.views import index
from game_1.views.settings.get_infor import get_infor
from game_1.views.settings.login import logining
from game_1.views.settings.logouting import logouting
from game_1.views.settings.register import register

urlpatterns = [

    path("get_infor/", get_infor, name="settings_get_infor"),
    path("logining/", logining, name="settings_logining"),
    path("logouting/", logouting, name="settings_logouting"),    
    path("register/", register, name="settings_register"),
]






