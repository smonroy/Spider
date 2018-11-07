var objects;
(function (objects) {
    class Spider extends objects.GameObject {
        // constructors
        constructor() {
            super("spider");
            this.Start();
            this._isAnchor = false;
            this._velocity = new util.Vector2(0, 0);
            this._time = Date.now();
        }
        // public methods
        Start() {
            this.regX = this.HalfWidth;
            this.regY = this.HalfHeight;
            this.y = 100;
            this.x = 100;
        }
        Update() {
            this._velocity.y += managers.GRAVITY * (Date.now() - this._time) / 1000;
            this._time = Date.now();
            if (this._anchor && this.y > this._anchor.y && this._anchorDistance - this.GetAnchorDistance() < 1) {
                let teta = Math.atan2(this._anchor.x - this.x, this.y - this._anchor.y);
                let sin = Math.sin(teta);
                let cos = Math.cos(teta);
                let velocityTan = (this._velocity.y * sin) + (this._velocity.x * cos);
                this._velocity.y = velocityTan * sin;
                this._velocity.x = velocityTan * cos;
            }
            this.y += this._velocity.y;
            this.x += this._velocity.x;
        }
        Reset() {
        }
        Destroy() {
        }
        SetAnchor(anchor) {
            this._anchor = anchor;
            this._anchorDistance = this.GetAnchorDistance();
        }
        GetAnchorDistance() {
            return util.Vector2.Distance(new util.Vector2(this.x, this.y), this._anchor);
        }
        Scroll(distance) {
            this._anchor.x -= distance;
            this.x -= distance;
        }
    }
    objects.Spider = Spider;
})(objects || (objects = {}));
//# sourceMappingURL=spider.js.map