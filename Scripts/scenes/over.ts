module scenes {
    export class Over extends objects.Scene{

        private _welcomeLabel:objects.Label;
        private _sky:objects.Sky;
        private _spider:objects.Spider;
        private _sidewalk:objects.Sidewalk;
        private _startButton:objects.Button;

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
            this._spider.rotateSpeed = -15;
            this.addChild(this._spider);
            
            this._welcomeLabel = new objects.Label("Game Over", "60px", "Consolas", "#FF0000", managers.SCREEN_WITH / 2, 240, true);
            this.addChild(this._welcomeLabel);

            this._startButton = new objects.Button("restartButton", managers.SCREEN_WITH / 2, 360, true);
            this.addChild(this._startButton);

            this._startButton.on("click", ()=>{
                managers.Game.currentState = config.Scene.PLAY;
                managers.Game.scoreboard.Reset();
            });

            managers.Game.scoreboard.AddHighScore(this);

        };

        public Update():void {
            this._sky.Update();
            this._spider.Update();
        };

        public Destroy():void {
            this.removeAllChildren();
        };

        public Reset():void {

        };

        public Main():void {
            
    
    
            

            
        };
    }
}