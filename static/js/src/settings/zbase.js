class Settings{
    
    constructor(root){
        this.root = root;
        this.platform = "web";
        if (this.root.acwing_os){
            this.platform = "acapp";
        }
        this.username = "";
        this.photo = "";

        this.$set = $(`
<div class="game-set">

    <div class="game-set-login">
        <div class="game-set-login-title">
            登录
        </div>
        
        <div class="game-set-username">
           <div class="game-set-button">
                <input type="text", placeholder="username">
           </div>
        </div>
    
        <div class="game-set-password">
            <div class="game-set-button">
                <input type="password", placeholder="password">
            </div>
        </div>

        <div class="game-set-submit">
            <div class="game-set-button">

                <button> Loging </button>
            </div>
        </div>
      

        <div class="game-set-error-messege">
            
        </div>
       

        <br> 
        
        <div  class="game-set-select-register">
            register
        </div>
        
        <div class="game-set-acwing">
    
            <img src="https://app4097.acapp.acwing.com.cn/static/image/settings/like_3.jpg" width="40">
            <div>
                acwing一键登入
            </div>
        </div>
 

    </div>

    <div class="game-set-register">
        <div class="game-set-login-title">
         注册
         </div>

        <div class="game-set-username">
            <div class="game-set-button">
                <input type="text", placeholder="username">
            </div>
        </div>

     <div class="game-set-password game-set-password-first">
         <div class="game-set-button">
             <input type="password", placeholder="password">
         </div>
    </div>
    
    <div class="game-set-password game-set-password-second"> 
        <div class="game-set-button">
             <input type="password", placeholder="enter password again">
         </div>
    </div>
     
        <div class="game-set-submit">
            <div class="game-set-button">

                 <button> register </button>
             </div>
        </div>

        <div class="game-set-error-messege">
            
        </div>
       
        <div  class="game-set-select-log">
            login

        </div>
        <div class="game-set-acwing">
    
            <img src="https://app4097.acapp.acwing.com.cn/static/image/settings/like_3.jpg" width="40">
            <div>
                acwing一键登入
            </div>
        </div>
 

    </div>

</div>

        `);
        this.root.$ac_game.append(this.$set);
        
        this.$register_select = this.$set.find(".game-set-select-register");
        this.$log_select = this.$set.find(".game-set-select-log");
        
       
        
        this.$error = this.$set.find(".game-set-error-messege");
        
        this.$login = this.$set.find(".game-set-login");
        this.$login_username = this.$login.find(".game-set-username  input");
        this.$login_password = this.$login.find(".game-set-password input");
        this.$login_submit = this.$login.find(".game-set-submit button");
        this.$login_error_messege = this.$login.find(".game-set-error-messege"); 
        this.$login.hide();
        
        this.$register = this.$set.find(".game-set-register");
        this.$register_username = this.$register.find(".game-set-username input");
        this.$register_password = this.$register.find(".game-set-password-first input");
        this.$register_confirm_password = this.$register.find(".game-set-password-second input");
        this.$register_submit = this.$register.find(".game-set-submit button");
        this.$register_error_messege = this.$register.find(".game-set-error-messege"); 

        
        this.$register.hide();  
        
        this.start();

    }


    start(){
        this.get_infor();    
        this.add_listening_events();
    }
    add_listening_events(){
        
        this.add_listening_events_login();
        this.add_listening_events_register();
    }
    
    add_listening_events_login(){
        let op = this;
        this.$register_select.click(function(){
            op.register();
        });
        this.$login_submit.click(function(){
            op.login_on_remote();
        });
 
    }
    login_on_remote(){ 
        let op = this;
        let username = this.$login_username.val();
        let password = this.$login_password.val();
     //   this.$login.error_messege.empty();
        
        $.ajax({
            url: "https://app4097.acapp.acwing.com.cn/settings/logining/",
            type: "GET",
            data: {
                username: username,
                password: password,
            },
            success: function(resp){
                if (resp.result === "success"){
                   // console.log("success");
                   location.reload();
                }
                else {
                   // console.log("unsuccess");
                    op.$login_error_messege.html(resp.result);
                     
                }
            }
        });
    }

    register_on_remote(){
        let op = this;
        let username = this.$register_username.val();
        let password = this.$register_password.val();
        let confirm_password = this.$register_confirm_password.val();
   //     this.$register.error_messege.empty();
        $.ajax({
            url: "https://app4097.acapp.acwing.com.cn/settings/register/",
            type: "GET",
            data:{
                username: username,
                password: password,
                confirm_password: confirm_password,
            },
            success: function(resp){
                console.log(resp);
                if (resp.result === "success"){
                    location.reload();
                }
                else {
                    op.$register_error_messege.html(resp.result);
                }
            }
        

        });


    }
    
    logout_on_remote(){
        if (this.platform == "acapp") return false;
        
        $.ajax({
            url: "https://app4097.acapp.acwing.com.cn/settings/logouting/",
            type: "GET",
            success: function(resp){
                console.log(resp.result);
                if (resp.result === "success"){
                    location.reload();
                }
            } 
        });
    }

    add_listening_events_register(){
        let op = this; 
        this.$log_select.click(function(){
            op.login();
        });
        this.$register_submit.click(function(){
            op.register_on_remote();
        });
 
    
    }

    get_infor() {
        let outer = this;

        $.ajax({
            url: "https://app4097.acapp.acwing.com.cn/settings/get_infor",
            type: "GET",
            data: {
                platform: outer.platform,
            },
            success: function(resp) {
                if (resp.result === "success") {


                    outer.username = resp.username;
                    outer.photo = resp.photo;
                    outer.hide();
                    outer.root.menu.show();
                } else {
                    console.log("login");
                    outer.login();
                }
            }
        });
    }
    login(){
        this.$register.hide();
        this.$login.show();
    }

    register(){
        this.$login.hide();
        this.$register.show();
    }

    hide(){
        this.$set.hide();
    }

    show(){
        this.$set.show();
    }


}
