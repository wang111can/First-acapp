from django.http import JsonResponse
from game_1.models.player.player import Player


def get_infor_acapp(request):  
    
    player = Player.objects.all()[0]
    return JsonResponse({
        'result':  "success",
        'username': player.user.username,
        'photo': player.photo,
        })


def get_infor_web(request):
    user = request.user
    if not user.is_authenticated:
        return JsonResponse({
                'result': "未登录"
            })
    player = Player.objects.all()[0]
    return JsonResponse({
        'result':  "success",
        'username': player.user.username,
        'photo': player.photo,
        })


def get_infor(request):

    player = Player.objects.all()[0]


    platform = request.GET.get('platform')
    if platform == 'acapp' :
        return get_infor_acapp(request)
    elif platform == 'web':
        return get_infor_web(request)


