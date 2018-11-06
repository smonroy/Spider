module objects {
    export class Island extends objects.GameObject {
        // private
        private _verticalSpeed:number;

        // public

        // contructor

        constructor() {
            super("island");
            this.regX = this.HalfWidth;
            this.regY = this.HalfHeight;

            this.Start();
        }

        // private methods
        private _checkBounds():void {
            if(this.y > 480 + this.Height) {
                this.Reset();
            }
        }

        private _move():void {
            this.y += this._verticalSpeed;
        }

        // public methods
        public Reset():void {
            this._verticalSpeed = 5;
            this.y = -this.Height;
            this.x = Math.floor((Math.random() * (640 - this.Width)) + this.HalfWidth);
            this.IsColliding = false;
        }

        public Start():void {
            this.Reset();
        }

        public Update():void {
            this._move();
            this._checkBounds();
            this._updatePosition();
        }

        public Destroy():void {
            
        }
    }
}