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
        this.color = color;
        this.speed = speed;
        this.is_me = is_me;
        this.eps = 0.01;
        this.ctx = this.play_ground.map.ctx;
        this.debuff_decelerate_time = 0;
        this.cur_skill = null;
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
        let color = "white";
        let speed = this.play_ground.height * 0.5;
        let move_length = this.play_ground.height * 1;
        let ball =  new fire_ball(this.play_ground, this, x, y, radius, vx, vy, color, speed, move_length, this.play_ground.height * 0.01);

    }

    add_listening_events(){
        let op = this;
        this.play_ground.map.$canvas.on("contextmenu", function(){
            return false;
        });
        this.play_ground.map.$canvas.mousedown(function(e){
            if (e.which === 3){
                op.move_to(e.clientX, e.clientY);
            }
            else if (e.which == 1){
                if (op.cur_skill === "fire_ball"){
                    op.shoot_fire(e.clientX, e.clientY);
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
            let color = "red";
            let angle = Math.PI * 2 * Math.random();
            let vx = Math.cos(angle);
            let vy = Math.sin(angle);
            let speed = this.speed * 10;
            new small_ball(play_ground, x, y, radius, color, vx, vy, speed);     
        }
        this.radius -= damage;
        if (this.radius < 10) {
            this.destroy();
            return false;
        }
        // this.debuff_decelerate_time = 300;
        this.damagex = Math.cos(angle);
        this.damagey = Math.sin(angle);
        this.damage_speed = damage * 100; // 击退效果
    }

    update(){
        if (this.debuff_decelerate_time){
            this.speed = this.speed_up * 0.5;
            this.debuff_decelerate_time -= 1;
        }
        else this.speed = this.speed_up;

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


