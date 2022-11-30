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





