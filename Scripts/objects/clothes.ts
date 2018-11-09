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
            this.x = -1000;
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

        public CheckCollision():void {
            if(this._active) {
                if(managers.Game.player.x + managers.Game.player.HalfWidth > this.x && 
                    managers.Game.player.x - managers.Game.player.HalfWidth < this.x + (this.Width * this.scaleX) &&
                    managers.Game.player.y + managers.Game.player.HalfHeight > this.y &&
                    managers.Game.player.y - managers.Game.player.HalfHeight < this.y + (this.Height * this.scaleY)) {
                    managers.Game.scoreboard.Score -= 50;
                    this.Reset();
                    managers.Game.player.Clothes();
                }
            }
        }

    }
}