module objects {
    export class Spider extends objects.GameObject {
        private _anchor:util.Vector2;
        private _anchorDistance:number;
        private _isAnchor:boolean;
        private _velocity:util.Vector2;
        private _time:number;
        
        // constructors
        constructor() {
            super("spider");
            this.Start();
            this._isAnchor = false;
            this._velocity = new util.Vector2(0,0);
            this._time = Date.now();
        }

        

        // public methods
        public Start():void {
            this.regX = this.HalfWidth;
            this.regY = this.HalfHeight;
            this.y = 100;
            this.x = 100;
       }

        public Update():void {
            this._velocity.y += managers.GRAVITY * (Date.now() - this._time) / 1000;
            this._time = Date.now();
            if(this._anchor && this.y > this._anchor.y && this._anchorDistance - this.GetAnchorDistance() < 1)  {
                let teta:number = Math.atan2(this._anchor.x - this.x, this.y - this._anchor.y);
                let sin:number = Math.sin(teta);
                let cos:number = Math.cos(teta);
                let velocityTan:number = (this._velocity.y * sin) + (this._velocity.x * cos);
                this._velocity.y = velocityTan * sin;
                this._velocity.x = velocityTan * cos;
            }
            this.y += this._velocity.y;
            this.x += this._velocity.x;
        }

        public Reset() {

        }
        
        public Destroy() {

        }

        public SetAnchor(anchor:util.Vector2):void {
            this._anchor = anchor;
            this._anchorDistance = this.GetAnchorDistance();
        }

        private GetAnchorDistance():number {
            return util.Vector2.Distance(new util.Vector2(this.x, this.y), this._anchor);
        }

        public Scroll(distance:number):void {
            this._anchor.x -= distance;
            this.x -= distance;
        }
    }
}