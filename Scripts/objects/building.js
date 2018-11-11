var objects;
(function (objects) {
    class Building extends createjs.Bitmap {
        constructor(floors, position) {
            super(managers.Game.assetMnager.getResult("building"));
            this._floors = floors;
            this.x = position;
            this.y = managers.SCREEN_HEIGHT - (this._floors * managers.BLOCK_HEIGHT) + 36;
            this.Reset(floors, position);
            this.on("mouseover", this._over);
            this.on("mouseout", this._out);
            this.on("click", this._click);
        }
        _over(event) {
            this.alpha = 0.9;
        }
        _out(event) {
            this.alpha = 1.0;
        }
        _click(event) {
            if (managers.Game.player.status == objects.SpiderStatus.hanging || managers.Game.player.status == objects.SpiderStatus.falling) {
                let webSound = createjs.Sound.play("webSound");
                webSound.volume = 0.1;
                managers.Game.player.SetAnchor(new util.Vector2(managers.Game.stage.mouseX, managers.Game.stage.mouseY));
            }
        }
        Reset(floors, position) {
            this._floors = floors;
            this.x = position;
            this.y = managers.SCREEN_HEIGHT - (this._floors * managers.BLOCK_HEIGHT) + 36;
            this._active = true;
        }
        Start() {
        }
        Update() {
        }
        Destroy() {
        }
        Scroll(distance) {
            if (this._active) {
                this.x -= distance;
                if (this.x < -this.getBounds().width) {
                    let sound = createjs.Sound.play("buildingSound");
                    sound.volume = 1;
                    managers.Game.scoreboard.Score += 100;
                    this._active = false;
                }
            }
        }
        IsActive() {
            return this._active;
        }
    }
    objects.Building = Building;
})(objects || (objects = {}));
//# sourceMappingURL=building.js.map