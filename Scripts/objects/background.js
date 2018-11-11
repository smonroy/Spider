/**
 * Author: Sergio Monroy Escalante - 300930580
 * Date: Nov 11th, 2018
 *
 * Background image to produce a 3D efect in the city
 */
var objects;
(function (objects) {
    class Background extends objects.GameObject {
        constructor(x, y, speed, scale, alpha) {
            super("cityBackground");
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
            if (this.x > this._initialPoint - (this.Width * this.scaleX)) {
                this.x -= distance * this._speed;
            }
            else {
                this.x = this._initialPoint;
            }
        }
    }
    objects.Background = Background;
})(objects || (objects = {}));
//# sourceMappingURL=background.js.map