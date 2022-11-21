class fire_ball extends AcGameObject{
    
    constructor(play_ground, player, x, y, radius, vx, vy, color, speed, move_length){
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


    }
    
    start(){
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
        this.render();
    }
    render(){
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        this.ctx.fillStyle = this.color;
        this.ctx.fill();

    }

}
