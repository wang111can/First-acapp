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
