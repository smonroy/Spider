var objects;
(function (objects) {
    class Ocean extends objects.GameObject {
        // public
        // contructor
        constructor() {
            super("ocean");
            this.Start();
        }
        // private methods
        _checkBounds() {
            if (this.y >= 0) {
                this.Reset();
            }
        }
        _move() {
            this.y += this._verticalSpeed;
        }
        // public methods
        Reset() {
            this.y = -960;
        }
        Start() {
            this.Reset();
            this._verticalSpeed = 5;
        }
        Update() {
            this._move();
            this._checkBounds();
        }
        Destroy() {
        }
    }
    objects.Ocean = Ocean;
})(objects || (objects = {}));
//# sourceMappingURL=ocean.js.map