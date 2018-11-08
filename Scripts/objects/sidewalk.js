var objects;
(function (objects) {
    class Sidewalk extends objects.GameObject {
        constructor(x, y, speed, scale, alpha) {
            super("sidewalk");
            this.x = x;
            this.y = y;
            this._initialPoint = x;
            this.scaleX = scale;
            this.scaleY = scale;
            this.alpha = alpha;
            this._speed = speed;
        }
        Reset() {
        }
        Start() {
        }
        Update() {
        }
        Destroy() {
        }
        Scroll(distance) {
            if (this.x <= this._initialPoint - (this.HalfWidth * this.scaleX)) {
                this.x = this._initialPoint;
            }
            else if (this.x > this._initialPoint) {
                this.x = this._initialPoint - (this.HalfWidth * this.scaleX);
            }
            else {
                this.x -= distance * this._speed;
            }
        }
    }
    objects.Sidewalk = Sidewalk;
})(objects || (objects = {}));
//# sourceMappingURL=sidewalk.js.map