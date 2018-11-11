var scenes;
(function (scenes) {
    class Over extends objects.Scene {
        constructor() {
            super();
            this.Start();
        }
        Start() {
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
            this._playButton.on("click", () => {
                managers.Game.currentState = config.Scene.PLAY;
                managers.Game.scoreboard.Reset();
            });
            this._menuButton = new objects.Button("mainMenuButton", managers.SCREEN_WITH / 2, 410, true);
            this.addChild(this._menuButton);
            this._menuButton.on("click", () => {
                managers.Game.currentState = config.Scene.START;
                managers.Game.scoreboard.Reset();
            });
            managers.Game.scoreboard.AddHighScore(this);
        }
        ;
        Update() {
            this._sky.Update();
            this._spider.Update();
        }
        ;
        Destroy() {
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
    scenes.Over = Over;
})(scenes || (scenes = {}));
//# sourceMappingURL=over.js.map