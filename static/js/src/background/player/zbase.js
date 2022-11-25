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
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        this.ctx.fillStyle = this.color;
        this.ctx.fill();
    }
}   


