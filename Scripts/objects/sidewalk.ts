module objects {
    export class Sidewalk extends GameObject {
        private _speed:number
        private _initialPoint:number;

        constructor(x:number, y:number, speed:number, scale:number, alpha:number) {
            super("sidewalk");
            this.x = x;
            this.y = y;
            this._initialPoint = x;
            this.scaleX = scale;
            this.scaleY = scale;
            this.alpha = alpha;
            this._speed = speed;
        }

        public Reset(): void {

        }        

        public Start(): void {

        }

        public Update(): void {

        }

        public Destroy(): void {

        }

        public Scroll(distance:number):void {
            if(this.x <= this._initialPoint - (this.HalfWidth * this.scaleX)) {
                this.x = this._initialPoint;
            } else if(this.x > this._initialPoint) {
                this.x = this._initialPoint - (this.HalfWidth * this.scaleX);
            } else {
                this.x -= distance * this._speed;
            }
        }

    }
}