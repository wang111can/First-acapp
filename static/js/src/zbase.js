export class Game{
 
    
    constructor(id){
        this.id = id;
        this.$ac_game = $('#' + id);
        this.menu = new Game_menu(this);
        this.play_ground = new Game_ground(this);        
        
       this.start();
    }
    start(){
    }
}





