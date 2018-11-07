var objects;
(function (objects) {
    class Spider extends objects.GameObject {
        // constructors
        constructor(x, y) {
            super("spider");
            this.y = y;
            this.x = x;
            this.Start();
        }
        // public methods
        Start() {
            this.regX = this.HalfWidth;
            this.regY = this.HalfHeight;
            this._webMinDistance = 30;
            this._webUpSpeed = 2;
            this.y = 100;
            this.x = 100;
            this._isAnchor = false;
            this._velocity = new util.Vector2(0, 0);
            this._time = Date.now();
        }
        Update() {
            if (managers.Input.isKeydown("ArrowUp") && this._anchorDistance > this._webMinDistance) {
                this._anchorDistance -= this._webUpSpeed;
            }
            this._velocity.y += managers.GRAVITY * (Date.now() - this._time) / 1000;
            this._time = Date.now();
            if (this._isAnchor && this.GetFutureAnchorDistance() > this._anchorDistance) {
                let teta = Math.atan2(this._anchor.x - this.x, this.y - this._anchor.y);
                this.rotation = teta * 180 / Math.PI;
                let sin = Math.sin(teta);
                let cos = Math.cos(teta);
                let velocityTan = (this._velocity.y * sin) + (this._velocity.x * cos);
                this._velocity.y = velocityTan * sin;
                this._velocity.x = velocityTan * cos;
            }
            this.y += this._velocity.y;
            this.x += this._velocity.x;
            if (this._isAnchor) {
                if (this.GetAnchorDistance() > this._anchorDistance) {
                    let diff = util.Vector2.Subtract(this._anchor, new util.Vector2(this.x, this.y));
                    diff = util.Vector2.Normilize(diff);
                    this.x += diff.x;
                    this.y += diff.y;
                }
                this._web.Rotate(new util.Vector2(this.x, this.y));
            }
        }
        Reset() {
        }
        Destroy() {
        }
        IsAnchor() {
            return this._isAnchor;
        }
        SetAnchor(anchor) {
            this._anchor = anchor;
            this._anchorDistance = this.GetAnchorDistance();
            if (!this._isAnchor) {
                this._web = new objects.Web(anchor, new util.Vector2(this.x, this.y), this._anchorDistance);
                managers.Game.currentScene.addChild(this._web);
                this._isAnchor = true;
            }
            else {
                this._web.Move(anchor, new util.Vector2(this.x, this.y), this._anchorDistance);
            }
        }
        GetAnchorDistance() {
            return util.Vector2.Distance(new util.Vector2(this.x, this.y), this._anchor);
        }
        GetFutureAnchorDistance() {
            return util.Vector2.Distance(new util.Vector2(this.x + this._velocity.x, this.y + this._velocity.y), this._anchor);
        }
        Scroll(distance) {
            this._anchor.x -= distance;
            this.x -= distance;
            this._web.Scroll(distance);
        }
    }
    objects.Spider = Spider;
})(objects || (objects = {}));
//# sourceMappingURL=spider.js.map