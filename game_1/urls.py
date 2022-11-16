from django.urls import path
from game_1.views import index, menu


urlpatterns = [
    path("", index, name = "index"),
    path("menu/", menu, name = "menu")




    ]




