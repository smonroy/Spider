var scenes;
(function (scenes) {
    class Start extends objects.Scene {
        constructor() {
            super();
            this.Start();
        }
        Start() {
            this._ocean = new objects.Ocean();
            this._welcomeLabel = new objects.Label("Mail Pilot", "60px", "Consolas", "#FFFF00", 320, 240, true);
            this._startButton = new objects.Button("startButton", 320, 360, true);
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
            });
        }
        ;
    }
    scenes.Start = Start;
})(scenes || (scenes = {}));
//# sourceMappingURL=start.js.map