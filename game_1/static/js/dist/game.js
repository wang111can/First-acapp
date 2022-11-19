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
class Game_menu{

    constructor(root){
        this.root = root;
        this.$menu = $(` 
<div class="game_menu">
    
    <div class="game_menu_select">
        <div class="game_menu_select_button game_menu_button_select_one_mode">
            Select_1
            </div>
            <br>
        <div class="game_menu_select_button game_menu_button_select_two_mode">
            Select_2
            </div>
            <br>
        <div class="game_menu_select_button game_menu_button_select_three_mode">
            Select_3
            </div>
            <br>
        <div class="game_menu_select_button game_menu_button_select_settings_mode">
            Settings
            </div>

   </div>

</div>
        `);
        
        this.root.$ac_game.append(this.$menu);
        this.$one_mode = this.$menu.find('.game_menu_button_select_one_mode');
        this.$two_mode = this.$menu.find('.game_menu_button_select_two_mode');
        this.$three_mode = this.$menu.find('.game_menu_button_select_three_mode');
        this.$settings_mode = this.$menu.find('.game_menu_button_select_settings_mode');


        this.start();
    }
    start() {
        
        this.add_listening_events();
    }
    add_listening_events(){
        let op = this;
        this.$one_mode.click(function(){
            op.hide();
            op.root.play_ground.show();
        });
        this.$two_mode.click(function(){
            console.log("two.click");
        });

        this.$three_mode.click(function(){
            console.log("three.click");
        });

        this.$settings_mode.click(function(){
            console.log("settings.click");
        });

    }
    
    show(){
        this.$menu.show();
        
    }
    
    hide(){
        this.$menu.hide();
    }


}
class Game{
    
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





