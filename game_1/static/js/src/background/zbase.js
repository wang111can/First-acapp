class Game_ground{

    constructor(root){
        this.root = root;
        this.$play_ground = $(`
<div>
   
   新界面

</div>
        `)
        this.hide();
        this.root.$ac_game.append(this.$play_ground);
        this.start();
    }
    start(){
   
    }
    update(){
    
    }
    show(){
        this.$play_ground.show();
    }
    hide(){
        this.$play_ground.hide();
    }


}
