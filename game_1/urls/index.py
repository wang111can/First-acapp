from django.urls import path, include
from game_1.views.index import index

urlpatterns = [
    path('', index, name="index"),
    path("menu/", include("game_1.urls.menu.index")),
    path("background/", include("game_1.urls.background.index")),
    path("settings/", include("game_1.urls.settings.index")),
]







