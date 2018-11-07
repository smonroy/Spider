var objects;
(function (objects) {
    class Web extends objects.GameObject {
        constructor(anchor, spider, distance) {
            super("webLine");
            this._point1 = anchor;
            this._point2 = spider;
            this._distance = distance;
            this.Start();
        }
        // public methods
        Reset() {
            this.x = this._point1.x;
            this.y = this._point1.y;
            let teta = Math.atan2(this._point1.x - this._point2.x, this._point2.y - this._point1.y);
            this.rotation = (teta * 180 / Math.PI) + 90;
            this.scaleX = util.Vector2.Distance(this._point1, this._point2) / this.Width;
        }
        Start() {
            this.Reset();
        }
        Update() {
        }
        Destroy() {
        }
        Rotate(spider) {
            this._point2 = spider;
            this.Reset();
        }
        Move(anchor, spider, distance) {
            this._point1 = anchor;
            this._point2 = spider;
            this._distance = distance;
            this.Reset();
        }
        Scroll(distance) {
            this.x -= distance;
        }
    }
    objects.Web = Web;
})(objects || (objects = {}));
//# sourceMappingURL=web.js.map