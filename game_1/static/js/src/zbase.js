class Game{
    
    constructor(id){
        this.id = id;
        this.$ac_game = $('#' + id);
        this.menu = new Game_menu(this);
        
    }
}





