var scenes;
(function (scenes) {
    class Play extends objects.Scene {
        // private _engineSound:createjs.AbstractSoundInstance;
        constructor() {
            super();
            this.Start();
        }
        Start() {
            this._scrolling = false;
            this.Main();
        }
        ;
        Update() {
            if (!this._spider.IsAnchor()) {
                this._spider.SetAnchor(new util.Vector2(150, 0));
            }
            this._spider.Update();
            if (this._spider.x > managers.SCROLL_TRIGER) {
                this._scrolling = true;
            }
            if (this._spider.x < managers.SCROLL_STOP) {
                this._scrolling = false;
            }
            if (this._scrolling) {
                this._city.Scroll(managers.SCROLL_SPEED);
                this._spider.Scroll(managers.SCROLL_SPEED);
                this._sidewalk.Scroll(managers.SCROLL_SPEED);
                for (let background of this._background) {
                    background.Scroll(managers.SCROLL_SPEED);
                }
            }
            let diff = Math.floor(this._spider.x - managers.SCROLL_LIMIT);
            if (diff > 0) {
                this._city.Scroll(diff);
                this._spider.Scroll(diff);
                this._sidewalk.Scroll(diff);
                for (let background of this._background) {
                    background.Scroll(diff);
                }
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
            this._city = new objects.City(this);
            this._sidewalk = new objects.Sidewalk(0, 704, 1, 1, 1);
            this.addChild(this._sidewalk);
            this._spider = new objects.Spider(150, 300);
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