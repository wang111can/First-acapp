class Game_menu{

    constructor(root){
        this.root = rooot;
        this.$menu = $(`
<div class="game_menu">
</div>
`);
        this.root.$ac_game.append(this.$menu);


    }
}
class Game{
    
    constructor(id){
        this.id = id;
        this.$ac_game = $('#' + id);
        this.menu = new Game_menu(this);
        
    }
}





