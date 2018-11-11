var objects;
(function (objects) {
    let SpiderStatus;
    (function (SpiderStatus) {
        SpiderStatus[SpiderStatus["hanging"] = 0] = "hanging";
        SpiderStatus[SpiderStatus["falling"] = 1] = "falling";
        SpiderStatus[SpiderStatus["rolling"] = 2] = "rolling";
        SpiderStatus[SpiderStatus["dead"] = 3] = "dead";
    })(SpiderStatus = objects.SpiderStatus || (objects.SpiderStatus = {}));
    class Spider extends objects.GameObject {
        // constructors
        constructor(scene, x, y) {
            super("spider1");
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
            this._rotateSpeed = 0;
            this._velocity = new util.Vector2(0, 0);
            this._time = Date.now();
            this._web = new objects.Web();
            this._scene.addChild(this._web);
            this.SetAnchor(new util.Vector2(this.x, 0));
            this._animationTime = Date.now() + 2000;
            this._animationIndex = 1;
        }
        Update() {
            if (managers.Game.scoreboard.Lives <= 0) {
                this.status = SpiderStatus.dead;
                this._velocity.y = 0;
                this._rotateSpeed = -15;
            }
            switch (this.status) {
                case SpiderStatus.falling:
                    {
                        this._applyGravity(); // apply the gravity
                    }
                    break;
                case SpiderStatus.hanging:
                    {
                        // automaticaly pull the web
                        if (this._anchorDistance > this._webMinDistance) {
                            this._anchorDistance -= this._webUpSpeed;
                        }
                        // manual modificator to the web distance
                        if (managers.Input.isKeydown("ArrowUp") && this._anchorDistance > this._webMinDistance) {
                            this._anchorDistance -= this._webUpSpeed;
                        }
                        if (managers.Input.isKeydown("ArrowDown")) {
                            this._anchorDistance += this._webUpSpeed * 2;
                        }
                        this._applyGravity(); // apply the gravity
                        // constraing movement due the web (tangent movement)
                        if (this.GetFutureAnchorDistance() > this._anchorDistance) {
                            let teta = Math.atan2(this._anchor.x - this.x, this.y - this._anchor.y);
                            if (this._rotateSpeed == 0) {
                                this.rotation = teta * 180 / Math.PI;
                            }
                            let sin = Math.sin(teta);
                            let cos = Math.cos(teta);
                            let velocityTan = (this._velocity.y * sin) + (this._velocity.x * cos);
                            this._velocity.y = velocityTan * sin;
                            this._velocity.x = velocityTan * cos;
                        }
                        // pulling the web
                        if (this.GetAnchorDistance() > this._anchorDistance) {
                            let diff = util.Vector2.Subtract(this._anchor, new util.Vector2(this.x, this.y));
                            diff = util.Vector2.Normilize(diff);
                            this.x += diff.x;
                            this.y += diff.y;
                        }
                    }
                    break;
                case SpiderStatus.rolling:
                    {
                        this._velocity.x *= 0.90; // friction effect of the sidewalk
                        this.rotation = -this._velocity.x * 30;
                        if (Math.abs(this._velocity.x) < 0.01) {
                            if (this.x < this.Width) {
                                this.x = 100;
                            }
                            this.y = 150;
                            this.rotation = 0;
                            this.SetAnchor(new util.Vector2(this.x, 0));
                        }
                    }
                    break;
            }
            // applying the velocity
            this.y += this._velocity.y;
            this.x += this._velocity.x;
            // rotating the web
            if (this.status == SpiderStatus.hanging) {
                this._web.Rotate(new util.Vector2(this.x, this.y));
            }
            // applying rotation
            this.rotation += this._rotateSpeed;
            // check sidewalk collision
            this._chechSidewalkCollision();
            // animation
            this._animation();
        }
        _applyGravity() {
            this._velocity.y += managers.GRAVITY * (Date.now() - this._time) / 1000;
            this._time = Date.now();
        }
        _chechSidewalkCollision() {
            if (this.y > managers.SCREEN_HEIGHT - 52) {
                this.y = managers.SCREEN_HEIGHT - 52;
                let sound = createjs.Sound.play("sidewalkSound");
                sound.volume = 0.1;
                this._velocity.y = 0;
                if (this.status != SpiderStatus.rolling) {
                    this._web.Reset();
                    this.status = SpiderStatus.rolling;
                    managers.Game.scoreboard.Lives--;
                    if (managers.Game.scoreboard.Lives <= 0) {
                        managers.Game.currentState = config.Scene.OVER;
                    }
                }
            }
        }
        Reset() {
        }
        Destroy() {
        }
        SetAnchor(anchor) {
            this._anchor = anchor;
            this._anchorDistance = this.GetAnchorDistance();
            this._web.Move(anchor, new util.Vector2(this.x, this.y), this._anchorDistance);
            this._rotateSpeed = 0;
            this.status = SpiderStatus.hanging;
            this._velocity.y += managers.GRAVITY / 2; // initial extra impulse
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
            this._rotateSpeed = 10;
            this.status = SpiderStatus.falling;
            this._web.Reset();
        }
        _animation() {
            if (Date.now() > this._animationTime) {
                switch (this._animationIndex) {
                    case 1:
                        {
                            this._animationIndex = 2;
                            this.image = managers.Game.assetMnager.getResult("spider2");
                            this._animationTime = Date.now() + 200;
                        }
                        break;
                    case 2:
                        {
                            this._animationIndex = 3;
                            this.image = managers.Game.assetMnager.getResult("spider1");
                            this._animationTime = Date.now() + 2000;
                        }
                        break;
                    case 3:
                        {
                            this._animationIndex = 4;
                            this.image = managers.Game.assetMnager.getResult("spider3");
                            this._animationTime = Date.now() + 200;
                        }
                        break;
                    case 4:
                        {
                            this._animationIndex = 1;
                            this.image = managers.Game.assetMnager.getResult("spider1");
                            this._animationTime = Date.now() + 2000;
                        }
                        break;
                }
            }
        }
    }
    objects.Spider = Spider;
})(objects || (objects = {}));
//# sourceMappingURL=spider.js.map