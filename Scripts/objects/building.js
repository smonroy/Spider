var objects;
(function (objects) {
    class Building extends createjs.Bitmap {
        constructor(floors, position) {
            super(managers.Game.assetMnager.getResult("building2"));
            this.floors = floors;
            this.x = position;
            this.y = managers.SCREEN_HEIGHT - (this.floors * managers.BLOCK_HEIGHT);
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
            managers.Game.player.SetAnchor(new util.Vector2(managers.Game.stage.mouseX, managers.Game.stage.mouseY));
        }
        Reset(floors, position) {
            this.floors = floors;
            this.x = position;
            this.y = managers.SCREEN_HEIGHT - (this.floors * managers.BLOCK_HEIGHT);
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