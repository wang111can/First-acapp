from django.contrib.auth  import authenticate, login
from django.http import JsonResponse 

def logining(request):
    data = request.GET;
    username = data.get("username")
    password = data.get("password")
    user = authenticate(username=username, password=password)
    if not user:
        return JsonResponse({
            'result': 'username or password is errorous',
            })  
    login(request, user) # 登录用户
    return JsonResponse({
            'result': 'success',
        })

    
    










