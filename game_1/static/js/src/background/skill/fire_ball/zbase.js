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
            let dist = this.get_dist(this.x, this.y, player.x, player.y);
            if (this.player !== player){
                if (dist <= this.radius + player.radius){
                    this.attack(player);
                    console.log("bump!!!!");
                    this.destroy();
                }

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
