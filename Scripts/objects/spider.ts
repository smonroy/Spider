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
        
        // constructors
        constructor(x:number, y:number) {
            super("spider");
            this.y = y;
            this.x = x;
            this.Start();
        }

        

        // public methods
        public Start():void {
            this.regX = this.HalfWidth;
            this.regY = this.HalfHeight;
            this._webMinDistance = 30;
            this._webUpSpeed = 2;
            this.y = 100;
            this.x = 100;
            this._isAnchor = false;
            this._velocity = new util.Vector2(0,0);
            this._time = Date.now();
       }

        public Update():void {
            if(managers.Input.isKeydown("ArrowUp") && this._anchorDistance > this._webMinDistance) {
                this._anchorDistance -= this._webUpSpeed;
            }

            this._velocity.y += managers.GRAVITY * (Date.now() - this._time) / 1000;
            this._time = Date.now();
            if(this._isAnchor && this.GetFutureAnchorDistance() > this._anchorDistance)  {
                let teta:number = Math.atan2(this._anchor.x - this.x, this.y - this._anchor.y);
                this.rotation = teta * 180 / Math.PI;
                let sin:number = Math.sin(teta);
                let cos:number = Math.cos(teta);
                let velocityTan:number = (this._velocity.y * sin) + (this._velocity.x * cos);
                this._velocity.y = velocityTan * sin;
                this._velocity.x = velocityTan * cos;
            }
            this.y += this._velocity.y;
            this.x += this._velocity.x;
            if(this._isAnchor) {
                if(this.GetAnchorDistance() > this._anchorDistance) {
                    let diff:util.Vector2 = util.Vector2.Subtract(this._anchor, new util.Vector2(this.x, this.y));
                    diff = util.Vector2.Normilize(diff);
                    this.x += diff.x;
                    this.y += diff.y; 
                }
                this._web.Rotate(new util.Vector2(this.x, this.y));
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
            if(!this._isAnchor) {
                this._web = new objects.Web(anchor, new util.Vector2(this.x, this.y), this._anchorDistance);
                managers.Game.currentScene.addChild(this._web);
                this._isAnchor = true;
            } else {
                this._web.Move(anchor, new util.Vector2(this.x, this.y), this._anchorDistance);
            }
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
    }
}