module managers {
    export class Game {
        // Globals
        public static assetMnager:createjs.LoadQueue;
        public static stage:createjs.Stage;
        public static currentState:config.Scene;
        public static currentScene:objects.Scene;
        public static scoreboard:managers.ScoreBoard;   
    } 

    export const SCREEN_WITH:number = 1024; //640;
    export const SCREEN_HEIGHT:number = 768; //480;
    export const BLOCK_WITH:number = 136; //68;      
    export const BLOCK_HEIGHT:number = 56; //28;      
}