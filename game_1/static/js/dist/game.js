let AC_GAME_OBJECTS = [];

class AcGameObject {
    constructor() {
        AC_GAME_OBJECTS.push(this);

        this.has_called_start = false;  // 是否执行过start函数
        this.timedelta = 0;  // 当前帧距离上一帧的时间间隔
    }

    start() {  // 只会在第一帧执行一次
    }

    update() {  // 每一帧均会执行一次
    }

    late_update() {  // 在每一帧的最后执行一次
    }

    on_destroy() {  // 在被销毁前执行一次
    }

    destroy() {  // 删掉该物体
        this.on_destroy();

        for (let i = 0; i < AC_GAME_OBJECTS.length; i ++ ) {
            if (AC_GAME_OBJECTS[i] === this) {
                AC_GAME_OBJECTS.splice(i, 1);
                break;
            }
        }
    }
}

let last_timestamp;
let AC_GAME_ANIMATION = function(timestamp) {
    for (let i = 0; i < AC_GAME_OBJECTS.length; i ++ ) {
        let obj = AC_GAME_OBJECTS[i];
        if (!obj.has_called_start) {
            obj.start();
            obj.has_called_start = true;
        } else {
            obj.timedelta = timestamp - last_timestamp;
            obj.update();
        }
    }

    for (let i = 0; i < AC_GAME_OBJECTS.length; i ++ ) {
        let obj = AC_GAME_OBJECTS[i];
        obj.late_update();
    }

    last_timestamp = timestamp;

    requestAnimationFrame(AC_GAME_ANIMATION);
}


requestAnimationFrame(AC_GAME_ANIMATION);

class Game_map extends AcGameObject{

    constructor(play_ground){
        super();
        console.log("map");   
        this.play_ground = play_ground;
        this.$canvas = $('<canvas></canvas>');
        this.ctx = this.$canvas[0].getContext('2d');
        this.ctx.canvas.width = this.play_ground.width;
        this.ctx.canvas.height = this.play_ground.height;
        this.play_ground.$play_ground.append(this.$canvas);
    }
    start(){
    }
    update(){
        this.render();
        
    }
    hide(){
    }
    show(){
    }
    render(){
        this.ctx.fillStyle = "rgba(0, 0, 0, 0.2)";
        this.ctx.fillRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
    }
}
class small_ball extends AcGameObject{

    constructor(play_ground, x, y, radius, color, vx, vy, speed){
        super();
        this.x = x;
        this.y = y;
        this.play_ground = play_ground;
        this.ctx = this.play_ground.map.ctx;
        this.radius = radius;
        this.color = color;
        this.vx = vx;
        this.vy = vy;
        this.speed = speed;
        this.decelerate = 0.9;
        this.eps = 0.1;
    }

    start(){
    

    }
    update(){
        if (this.speed < this.eps){
            this.destroy();
            return false;
        }
        this.x += this.vx * this.speed * this.timedelta / 1000;
        this.y += this.vy * this.speed * this.timedelta / 1000;
        this.speed *= this.decelerate;
        this.render();
    }
    render(){
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        this.ctx.fillStyle = this.color;
        this.ctx.fill();
    }



}
class Player extends AcGameObject{

    constructor(play_ground, X, Y, radius, color, speed, is_me){
        super(); 
        this.play_ground = play_ground;
        this.x = X;
        this.y = Y;
        this.vx = 0;
        this.vy = 0;
        this.damagex = 0;
        this.damagey = 0;
        this.damage_speed = 0;
        this.decelerate = 0.9;
        this.move_length = 0;

        this.radius = radius;
   //     if (is_me) this.radius *= 10;
        this.color = color;
        //if (is_me === true)
    //    speed = this.play_ground.height * 2;
        this.speed = speed;
        this.is_me = is_me;
        this.eps = 0.01;
        this.ctx = this.play_ground.map.ctx;
        this.debuff_decelerate_time = 0;
        this.cur_skill = null;
        this.times = 0;
        this.speed_up = speed;

    
        if (this.is_me){
            this.img = new Image();
            this.img.src = this.play_ground.root.Setting.photo;
            

        }


    }

    start(){
        if (this.is_me){
            this.add_listening_events();
        }
        else { // AI

            let tx = Math.random() * this.play_ground.width;
            let ty = Math.random() * this.play_ground.height;
            this.move_to(tx, ty);
        }
    }

    get_dist(x1, y1, x2, y2){
        let dx = x1 - x2;
        let dy = y1 - y2;
        return Math.sqrt(dx * dx + dy * dy);
    }

    AI_fire(){
        
     
      //  let Skills = ["fire_ball"];
     //   let length = Skills.length;
      //  this.skill = Skill[Math.random() * 10 % length];
    }

    move_to(tx, ty){
        //  console.log(tx, ty);
        this.move_length = this.get_dist(this.x, this.y, tx, ty);
        let angle = Math.atan2(ty - this.y, tx - this.x);
        this.vx = Math.cos(angle);
        this.vy = Math.sin(angle);
        
    }

    shoot_fire(tx, ty){
        let x = this.x;
        let y = this.y;
        let radius = this.play_ground.height * 0.01;
        let angle = Math.atan2(ty - this.y, tx - this.x); // 发射角度
        let vx = Math.cos(angle);
        let vy = Math.sin(angle);
        let color = "orange";
        let speed = this.play_ground.height * 0.5;
        let move_length = this.play_ground.height * 1;
        this.ball =  new fire_ball(this.play_ground, this, x, y, radius, vx, vy, color, speed, move_length, this.play_ground.height * 0.01);

    }

    add_listening_events(){
        let op = this;
        this.play_ground.map.$canvas.on("contextmenu", function(){
            return false;
        });
        this.play_ground.map.$canvas.mousedown(function(e){
            const rect = op.ctx.canvas.getBoundingClientRect();

            if (e.which === 3){
                op.move_to(e.clientX - rect.left, e.clientY - rect.top);
            }
            else if (e.which == 1){
                if (op.cur_skill === "fire_ball"){
                    op.shoot_fire(e.clientX - rect.left, e.clientY - rect.top);
                }
                op.cur_skill = null;

            }
        });
        $(window).keydown(function(e){
            if (e.which === 81){ // 字母对照表
                op.cur_skill = "fire_ball";
                return false;
            }


        });
    }

    be_attacked(angle ,damage){

        for (let i = 0;i < 100 + Math.random() * 100;i ++ ){
            let x = this.x;
            let y = this.y;
            let play_ground = this.play_ground;
            let radius = this.radius * Math.random() * 0.1;
            let color = this.color;
            let angle = Math.PI * 2 * Math.random();
            let vx = Math.cos(angle);
            let vy = Math.sin(angle);
            let speed = this.speed * 10;
            new small_ball(play_ground, x, y, radius, color, vx, vy, speed);     
        }
       // if (this.is_me === false)
        this.radius -= damage;
        if (this.radius < 10) {
            this.destroy();
            return false;
        }
        // this.debuff_decelerate_time = 300;
        this.damagex = Math.cos(angle);
        this.damagey = Math.sin(angle);
       // if (this.is_me === false)
        this.damage_speed = damage * 100; // 击退效果
    }

    update(){
        if (this.times > 5  && this.is_me === false && Math.random() < 1 / 300.0){
        //if (this.is_me === false){   
            let player = this.play_ground.players[Math.floor(Math.random() * this.play_ground.players.length)];

            let x = player.x;
            let y = player.y;
             this.shoot_fire(x, y);
        }

       // if (this.is_me){   
       //     let player = this.play_ground.players[Math.floor(Math.random() * this.play_ground.players.length)];
       //
       //     let x = player.x;
       //     let y = player.y;
       //      this.shoot_fire(x, y);
       // }

        this.times += this.timedelta / 1000;
        // decelerate buff
        // if (this.debuff_decelerate_time){
        //     this.speed = this.speed_up * 0.5;
        //     this.debuff_decelerate_time -= 1;
        // }
        // else this.speed = this.speed_up;

        if (this.damage_speed > 50){
            this.vx = this.vy = 0;
            this.move_length = 0;
            this.x += this.damagex * this.damage_speed * this.timedelta / 1000;
            this.y += this.damagey * this.damage_speed * this.timedelta / 1000;
            this.damage_speed *= this.decelerate;
            //  console.log(this.damage_speed);

        }else{
            if (this.move_length < this.eps){
                this.move_length = 0;
                this.vx = this.vy = 0;
                if (this.is_me === false){
                    let tx = Math.random() * this.play_ground.width;
                    let ty = Math.random() * this.play_ground.height;
                    this.move_to(tx, ty);
                }
            }
            else {
                let move_d = Math.min(this.move_length, this.speed * this.timedelta / 1000);
                this.x += this.vx * move_d;
                this.y += this.vy * move_d;
                this.move_length -= move_d;
            }}
        this.render();
    }

    render(){
        
        if (this.is_me){

            this.ctx.save();
            this.ctx.beginPath();
            this.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
            this.ctx.stroke();
            this.ctx.clip();
            this.ctx.drawImage(this.img, this.x - this.radius, this.y - this.radius, this.radius * 2, this.radius * 2); 
            this.ctx.restore();

        }
        else {
            this.ctx.beginPath();
            this.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
            this.ctx.fillStyle = this.color;
            this.ctx.fill();
        }
    }
}   


class fire_ball extends AcGameObject{
    
    constructor(play_ground, player, x, y, radius, vx, vy, color, speed, move_length, damage){
        super();
       // console.log("fire_ball");
        this.move_length = move_length;
        this.play_ground = play_ground;
        this.player = player;
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.vx = vx;
        this.vy = vy;
        this.color = color;
        this.speed = speed;
        this.ctx = this.play_ground.map.ctx;
        this.eps = 0.1;
        this.damage = damage;


    }
    
    start(){
    }

            
    get_dist(x1, y1, x2, y2){
        let dx = x1 - x2;
        let dy = y1 - y2;
        return Math.sqrt(dx * dx + dy * dy);
    }
    attack(player){
       
        let angle = Math.atan2(player.y - this.y, player.x - this.x);
        player.be_attacked(angle, this.damage);
    }

    is_encounter(obj){
        let dist = this.get_dist(this.x, this.y, obj.x, obj.y);
        if (dist <= this.radius + obj.radius){
            return true;
        }
        return false;
    }

    update(){
        if (this.move_length < this.eps){
            this.destroy();
            return false;
        }
        
        let move_d = Math.min(this.move_length, this.speed * this.timedelta / 1000);
        this.x += this.vx * move_d;
        this.y += this.vy * move_d;
        this.move_length -= move_d;

        for (let i = 0;i < this.play_ground.players.length;i ++ ){
            let player = this.play_ground.players[i];
            if (this.player !== player && this.is_encounter(player)){
                    this.attack(player);
                   // console.log("bump!!!!");
                    this.destroy();
                   
                }

            }
       

        this.render();
    }
   
    render(){
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        this.ctx.fillStyle = this.color;
        this.ctx.fill();

    }

}
class Game_ground{

    constructor(root){
        this.root = root;
        this.$play_ground = $(`
<div class="game_ground">
   

</div>
        `)
        this.hide();
       
        this.start();
    }
    start(){
   
    }
    update(){
    
    }
    show(){
        this.$play_ground.show();
        this.root.$ac_game.append(this.$play_ground);
        this.width = this.$play_ground.width();
        this.height = this.$play_ground.height();
        this.map = new Game_map(this);                      
  
        this.players = [];
        this.players.push(new Player(this, this.width / 2, this.height / 2, this.height * 0.05, "white", this.height * 0.15, true));
        for (let i = 0;i < 10;i ++ ){
            let cr = ["red", "blue", "pink", "grey", "green"];
           // console.log("sss");
            let x = Math.random() * this.width;
            let y = Math.random() * this.height;
            this.players.push(new Player(this, x, y, this.height * 0.05, cr[i % 5], this.height * 0.15, false));

        }

    }
    hide(){
        this.$play_ground.hide();
    }


}
class Game_menu{

    constructor(root){
        this.root = root;
        this.$menu = $(` 
<div class="game_menu">
    
    <div class="game_menu_select">
        <div class="game_menu_select_button game_menu_button_select_one_mode">
            SINGLE PLAYER
            </div>
            <br>
        <div class="game_menu_select_button game_menu_button_select_two_mode">
            Select_2
            </div>
            <br>
        <div class="game_menu_select_button game_menu_button_select_three_mode">
            Select_3
            </div>
            <br>
        <div class="game_menu_select_button game_menu_button_select_settings_mode">
            Settings
            </div>

   </div>

</div>
        `);
        this.$menu.hide(); 
        console.log("hide memu");
        this.root.$ac_game.append(this.$menu);
        this.$one_mode = this.$menu.find('.game_menu_button_select_one_mode');
        this.$two_mode = this.$menu.find('.game_menu_button_select_two_mode');
        this.$three_mode = this.$menu.find('.game_menu_button_select_three_mode');
        this.$settings_mode = this.$menu.find('.game_menu_button_select_settings_mode');


        this.start();
    }
    start() {
        
        this.add_listening_events();
    }
    add_listening_events(){
        let op = this;
        this.$one_mode.click(function(){
            op.hide();
            op.root.play_ground.show();
        });
        this.$two_mode.click(function(){
            console.log("two.click");
        });

        this.$three_mode.click(function(){
            console.log("three.click");
        });

        this.$settings_mode.click(function(){
            op.root.Setting.logout_on_remote();
        });

    }
    
    show(){
        console.log("show menu");
        this.$menu.show();
        
    }
 
    
    hide(){
        
        this.$menu.hide();
    }


}
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
export class Game{
 
    
    constructor(id, acwing_os){
        this.id = id;
      
        this.acwing_os = acwing_os;
        this.$ac_game = $('#' + id);
        this.Setting = new Settings(this);
        console.log("111");
        this.menu = new Game_menu(this);
        this.play_ground = new Game_ground(this);        
        
       this.start();
    }
    start(){
    }
}





