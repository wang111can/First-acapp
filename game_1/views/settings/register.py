from django.http import JsonResponse
from django.contrib.auth import login
from django.contrib.auth.models import User
from game_1.models.player.player import Player

def register(request):
    data = request.GET
    username = data.get("username", "").strip()
    password = data.get("password", "").strip()
    confirm_password = data.get("confirm_password", "").strip()
    if not username or not password:
        return JsonResponse({
            'result': 'username or password cannot be empty',
            })
    if password != confirm_password:
        return JsonResponse({
            'result': 'input passwords are different',
            })
        # 数据 库查找
    if User.objects.filter(username=username).exists():
        return JsonResponse({
            'result': 'The username already exists', 
            })

    user = User(username=username)
    user.set_password(password)
    user.save()
    Player.objects.create(user=user, photo="https://i0.hdslb.com/bfs/article/4141ec076af23cd65f8ce71892cda419faa22f6d.jpg")

    login(request, user)
    return JsonResponse({
        'result': 'success',
        })









