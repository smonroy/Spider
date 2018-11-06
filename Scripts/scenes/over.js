var scenes;
(function (scenes) {
    class Over extends objects.Scene {
        constructor() {
            super();
            this.Start();
        }
        Start() {
            this._ocean = new objects.Ocean();
            this._welcomeLabel = new objects.Label("Game Over", "60px", "Consolas", "#FFFF00", 320, 240, true);
            this._startButton = new objects.Button("restartButton", 320, 360, true);
            this.Main();
        }
        ;
        Update() {
            this._ocean.Update();
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
            this.addChild(this._ocean);
            this.addChild(this._welcomeLabel);
            this.addChild(this._startButton);
            this._startButton.on("click", () => {
                managers.Game.currentState = config.Scene.PLAY;
                managers.Game.scoreboard.Reset();
            });
            managers.Game.scoreboard.AddHighScore(this);
        }
        ;
    }
    scenes.Over = Over;
})(scenes || (scenes = {}));
//# sourceMappingURL=over.js.map