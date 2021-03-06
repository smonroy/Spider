module scenes {
    export class Over extends objects.Scene{

        private _welcomeLabel:objects.Label;
        private _sky:objects.Sky;
        private _spider:objects.Spider;
        private _sidewalk:objects.Sidewalk;
        private _playButton:objects.Button;
        private _menuButton:objects.Button;
//        private _backgroundMusic:createjs.AbstractSoundInstance;

        constructor() {
            super();

            this.Start();
        }

        public Start():void {
            this._sky = new objects.Sky();
            this.addChild(this._sky);

            this._sidewalk = new objects.Sidewalk(0, 704, 1, 1, 1);
            this.addChild(this._sidewalk);

            this._spider = new objects.Spider(this, managers.SCREEN_WITH / 2, managers.SCREEN_HEIGHT - 100);
            this.addChild(this._spider);
            managers.Game.scoreboard.Lives = 0;
            
            this._welcomeLabel = new objects.Label("Game Over", "60px", "Consolas", "#FF0000", managers.SCREEN_WITH / 2, 240, true);
            this.addChild(this._welcomeLabel);

            this._playButton = new objects.Button("playAgainButton", managers.SCREEN_WITH / 2, 340, true);
            this.addChild(this._playButton);

            this._playButton.on("click", ()=>{
                managers.Game.currentState = config.Scene.PLAY;
                managers.Game.scoreboard.Reset();
            });

            this._menuButton = new objects.Button("mainMenuButton", managers.SCREEN_WITH / 2, 410, true);
            this.addChild(this._menuButton);

            this._menuButton.on("click", ()=>{
                managers.Game.currentState = config.Scene.START;
                managers.Game.scoreboard.Reset();
            });

            managers.Game.scoreboard.AddHighScore(this);

            // this._backgroundMusic = createjs.Sound.play("background2Music");
            // this._backgroundMusic.volume = 0.2;
            // this._backgroundMusic.loop = 1;
        };

        public Update():void {
            this._sky.Update();
            this._spider.Update();
        };

        public Destroy():void {
//            this._backgroundMusic.stop();
            this.removeAllChildren();
        };

        public Reset():void {

        };

        public Main():void {
            
    
    
            

            
        };
    }
}