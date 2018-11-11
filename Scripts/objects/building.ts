module objects {
    export class Building extends createjs.Bitmap {
        private _active:boolean;
        public floors:number;

        constructor(floors:number, position:number) {
            super(managers.Game.assetMnager.getResult("building"));
            this.floors = floors;
            this.x = position;
            this.y = managers.SCREEN_HEIGHT - (this.floors * managers.BLOCK_HEIGHT) + 36;
            this.Reset(floors ,position);

            this.on("mouseover", this._over);
            this.on("mouseout", this._out);
            this.on("click", this._click);
        }

        private _over(event:createjs.MouseEvent):void {
            this.alpha = 0.9;
        }

        private _out(event:createjs.MouseEvent):void {
            this.alpha = 1.0;
        }

        private _click(event:createjs.MouseEvent):void {
            if(managers.Game.player.status == SpiderStatus.hanging || managers.Game.player.status == SpiderStatus.falling) {
                managers.Game.player.SetAnchor(new util.Vector2(managers.Game.stage.mouseX, managers.Game.stage.mouseY));
            }
        }

        public Reset(floors:number, position:number): void {
            this.floors = floors;
            this.x = position;
            this.y = managers.SCREEN_HEIGHT - (this.floors * managers.BLOCK_HEIGHT) + 36;
            this._active = true;
        }

        public Start(): void {

        }

        public Update(): void {

        }

        public Destroy(): void {

        }

        public Scroll(distance:number):void {
            if(this._active) {
                this.x -= distance;
                if(this.x < - this.getBounds().width) {
                    managers.Game.scoreboard.Score += 100;
                    this._active = false;
                }
            }
        }

        public IsActive():boolean {
            return this._active;
        }
    }
}