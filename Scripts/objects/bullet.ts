module objects {
    export class Bullet extends objects.GameObject {

        private _speed:number;
        private _direction:util.Vector2;
        private _isInPlay:boolean;

        get IsInPlay():boolean {
            return this._isInPlay;
        }

        set IsInPlay(newValue:boolean) {
            this._isInPlay = newValue;
            if(!this.IsInPlay) {
                this.Reset();
            }
        }

        get Direction():util.Vector2 {
            return this._direction;
        }

        set Direction(direction:util.Vector2) {
            this._direction = direction;
        }

        constructor() {
            super("bullet");
            this.IsInPlay = false;
            this.Start()
        }

        public Reset(): void {
            this.x = -10000;
            this.y = -10000;
            this.Direction = util.Vector2.zero();
        }

        public Start(): void {
            this._speed = 10;
            this.Reset();
        }

        public Update(): void {
            if(this.IsInPlay) {
                this._move();
            }
        }

        public Destroy(): void {
            
        }

        private _move():void {
            this.Position = util.Vector2.Add(this.Position, util.Vector2.Multiply(this._direction, this._speed));
        }

        private _checkBounds():any {
            if(this.y < 0 || this.y > 480) {
                this.IsInPlay = false;
            }
        }

    }
}