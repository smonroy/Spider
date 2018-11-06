var objects;
(function (objects) {
    class Clound extends objects.GameObject {
        // public
        // contructor
        constructor() {
            super("cloud");
            this.regX = this.HalfWidth;
            this.regY = this.HalfHeight;
            this.Start();
        }
        // private methods
        _checkBounds() {
            if (this.y > 480 + this.Height) {
                this.Reset();
            }
        }
        _move() {
            this.y += this._verticalSpeed;
            this.x += this._horizontalSpeed;
        }
        // public methods
        Reset() {
            this._verticalSpeed = Math.floor((Math.random() * 5) + 5);
            this._horizontalSpeed = Math.floor((Math.random() * 4) - 2);
            this.y = -this.Height;
            this.x = Math.floor((Math.random() * (640 - this.Width)) + this.HalfWidth);
            this.IsColliding = false;
        }
        Start() {
            this.Reset();
        }
        Update() {
            this._move();
            this._checkBounds();
            this._updatePosition();
        }
        Destroy() {
        }
    }
    objects.Clound = Clound;
})(objects || (objects = {}));
//# sourceMappingURL=clound.js.map