var objects;
(function (objects) {
    class Spider extends objects.GameObject {
        // constructors
        constructor(scene, x, y) {
            super("spider");
            this.y = y;
            this.x = x;
            this._scene = scene;
            this.Start();
        }
        // public methods
        Start() {
            this.regX = this.HalfWidth;
            this.regY = this.HalfHeight;
            this._webMinDistance = 30;
            this._webUpSpeed = 0.5;
            this.rotateSpeed = 0;
            this._isAnchor = false;
            this._velocity = new util.Vector2(0, 0);
            this._time = Date.now();
            this._sidewalkCollision = false;
            this._web = new objects.Web();
            this._scene.addChild(this._web);
            this.SetAnchor(new util.Vector2(this.x, 0));
        }
        Update() {
            if (this._anchorDistance > this._webMinDistance) {
                this._anchorDistance -= this._webUpSpeed;
            }
            if (managers.Input.isKeydown("ArrowUp") && this._anchorDistance > this._webMinDistance) {
                this._anchorDistance -= this._webUpSpeed;
            }
            if (managers.Input.isKeydown("ArrowDown")) {
                this._anchorDistance += this._webUpSpeed * 2;
            }
            // apply the gravity
            this._velocity.y += managers.GRAVITY * (Date.now() - this._time) / 1000;
            this._time = Date.now();
            // contraing movement due the web
            if (this._isAnchor && this.GetFutureAnchorDistance() > this._anchorDistance) {
                let teta = Math.atan2(this._anchor.x - this.x, this.y - this._anchor.y);
                if (this.rotateSpeed == 0) {
                    this.rotation = teta * 180 / Math.PI;
                }
                let sin = Math.sin(teta);
                let cos = Math.cos(teta);
                let velocityTan = (this._velocity.y * sin) + (this._velocity.x * cos);
                this._velocity.y = velocityTan * sin;
                this._velocity.x = velocityTan * cos;
            }
            // apply the velocity
            this.y += this._velocity.y;
            this.x += this._velocity.x;
            if (this._isAnchor) {
                // pulling the web
                if (this.GetAnchorDistance() > this._anchorDistance) {
                    let diff = util.Vector2.Subtract(this._anchor, new util.Vector2(this.x, this.y));
                    diff = util.Vector2.Normilize(diff);
                    this.x += diff.x;
                    this.y += diff.y;
                }
                // rotating the web
                this._web.Rotate(new util.Vector2(this.x, this.y));
            }
            // check sidewalk collision
            this._chechSidewalkCollision();
            this.rotation += this.rotateSpeed;
        }
        _chechSidewalkCollision() {
            if (this.y > managers.SCREEN_HEIGHT - 52) {
                this.y = managers.SCREEN_HEIGHT - 52;
                this._velocity.y = 0;
                this._velocity.x = 0;
                if (!this._sidewalkCollision) {
                    this._sidewalkCollision = true;
                    this.rotation = 0;
                    this.rotateSpeed = 0;
                    this._isAnchor = false;
                    this._web.Reset();
                    managers.Game.scoreboard.Lives--;
                    if (managers.Game.scoreboard.Lives <= 0) {
                        managers.Game.currentState = config.Scene.OVER;
                    }
                }
            }
            if (this._sidewalkCollision && this.y < managers.SCREEN_HEIGHT - 58) {
                this._sidewalkCollision = false;
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
            if (!this._sidewalkCollision || anchor.x < this.x || anchor.x < managers.SCREEN_WITH / 2) {
                this._anchor = anchor;
                this._anchorDistance = this.GetAnchorDistance();
                this._web.Move(anchor, new util.Vector2(this.x, this.y), this._anchorDistance);
                this._isAnchor = true;
                this.rotateSpeed = 0;
                this._velocity.y += managers.GRAVITY / 2; // initial extra impulse
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
        Clothes() {
            this.rotation = 0;
            this.rotateSpeed = 10;
            this._isAnchor = false;
            this._web.Reset();
        }
    }
    objects.Spider = Spider;
})(objects || (objects = {}));
//# sourceMappingURL=spider.js.map