module objects {
    export class Clothes extends objects.GameObject {
        // private
        private _active:boolean;

        // public

        // contructor

        constructor(x:number, y:number, length:number) {
            super("clothes");
            this.Activate(x, y, length);
        }

        // public methods
        public Reset():void {
            this.IsColliding = false;
        }

        public Activate(x:number, y:number, length:number):void {
            this.x = x;
            this.y = y;
            this.scaleX = length / this.Width;
            this._active = true;
        }

        public Start():void {
        }

        public Update():void {
        }

        public Destroy():void {
            
        }

        public Scroll(distance:number):void {
            if(this._active) {
                this.x -= distance;
                if(this.x < - (this.getBounds().width  * this.scaleX)) {
                    this._active = false;
                }
            }
        }

        public IsActive():boolean {
            return this._active;
        }

    }
}