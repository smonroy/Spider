module scenes {
    export class About extends objects.Scene{

        private _welcomeLabel:objects.Label;
        private _sky:objects.Sky;
        private _spider:objects.Spider;
        private _sidewalk:objects.Sidewalk;
        private _exitButton:objects.Button;
        private _background:objects.Background[];

        constructor() {
            super();

            this.Start();
        }

        public Start():void {
            this._sky = new objects.Sky();
            this.addChild(this._sky);

            this._background = new Array<objects.Background>();

            this._background[0] = new objects.Background(0, 256, 0.5, 2, 1);
            this._background[1] = new objects.Background(4096, 256, 0.5, 2, 1);
            this._background[2] = new objects.Background(0, 384, 0.25, 1.5, 0.5);
            this._background[3] = new objects.Background(3072, 384, 0.25, 1.5, 0.5);

            for (let background of this._background) {
                this.addChild(background);
            }
            this._sidewalk = new objects.Sidewalk(0, 704, 1, 1, 1);
            this.addChild(this._sidewalk);


            this._spider = new objects.Spider(this, managers.SCREEN_WITH / 2, managers.SCREEN_HEIGHT - 100);
            this.addChild(this._spider);

            this._welcomeLabel = new objects.Label("Thanks for play Red Spider", "40px", "Consolas", "#000000", managers.SCREEN_WITH/2, 240, true);
            this.addChild(this._welcomeLabel);

            this._exitButton = new objects.Button("mainMenuButton", managers.SCREEN_WITH/2, 480, true);
            this.addChild(this._exitButton);

            this._exitButton.on("click", ()=>{
                managers.Game.currentState = config.Scene.START;
            });
        };

        public Update():void {
            this._sky.Update();
            this._spider.Update();
            this._sidewalk.Scroll(1);
            for (let background of this._background) {
                background.Scroll(1);
            }
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