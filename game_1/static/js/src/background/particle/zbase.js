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
