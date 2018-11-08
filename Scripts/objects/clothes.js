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
    }
    objects.Clothes = Clothes;
})(objects || (objects = {}));
//# sourceMappingURL=clothes.js.map