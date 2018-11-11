var objects;
(function (objects) {
    class Clothes extends objects.GameObject {
        // public
        // contructor
        constructor(x, y, length) {
            super("clothes");
            this.Activate(x, y, length);
        }
        // public methods
        Reset() {
            this.IsColliding = false;
            this.x = -1000;
        }
        Activate(x, y, length) {
            this.x = x;
            this.y = y;
            this.scaleX = length / this.Width;
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
                if (this.x < -(this.getBounds().width * this.scaleX)) {
                    this._active = false;
                }
            }
        }
        IsActive() {
            return this._active;
        }
        CheckCollision() {
            if (this._active) {
                if (managers.Game.player.x + managers.Game.player.HalfWidth > this.x &&
                    managers.Game.player.x - managers.Game.player.HalfWidth < this.x + (this.Width * this.scaleX) &&
                    managers.Game.player.y + managers.Game.player.HalfHeight > this.y &&
                    managers.Game.player.y - managers.Game.player.HalfHeight < this.y + (this.Height * this.scaleY)) {
                    managers.Game.scoreboard.Score -= 90;
                    let sound = createjs.Sound.play("web2Sound");
                    sound.volume = 0.1;
                    this.Reset();
                    managers.Game.player.Clothes();
                }
            }
        }
    }
    objects.Clothes = Clothes;
})(objects || (objects = {}));
//# sourceMappingURL=clothes.js.map