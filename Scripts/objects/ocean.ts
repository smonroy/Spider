module objects {
    export class Ocean extends objects.GameObject {
        // private
        private _verticalSpeed:number;

        // public

        // contructor

        constructor() {
            super("ocean");

            this.Start();
        }

        // private methods
        private _checkBounds():void {
            if(this.y >= 0) {
                this.Reset();
            }
        }

        private _move():void {
            this.y += this._verticalSpeed;
        }

        // public methods
        public Reset():void {
            this.y = -960;
        }

        public Start():void {
            this.Reset();
            this._verticalSpeed = 5;
        }

        public Update():void {
            this._move();
            this._checkBounds();
        }

        public Destroy():void {
            
        }
    }
}