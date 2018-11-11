/**
 * Author: Sergio Monroy Escalante - 300930580
 * Date: Nov 11th, 2018
 *
 * This opject is used to swing the spider in the buildings of the city
 */
var objects;
(function (objects) {
    class Web extends objects.GameObject {
        constructor() {
            super("webLine");
            this.Start();
        }
        // public methods
        Reset() {
            this._point1 = new util.Vector2(-100, -100);
            this._point2 = new util.Vector2(-100, -200);
            this._distance = 100;
            this.Update();
        }
        Start() {
            this.Reset();
        }
        Update() {
            this.x = this._point1.x;
            this.y = this._point1.y;
            let teta = Math.atan2(this._point1.x - this._point2.x, this._point2.y - this._point1.y);
            this.rotation = (teta * 180 / Math.PI) + 90;
            this.scaleX = util.Vector2.Distance(this._point1, this._point2) / this.Width;
        }
        Destroy() {
        }
        Rotate(spider) {
            this._point2 = spider;
            this.Update();
        }
        Move(anchor, spider, distance) {
            this._point1 = anchor;
            this._point2 = spider;
            this._distance = distance;
            this.Update();
        }
        Scroll(distance) {
            this.x -= distance;
        }
    }
    objects.Web = Web;
})(objects || (objects = {}));
//# sourceMappingURL=web.js.map