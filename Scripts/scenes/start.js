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
            this._sidewalk = new objects.Sidewalk(0, 704, 1, 1, 1);
            this.addChild(this._sidewalk);
            this._spider = new objects.Spider(this, managers.SCREEN_WITH / 2, managers.SCREEN_HEIGHT - 100);
            this.addChild(this._spider);
            this._welcomeLabel = new objects.Label("Red Spider", "60px", "Consolas", "#FF0000", managers.SCREEN_WITH / 2, 240, true);
            this.addChild(this._welcomeLabel);
            this._startButton = new objects.Button("startButton", managers.SCREEN_WITH / 2, 360, true);
            this.addChild(this._startButton);
            this._startButton.on("click", () => {
                managers.Game.currentState = config.Scene.PLAY;
            });
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
    scenes.Start = Start;
})(scenes || (scenes = {}));
//# sourceMappingURL=start.js.map