var scenes;
(function (scenes) {
    class Start extends objects.Scene {
        constructor() {
            super();
            this.Start();
        }
        Start() {
            this._sky = new objects.Sky();
            this.addChild(this._sky);
            this._background = new Array();
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
            this._welcomeLabel = new objects.Label("Red Spider", "60px", "Consolas", "#FF0000", managers.SCREEN_WITH / 2, 240, true);
            this.addChild(this._welcomeLabel);
            this._playButton = new objects.Button("playButton", managers.SCREEN_WITH / 2, 340, true);
            this.addChild(this._playButton);
            this._playButton.on("click", () => {
                managers.Game.currentState = config.Scene.PLAY;
            });
            this._instructionsButton = new objects.Button("instructionsButton", managers.SCREEN_WITH / 2, 410, true);
            this.addChild(this._instructionsButton);
            this._instructionsButton.on("click", () => {
                managers.Game.currentState = config.Scene.INSTRUCTIONS;
            });
            this._exitButton = new objects.Button("exitButton", managers.SCREEN_WITH / 2, 480, true);
            this.addChild(this._exitButton);
            this._exitButton.on("click", () => {
                managers.Game.currentState = config.Scene.ABOUT;
            });
            this._backgroundMusic = createjs.Sound.play("background3Music");
            this._backgroundMusic.volume = 0.1;
            this._backgroundMusic.loop = 1;
        }
        ;
        Update() {
            this._sky.Update();
            this._spider.Update();
            this._sidewalk.Scroll(1);
            for (let background of this._background) {
                background.Scroll(1);
            }
        }
        ;
        Destroy() {
            this._backgroundMusic.stop();
            this.removeAllChildren();
        }
        ;
        Reset() {
        }
        ;
        Main() {
        }
        ;
    }
    scenes.Start = Start;
})(scenes || (scenes = {}));
//# sourceMappingURL=start.js.map