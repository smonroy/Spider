var scenes;
(function (scenes) {
    class Play extends objects.Scene {
        // private _engineSound:createjs.AbstractSoundInstance;
        constructor() {
            super();
            this.Start();
        }
        Start() {
            this.Main();
        }
        ;
        Update() {
            if (!this._spider.IsAnchor()) {
                this._spider.SetAnchor(new util.Vector2(100, 0));
            }
            this._spider.Update();
            let diff = Math.floor(this._spider.x - managers.SCROLL_TRIGER);
            if (diff > 0) {
                this._city.Scroll(diff);
                this._spider.Scroll(diff);
            }
            // managers.Collision.Check(this._player, this._island);
            // for (let cloud of this._clouds) {
            //     cloud.Update();
            //     managers.Collision.Check(this._player, cloud);
            // }
        }
        ;
        Destroy() {
            this.removeAllChildren();
            // this._engineSound.stop();
        }
        ;
        Reset() {
        }
        ;
        Main() {
            this._city = new objects.City(this);
            this._spider = new objects.Spider(100, 100);
            managers.Game.player = this._spider;
            this.addChild(this._spider);
            // this._engineSound = createjs.Sound.play("engineSound");
            // this._engineSound.volume = 0.1;
            // this._engineSound.loop = 1;
            managers.Game.scoreboard.AddGameUI(this);
        }
        ;
    }
    scenes.Play = Play;
})(scenes || (scenes = {}));
//# sourceMappingURL=play.js.map