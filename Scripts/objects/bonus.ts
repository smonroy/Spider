/**
 * Author: Sergio Monroy Escalante - 300930580
 * Date: Nov 11th, 2018
 * 
 * Happy face object that is used as bonus item. If the player collect all the five colors, he receive an extra life.
 */
module objects {
    export class Bonus extends objects.GameObject {
        // private
        private _active:boolean;
        private _bonusType:number;

        // public

        // contructor
        constructor(x:number, y:number) {
            super("bonus1");
            this.Activate(x, y);
        }

        // public methods
        public Reset():void {
            this.x = -1000;
            this._active = false;
        }

        public Activate(x:number, y:number):void {
            let bonusType = Math.floor(Math.random() * 5) + 1
            this._bonusType = bonusType;
            this.image = managers.Game.assetMnager.getResult("bonus" + bonusType) as HTMLImageElement;
            this.x = x;
            this.y = y;
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
                    managers.Game.scoreboard.Score += 20;
                    let sound = createjs.Sound.play("bonusSound");
                    sound.volume = 0.1;
                    managers.Game.scoreboard.SetBonus(this._bonusType, true);
                    this.Reset();
                }
            }
        }

    }
}