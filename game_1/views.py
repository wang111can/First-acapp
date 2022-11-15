from django.http import HttpResponse


def index(request):
    line1 = '<h1 style="text-align:center;">Welcome to here!</h1>'
    line2 = '<img src="https://img1.baidu.com/it/u=3424582540,3550213785&fm=253&fmt=auto&app=138&f=JPEG?w=640&h=360"/>'
    line4 = """
    <div style="text-align:center; color:red;">
    <a href="/menu/"> 菜单 </a>
    </div>
    """
    
    return HttpResponse(line1 + line4 + line2)

def menu(request):
    line1 = """
    <div style = "text-align:center;">
        <h1><strong> MENU </strong></h1>
        <a href="/"> 主页面</a>
    </div>

    """
    return HttpResponse(line1)

