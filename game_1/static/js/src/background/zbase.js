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
