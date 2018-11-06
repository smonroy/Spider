var objects;
(function (objects) {
    class Bullet extends objects.GameObject {
        constructor() {
            super("bullet");
            this.IsInPlay = false;
            this.Start();
        }
        get IsInPlay() {
            return this._isInPlay;
        }
        set IsInPlay(newValue) {
            this._isInPlay = newValue;
            if (!this.IsInPlay) {
                this.Reset();
            }
        }
        get Direction() {
            return this._direction;
        }
        set Direction(direction) {
            this._direction = direction;
        }
        Reset() {
            this.x = -10000;
            this.y = -10000;
            this.Direction = util.Vector2.zero();
        }
        Start() {
            this._speed = 10;
            this.Reset();
        }
        Update() {
            if (this.IsInPlay) {
                this._move();
            }
        }
        Destroy() {
        }
        _move() {
            this.Position = util.Vector2.Add(this.Position, util.Vector2.Multiply(this._direction, this._speed));
        }
        _checkBounds() {
            if (this.y < 0 || this.y > 480) {
                this.IsInPlay = false;
            }
        }
    }
    objects.Bullet = Bullet;
})(objects || (objects = {}));
//# sourceMappingURL=bullet.js.map