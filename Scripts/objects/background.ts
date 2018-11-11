/**
 * Author: Sergio Monroy Escalante - 300930580
 * Date: Nov 11th, 2018
 * 
 * Background image to produce a 3D efect in the city
 */
module objects {
    export class Background extends GameObject {
        private _speed:number
        private _initialPoint:number;

        constructor(x:number, y:number, speed:number, scale:number, alpha:number) {
            super("cityBackground");
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
            if(this.x > this._initialPoint - (this.Width * this.scaleX)) {
                this.x -= distance * this._speed;
            } else {
                this.x = this._initialPoint;
            }
        }

    }
}