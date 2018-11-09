module objects {
    export class Spider extends objects.GameObject {
        private _anchor:util.Vector2;
        private _anchorDistance:number;
        private _isAnchor:boolean;
        private _velocity:util.Vector2;
        private _time:number;
        private _web:objects.Web;
        private _webMinDistance:number;
        private _webUpSpeed:number;
        private _sidewalkCollision:boolean;
        private _scene:objects.Scene;
        private _rotateSpeed:number;
        
        // constructors
        constructor(scene:objects.Scene, x:number, y:number) {
            super("spider");
            this.y = y;
            this.x = x;
            this._scene = scene;
            this.Start();
        }

        // public methods
        public Start():void {
            this.regX = this.HalfWidth;
            this.regY = this.HalfHeight;
            this._webMinDistance = 30;
            this._webUpSpeed = 0.5;
            this._rotateSpeed = 0;
            this._isAnchor = false;
            this._velocity = new util.Vector2(0,0);
            this._time = Date.now();
            this._sidewalkCollision = false;
            this._web = new objects.Web();
            this._scene.addChild(this._web);
            this.SetAnchor(new util.Vector2(this.x, 0));
       }

        public Update():void {
            if(this._anchorDistance > this._webMinDistance) {
                this._anchorDistance -= this._webUpSpeed;
            }

            if(managers.Input.isKeydown("ArrowUp") && this._anchorDistance > this._webMinDistance) {
                this._anchorDistance -= this._webUpSpeed;
            }

            if(managers.Input.isKeydown("ArrowDown")) {
                this._anchorDistance += this._webUpSpeed * 2;
            }

            // apply the gravity
            this._velocity.y += managers.GRAVITY * (Date.now() - this._time) / 1000;
            this._time = Date.now();

            // contraing movement due the web
            if(this._isAnchor && this.GetFutureAnchorDistance() > this._anchorDistance)  {
                let teta:number = Math.atan2(this._anchor.x - this.x, this.y - this._anchor.y);
                this.rotation = teta * 180 / Math.PI;
                let sin:number = Math.sin(teta);
                let cos:number = Math.cos(teta);
                let velocityTan:number = (this._velocity.y * sin) + (this._velocity.x * cos);
                this._velocity.y = velocityTan * sin;
                this._velocity.x = velocityTan * cos;
            }

            // apply the velocity
            this.y += this._velocity.y;
            this.x += this._velocity.x;

            if(this._isAnchor) {

                // pulling the web
                if(this.GetAnchorDistance() > this._anchorDistance) {
                    let diff:util.Vector2 = util.Vector2.Subtract(this._anchor, new util.Vector2(this.x, this.y));
                    diff = util.Vector2.Normilize(diff);
                    this.x += diff.x;
                    this.y += diff.y; 
                }

                // rotating the web
                this._web.Rotate(new util.Vector2(this.x, this.y));
            }

            // check sidewalk collision
            if(this.y > managers.SCREEN_HEIGHT - 52) {
                this.y = managers.SCREEN_HEIGHT - 52;
                this._velocity.y = 0;
                this._velocity.x = 0;
                if(!this._sidewalkCollision) {
                    this._sidewalkCollision = true;
                    this.rotation = 0;
                    this._rotateSpeed = 0;
                    this._isAnchor = false;
                    this._web.Reset();
                    managers.Game.scoreboard.Lives--;
                }
            } else {
                this.rotation += this._rotateSpeed;
            }

            if(this._sidewalkCollision && this.y < managers.SCREEN_HEIGHT - 58) {
                this._sidewalkCollision = false;
            }

        }

        public Reset() {

        }
        
        public Destroy() {

        }

        public IsAnchor():boolean {
            return this._isAnchor;
        }

        public SetAnchor(anchor:util.Vector2):void {
            this._anchor = anchor;
            this._anchorDistance = this.GetAnchorDistance();
            this._web.Move(anchor, new util.Vector2(this.x, this.y), this._anchorDistance);
            this._isAnchor = true;
            this._rotateSpeed = 0;
            
            this._velocity.y += managers.GRAVITY / 2;   // initial extra impulse

        }

        private GetAnchorDistance():number {
            return util.Vector2.Distance(new util.Vector2(this.x, this.y), this._anchor);
        }

        private GetFutureAnchorDistance():number {
            return util.Vector2.Distance(new util.Vector2(this.x + this._velocity.x , this.y + this._velocity.y), this._anchor);
        }

        public Scroll(distance:number):void {
            this._anchor.x -= distance;
            this.x -= distance;
            this._web.Scroll(distance);
        }

        public Clothes():void {
            this.rotation = 0;
            this._rotateSpeed = 10;
            this._isAnchor = false;
            this._web.Reset();
        }
    }
}